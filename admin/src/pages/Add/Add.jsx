import React, { useState } from 'react';
import './Add.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = ({ url }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('description', description);
      formData.append('image', image);

      const response = await axios.post(`${url}/api/food/add`, formData);
      if (response.data.success) {
        toast.success('Food item added successfully');
        // Reset form
        setName('');
        setPrice('');
        setCategory('');
        setDescription('');
        setImage(null);
      } else {
        toast.error('Failed to add food item');
      }
    } catch (error) {
      console.error('Error adding food:', error);
      toast.error('Error adding food item');
    }
  };

  return (
    <div className='add'>
      <h2>Add New Food Item</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Name:</label>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className='form-group'>
          <label>Price:</label>
          <input
            type='number'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className='form-group'>
          <label>Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required>
            <option value=''>Select Category</option>
            <option value='Momo'>Momo</option>
            <option value='Rolls'>Rolls</option>
            <option value='Fries'>Fries</option>
            <option value='Grocery'>Grocery</option>
            <option value='Chineese'>Chineese</option>
            <option value='Popcorn'>Popcorn</option>
          </select>
        </div>

        <div className='form-group'>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className='form-group'>
          <label>Image:</label>
          <input
            type='file'
            onChange={(e) => setImage(e.target.files[0])}
            accept='image/*'
            required
          />
        </div>

        <button type='submit' className='submit-btn'>
          Add Food Item
        </button>
      </form>
    </div>
  );
};

export default Add;
