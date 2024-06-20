// src/components/Account/DreamEditor.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiUrl } from '../../constants/apiConstant';

const DreamEditor = ({ userId, initialDream }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [dream, setDream] = useState(initialDream);

  useEffect(() => {
    setDream(initialDream);
  }, [initialDream]);

  const handleDreamClick = () => {
    setIsEditing(true);
  };

  const handleDreamChange = (event) => {
    setDream(event.target.value);
  };

  const handleSaveDream = async () => {
    try {
      await axios.patch(
        `${apiUrl}/users/${userId}`,
        { reve: dream },
        {
          headers: {
            'Content-Type': 'application/merge-patch+json',
          }
        }
      );
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating dream:', error);
    }
  };

  return (
    <div className='flex justify-center items-center'>
      {isEditing ? (
        <textarea
          value={dream}
          onChange={handleDreamChange}
          onBlur={handleSaveDream}
          className="border-2 border-orange text-orange px-2 py-3 rounded-xl shadow max-w-xs text-center text-sm"
        />
      ) : (
        <p
          onClick={handleDreamClick}
          className="border-orange border-b-1 text-orange px-2 text-xs pt-3"
        >
          {dream || 'Ajouter un rêve'}
        </p>
      )}
    </div>
  );
};

export default DreamEditor;
