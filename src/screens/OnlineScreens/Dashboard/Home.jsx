import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { USER_INFOS } from '../../../constants/appConstant'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserData } from '../../../redux/user/userSelector'
import { fetchUser } from '../../../redux/user/userSlice'
import PageLoader from '../../../components/loader/PageLoader'

const Home = () => {

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

  
  if (loading) return <PageLoader />
  
  return (
    <>
      <div>Dashboard</div><br/>
      <p>Dans ce dashboard, recommandations de projets en fonction de la compatibilité avec leurs compétences</p><br/>
      <p>Les demandes de participation à un projet ne seront visibles que par le porteur, et apparaîtront sur la page du projet, et sur le tableau de bord du porteur. Ce dernier pourra accepter ou refuser les candidatures.</p>
      <p>Nouveau Projets Bouton</p>
      <p>Ajout de Projet</p>
      <p>Acces profil</p>
      <p></p>
    
    </>
  )
}

export default Home