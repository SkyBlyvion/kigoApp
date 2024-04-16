import React from 'react'
import { useRouteError } from 'react-router-dom'
import { MdDangerous } from 'react-icons/md'
import { Link } from 'react-router-dom'

const ErrorPage = () => {

  const error = useRouteError

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-black text-white'>
      <MdDangerous className='text-9xl text-red-600' />
      <h1>Oops!</h1>
      <p>Une erreur s'est produite</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Link to='/' className='text-green_06 hover:text-green'>Revenir en lieu sûr</Link>
    </div>
  )
}

export default ErrorPage