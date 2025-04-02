import React, { useState, useContext } from 'react';
import { data, Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import LoginPopup from '../LoginPopup/LoginPopup';

const Navbar = ({ setShowLogin, showLogin }) => {
  const [menu, setMenu] = useState('home');
  const { getTotalCartAmount, token, setToken, userData, setUserData } =
    useContext(StoreContext);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setUserData(null);
    navigate('/');
  };

  const handleCartClick = (e) => {
    if (!token) {
      e.preventDefault();
      setShowLogin(true);
    }
  };

  return (
    <div className='navbar'>
      <Link to='/'>
        <img src={assets.logo} alt='' className='logo' />
      </Link>
      <ul className='navbar-menu'>
        <Link
          to='/'
          onClick={() => {
            setMenu('home');
          }}
          className={menu === 'home' ? 'active' : ''}>
          Home
        </Link>
        <a
          href='#explore-menu'
          onClick={() => {
            setMenu('menu');
          }}
          className={menu === 'menu' ? 'active' : ''}>
          Menu
        </a>
        {/* <a
          href='#app-download'
          onClick={() => {
            setMenu('mobile-app');
          }}
          className={menu === 'mobile-app' ? 'active' : ''}>
          Product-List
        </a> */}
        <a
          href='#footer'
          onClick={() => {
            setMenu('contact-us');
          }}
          className={menu === 'contact-us' ? 'active' : ''}>
          Contact-Us
        </a>
        <Link
          to='/blog'
          // onClick={() => {
          //   setMenu('home');
          // }}
          className={menu === 'Blog' ? 'active' : ''}>
          Blog
        </Link>
      </ul>
      <div className='navbar-right'>
        <img src={assets.search_icon} alt='' />
        <div className='navbar-search-icon'>
          <Link to='/Cart' onClick={handleCartClick}>
            <img src={assets.basket_icon} alt='' />
          </Link>
          <div className={getTotalCartAmount() === 0 ? '' : 'dot'}></div>
        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>Login</button>
        ) : (
          <div className='navbar-profile'>
            <img src={assets.profile_icon} alt='' />

            <ul className='navbar-profile-dropdown'>
              <li>
                <Link
                  to='/orders'
                  style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={assets.bag_icon} alt='' />
                  <p>Orders</p>
                </Link>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt='' />
                <p>Logout</p>
              </li>
            </ul>
            <p className='navbar-profile-user-name'>
              {userData?.name || 'User'}
            </p>
          </div>
        )}
      </div>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
    </div>
  );
};

export default Navbar;
