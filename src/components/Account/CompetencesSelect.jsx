import React from 'react';

const CompetencesSelect = ({ competences, allCompetences, handleCompetenceChange }) => {
  return (
    <div className='mb-4'>
      <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='competences'>
        Vos Compétences
      </label>
      <select
        id='competences'
        multiple
        value={competences}
        onChange={handleCompetenceChange}
        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
      >
        {Array.isArray(allCompetences) && allCompetences.map((competence) => (
          <option key={competence.id} value={competence.id}>{competence.label}</option>
        ))}
      </select>
    </div>
  );
};

export default CompetencesSelect;
