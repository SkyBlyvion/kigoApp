// src/components/Account/BiographyEditor.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiUrl } from '../../constants/apiConstant';

const BiographyEditor = ({ userId, initialBiography }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [biography, setBiography] = useState(initialBiography);

  useEffect(() => {
    setBiography(initialBiography);
  }, [initialBiography]);

  const handleBiographyClick = () => {
    setIsEditing(true);
  };

  const handleBiographyChange = (event) => {
    setBiography(event.target.value);
  };

  const handleSaveBiography = async () => {
    try {
      await axios.patch(
        `${apiUrl}/users/${userId}`,
        { biographie: biography },
        {
          headers: {
            'Content-Type': 'application/merge-patch+json',
          }
        }
      );
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating biography:', error);
    }
  };

  return (
    <div className='flex justify-center items-center'>
      {isEditing ? (
        <textarea
          value={biography}
          onChange={handleBiographyChange}
          onBlur={handleSaveBiography}
          className="border-2 border-orange text-orange px-2 py-3 rounded-xl shadow max-w-xs text-center text-sm"
        />
      ) : (
        <p
          onClick={handleBiographyClick}
          className="border-2 border-orange text-orange px-2 py-3 rounded-xl shadow max-w-xs text-center text-sm"
        >
          {biography || 'Ajouter une biographie'}
        </p>
      )}
    </div>
  );
};

export default BiographyEditor;
