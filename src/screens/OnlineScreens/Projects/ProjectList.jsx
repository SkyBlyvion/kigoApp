import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiUrl, apiRoot } from '../../../constants/apiConstant';
import PageLoader from '../../../components/loader/PageLoader';
import { Link } from 'react-router-dom';

const ProjectsList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${apiUrl}/projects?groups=project:read`);
        const projectsData = response.data['hydra:member'];

        const projectsWithDetails = await Promise.all(projectsData.map(async (project) => {
          // Fetch competences details
          const competencesDetails = await Promise.all(
            project.competences.map(async (competenceUrl) => {
              const competenceResponse = await axios.get(`${apiRoot}${competenceUrl}`);
              return competenceResponse.data;
            })
          );

          // Fetch filieres details
          const filieresDetails = await Promise.all(
            project.filieres.map(async (filiereUrl) => {
              const filiereResponse = await axios.get(`${apiRoot}${filiereUrl}`);
              return filiereResponse.data;
            })
          );

          // Fetch users details
          const usersDetails = await Promise.all(
            project.users.map(async (userUrl) => {
              const userResponse = await axios.get(`${apiRoot}${userUrl}`);
              return userResponse.data;
            })
          );

          // Fetch post details
          const postResponse = await axios.get(`${apiRoot}${project.post}`);
          const postDetails = postResponse.data;

          // Fetch media details
          let mediaDetails = null;
          if (postDetails.media) {
            const mediaResponse = await axios.get(`${apiRoot}${postDetails.media}`);
            mediaDetails = mediaResponse.data;
          }

          return {
            ...project,
            competences: competencesDetails,
            filieres: filieresDetails,
            users: usersDetails,
            postDetails,
            mediaDetails,
          };
        }));

        setProjects(projectsWithDetails);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <PageLoader />;

  console.log('projects', projects);
  return (
    <div className="flex flex-col items-center h-screen overflow-y-auto p-4 pb-20">
        <div className="p-4 w-full flex justify-between items-center">
          <Link to="/CreateProject"> {/*TODO:HoverCaption"Créer un projet"*/}
            <img src="../../../../documentation/svg/plus.svg" alt="setting" className="text-2xl" />
          </Link>
          <Link to="/EditProject"> {/*TODO:HoverCaption"Modifier"*/}
            <img src="../../../../documentation/svg/edit.svg" alt="setting" className="text-2xl" />
          </Link>

        
        </div>
      {/* <img src="../../../../documentation/svg/Filter.svg" alt="filter" /> */}
      <h1 className="text-2xl text-orange font-bold pb-4">Projects</h1>
      {/* <p>Un porteur de projet peut créer un projet dans l’application pour y 
        spécifier les besoins en compétences pour le réaliser, 
        ainsi que les filières professionnelles nécessaires. 
        Le projet est associé à la création à un post et une ou plusieurs photos 
        accompagné d’un texte descriptif.</p><br/>
      <p>Un utilisateur peut explorer les projets proposés par le porteur et 
        demander à y participer selon les compétences demandées.</p><br/> */}
      <div className='w-5/6'>
        {projects.map(project => (
          <div key={project.id} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
            <h2 className='text-xl font-bold'>{project.postDetails.title}</h2>
            <p>{project.postDetails.text}</p>
            <p>Type de projet: {project.postDetails.type}</p>
            <p>Créé le: {new Date(project.postDetails.created_date).toLocaleDateString()}</p>
            <p>Mis à jour le: {new Date(project.postDetails.updated_date).toLocaleDateString()}</p>
            {project.mediaDetails && (
              <div>
                <p>{project.mediaDetails.label}</p>
                <img src={`http://api_kigo.lndo.site/images/postImages/${project.mediaDetails.url_img}`} 
                  alt={project.mediaDetails.label} 
                  className="mt-4 max-w-full max-h-[200px] object-cover" 
                />
              </div>
            )}
            <div>
              <h3 className='text-xl font-bold'>Compétences recherchées: </h3>
              <ul>
                {project.competences.map(comp => (
                  <li key={comp.id}> - {comp.label}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className='text-xl font-bold'>Filières recherché: </h3>
              <ul>
                {project.filieres.map(fil => (
                  <li key={fil.id}> - {fil.label}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className='text-xl font-bold'>Porteur du Projet:</h3>
              <ul>
                {project.users.map(user => (
                  <li key={user.id}> - {user.firstname} {user.lastname}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsList;
