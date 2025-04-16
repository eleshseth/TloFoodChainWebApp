import React, { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import Fooditem from '../FoodItem/fooditem';

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  return (
    <div className='food-display' id='food-display'>
      <h2>Product List</h2>
      <div className='food-display-list'>
        {food_list.map((item, index) => {
          if (category === 'All' || item.category == category) {
            return (
              <Fooditem
                key={item._id}
                id={item._id}
                name={item.name}
                price={item.price}
                image={item.image}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
