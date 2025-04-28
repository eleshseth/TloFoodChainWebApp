import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash } from 'react-icons/fa';

const FoodList = ({url}) => {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    price: '',
    category: '',
    description: ''
  });

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

  const handleEdit = (item) => {
    setEditingItem(item._id);
    setEditForm({
      name: item.name,
      price: item.price,
      category: item.category,
      description: item.description
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.post(`${url}/api/food/update`, {
        id: editingItem,
        ...editForm
      });

      if (response.data.success) {
        toast.success('Item updated successfully');
        setEditingItem(null);
        await fetchList();
      } else {
        toast.error('Failed to update item');
      }
    } catch (error) {
      console.error('Error updating food:', error);
      toast.error('Error updating item');
    }
  };

  return (
    <div className='list add flex-col'>
      <p>All Product List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Stock</b>
          <b>Actions</b>
        </div>
        {items.map((item) => (
          <div key={item._id} className='list-table-format'>
            <img src={item.image} alt={item.name} />
            {editingItem === item._id ? (
              <>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                />
                <input
                  type="text"
                  value={editForm.category}
                  onChange={(e) => setEditForm({...editForm, category: e.target.value})}
                />
                <input
                  type="number"
                  value={editForm.price}
                  onChange={(e) => setEditForm({...editForm, price: e.target.value})}
                />
                <input
                  type="number"
                  value={editForm.stock}
                  onChange={(e) => setEditForm({...editForm, stock: e.target.value})}
                  min="0"
                />
                <div className="action-buttons">
                  <button onClick={handleUpdate}>Save</button>
                  <button onClick={() => setEditingItem(null)}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>₹{item.price}</p>
                <p>{item.stock}</p>
                <div className="action-buttons">
                  <FaEdit 
                    className="action-icon edit-icon" 
                    onClick={() => handleEdit(item)} 
                  />
                  <FaTrash 
                    className="action-icon delete-icon" 
                    onClick={() => removeFood(item._id)} 
                  />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodList;
