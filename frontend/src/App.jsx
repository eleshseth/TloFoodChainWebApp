import React, { useContext, useEffect, useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import { Navigate, Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/placeorder.jsx';

//import LoginPopup from '../src/components/LoginPopup/LoginPopup';
import { StoreContext } from './context/StoreContext';
import Orders from './pages/Orders/Orders.jsx';
import Blog from './pages/Blog/Blog.jsx';
import Contact from './components/Contact/Contact';
import Terms from './pages/Terms/Terms';
import Footer from './components/Footer/footer.jsx';
import Privacy from './pages/Privacy/Privacy';
import Shipping from './pages/Shipping/Shipping.jsx';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import Cancellation from './pages/Cancellation/cancellation.jsx';  // Add this import at the top

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const { token, setToken, setUserData } = useContext(StoreContext);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUserData = localStorage.getItem('userData');
    
    if (storedToken && storedUserData) {
      setToken(storedToken);
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

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
          <Route path='/blog/:title' element={<Blog />} />
          <Route path='/contact' element={<Contact />} /> {/* Add this line */}
          <Route path='/terms' element={<Terms />} />
          <Route path='/privacy-policy' element={<Privacy />} />
          <Route path='/shipping-policy' element={<Shipping />} />
          <Route path='/cancellation' element={<Cancellation />} /> {/* Add this route */}
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password/:token' element={<ResetPassword />} /> {/* Add this line */}
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
