import React, { useContext, useState, useEffect } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url, setCartItems } =
    useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [token, navigate]);

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  // Handle input changes
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Place order and integrate Razorpay
  const placeOrder = async (event) => {
    event.preventDefault();

    // Prepare order items
    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });

    // Get userId from token
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const userId = decodedToken.id;

    // Prepare order data
    let orderData = {
      userId,
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + (getTotalCartAmount() === 0 ? 0 : 50),
    };

    try {
      // Send order data to backend
      const response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { token },
      });

      if (response.data.success) {
        const { order } = response.data;

        // Initialize Razorpay payment
        const options = {
          key: 'rzp_live_5iWccL6sPbG4Id', // Update this to use environment variable
          amount: order.amount,
          currency: 'INR',
          name: 'Food Store',
          description: 'Order Payment',
          order_id: order.id,
          handler: async function (response) {
            try {
              const verifyRes = await axios.post(
                `${url}/api/order/verify`,
                { response },
                { headers: { token: localStorage.getItem('token') } }
              );
              if (verifyRes.data.success) {
                setCartItems({}); // Clear cart after successful payment
                navigate('/orders');
              } else {
                toast.error('Payment verification failed!');
              }
            } catch (err) {
              console.error('Error verifying payment:', err);
              toast.error('Payment verification error!');
            }
          },
          prefill: {
            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            contact: data.phone,
          },
          theme: {
            color: '#F37254',
          },
        };

        // Open Razorpay checkout
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      } else {
        alert('Error placing order');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Error placing order');
    }
  };

  const handleCodOrder = async (event) => {
    event.preventDefault();

    // Validate all required fields
    const requiredFields = [
      'firstName',
      'lastName',
      'email',
      'street',
      'city',
      'state',
      'zipcode',
      'country',
      'phone',
    ];

    const emptyFields = requiredFields.filter((field) => !data[field]);

    if (emptyFields.length > 0) {
      alert('Please fill in all required fields');
      return;
    }

    // Prepare order items
    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });

    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const userId = decodedToken.id;

    let orderData = {
      userId,
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + (getTotalCartAmount() === 0 ? 0 : 50),
    };

    try {
      const response = await axios.post(
        `${url}/api/order/place-cod`,
        orderData,
        {
          headers: { token: localStorage.getItem('token') },
        }
      );

      if (response.data.success) {
        setCartItems({}); // Clear cart after successful COD order
        alert('Order placed successfully!');
        navigate('/orders');
      } else {
        alert('Error placing order');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Error placing order');
    }
  };

  return (
    <form className='place-order' onSubmit={placeOrder}>
      <div className='place-order-left'>
        <p className='title'>Delivery Information</p>
        <div className='multi-fields'>
          <input
            required
            value={data.firstName}
            name='firstName'
            onChange={onChangeHandler}
            type='text'
            placeholder='First name'
          />
          <input
            required
            value={data.lastName}
            name='lastName'
            onChange={onChangeHandler}
            type='text'
            placeholder='Last name'
          />
        </div>
        <div className='multi-fields'>
          <input
            required
            value={data.email}
            name='email'
            type='email'
            onChange={onChangeHandler}
            placeholder='Email address'
          />
          <input
            required
            value={data.state}
            name='state'
            type='text'
            onChange={onChangeHandler}
            placeholder='State'
          />
        </div>
        <div className='multi-fields'>
          <input
            required
            value={data.city}
            name='city'
            type='text'
            onChange={onChangeHandler}
            placeholder='City'
          />
          <input
            required
            value={data.street}
            name='street'
            type='text'
            onChange={onChangeHandler}
            placeholder='Street'
          />
        </div>
        <div className='multi-fields'>
          <input
            required
            value={data.zipcode}
            name='zipcode'
            type='number'
            onChange={onChangeHandler}
            placeholder='Zip Code'
          />
          <input
            required
            value={data.country}
            name='country'
            type='text'
            onChange={onChangeHandler}
            placeholder='Country'
          />
        </div>
        <div className='multi-fields'>
          <input
            required
            value={data.phone}
            name='phone'
            type='number'
            onChange={onChangeHandler}
            placeholder='Phone Number'
          />
        </div>
      </div>
      <div className='place-order-right'>
        <div className='cart-total'>
          <h2>Cart Total</h2>
          <div className='cart-total-details'>
            <p>Subtotal</p>
            <p>₹{getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className='cart-total-details'>
            <p>Delivery Fee</p>
            <p>₹{getTotalCartAmount() === 0 ? 0 : 50}</p>
          </div>
          <hr />
          <div className='cart-total-details'>
            <b>Total</b>
            <p>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 50}</p>
          </div>
          <hr />
          <button type='submit'>PROCEED TO PAYMENT</button>
          <button onClick={handleCodOrder}>PROCEED VIA COD</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
