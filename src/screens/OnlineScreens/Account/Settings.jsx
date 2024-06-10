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
  const [competences, setCompetences] = useState('');
  const [socialLinks, setSocialLinks] = useState({
    linkedin: '',
    github: '',
    instagram: '',
    behance: '',
    soundcloud: '',
    teams: ''
  });
  const [filieres, setFilieres] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch user data to pre-fill form fields
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/users/${userId}`);
        const user = response.data;
        setFiliere(user.filiere);
        setCompetences(user.competences.join(', '));
        const socialLinks = user.contacts.reduce((acc, contact) => {
          acc[contact.type] = contact.value;
          return acc;
        }, {});
        setSocialLinks(socialLinks);
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

    fetchUserData();
    fetchFilieres();
  }, [userId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formattedContacts = Object.entries(socialLinks).map(([type, value]) => {
      return { type, value: value.trim() || null };
    });

    // on crée un objet pour le patch
    const data = {
      filiere: filiere ? `/api/filieres/${filiere}` : null,
      competences: competences.split(',').map(comp => comp.trim()).filter(comp => comp),
      contacts: formattedContacts.filter(contact => contact.value)
    };

    console.log('Data to be sent:', data);

    setIsLoading(true);

    try {
      axios.defaults.headers.patch['Content-Type'] = 'application/merge-patch+json';
      // méthode qui modifie les infos de l'user
      await axios.patch(`${apiUrl}/users/${userId}`, data);
      // On redirige vers la page de compte
      navigate(`/account/${userId}`);
    } catch (error) {
      console.error(`Erreur sur la requête de modification des infos : ${error}`);
      console.error('Erreur details:', error.response.data);
      setError('Erreur lors de la mise à jour des informations');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLinkChange = (type, value) => {
    setSocialLinks(prevLinks => ({ ...prevLinks, [type]: value }));
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
        {/* input pour competences */}
        <CustomInput state={competences} label="Vos Compétences (séparées par des virgules)" type="text" callable={(event) => setCompetences(event.target.value)} />
        {/* inputs pour les réseaux sociaux */}
        {Object.keys(socialLinks).map(key => (
          <CustomInput
            key={key}
            state={socialLinks[key]}
            label={`Votre ${key.charAt(0).toUpperCase() + key.slice(1)}`}
            type="text"
            callable={(event) => handleSocialLinkChange(key, event.target.value)}
          />
        ))}
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
