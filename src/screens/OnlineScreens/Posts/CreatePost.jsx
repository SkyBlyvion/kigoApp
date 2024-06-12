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
  const [media, setMedia] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleMediaChange = (event) => {
    setMedia(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append('user', `/api/users/${userId}`);
    formData.append('title', title);
    formData.append('text', text);
    if (media) {
      formData.append('media', media);
    }

    try {
      await axios.post(`${apiUrl}/posts`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',


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

  return (
    <div className='flex flex-1 flex-col h-screen justify-start items-center bg-white'>
      <h2 className='text-black font-bold text-xl py-5'>Créer un post</h2>
      <div className='text-red-600 font-bold mb-4'>{error}</div>
      <form onSubmit={handleSubmit} className='max-w-md mx-auto'>
        <CustomInput state={title} label="Titre" type="text" callable={(event) => setTitle(event.target.value)} />
        <CustomInput state={text} label="Texte" type="text" callable={(event) => setText(event.target.value)} />
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='media'>
            Media
          </label>
          <input
            id='media'
            type='file'
            accept='image/*'
            onChange={handleMediaChange}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          />
        </div>
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
