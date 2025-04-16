import React, { useState, useContext } from 'react';
import './ForgotPassword.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const { url } = useContext(StoreContext);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`${url}/api/user/forgot-password`, { email });
      if (response.data.success) {
        toast.success('Reset link sent to your email!');
        setEmail('');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Failed to process request');
    }
    setIsLoading(false);
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-container">
        <h2>Reset Password</h2>
        <p>Enter your email address to reset your password</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;