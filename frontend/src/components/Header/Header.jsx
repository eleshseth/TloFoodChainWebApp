import React from 'react';
import './Header.css';

const Header = () => {
  const scrollToMenu = () => {
    const menuSection = document.getElementById('explore-menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className='header'>
      <div className='header-contents'>
        <h2>Order your Favourite Food here</h2>
        <p>
          Craving something tasty? Order your favorite food from top restaurants
          —fresh, fast, and delivered right to your door. Satisfaction
          guaranteed! Your next meal awaits. Order now!
        </p>
        <button onClick={scrollToMenu}>View Menu</button>
      </div>
    </div>
  );
};

export default Header;
