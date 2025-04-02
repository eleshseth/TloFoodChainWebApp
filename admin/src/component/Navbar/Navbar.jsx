import React from 'react'
import './Navbar.css'
import { asset } from '../../assets/assets'



const Navbar = () => {
  return (
    <div>
      <div className="navbar">
      <img className="logo" src={asset.logoCopy} alt="" />
      <img className="profile" src={asset.logo} alt="" />
      </div>
    </div>
  )
}

export default Navbar
