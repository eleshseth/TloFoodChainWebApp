import React, { useState, useEffect } from 'react';
import './Orders.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../../../../frontend/src/assets/assets';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllIOrder = async () => {
    try {
      const response = await axios.get(`${url}/api/order/admin-orders`);
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error('Failed to fetch orders');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Error connecting to server');
    }
  };
  const handlePorterBooking = () => {
    window.open(
      'https://porter.in/two-wheelers/delhi?gads=search&utm_source=google&utm_medium=cpc&utm_campaign=20444957512&utm_term=153411105539&utm_content=book%20wefast&click_id=CjwKCAjw-qi_BhBxEiwAkxvbkPCx8NVmsyaZ13a8kDuECZZsFv4BenfOC5k0wcQjDKpRDnQxytLLhxoCjdMQAvD_BwE&gad_source=1&gclid=CjwKCAjw-qi_BhBxEiwAkxvbkPCx8NVmsyaZ13a8kDuECZZsFv4BenfOC5k0wcQjDKpRDnQxytLLhxoCjdMQAvD_BwE',
      '_blank'
    );
  };
  const handleWeFastBooking = () => {
    window.open(
      'https://borzodelivery.com/in/for_small_business?utm_source=google&utm_medium=cpc&utm_campaign=foc_elly_p-max_cpc_ind_allgeo_client_web_eng_def_def_nn|21900699331&utm_content=cid|21900699331|gid||aid||phr||dvc|c|pos||mch||src||reg|9151662|rin|1007751&utm_term=&gad_source=1&gclid=CjwKCAjw-qi_BhBxEiwAkxvbkKqskczBfP_3cM-IwSjPjYTmP0EyMyTDIM_-iAncLvUI1xfgXe4oiRoCW8sQAvD_BwE',
      '_blank'
    );
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        ` ${url}/api/order/update-order-status`,
        {
          orderId: orderId, // Use orderId instead of _id
          status: event.target.value,
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        fetchAllIOrder();
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update order status');
    }
  };
  const storeHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        ` ${url}/api/order/update-Store-status`,
        {
          orderId: orderId, // Use orderId instead of _id
          store: event.target.value,
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        fetchAllIOrder();
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update order status');
    }
  };

  useEffect(() => {
    fetchAllIOrder();
  }, []);

  const handleDeleteOrder = async (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        const response = await axios.post(`${url}/api/order/delete-order`, {
          orderId: orderId
        });
        
        if (response.data.success) {
          toast.success('Order deleted successfully');
          fetchAllIOrder(); // Refresh the orders list
        } else {
          toast.error('Failed to delete order');
        }
      } catch (error) {
        console.error('Error deleting order:', error);
        toast.error('Error deleting order');
      }
    }
  };

  return (
    <div className='order-add'>
      <h3>Order Page</h3>
      <div className='order-list'>
        {orders &&
          orders.map((order, index) => (
            <div key={index} className='order-item'>
              <div className='order-images'>
                {order.items.map((item, idx) => (
                  <img
                    key={idx}
                    src={item.image}
                    alt={item.name}
                    className='order-food-image'
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = assets.food_1;
                    }}
                  />
                ))}
              </div>
              <div>
                <p className='order-item-food'>
                  {order.items.map((item, index) => (
                    <span key={index}>
                      {item.name} x {item.quantity}
                      {index !== order.items.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </p>
                <p className='order-item-name'>
                  {order.address.firstName + ' ' + order.address.lastName}
                </p>
                <p className='order-item-address'>
                  {order.address.street +
                    ', ' +
                    order.address.city +
                    ', ' +
                    order.address.state +
                    ', ' +
                    order.address.zipcode}
                </p>
                <p className='order-item-phone'>{order.address.phone}</p>
                <p>Items:{order.items.length}</p>
                <p>Amount:{order.amount}</p>
                <div className='order-actions'>
                  <select
                    onChange={(event) => statusHandler(event, order.orderId)}
                    value={order.status}>
                    <option value='Food Processing'>Food Processing</option>
                    <option value='Out For Delivery'>Out For Delivery</option>
                    <option value='Delivered'>Delivered</option>
                  </select>
                  <select
                    onChange={(event) => storeHandler(event, order.orderId)}
                    value={order.store}>
                    <option value='Store 1'>Store 1</option>
                    <option value='Store 2'>Store 2</option>
                    <option value='Store 3'>Store 3</option>
                  </select>
                  {/* Add delete button */}
                  <button
                    className='delete-btn'
                    onClick={() => handleDeleteOrder(order.orderId)}>
                    Delete Order
                  </button>
                  <button
                    className='booking-btn wefast'
                    onClick={handleWeFastBooking}>
                    Book We Fast
                  </button>
                  <button
                    className='booking-btn porter'
                    onClick={handlePorterBooking}>
                    Book Porter
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
