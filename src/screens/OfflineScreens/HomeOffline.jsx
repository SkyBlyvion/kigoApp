import React from 'react'
import { Outlet } from 'react-router-dom'

const HomeOffline = () => {
  return (
    <>
      <h1>Home Offline</h1>
      <Outlet />
    </>
  )
}

export default HomeOffline