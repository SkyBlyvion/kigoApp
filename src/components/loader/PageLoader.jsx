import React from 'react'
import { InfinitySpin } from 'react-loader-spinner'

const PageLoader = () => {
  return (
    <div className='flex flex-col items-center justify-center h-[70vh]'>
        <InfinitySpin
            visible={true}
            width="200"
            color="#4fa94d"
            ariaLabel="infinity-spin-loading"
        />
    </div>
  )
}

export default PageLoader