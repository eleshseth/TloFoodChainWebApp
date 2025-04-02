import React, { useContext, useEffect, useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import { Navigate, Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Footer from './components/Footer/Footer';
import LoginPopup from '../src/components/LoginPopup/LoginPopup';
import { StoreContext } from './context/StoreContext';
import Orders from './pages/Orders/Orders.jsx';
import Blog from './pages/Blog/Blog.jsx';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const { token } = useContext(StoreContext);
  // useEffect(() => {
  //   if (!token) {
  //     setShowLogin(true);
  //   }
  // }, [token]);
  return (
    <>
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} showLogin={showLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route
            path='/cart'
            element={
              token ? <Cart setShowLogin={setShowLogin} /> : <Navigate to='/' />
            }
          />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/blog' element={<Blog />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
