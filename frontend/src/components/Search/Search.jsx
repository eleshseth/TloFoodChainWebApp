import React, { useState, useContext } from 'react';
import './Search.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const Search = ({ setShowSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { food_list, cartItems, addToCart, removeFromCart } = useContext(StoreContext);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filteredResults = food_list.filter(item => 
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
    );
    setSearchResults(filteredResults);
  };

  return (
    <div className="search-popup">
      <div className="search-popup-container">
        <div className="search-header">
          <input
            type="text"
            placeholder="Search for food items..."
            value={searchQuery}
            onChange={handleSearch}
            autoFocus
          />
          <img 
            src={assets.cross_icon} 
            alt="close" 
            onClick={() => setShowSearch(false)}
            className="close-icon"
          />
        </div>
        
        <div className="search-results">
          {searchQuery && searchResults.map((item) => (
            <div key={item._id} className="search-item">
              <img src={item.image} alt={item.name} />
              <div className="search-item-details">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className="search-item-bottom">
                  <span className="search-item-price">₹{item.price}</span>
                  <div className="search-item-quantity">
                    {!cartItems[item._id] ? (
                      <button 
                        className="add-to-cart-btn"
                        onClick={() => addToCart(item._id)}
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <div className="quantity-controls">
                        <img
                          src={assets.remove_icon_red}
                          alt="remove"
                          onClick={() => removeFromCart(item._id)}
                        />
                        <span>{cartItems[item._id]}</span>
                        <img
                          src={assets.add_icon_green}
                          alt="add"
                          onClick={() => addToCart(item._id)}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {searchQuery && searchResults.length === 0 && (
            <p className="no-results">No items found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;