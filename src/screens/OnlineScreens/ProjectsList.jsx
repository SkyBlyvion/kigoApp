import React from 'react'

const ProjectsList = () => {
  return (
    <>
      <div className='flex flex-col items-center text-center px-5'>

        {/* TODO: filtre menu deroulant */}
        <img src="../../../../documentation/svg/Filter.svg" alt="filter" />

        <div>Projects List</div><br/>
        <p>Un porteur de projet peut créer un projet dans l’application pour y 
          spécifier les besoin en compétences pour le réaliser, 
          ainsi que le filières professionnelles nécessaires. 
          Le projet est associée à la création à un post et une ou plusieurs photos 
          accompagné d’un texte descriptif .</p><br/>
        <p>Un utilisateur peut explorer les projets proposés par le porteur et 
          demander a y participer selon les compétences demandées</p><br/>
        <p></p>
        {/* Afficher les projets */}
        
      </div>
    </>
  )
}

export default ProjectsList