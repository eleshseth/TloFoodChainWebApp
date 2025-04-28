import React from 'react';
import Navbar from './component/Navbar/Navbar';
import Sidebar from './component/sidebar/Sidebar';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Orders from './pages/Orders/orders';
import Login from './components/Login/Login';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

function App() {
  const location = useLocation();
  const url = 'http://localhost:8003';
  
  const isLoginPage = location.pathname === '/';

  return (
    <>
      <div>
        <ToastContainer />
        {!isLoginPage && (
          <>
            <Navbar />
            <hr />
          </>
        )}
        <div className='app-content'>
          {!isLoginPage && <Sidebar />}
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/add' element={
              <ProtectedRoute>
                <Add url={url} />
              </ProtectedRoute>
            } />
            <Route path='/list' element={
              <ProtectedRoute>
                <List url={url} />
              </ProtectedRoute>
            } />
            <Route path='/orders' element={
              <ProtectedRoute>
                <Orders url={url} />
              </ProtectedRoute>
            } />
            <Route path='*' element={<Navigate to='/add' replace />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
