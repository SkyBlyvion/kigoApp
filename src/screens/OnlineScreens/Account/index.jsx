import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { selectUserData } from '../../../redux/user/userSelector';
import { fetchUser } from '../../../redux/user/userSlice';
import PageLoader from '../../../components/loader/PageLoader';
import { avatarUrl, imageUrl } from '../../../constants/apiConstant';
import { BsBehance, BsFillPencilFill, BsGithub, BsInstagram, BsLinkedin } from 'react-icons/bs';
import { FiBell, FiHome, FiMessageSquare, FiSettings, FiUser } from 'react-icons/fi';
import { FaRegHandshake } from 'react-icons/fa';

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
    const {loading, user} = useSelector(selectUserData);
    // console.log('zzz', user)

    const imgPath = user?.avatar?.imagePath 
        ? `${avatarUrl}/${user?.avatar?.imagePath}` 
        : `${imageUrl}/user.png`;


    if(loading) return <PageLoader />

    // Sample social links data structure
    const socialLinks = {
        github: user.github,
        linkedin: user.linkedin,
        instagram: user.instagram,
        behance: user.behance,
    };

    // Icons mapping for social links
    const socialIcons = {
        github: <BsGithub />,
        linkedin: <BsLinkedin />,
        instagram: <BsInstagram />,
        behance: <BsBehance />,
    };

  return (

    // <div className='flex flex-col items-center justify-center mt-20'>
    //     <div className='flex flex-col items-center justify-center'>
    //         <div className='relative w-40 h-40 flex flex-col '>
    //             <img src={imgPath} alt="avatar user" className='w-40 h-40 object-contain rounded-full'/>
    //             <Link to={`/edit-avatar`} className='absolute bottom-0 right-0 border rounded-full p-2 cursor-pointer hover:bg-green_top'>
    //                 <BsFillPencilFill size={20} />
    //             </Link>
    //         </div>
    //     </div>
    //     <div className='relative w-80 h-auto border rounded-lg flex flex-col items-center my-5 pb-10'>
    //         <p className='text-xl font-bold mt-5'>Pseudo: {user?.firstname ?? 'Pas de pseudo'}</p>
    //         <p className='text-xl font-bold mt-5'>Email: {user?.email ?? 'Pas d\'email'}</p>
    //         <p className='text-xl font-bold mt-5'>Password: ***************</p>
    //         <Link to="/edit-info" className='absolute bottom-3 right-2 border rounded-full p-2 cursor-pointer hover:bg-green_top'>
    //             <BsFillPencilFill size={20} />
    //         </Link>

    //     </div>
    // </div>
    <div className="flex flex-col items-center bg-white">
      <div className="p-4 w-full bg-orange-400 text-white flex justify-between items-center">
        <FiSettings className="text-2xl" />
        <FiBell className="text-2xl" />
      </div>
      <div className="-mt-16 mb-4">
        {/* <img
          className="w-32 h-32 object-cover rounded-full border-4 border-white"
          src={user.avatarUrl}
          alt="User Avatar"
        /> */}
        <img src={imgPath} alt="avatar user" className='w-40 h-40 object-contain rounded-full'/>

      </div>
      <h1 className="text-2xl font-bold">{user.firstname} {user.lastname}</h1>
      <div className="flex space-x-2 my-2">
        <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-sm">
          {user.profession}
        </span>
        <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-sm">
          Disponible
        </span>
        <span className="border border-gray-300 text-gray-800 px-2 py-1 rounded-full text-sm flex items-center">
          <FaRegHandshake className="mr-1" /> CV 2
        </span>
      </div>
      <p className="text-center text-gray-600">{user.bio}</p>
      <div className="flex space-x-4 my-4">
        {Object.keys(socialLinks).map(key => (
          <a href={socialLinks[key]} className="text-orange-500 text-xl">
            {socialIcons[key]}
          </a>
        ))}
      </div>
      {/* ... Rest of the profile details like user's work samples ... */}
      <div className="w-full px-4 py-2 my-2">
        {/* User's work samples and other sections */}
      </div>
      <nav className="fixed inset-x-1 bottom-0 inset- bg-gray-800 text-white">
        <div className="flex justify-around p-4">
          <FiHome className="text-2xl" />
          <FiMessageSquare className="text-2xl" />
          <FiUser className="text-2xl" />
        </div>
      </nav>
    </div>
  )
}

export default Account