import React from 'react';

const FiliereSelect = ({ filiere, filieres, setFiliere }) => {
  return (
    <div className='mb-4'>
      <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='filiere'>
        Votre Filière
      </label>
      <select
        id='filiere'
        value={filiere}
        onChange={(event) => setFiliere(event.target.value)}
        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
      >
        <option value='' disabled>Choisissez votre filière</option>
        {Array.isArray(filieres) && filieres.map((filiere) => (
          <option key={filiere.id} value={filiere.id}>{filiere.label}</option>
        ))}
      </select>
    </div>
  );
};

export default FiliereSelect;
