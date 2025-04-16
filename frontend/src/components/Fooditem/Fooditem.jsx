import React, { useContext } from 'react';
import './Fooditem.css';
import { assets } from '../../assets/assets';
import { useState } from 'react';
import { StoreContext } from '../../context/StoreContext';

const Fooditem = ({ id, name, price, image }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
  const [imgError, setImgError] = useState(false);

  return (
    <div className='main-container'>
      <div className='food-item'>
        <div className='food-item-img-container'>
          <img
            className='food-item-image'
            src={imgError ? assets.food_1 : image}
            alt={name}
            onError={() => setImgError(true)}
          />
          {!cartItems[id] ? (
            <img
              className='add'
              onClick={() => addToCart(id)}
              src={assets.add_icon_white}
              alt=''
            />
          ) : (
            <div className='food-item-counter'>
              <img
                src={assets.remove_icon_red}
                alt=''
                onClick={() => removeFromCart(id)}
              />
              <p>{cartItems[id]}</p>
              <img
                src={assets.add_icon_green}
                alt=''
                onClick={() => addToCart(id)}
              />
            </div>
          )}
        </div>
      </div>
      <div className='food-item-info'>
        <div className='food-item-name-rating'>
          <p>{name}</p>
        </div>
      </div>
      <p className='food-item-price'>
        <b>₹</b>
        {price}
        <span className="unit-text">{name.includes('kg') ? '/kg' : '/pc'}</span>
      </p>
    </div>
  );
};

export default Fooditem;
