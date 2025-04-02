import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { Navigate, useNavigate } from 'react-router-dom';

const Cart = ({ setShowLogin }) => {
  const { url } = useContext(StoreContext);
  const { cartItems, food_list, removeFromCart, getTotalCartAmount } = useContext(StoreContext);
  const navigate = useNavigate();
  const { token } = useContext(StoreContext);

  return (
    <div className='cart'>
      <div className='cartitems'>
        <div className='cart-item-title'>
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className='cart-item-title cart-items-item'>
                  <img 
                    src={item.image} 
                    alt={item.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/150';
                    }}
                  />
                  <p>{item.name}</p>
                  <p>₹{item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>₹{item.price * cartItems[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)} className='cross'>X</p>
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className='cart-bottom'>
        <div className='cart-total'>
          <h2>Cart Total</h2>
          <div className='cart-total-details'>
            <p>Subtotal</p>
            <p>₹{getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className='cart-total-details'>
            <p>delivery Fee</p>
            <p>₹{getTotalCartAmount() === 0 ? 0 : 50}</p>
          </div>
          <hr />
          <div className='cart-total-details'>
            <b>Total</b>
            <p>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 50}</p>
          </div>
          <hr />
          <button onClick={() => navigate('/order')}>
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
