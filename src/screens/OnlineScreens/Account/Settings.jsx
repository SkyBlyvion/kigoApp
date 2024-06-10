import React, { useState, useEffect } from 'react';
import CustomInput from '../../../components/CustomInput';
import ButtonLoader from '../../../components/loader/ButtonLoader';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { apiUrl } from '../../../constants/apiConstant';

const Editinfo = () => {
  const { userId, signIn } = useAuthContext();
  const navigate = useNavigate();
  const [filiere, setFiliere] = useState('');
  const [competences, setCompetences] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);
  const [newSocialLinks, setNewSocialLinks] = useState([{ type: '', value: '' }]);
  const [deletedSocialLinks, setDeletedSocialLinks] = useState([]); // Pour garder une trace des contacts supprimés
  const [filieres, setFilieres] = useState([]);
  const [allCompetences, setAllCompetences] = useState([]);
  const [contactTypes, setContactTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch user data to pre-fill form fields
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/users/${userId}`);
        const user = response.data;
        setFiliere(user.filiere?.id || '');
        setCompetences(user.competences.map(comp => comp.id));
        setSocialLinks(user.contacts);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    // Fetch available filieres
    const fetchFilieres = async () => {
      try {
        const response = await axios.get(`${apiUrl}/filieres`);
        console.log('Filieres response:', response.data);
        setFilieres(response.data['hydra:member']);
      } catch (error) {
        console.error('Error fetching filieres:', error);
        setFilieres([]); // Assurez-vous que filieres est un tableau
      }
    };

    // Fetch available competences
    const fetchCompetences = async () => {
      try {
        const response = await axios.get(`${apiUrl}/competences`);
        console.log('Competences response:', response.data);
        setAllCompetences(response.data['hydra:member']);
      } catch (error) {
        console.error('Error fetching competences:', error);
        setAllCompetences([]); // Assurez-vous que competences est un tableau
      }
    };

    // Fetch available contact types
    const fetchContactTypes = async () => {
      try {
        const response = await axios.get(`${apiUrl}/types`);
        console.log('Contact types response:', response.data);
        setContactTypes(response.data['hydra:member']);
      } catch (error) {
        console.error('Error fetching contact types:', error);
        setContactTypes([]); // Assurez-vous que contactTypes est un tableau
      }
    };

    fetchUserData();
    fetchFilieres();
    fetchCompetences();
    fetchContactTypes();
  }, [userId]);

  //TODO: regler le bug des contacts supprimés ( bdd user_id deleted mais record présent)
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Préparer les contacts existants avec les nouvelles valeurs, en vérifiant si les valeurs ont changé
    const existingContacts = socialLinks
      .filter(({ id, type, value }) => value.trim()) // Filtrer les contacts avec des valeurs vides
      .map(({ id, type, value }) => ({
        id,
        type: `/api/types/${type.id}`,
        value: value.trim()
      }));

    // Préparer les nouveaux contacts
    const newContacts = newSocialLinks
      .filter(({ type, value }) => value.trim()) // Filtrer les contacts avec des valeurs vides
      .map(({ type, value }) => ({
        type: `/api/types/${type}`,
        value: value.trim()
      }));

    // Vérifiez si un contact existant a été modifié
    const modifiedContacts = existingContacts.filter(contact => {
      const originalContact = socialLinks.find(link => link.id === contact.id);
      return originalContact && originalContact.value !== contact.value;
    });

    // Combine modified contacts and new contacts
    const combinedContacts = [...modifiedContacts, ...newContacts];

    const data = {
      filiere: filiere ? `/api/filieres/${filiere}` : null,
      competences: competences.map(comp => `/api/competences/${comp}`),
      contacts: combinedContacts,
      deletedContacts: deletedSocialLinks // inclure les contacts supprimés
    };

    console.log('Data to be sent:', data);

    setIsLoading(true);

    try {
      axios.defaults.headers.patch['Content-Type'] = 'application/merge-patch+json';
      await axios.patch(`${apiUrl}/users/${userId}`, data);
      navigate(`/account/${userId}`);
    } catch (error) {
      console.error(`Erreur sur la requête de modification des infos : ${error}`);
      if (error.response && error.response.data && error.response.data.violations) {
        setError('Erreur lors de la mise à jour des informations');
      } else {
        setError('Erreur réseau ou serveur');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLinkChange = (index, value) => {
    setSocialLinks(prevLinks => {
      const newLinks = [...prevLinks];
      newLinks[index].value = value;
      return newLinks;
    });
  };

  const handleNewSocialLinkChange = (index, field, value) => {
    const newLinks = [...newSocialLinks];
    newLinks[index][field] = value;
    setNewSocialLinks(newLinks);
  };

  const addNewSocialLink = () => {
    setNewSocialLinks([...newSocialLinks, { type: '', value: '' }]);
  };

  const removeSocialLink = (index) => {
    setSocialLinks(prevLinks => {
      const linkToRemove = prevLinks[index];
      setDeletedSocialLinks([...deletedSocialLinks, linkToRemove.id]);
      return prevLinks.filter((_, i) => i !== index);
    });
  };

  const handleCompetenceChange = (event) => {
    const value = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setCompetences(value);
  };

  return (
    <div className='flex flex-1 flex-col h-screen justify-start items-center bg-white'>
      <h2 className='text-black font-bold text-xl py-5'>Mettre à jour votre compte</h2>
      <div className='text-red-600 font-bold mb-4'>{error}</div>
      <form onSubmit={handleSubmit} className='max-w-md mx-auto'>
        {/* Select pour filiere */}
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='filiere'>
            Votre Filière
          </label>
          <select
            id='filiere'
            value={filiere}
            onChange={(event) => setFiliere(event.target.value)}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          >
            <option value='' disabled>Choisissez votre filière</option>
            {Array.isArray(filieres) && filieres.map((filiere) => (
              <option key={filiere.id} value={filiere.id}>{filiere.label}</option>
            ))}
          </select>
        </div>
        {/* Select pour competences */}
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='competences'>
            Vos Compétences
          </label>
          <select
            id='competences'
            multiple
            value={competences}
            onChange={handleCompetenceChange}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          >
            {Array.isArray(allCompetences) && allCompetences.map((competence) => (
              <option key={competence.id} value={competence.id}>{competence.label}</option>
            ))}
          </select>
        </div>
        {/* inputs pour les réseaux sociaux */}
        {socialLinks.map((contact, index) => (
          <div key={index} className='mb-4 flex'>
            <CustomInput
              state={contact.value}
              label={`Votre ${contact.type.label.charAt(0).toUpperCase() + contact.type.label.slice(1)}`}
              type="text"
              callable={(event) => handleSocialLinkChange(index, event.target.value)}
            />
            <button type="button" onClick={() => removeSocialLink(index)} className='ml-2 bg-red-500 text-white p-2 rounded'>Supprimer</button>
          </div>
        ))}
        {/* Ajouter des nouveaux contacts */}
        {newSocialLinks.map((link, index) => (
          <div key={index} className='mb-4 flex'>
            <select
              value={link.type}
              onChange={(event) => handleNewSocialLinkChange(index, 'type', event.target.value)}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            >
              <option value='' disabled>Choisissez un type de contact</option>
              {Array.isArray(contactTypes) && contactTypes.map((type) => (
                <option key={type.id} value={type.id}>{type.label}</option>
              ))}
            </select>
            <input
              type='text'
              value={link.value}
              onChange={(event) => handleNewSocialLinkChange(index, 'value', event.target.value)}
              placeholder='Lien'
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />
          </div>
        ))}
        <button
          type='button'
          onClick={addNewSocialLink}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4'
        >
          Ajouter un autre contact
        </button>
        <div className='flex items-center justify-center pt-5'>
          {isLoading ? <ButtonLoader /> :
            <button type='submit' className='bg-orange hover:bg-orange_top text-white font-bold py-2 px-4 rounded'>
              Mettre à jour
            </button>}
        </div>
      </form>
    </div>
  );
};

export default Editinfo;
