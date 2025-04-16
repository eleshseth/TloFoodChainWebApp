import React from 'react';
import './Cancellation.css';

const Cancellation = () => {
  return (
    <div className='cancellation-container'>
      <div className='cancellation-content'>
        <h1>Cancellation & Refunds</h1>
        <div className='cancellation-text'>
          <p>
            Once an order is placed and confirmed, cancellations are only
            accepted within 5 minutes of ordering. If your order is incorrect,
            delayed beyond reasonable time, or unsatisfactory, please contact us
            immediately. Refunds will be processed after investigation and may
            take 5–7 working days to reflect in your original payment method. We
            value customer satisfaction and aim to resolve issues promptly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cancellation;
