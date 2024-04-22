import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { selectUserData } from '../../../redux/user/userSelector';
import { fetchUser } from '../../../redux/user/userSlice';
import PageLoader from '../../../components/loader/PageLoader';
import { avatarUrl, imageUrl } from '../../../constants/apiConstant';
import { BsBehance, BsFillPencilFill, BsGithub, BsInstagram, BsLinkedin, BsMicrosoftTeams } from 'react-icons/bs';
import { FiBell, FiEdit, FiEdit2, FiHome, FiMessageSquare, FiSettings, FiUser } from 'react-icons/fi';
import { FaRegHandshake, FaSoundcloud } from 'react-icons/fa';

const Account = () => {

  // on recupere le hook
  const dispatch = useDispatch();

  // on utilise params
  const params = useParams();

  // recupere l'id depuis l'url
  const userId = params.id

  // on dispatche la requête, pour remplir les tates
  useEffect(() => {
    dispatch(fetchUser(userId));
  }, [])

  // on recupere les states
  const { loading, user } = useSelector(selectUserData);
  console.log('zzz', user)

  const imgPath = user?.avatar?.imagePath
    ? `${avatarUrl}/${user?.avatar?.imagePath}`
    : `${imageUrl}/user.png`;


  if (loading) return <PageLoader />

  //TODO: update the media table, GROUPS and Relations
  // Sample social links data structure
  const socialLinks = {
    teams: user.medias.teams,
    linkedin: user.linkedin,
    instagram: user.instagram,
    behance: user.behance,
    github: user.github,
    soundcloud: user.soundcloud,
  };

  // Icons mapping for social links
  const socialIcons = {
    teams: <BsMicrosoftTeams />,
    linkedin: <BsLinkedin />,
    instagram: <BsInstagram />,
    behance: <BsBehance />,
    github: <BsGithub />,
    soundcloud: <FaSoundcloud />,
  };

  return (
    <>
      <div className="flex flex-col items-center">

        <div className='flex flex-col items-center bg-orange w-full pb-4 '>

          {/* icon reglages et edit */}
          <div className="p-4 w-full flex justify-between items-center">
            <img src="../../../../documentation/svg/setting.svg" alt="setting" className="text-2xl" />
            <img src="../../../../documentation/svg/edit.svg" alt="edit" className="text-2xl" />
          </div>

          {/* image avatar */}
          <div className="relative w-36 h-36 flex flex-col items-center translate-y-[40%]  ">
            <img src={imgPath} alt="avatar user" className=' object-contain rounded-full' />
          </div>

        </div>

        {/* Nom prenom */}
        <div className='pt-[10%] '>
          <h1 className="text-2xl text-orange font-bold ">{user?.lastname ?? 'Pas de lastname'} {user?.firstname ?? 'Pas de firstname'} </h1>
        </div>

        {/* disponible CCV2 */}
        <div className="flex space-x-2 my-2">
          <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-sm">
            profession:{user.profession}
          </span>
          <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-sm">
            Disponible
          </span>
          <span className="border border-gray-300 text-gray-800 px-2 py-1 rounded-full text-sm flex items-center">
            <FaRegHandshake className="mr-1" /> CCV 2
          </span>
        </div>

        {/* bio */}
        <div className='flex justify-center items-center'>
          <p className="border-2 border-orange text-orange px-2 py-3 rounded-xl shadow max-w-xs text-center text-sm">{user?.profil?.biography}</p>
        </div>

        {/* TODO:second bio, likely a hint about the user */}
        <div className='flex justify-center items-center'>
          <p className=" border-orange border-b-1 text-orange px-2 text-xs pt-3">Je rêve de découvrir le monde en mode backpack{user?.medias?.url_img}</p>
        </div>

        {/* social links */}
        <div className="flex flex-row my-4 border-2 border-orange bg-gradient-to-b from-white to-white_2 px-2 py-2 rounded-xl shadow">
          <div>
            <p className="text-lg text-orange font-sans py-1">Réseaux :</p>
            <div className="flex flex-row space-x-4 items-center">
              {Object.keys(socialLinks).map(key => (
                <a key={key} href={socialLinks[key]} className="icon-large text-orange rounded-xl">
                  {socialIcons[key]}
                </a>
              ))}
            </div>
          </div>
        </div>


        {/* Réalisations */}
        <div className="flex flex-col items-center">
          <h1 className='text-left text-lg text-orange font-sans py-1'>Mes réalisations :</h1>

          {/* TODO: list of réalisations */}
        </div>

      </div>
    </>
  )
}

export default Account