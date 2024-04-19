import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
    <div>Dashboard</div>
    <br/>
   
    <ul>
      <li><Link to='/'>Profil</Link></li>
      <li><Link to='/'>Liste Projets</Link></li>
      <li><Link to='/'>Mes Projets</Link></li>
      <li><Link to='/'>Detail projet</Link></li>
      
    </ul>
    
    </>
  )
}

export default Home