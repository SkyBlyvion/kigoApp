import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiUrl } from '../../../constants/apiConstant';
import PageLoader from '../../../components/loader/PageLoader';

const ProjectsList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${apiUrl}/projects`);
        setProjects(response.data['hydra:member']);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <PageLoader />;

  return (
    <div className='flex flex-col items-center text-center px-5'>
      {/* TODO: filtre menu deroulant */}
      <img src="../../../../documentation/svg/Filter.svg" alt="filter" />

      <div>Projects List</div><br/>
      <p>Un porteur de projet peut créer un projet dans l’application pour y 
        spécifier les besoin en compétences pour le réaliser, 
        ainsi que le filières professionnelles nécessaires. 
        Le projet est associé à la création à un post et une ou plusieurs photos 
        accompagné d’un texte descriptif .</p><br/>
      <p>Un utilisateur peut explorer les projets proposés par le porteur et 
        demander a y participer selon les compétences demandées</p><br/>
      <p></p>
      {/* Afficher les projets */}
      <div className='w-full'>
        {projects.map(project => (
          <div key={project.id} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
            <h2 className='text-xl font-bold'>{project?.post?.title}</h2>
            <p>{project?.post?.text}</p>
            <p>{project?.post?.created_date}</p>
            <p>{project?.post?.updated_date}</p>
            <p>{project?.post?.type}</p>
            {project?.post?.media && (
              <div>
                <p>{project?.post?.media?.label}</p>
                <img src={`http://api_kigo.lndo.site/images/postImages/${project?.post?.media?.url_img}`} alt={project?.post?.media?.label} className="mt-4 img-post" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsList;
