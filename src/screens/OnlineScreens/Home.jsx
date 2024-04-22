import React from 'react'
import { Link } from 'react-router-dom'
import { USER_INFOS } from '../../constants/appConstant'

const Home = () => {
  const id = JSON.parse(localStorage.getItem(USER_INFOS)).userId
  return (
    <>
    <div>Dashboard</div>
    <br/>
   
    <ul>
      <li><Link to={`/account/${id}`}>Profil</Link></li>
      <li><Link to='/project'>Liste Projets</Link></li>
      <li><Link to='/post'>Liste Posts</Link></li>
    </ul>
    
    </>
  )
}

export default Home