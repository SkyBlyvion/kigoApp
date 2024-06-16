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

          return {
            ...project,
            competences: competencesDetails,
            filieres: filieresDetails,
            users: usersDetails,
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
    <div className='flex flex-col items-center h-screen overflow-y-auto p-4 pb-20'>
        <div className="p-4 w-full flex justify-between items-center">
          <Link to="/CreatePost"> {/*TODO:remplacer ici par createpost*/}
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
            <h2 className='text-xl font-bold'>{project?.post?.title}Titre:</h2>
            <p>{project?.post?.text}Text:</p>
            <p>{project?.post?.created_date}C_at:</p>
            <p>{project?.post?.updated_date}Upd_at:</p>
            <p>{project?.post?.type}typedeprojet:</p>
            {project?.post?.media && (
              <div>
                <p>{project?.post?.media?.label}</p>
                <img src={`http://api_kigo.lndo.site/images/postImages/${project?.post?.media?.url_img}`} alt={project?.post?.media?.label} className="mt-4 img-post" />
              </div>
            )}
            <br />
            <div>
              <h3 className='text-xl font-bold'>Compétences:</h3>
              <ul>
                {project?.competences.map(comp => (
                  <li key={comp.id}> - {comp.label}</li>
                ))}
              </ul>
              <br />
            </div>
            <div>
              <h3 className='text-xl font-bold'>Filières:</h3>
              <ul>
                {project?.filieres.map(fil => (
                  <li key={fil.id}> - {fil.label}</li>
                ))}
              </ul>
              <br />
            </div>
            <div>
              <h3 className='text-xl font-bold'>Porteur:</h3>
              <ul>
                {project?.users.map(user => (
                  <li key={user.id}>{user.firstname} {user.lastname}</li>
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
