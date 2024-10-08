import React from 'react'
import logo from "../assets/images/icons8-logo.svg"

const Navbar = () => {

  return (
    <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow sticky top-0 z-10'>
        <img src={logo} alt="travel story" className='h-9' />
    </div>
  )
}

export default Navbar