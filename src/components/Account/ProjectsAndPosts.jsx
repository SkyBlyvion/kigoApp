// src/components/Account/ProjectsAndPosts.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ProjectsAndPosts = ({ projects, posts }) => {
  const TYPE_PARTICIPATION = 2;
  const TYPE_INSPIRATION = 3;
  const TYPE_REALIZATION = 4;

  return (
    <div className="flex flex-col items-center mb-20">
      <p className='text-left text-lg text-orange font-sans py-1'>Mes projets portés:</p>
      <div className="flex flex-row space-x-4 w-5/6">
        {projects.map(project => (
          <div key={project.id} className="border-2 border-orange p-2 rounded-xl shadow">
            <Link to={`/project/${project.id}`} className="text-orange">{project.postDetails.title} {project.postDetails.text} {project.postDetails.type}</Link>
          </div>
        ))}
      </div>
      <p className='text-left text-lg text-orange font-sans py-1'>Mes Posts de participation:</p>
      <div className="flex flex-row space-x-4 w-5/6">
        {posts.filter(post => post.type === TYPE_PARTICIPATION).map(post => (
          <div key={post.id} className="border-2 border-green p-2 rounded-xl shadow">
            <Link to={`/post/${post.id}`} className="text-green">{post.title}{post.text}</Link>
          </div>
        ))}
      </div>
      <p className='text-left text-lg text-orange font-sans py-1'>Mes Posts d'inspirations:</p>
      <div className="flex flex-row space-x-4 w-5/6">
        {posts.filter(post => post.type === TYPE_INSPIRATION).map(post => (
          <div key={post.id} className="border-2 border-green p-2 rounded-xl shadow">
            <Link to={`/post/${post.id}`} className="text-green">{post.title}{post.text}</Link>
          </div>
        ))}
      </div>
      <h1 className='text-left text-lg text-orange font-sans py-1'>Mes Posts de réalisations:</h1>
      <div className="flex flex-row space-x-4 w-5/6">
        {posts.filter(post => post.type === TYPE_REALIZATION).map(post => (
          <div key={post.id} className="border-2 border-green p-2 rounded-xl shadow">
            <Link to={`/post/${post.id}`} className="text-green">{post.title}{post.text}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsAndPosts;
