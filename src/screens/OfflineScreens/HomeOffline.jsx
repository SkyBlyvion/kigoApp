import React from 'react'
import { Outlet } from 'react-router-dom'
import { imageUrl } from '../../constants/apiConstant'

const HomeOffline = () => {
  return (
    <>
      <div className='w-screen bg-black'>
        <img src={`${imageUrl}/logo.png`} alt="Logo Spotify" className='w-full h-28 object-contain pt-4' />
      </div>
      <Outlet />
    </>
  )
}

export default HomeOffline