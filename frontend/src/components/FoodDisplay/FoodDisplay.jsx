import React, { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import Fooditem from '../Fooditem/fooditem';

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  return (
    <div className='food-display' id='food-display'>
      <h2>Product List</h2>
      <div className='food-display-list'>
        {food_list.map((item, index) => {
          if (category === 'All' || item.category == category) {
            const isOutOfStock = item.stock <= 0;
            return (
              <Fooditem
                key={item._id}
                id={item._id}
                name={item.name}
                price={item.price}
                image={item.image}
                stock={item.stock}
                className={isOutOfStock ? 'out-of-stock' : ''}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
