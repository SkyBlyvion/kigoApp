import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiUrl, apiRoot } from '../../../constants/apiConstant';
import PageLoader from '../../../components/loader/PageLoader';
import { Link } from 'react-router-dom';

const ProjectsList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null); // État pour le projet sélectionné

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

        // Trier les projets par date de création décroissante
        projectsWithDetails.sort((a, b) => new Date(b.postDetails.created_date) - new Date(a.postDetails.created_date));

        setProjects(projectsWithDetails);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  if (loading) return <PageLoader />;

  console.log('projects', projects);
  return (
    <div className="flex flex-col items-center h-screen overflow-y-auto p-4 pb-20">
      <div className="p-4 w-full flex justify-between items-center">
        <Link to="/CreateProject">
          <img src="../../../../documentation/svg/plus.svg" alt="Créer un projet" className="w-8 h-8" />
        </Link>
      </div>
      <h1 className="text-2xl text-orange font-bold pb-4">Projects</h1>
      <div className="w-5/6">
        {projects.map(project => (
          <div key={project.id} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border-2 border-orange" onClick={() => handleProjectClick(project)}>
            <h2 className="text-xl font-bold">{project.postDetails.title}</h2>
            <p>{project.postDetails.text.slice(0, 100)}...</p>
            {/* <p>Type de projet: {project.postDetails.type}</p> */}
            <p>Créé le: {new Date(project.postDetails.created_date).toLocaleDateString()}</p>
            {/* <p>Mis à jour le: {new Date(project.postDetails.updated_date).toLocaleDateString()}</p> */}
            {project.mediaDetails && (
              <div>
                <p>{project.mediaDetails.label}</p>
                <img src={`http://api_kigo.lndo.site/images/postImages/${project.mediaDetails.url_img}`} 
                  alt={project.mediaDetails.label} 
                  className="mt-4 max-w-full max-h-[200px] object-cover" 
                />
              </div>
            )}
            {/* <div>
              <h3 className="text-xl font-bold">Compétences recherchées: </h3>
              <ul>
                {project.competences.map(comp => (
                  <li key={comp.id}> - {comp.label}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold">Filières recherchées: </h3>
              <ul>
                {project.filieres.map(fil => (
                  <li key={fil.id}> - {fil.label}</li>
                ))}
              </ul>
            </div> */}
            <div>
              <h3 className="text-xl font-bold">Porteur du Projet:</h3>
              <ul>
                {project.users.map(user => (
                  <li key={user.id}> - {user.firstname} {user.lastname}</li>
                ))}
              </ul>
            </div>
            <Link to={`/EditProject/${project.id}`} className="text-blue-500 underline">
              Modifier le projet
            </Link>
          </div>
        ))}
      </div>

      {selectedProject && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-11/12 md:w-2/3 lg:w-1/2 relative">
            <button className="absolute top-4 right-4 text-gray-600 hover:text-gray-800" onClick={closeModal}>
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">{selectedProject.postDetails.title}</h2>
            <p className="mb-4">{selectedProject.postDetails.text}</p>
            <p className="text-sm text-gray-500">Posté le {new Date(selectedProject.postDetails.created_date).toLocaleDateString()}</p>
            {selectedProject.mediaDetails && (
              <img src={`http://api_kigo.lndo.site/images/postImages/${selectedProject.mediaDetails.url_img}`} 
                alt={selectedProject.mediaDetails.label} 
                className="w-full max-h-96 object-cover"
              />
            )}
            <div>
              <h3 className="text-xl font-bold">Compétences recherchées: </h3>
              <ul>
                {selectedProject.competences.map(comp => (
                  <li key={comp.id}> - {comp.label}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold">Filières recherchées: </h3>
              <ul>
                {selectedProject.filieres.map(fil => (
                  <li key={fil.id}> - {fil.label}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold">Porteur du Projet:</h3>
              <ul>
                {selectedProject.users.map(user => (
                  <li key={user.id}> - {user.firstname} {user.lastname}</li>
                ))}
              </ul>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" onClick={() => alert('Demande de participation envoyée !')}>
              Participer au projet
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsList;
