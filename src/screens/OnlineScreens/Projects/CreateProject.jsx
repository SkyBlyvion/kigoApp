import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../../../constants/apiConstant';
import CustomInput from '../../../components/CustomInput';
import ButtonLoader from '../../../components/loader/ButtonLoader';
import PostSelectionModal from './PostSelectionModal';

const CreateProject = () => {
  const { userId } = useAuthContext();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [postId, setPostId] = useState(null);
  const [type, setType] = useState('1'); // Default to "project"
  const [competences, setCompetences] = useState([]);
  const [filieres, setFilieres] = useState([]);
  const [selectedCompetences, setSelectedCompetences] = useState([]);
  const [selectedFilieres, setSelectedFilieres] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    // Fetch competences and filieres
    const fetchCompetencesAndFilieres = async () => {
      try {
        const [competencesResponse, filieresResponse] = await Promise.all([
          axios.get(`${apiUrl}/competences`),
          axios.get(`${apiUrl}/filieres`)
        ]);

        setCompetences(competencesResponse.data['hydra:member']);
        setFilieres(filieresResponse.data['hydra:member']);
      } catch (error) {
        console.error('Error fetching competences or filieres:', error);
      }
    };

    fetchCompetencesAndFilieres();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const projectData = {
      post: `/api/posts/${postId}`,
      competences: selectedCompetences.map(id => `/api/competences/${id}`),
      filieres: selectedFilieres.map(id => `/api/filieres/${id}`),
      users: [`/api/users/${userId}`],
      isActive: true,
      isFinish: false,
    };

    try {
      await axios.post(`${apiUrl}/projects`, projectData, {
        headers: {
          'Content-Type': 'application/ld+json',
        },
      });

      navigate('/projects');
    } catch (error) {
      console.error('Error creating project:', error);
      setError('Erreur lors de la création du projet');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompetenceChange = (event) => {
    const { options } = event.target;
    const selected = [];
    for (const option of options) {
      if (option.selected) {
        selected.push(option.value);
      }
    }
    setSelectedCompetences(selected);
  };

  const handleFiliereChange = (event) => {
    const { options } = event.target;
    const selected = [];
    for (const option of options) {
      if (option.selected) {
        selected.push(option.value);
      }
    }
    setSelectedFilieres(selected);
  };

  const handlePostSelect = (post) => {
    setPostId(post.id);
    setTitle(post.title);
    setText(post.text);
    setType(post.type.toString());
    setIsModalOpen(false); // Close the modal after selecting a post
  };

  console.log({ title, text, type, postId, selectedCompetences, selectedFilieres });
  return (
    <div className='flex flex-1 flex-col h-screen justify-start items-center bg-white'>
      <h2 className='text-black font-bold text-xl py-5'>Créer un projet</h2>
      <div className='text-red-600 font-bold mb-4'>{error}</div>
      {isModalOpen ? (
        <PostSelectionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSelect={handlePostSelect}
        />
      ) : (
        <form onSubmit={handleSubmit} className='max-w-md mx-auto'>
          <CustomInput state={title} label="Titre" type="text" callable={(event) => setTitle(event.target.value)} />
          <CustomInput state={text} label="Texte" type="text" callable={(event) => setText(event.target.value)} />
          <div className="mb-4">
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='type'>
              Type de projet
            </label>
            <select
              id='type'
              value={type}
              onChange={(event) => setType(event.target.value)}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            >
              <option value="1">Project</option>
              <option value="2">Participation</option>
              <option value="3">Inspiration</option>
              <option value="4">Personal Realization</option>
            </select>
          </div>
          <div className="mb-4">
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='competences'>
              Compétences
            </label>
            <select
              id='competences'
              multiple
              onChange={handleCompetenceChange}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            >
              {competences.map(comp => (
                <option key={comp.id} value={comp.id}>{comp.label}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='filieres'>
              Filières
            </label>
            <select
              id='filieres'
              multiple
              onChange={handleFiliereChange}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            >
              {filieres.map(fil => (
                <option key={fil.id} value={fil.id}>{fil.label}</option>
              ))}
            </select>
          </div>
          <input type="hidden" name="created_date" value={new Date().toISOString().split('T')[0]} />
          <input type="hidden" name="updated_date" value={new Date().toISOString()} />
          <div className='flex items-center justify-center pt-5'>
            {isLoading ? <ButtonLoader /> :
              <button type='submit' className='bg-orange hover:bg-orange_top text-white font-bold py-2 px-4 rounded'>
                Créer
              </button>}
          </div>
        </form>
      )}
    </div>
  );
};

export default CreateProject;
