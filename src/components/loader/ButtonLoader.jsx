import React from 'react'
import { InfinitySpin } from 'react-loader-spinner'

const ButtonLoader = () => {
  return (
    <InfinitySpin
        visible={true}
        width="200"
        color="#4fa94d"
        ariaLabel="infinity-spin-loading"
    />
  )
}

export default ButtonLoader