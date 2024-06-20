import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from '../../../contexts/AuthContext';
import ButtonLoader from '../../../components/loader/ButtonLoader';
import FiliereSelect from '../../../components/Account/FiliereSelect';
import CompetencesSelect from '../../../components/Account/CompetencesSelect';
import SocialLinkInput from '../../../components/Account/SocialLinkInput';
import { apiUrl } from '../../../constants/apiConstant';

const Editinfo = () => {
  const { userId } = useAuthContext();
  const navigate = useNavigate();
  const [filiere, setFiliere] = useState('');
  const [competences, setCompetences] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);
  const [newSocialLinks, setNewSocialLinks] = useState([{ type: '', value: '' }]);
  const [deletedSocialLinks, setDeletedSocialLinks] = useState([]);
  const [filieres, setFilieres] = useState([]);
  const [allCompetences, setAllCompetences] = useState([]);
  const [contactTypes, setContactTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
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

    const fetchFilieres = async () => {
      try {
        const response = await axios.get(`${apiUrl}/filieres`);
        setFilieres(response.data['hydra:member']);
      } catch (error) {
        console.error('Error fetching filieres:', error);
        setFilieres([]);
      }
    };

    const fetchCompetences = async () => {
      try {
        const response = await axios.get(`${apiUrl}/competences`);
        setAllCompetences(response.data['hydra:member']);
      } catch (error) {
        console.error('Error fetching competences:', error);
        setAllCompetences([]);
      }
    };

    const fetchContactTypes = async () => {
      try {
        const response = await axios.get(`${apiUrl}/types`);
        setContactTypes(response.data['hydra:member']);
      } catch (error) {
        console.error('Error fetching contact types:', error);
        setContactTypes([]);
      }
    };

    fetchUserData();
    fetchFilieres();
    fetchCompetences();
    fetchContactTypes();
  }, [userId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const existingContacts = socialLinks
      .filter(({ id, type, value }) => value.trim() && !deletedSocialLinks.includes(id))
      .map(({ id, type, value }) => ({
        id,
        type: `/api/types/${type.id}`,
        value: value.trim()
      }));

    const newContacts = newSocialLinks
      .filter(({ type, value }) => value.trim())
      .map(({ type, value }) => ({
        type: `/api/types/${type}`,
        value: value.trim()
      }));

    const combinedContacts = [...existingContacts, ...newContacts];

    const data = {
      filiere: filiere ? `/api/filieres/${filiere}` : null,
      competences: competences.map(comp => `/api/competences/${comp}`),
      contacts: combinedContacts,
    };

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
        <FiliereSelect filiere={filiere} filieres={filieres} setFiliere={setFiliere} />
        <CompetencesSelect competences={competences} allCompetences={allCompetences} handleCompetenceChange={handleCompetenceChange} />
        {socialLinks.map((contact, index) => (
          <SocialLinkInput
            key={index}
            contact={contact}
            index={index}
            handleSocialLinkChange={handleSocialLinkChange}
            removeSocialLink={removeSocialLink}
          />
        ))}
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
