import React from 'react';
import './Shipping.css';

const Shipping = () => {
  return (
    <div className='shipping-container'>
      <div className='shipping-content'>
        <h1>Shipping Policy</h1>
        <div className='shipping-text'>
          <p>
            We strive to deliver your food orders quickly and in the best
            condition. Orders placed within our serviceable areas are usually
            delivered within 30 to 60 minutes. Delivery times may vary depending
            on demand, weather, or traffic. For bulk or corporate orders,
            delivery timelines will be confirmed individually. There are no
            hidden delivery charges; all applicable fees are shown at checkout.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
