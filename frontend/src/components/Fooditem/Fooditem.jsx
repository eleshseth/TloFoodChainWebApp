import React, { useContext } from 'react';
import './Fooditem.css';
import { assets } from '../../assets/assets';
import { useState } from 'react';
import { StoreContext } from '../../context/StoreContext';

const Fooditem = ({ id, name, price, image, stock }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
  const [imgError, setImgError] = useState(false);

  const isOutOfStock = stock <= 0;
  const currentQuantity = cartItems[id] || 0;
  const remainingStock = stock - currentQuantity;

  return (
    <div className={`main-container ${isOutOfStock ? 'out-of-stock' : ''}`}>
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
              className={`add ${isOutOfStock ? 'disabled' : ''}`}
              onClick={() => !isOutOfStock && addToCart(id)}
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
                className={remainingStock <= 0 ? 'disabled' : ''}
                src={assets.add_icon_green}
                alt=''
                onClick={() => remainingStock > 0 && addToCart(id)}
              />
            </div>
          )}
        </div>
      </div>
      <div className='food-item-info'>
        <div className='food-item-name-rating'>
          <p>{name.replace(/\s*\([^)]*\)/g, '').trim()}</p>
        </div>
      </div>
      <p className='food-item-price' dir='ltr'>
        <b>₹</b>
        {price}
        <span className='unit-text' dir='ltr'>
          {name.includes('kg') ? '/Kg' : name.includes('ltr') ? '/Ltr' : '/Pc'}
        </span>
      </p>
      <p className={`stock-status ${isOutOfStock ? 'out-of-stock' : ''}`}>
        {isOutOfStock ? 'Out of Stock' : `Stock: ${remainingStock}`}
      </p>
    </div>
  );
};

export default Fooditem;
