import React, { useContext, useEffect, useState } from 'react';
import './Orders.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import parcel_icon from '../../assets/parcel_icon.png';

const Orders = () => {
  const { url, token, userData, setToken, setUserData } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for stored token and userData
    const storedToken = localStorage.getItem('token');
    const storedUserData = localStorage.getItem('userData');

    if (storedToken && storedUserData) {
      setToken(storedToken);
      setUserData(JSON.parse(storedUserData));
    } else {
      navigate('/');
    }
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/user-orders`, {
        headers: { token },
      });
      if (response.data.success) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [url, token]);
  console.log(orders);
  // Render the orders or a loading indicator if orders are nul
  return (
    <div className='orders-container'>
      <h2>My Orders - {userData?.name}</h2>
      <div className='orders-list'>
        {orders &&
          orders.map((order) => (
            <div className='order-card'>
              <div className='order-header'>
                <h3 className='customer-name'>
                  Ordered by: {order.address.firstName} {order.address.lastName}
                </h3>
              </div>
              <div className='order-items'>
                {order.items.map((item, index) => (
                  <div key={index} className='order-item'>
                    <img src={parcel_icon} alt="parcel" className="parcel-icon" />
                    <div className='item-details'>
                      <h4>{item.name}</h4>
                      <div className="item-info">
                        <p>Qty: {item.quantity}</p>
                        <p>₹{item.price}/item</p>
                        <p className="item-subtotal">Total: ₹{item.price * item.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className='order-address'>
                <h4>Delivery Address:</h4>
                <p>{order.address.firstName} {order.address.lastName}<br />
                   {order.address.street}, {order.address.city}<br />
                   {order.address.state}, {order.address.zipcode}<br />
                   {order.address.country}
                </p>
              </div>

              <div className='order-footer'>
                <span className='order-date'>
                  {new Date(order.date).toLocaleDateString()}
                </span>
                <div className="order-total-calculation">
                  <p>Items Total: ₹{order.amount - 50}</p>
                  <p>Delivery Charge: ₹50</p>
                  <p className="grand-total">Grand Total: ₹{order.amount}</p>
                </div>
                <div className="status-container">
                  <span className={`status-badge ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                  <button 
                    className="track-order-btn"
                    onClick={fetchOrders}
                  >
                    Track Order
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Orders;
