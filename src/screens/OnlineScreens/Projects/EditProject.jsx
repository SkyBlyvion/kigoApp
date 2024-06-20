import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { apiUrl, apiRoot } from '../../../constants/apiConstant';
import CustomInput from '../../../components/CustomInput';
import ButtonLoader from '../../../components/loader/ButtonLoader';
import PageLoader from '../../../components/loader/PageLoader';

const EditProject = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [competences, setCompetences] = useState([]);
  const [filieres, setFilieres] = useState([]);
  const [availableCompetences, setAvailableCompetences] = useState([]);
  const [availableFilieres, setAvailableFilieres] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`${apiUrl}/projects?groups=project:read`);
        const projectData = response.data;
        setProject(projectData);
        setTitle(projectData.postDetails.title);
        setText(projectData.postDetails.text);
        setCompetences(projectData.competences);
        setFilieres(projectData.filieres);
      } catch (error) {
        console.error('Error fetching project:', error);
      }
    };

    const fetchCompetencesAndFilieres = async () => {
      try {
        const [competencesResponse, filieresResponse] = await Promise.all([
          axios.get(`${apiUrl}/competences`),
          axios.get(`${apiUrl}/filieres`)
        ]);
        setAvailableCompetences(competencesResponse.data['hydra:member']);
        setAvailableFilieres(filieresResponse.data['hydra:member']);
      } catch (error) {
        console.error('Error fetching competences and filieres:', error);
      }
    };

    fetchProject();
    fetchCompetencesAndFilieres();
  }, [projectId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const projectData = {
      postDetails: {
        title,
        text,
      },
      competences: competences.map(comp => `/api/competences/${comp.id}`),
      filieres: filieres.map(fil => `/api/filieres/${fil.id}`),
    };

    try {
      await axios.put(`${apiUrl}/projects/${projectId}`, projectData, {
        headers: {
          'Content-Type': 'application/ld+json',
        },
      });
      navigate('/projects');
    } catch (error) {
      console.error('Error updating project:', error);
      setError('Erreur lors de la mise à jour du projet');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompetenceChange = (event) => {
    const selectedCompetenceId = event.target.value;
    const selectedCompetence = availableCompetences.find(comp => comp.id === selectedCompetenceId);
    if (selectedCompetence && !competences.includes(selectedCompetence)) {
      setCompetences([...competences, selectedCompetence]);
    }
  };

  const handleFiliereChange = (event) => {
    const selectedFiliereId = event.target.value;
    const selectedFiliere = availableFilieres.find(fil => fil.id === selectedFiliereId);
    if (selectedFiliere && !filieres.includes(selectedFiliere)) {
      setFilieres([...filieres, selectedFiliere]);
    }
  };

  if (!project) return <PageLoader />;

  return (
    <div className='flex flex-1 flex-col h-screen justify-start items-center bg-white'>
      <h2 className='text-black font-bold text-xl py-5'>Modifier le projet</h2>
      <div className='text-red-600 font-bold mb-4'>{error}</div>
      <form onSubmit={handleSubmit} className='max-w-md mx-auto'>
        <CustomInput state={title} label="Titre" type="text" callable={(event) => setTitle(event.target.value)} />
        <CustomInput state={text} label="Texte" type="text" callable={(event) => setText(event.target.value)} />

        <div className="mb-4">
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='competences'>
            Compétences recherchées
          </label>
          <select
            id='competences'
            onChange={handleCompetenceChange}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          >
            <option value="">Sélectionner une compétence</option>
            {availableCompetences.map(comp => (
              <option key={comp.id} value={comp.id}>{comp.label}</option>
            ))}
          </select>
          <ul>
            {competences.map(comp => (
              <li key={comp.id}>- {comp.label}</li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='filieres'>
            Filières recherchées
          </label>
          <select
            id='filieres'
            onChange={handleFiliereChange}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          >
            <option value="">Sélectionner une filière</option>
            {availableFilieres.map(fil => (
              <option key={fil.id} value={fil.id}>{fil.label}</option>
            ))}
          </select>
          <ul>
            {filieres.map(fil => (
              <li key={fil.id}>- {fil.label}</li>
            ))}
          </ul>
        </div>

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

export default EditProject;