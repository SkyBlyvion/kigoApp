import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { USER_INFOS } from '../../../constants/appConstant'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserData } from '../../../redux/user/userSelector'
import { fetchUser } from '../../../redux/user/userSlice'
import PageLoader from '../../../components/loader/PageLoader'
import { MdOutlineAddCircle } from 'react-icons/md'

const Home = () => {

  const dispatch = useDispatch();
  const id = JSON.parse(localStorage.getItem(USER_INFOS)).userId;

  // Fetch user data on component mount
  useEffect(() => {
    dispatch(fetchUser(id));
  }, [dispatch, id]);

  // on recupere les states
  const { loading, user } = useSelector(selectUserData);
  
  // console.log('zzz', user)

  
  if (loading) return <PageLoader />
  
  return (
    <>
      <div className='flex flex-col items-center container mb-20'>

        <div className='text-3xl'>Dashboard</div><br/>
        <p className='text-orange'>Bonjour {user?.lastname} {user?.firstname} </p>
        <br/>
        <p className='text-center px-4'>Dans ce dashboard, recommandations de projets en fonction de la compatibilité avec leurs compétences</p><br/>
        <p className='text-center px-4'>Les demandes de participation à un projet ne seront visibles que par le porteur, et apparaîtront sur la page du projet, 
          et sur le tableau de bord du porteur. Ce dernier pourra accepter ou refuser les candidatures.</p>
        <br/>
        <p>Les projets recommandées </p><br/>
        
        <Link to='/project' className='bg-orange text-white font-bold py-2 px-4 rounded'>Liste des projets </Link><br/><br/>
        <Link to='/projectlist' className='bg-orange text-white font-bold py-2 px-4 rounded'>Ajout de Projet / Porter</Link><br/><br/>
        <Link to='/projectsuggestion' className='bg-orange text-white font-bold py-2 px-4 rounded'>Suggestion de projet</Link><br/><br/>
        <Link to='/postlist' className='bg-green text-white font-bold py-2 px-4 rounded'>Liste des posts BTN</Link><br/><br/>
        <Link to='/post' className='bg-green text-white font-bold py-2 px-4 rounded'>Ajout de Post BTN</Link><br/><br/>
        <Link to={`/account/${id}`} className='bg-orange text-white font-bold py-2 px-4 rounded'>Mon profil BTN</Link><br/><br/>
        <Link to="/project">
              <MdOutlineAddCircle
                className="w-14 h-14 "
                style={{ color: "white" }}
              />
            </Link>

      
        
        
      </div>
    </>
  )
}

export default Home