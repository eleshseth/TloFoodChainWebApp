import React from 'react';
import Navbar from './component/Navbar/Navbar';
import Sidebar from './component/sidebar/Sidebar';
import { Routes, Route, Navigate } from 'react-router-dom';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Orders from './pages/Orders/orders';

function App() {
  //const url = 'https://api.tlofoodchain.com';
  const url = 'http://localhost:8003';
  return (
    <>
      <div>
        <ToastContainer />
        <Navbar />
        <hr />
        <div className='app-content'>
          <Sidebar />
          <Routes>
            {/* Add root route redirect */}
            <Route path='/' element={<Navigate to='/add' replace />} />
            <Route path='/add' element={<Add url={url} />} />
            <Route path='/list' element={<List url={url} />} />
            <Route path='/orders' element={<Orders url={url} />} />
            {/* Add catch-all route for unmatched paths */}
            <Route path='*' element={<Navigate to='/add' replace />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
