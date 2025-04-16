import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './loginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const LoginPopup = ({ setShowLogin }) => {
  const navigate = useNavigate();
  const { url, setToken, setUserData } = useContext(StoreContext);

  const [currState, setCurrState] = useState('Login');
  const [data, setData] = useState({
    name: '',
    email: '',
    mobile: '', // Added mobile field
    password: '',
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };
  const onLogin = async (event) => {
    event.preventDefault();

    let newUrl = url;
    if (currState === 'Login') {
      newUrl += '/api/user/login';
    } else {
      newUrl += '/api/user/register';
    }
    const response = await axios.post(newUrl, data);

    if (response.data.success) {
      alert('loggin in successfully');
      setToken(response.data.token);
      setUserData(response.data.data); // Add this line
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userData', JSON.stringify(response.data.data)); // Add this line
      setShowLogin(false);
    } else {
      alert(response.data.message);
    }
  };

  useEffect(() => {
    console.log(data);
  }, [data]);
  const handleForgotPassword = () => {
    setShowLogin(false);
    navigate('/forgot-password');
  };

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className='login-popup-container'>
        <div className='login-popup-title'>
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin()} src={assets.cross_icon} alt='' />
        </div>
        <div className='login-popup-inputs'>
          {currState === 'Login' ? (
            <>
              <input
                name='email'
                onChange={onChangeHandler}
                value={data.email}
                type='text'
                placeholder='Enter Email or Mobile Number'
              />
              <input
                type='Password'
                name='password'
                onChange={onChangeHandler}
                value={data.password}
                placeholder='Password'
              />
            </>
          ) : (
            <>
              <input
                type='text'
                name='name'
                onChange={onChangeHandler}
                value={data.name}
                placeholder='Your Name'
                required
              />
              <input
                name='email'
                onChange={onChangeHandler}
                value={data.email}
                type='email'
                placeholder='Your Email'
              />
              <input
                name='mobile'
                onChange={onChangeHandler}
                value={data.mobile}
                type='text'
                placeholder='Your Mobile Number'
              />
              <input
                type='Password'
                name='password'
                onChange={onChangeHandler}
                value={data.password}
                placeholder='Password'
              />
            </>
          )}
        </div>
        <button type='submit'>
          {currState === 'Sign Up' ? 'Create Account' : 'Login'}
        </button>
        <div className='login-popup-condition'>
          <input type='checkbox' required />
          <p>By Continuing, I agree to the terms and conditions</p>
        </div>
        {currState === 'Login' && (
          <p className="forgot-password">
            Forgot Password? <span onClick={handleForgotPassword}>Click here</span>
          </p>
        )}
        {currState === 'Login' ? (
          <p>
            Create a new Account ?{' '}
            <span onClick={() => setCurrState('Sign Up')}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account ?{' '}
            <span onClick={() => setCurrState('Login')}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};
export default LoginPopup;
