import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { selectUserData } from '../../../redux/user/userSelector';
import { fetchUser } from '../../../redux/user/userSlice';
import PageLoader from '../../../components/loader/PageLoader';
import { apiUrl, avatarUrl, imageUrl } from '../../../constants/apiConstant';
import { BsBehance, BsFillPencilFill, BsGithub, BsInstagram, BsLinkedin, BsMicrosoftTeams } from 'react-icons/bs';
import { FiBell, FiEdit, FiEdit2, FiHome, FiMessageSquare, FiSettings, FiUser } from 'react-icons/fi';
import { FaRegHandshake, FaSoundcloud } from 'react-icons/fa';
import axios from 'axios';

const Account = () => {
  // on recupere le hook
  const dispatch = useDispatch();
  // on utilise params
  const params = useParams();
  // recupere l'id depuis l'url
  const userId = params.id;
  // on recupere les states
  const { loading, user } = useSelector(selectUserData);

  const [isEditing, setIsEditing] = useState(false);
  const [biography, setBiography] = useState('');
  // Ajouter les états pour "Rêve"
  const [isEditingReve, setIsEditingReve] = useState(false);
  const [reve, setReve] = useState('');

  // on dispatche la requête, pour remplir les states
  useEffect(() => {
    dispatch(fetchUser(userId));
  }, [userId, dispatch]);

  useEffect(() => {
    if (user) {
      setBiography(user.biographie ?? '');
      setReve(user.reve ?? '');
    }
  }, [user]);

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

  // Ajouter les fonctions pour "Rêve"
  const handleReveClick = () => {
    setIsEditingReve(true);
  };

  const handleReveChange = (event) => {
    setReve(event.target.value);
  };

  const handleSaveReve = async () => {
    try {
      await axios.patch(
        `${apiUrl}/users/${userId}`,
        { reve: reve },
        {
          headers: {
            'Content-Type': 'application/merge-patch+json',
          }
        }
      );
      setIsEditingReve(false);
    } catch (error) {
      console.error('Error updating reve:', error);
    }
  };

  const imgPath = user?.avatar?.imagePath
    ? `${avatarUrl}/${user?.avatar?.imagePath}`
    : `${imageUrl}/user.png`;

  // Sample social links data structure
  const socialLinks = user?.contacts?.map(contact => ({
    type: contact.type.label,
    value: contact.value,
  })) ?? [];

  // Icons mapping for social links
  const socialIcons = {
    teams: <BsMicrosoftTeams />,
    linkedin: <BsLinkedin />,
    instagram: <BsInstagram />,
    behance: <BsBehance />,
    github: <BsGithub />,
    soundcloud: <FaSoundcloud />,
  };

  console.log('bababaprofi', user);
  if (loading) return <PageLoader />

  return (
    <>
      <div className="flex flex-col items-center">

        <div className='flex flex-col items-center bg-orange w-full pb-4 '>

          {/* icon reglages et edit */}
          <div className="p-4 w-full flex justify-between items-center">
            <Link to="/settings">
              <img src="../../../../documentation/svg/setting.svg" alt="setting" className="text-2xl" />
            </Link>
            <Link to="/edit-info">
              <img src="../../../../documentation/svg/edit.svg" alt="edit" className="text-2xl" />
            </Link>
          </div>

          {/* image avatar */}
          {/* TODO:EDIT Avatar ( list avatar) */}
          <div className="relative w-36 h-36 flex flex-col items-center translate-y-[40%]">
            <img src={imgPath} alt="avatar user" className='object-contain rounded-full' />
          </div>

        </div>

        {/* Nom prenom */}
        <div className='pt-[10%]'>
          <h1 className="text-2xl text-orange font-bold">
            {user?.lastname ?? 'Pas de lastname'} {user?.firstname ?? 'Pas de firstname'}
          </h1>
        </div>

        {/* disponible */}
        <div className="flex space-x-2 my-2 items-center">
          <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-sm">
            profession: {user?.filiere?.label ?? 'Aucune filière'}
          </span>
          <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-sm flex items-center">
            <img src="../../../../documentation/logos/icons8-green-dot-48.png" alt="green dot" className="h-4 w-4 mr-1" />
            Disponible
          </span>
        </div>

        {/* bio */}
        <div className="flex flex-col items-center">
          {/* Biographie section */}
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
        </div>

        <div className='flex justify-center items-center'>
          {isEditingReve ? (
            <textarea
              value={reve}
              onChange={handleReveChange}
              onBlur={handleSaveReve}
              className="border-2 border-orange text-orange px-2 py-3 rounded-xl shadow max-w-xs text-center text-sm"
            />
          ) : (
            <p
              onClick={handleReveClick}
              className="border-orange border-b-1 text-orange px-2 text-xs pt-3"
            >
              {reve || 'Ajouter un rêve'}
            </p>
          )}
        </div>

        {/* social links */}
        <div className="flex flex-row my-4 border-2 border-orange bg-gradient-to-b from-white to-white_2 px-2 py-2 rounded-xl shadow">
          <div>
            <p className="text-lg text-orange font-sans py-1">Réseaux :</p>
            <div className="flex flex-row space-x-4 items-center">
              {socialLinks.map(link => (
                link.value && (
                  <a key={link.type} href={link.value} className="icon-large text-orange rounded-xl">
                    {socialIcons[link.type.toLowerCase()] ?? <FiUser />}
                  </a>
                )
              ))}
            </div>
          </div>
        </div>

        {/* Liste de post */}
        <div className="flex flex-col items-center">
          <p className='text-left text-lg text-orange font-sans py-1'>Mes projets portés:</p>
          <p className='text-left text-lg text-orange font-sans py-1'>Ma participation:</p>
          <p className='text-left text-lg text-orange font-sans py-1'>Mes inspirations:</p>
          <h1 className='text-left text-lg text-orange font-sans py-1'>Mes réalisations:</h1>
          {/* TODO: list of réalisations */}
        </div>

      </div>
    </>
  );
}

export default Account;
