import React from 'react'
import './Sidebar.css'
import { asset } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
      <div className="sidebar">
       <div className="sidebar-options">
        <NavLink to='/add' className="sidebar-option">
         <img src={asset.add_icon_white}alt=''/>
         <p>Add Product</p>
        </NavLink>
        <NavLink to='/list' className="sidebar-option">
         <img src={asset.bag_icon}alt=''/>
         <p>List items</p>
        </NavLink>
        <NavLink to='/orders' className="sidebar-option">
         <img src={asset.bag_icon}alt=''/>
         <p>Orders</p>
        </NavLink>
       </div>
      </div>
  )
}

export default Sidebar
