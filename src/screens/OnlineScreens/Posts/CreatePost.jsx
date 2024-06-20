import React, { useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../../../constants/apiConstant';
import CustomInput from '../../../components/CustomInput';
import ButtonLoader from '../../../components/loader/ButtonLoader';

const CreatePost = () => {
  const { userId } = useAuthContext();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [type, setType] = useState('1'); // Default to "project"
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const currentDate = new Date().toISOString();

    const postData = {
      title,
      text,
      type: parseInt(type, 10),
      user: `/api/users/${userId}`,
      created_date: currentDate.split('T')[0], // Only the date part
      updated_date: currentDate,
    };

    try {
      await axios.post(`${apiUrl}/posts`, postData, {
        headers: {
          'Content-Type': 'application/ld+json',
        },
      });
      navigate('/post');
    } catch (error) {
      console.error('Error creating post:', error);
      setError('Erreur lors de la création du post');
    } finally {
      setIsLoading(false);
    }
  };

  console.log({ title, text, userId, type });
  return (
    <div className='flex flex-1 flex-col h-screen justify-start items-center bg-white'>
      <h2 className='text-black font-bold text-xl py-5'>Créer un post</h2>
      <div className='text-red-600 font-bold mb-4'>{error}</div>
      <form onSubmit={handleSubmit} className='max-w-md mx-auto'>
        <CustomInput state={title} label="Titre" type="text" callable={(event) => setTitle(event.target.value)} />
        <CustomInput state={text} label="Texte" type="text" callable={(event) => setText(event.target.value)} />
        <div className="mb-4">
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='type'>
            Type de post
          </label>
          <select
            id='type'
            value={type}
            onChange={(event) => setType(event.target.value)}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          >
            <option value="1">Project</option>
            <option value="2">Participation</option>
            <option value="3">Inspiration</option>
            <option value="4">Personal Realization</option>
          </select>
        </div>
        <input type="hidden" name="created_date" value={new Date().toISOString().split('T')[0]} />
        <input type="hidden" name="updated_date" value={new Date().toISOString()} />
        <input type="hidden" name="user_id" value={userId} /> {/* Champ caché pour user_id */}
        <div className='flex items-center justify-center pt-5'>
          {isLoading ? <ButtonLoader /> :
            <button type='submit' className='bg-orange hover:bg-orange_top text-white font-bold py-2 px-4 rounded'>
              Créer
            </button>}
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
