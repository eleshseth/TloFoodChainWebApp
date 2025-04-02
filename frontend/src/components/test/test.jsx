import React from 'react';

function App() {
  const handlePayment = async () => {
    const amount = 500; // Amount in rupees (can be dynamic)

    try {
      // Call the backend to create an order
      const response = await fetch('http://localhost:3004/api/order/place', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      });
      const order = await response.json();
      console.log(order);

      // Set up Razorpay options with order details
      const options = {
        key: 'rzp_test_Az6MubxWnMQo9o', // Replace with your Razorpay Key ID
        amount: order.amount, // amount in paise
        currency: order.currency,
        name: 'Your Company Name',
        description: 'Test Transaction',
        order_id: order.id,
        handler: async function (response) {
          // After successful payment, verify on the backend
          console.log(response);
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#3399cc',
        },
      };

      // Open the Razorpay Checkout form
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert('Payment initiation failed');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Pay with Razorpay</h1>
      <button
        onClick={handlePayment}
        style={{ padding: '10px 20px', fontSize: '16px' }}>
        Pay Now
      </button>
    </div>
  );
}

export default App;
