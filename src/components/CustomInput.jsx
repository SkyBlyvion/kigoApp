import React from 'react'

const CustomInput = ({state, label, type, callable}) => {
  return (
    <div className='mb-3'>
        <label htmlFor={state} className='block text-white font-bold mb-2' >{label}</label>
        <input className='shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline' type={type} value={state} onChange={callable}/>
    </div>
  )
}

export default CustomInput