import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const FoodList = ({url}) => { 
  const [items, setItems] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setItems(response.data.data);
      } else {
        toast.error('Failed to fetch food items')
      }
    } catch (error) {
      console.error('Error fetching list:', error);
      toast.error('Error fetching food items')
    }
  }

  useEffect(() => {
    fetchList();
  }, [url]);

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, {id: foodId});
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error("Failed to remove item")
      }
    } catch (error) {
      console.error('Error removing food:', error);
      toast.error("Error removing item")
    }
  }

  return (
    <div className='list add flex-col'>
      <p>All Product List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {items.map((item, index) => {
          return (
            <div key={item._id} className='list-table-format'>
              <img 
                src={item.image} 
                alt={item.name}
                onError={(e) => {
                  e.target.onerror = null;
                ;
                }}
              />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>₹{item.price}</p>
              <p className='cursor' onClick={() => removeFood(item._id)}>X</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default FoodList
