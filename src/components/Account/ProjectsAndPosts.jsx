import React from 'react';
import { Link } from 'react-router-dom';

const ProjectsAndPosts = ({ projects, posts }) => {
  const TYPE_PARTICIPATION = 2;
  const TYPE_INSPIRATION = 3;
  const TYPE_REALIZATION = 4;

  // Limiter à 2 posts par catégorie
  const limitedPostsByType = (type) => posts.filter(post => post.type === type).slice(0, 2);

  console.log(posts)
  return (
    <div className="flex flex-col items-center mb-20 space-y-4">
      <p className='text-left text-lg text-orange font-sans py-1'>Mes projets portés:</p>
      <div className="flex flex-col space-y-4 w-full px-4">
        {projects.slice(0, 2).map(project => (
          <div key={project.id} className="border-2 border-orange p-2 rounded-xl shadow w-full max-w-xs mx-auto">
            <Link to={`/project/${project.id}`} className="text-orange block">
              <h2 className="font-bold">{project.postDetails.title}</h2>
              <p>{project.postDetails.text}</p>
              <p>Type: {project.postDetails.type}</p>
            </Link>
          </div>
        ))}
      </div>

      <p className='text-left text-lg text-orange font-sans py-1'>Mes Posts de participation:</p>
      <div className="flex flex-col space-y-4 w-full px-4">
        {limitedPostsByType(TYPE_PARTICIPATION).map(post => (
          <div key={post.id} className="border-2 border-green p-2 rounded-xl shadow w-full max-w-xs mx-auto">
            <Link to={`/post/${post.id}`} className="text-green block">
              <h2 className="font-bold">{post.title}</h2>
              <p>{post.text}</p>
            </Link>
          </div>
        ))}
      </div>

      <p className='text-left text-lg text-orange font-sans py-1'>Mes Posts d'inspirations:</p>
      <div className="flex flex-col space-y-4 w-full px-4">
        {limitedPostsByType(TYPE_INSPIRATION).map(post => (
          <div key={post.id} className="border-2 border-green p-2 rounded-xl shadow w-full max-w-xs mx-auto">
            <Link to={`/post/${post.id}`} className="text-green block">
              <h2 className="font-bold">{post.title}</h2>
              <p>{post.text}</p>
            </Link>
          </div>
        ))}
      </div>

      <h1 className='text-left text-lg text-orange font-sans py-1'>Mes Posts de réalisations:</h1>
      <div className="flex flex-col space-y-4 w-full px-4">
        {limitedPostsByType(TYPE_REALIZATION).map(post => (
          <div key={post.id} className="border-2 border-green p-2 rounded-xl shadow w-full max-w-xs mx-auto">
            <Link to={`/post/${post.id}`} className="text-green block">
              <h2 className="font-bold">{post.title}</h2>
              <p>{post.text}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsAndPosts;
