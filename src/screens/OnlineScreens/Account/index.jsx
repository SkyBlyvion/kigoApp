import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { selectUserData } from '../../../redux/user/userSelector';
import { fetchUser } from '../../../redux/user/userSlice';
import PageLoader from '../../../components/loader/PageLoader';
import { avatarUrl, imageUrl } from '../../../constants/apiConstant';
import { BsFillPencilFill } from 'react-icons/bs';

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
    console.log('zzz', user)

    const imgPath = user?.avatar?.imagePath 
        ? `${avatarUrl}/${user?.avatar?.imagePath}` 
        : `${imageUrl}/user.png`;


    if(loading) return <PageLoader />

  return (

    <div className='flex flex-col items-center justify-center mt-20'>
        <h1 className='text-4xl font-bold mb-5'>Mon Compte</h1>
        <div className='flex flex-col items-center justify-center'>
            <div className='relative w-40 h-40 flex flex-col '>
                <img src={imgPath} alt="avatar user" className='w-40 h-40 object-contain rounded-full'/>
                <Link to={`/edit-avatar`} className='absolute bottom-0 right-0 border rounded-full p-2 cursor-pointer hover:bg-green_top'>
                    <BsFillPencilFill size={20} />
                </Link>
            </div>
        </div>
        <div className='relative w-80 h-auto border rounded-lg flex flex-col items-center my-5 pb-10'>
            <p className='text-xl font-bold mt-5'>Pseudo: {user?.firstname ?? 'Pas de pseudo'}</p>
            <p className='text-xl font-bold mt-5'>Email: {user?.email ?? 'Pas d\'email'}</p>
            <p className='text-xl font-bold mt-5'>Password: ***************</p>
            <Link to="/edit-info" className='absolute bottom-3 right-2 border rounded-full p-2 cursor-pointer hover:bg-green_top'>
                <BsFillPencilFill size={20} />
            </Link>

        </div>
    </div>
  )
}

export default Account