import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

// Import your custom Axios client so it automatically sends the cookie!
import apiClient from './lib/axios'

import Login from './pages/authentication/Login'
import Home from './pages/home/Home'

// 1. The Upgraded Bouncer (Verifies the secure cookie via the backend)
const ProtectedRoute = ({ children }) => {
  // 'null' means checking, 'true' means verified, 'false' means blocked
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const verifyAccess = async () => {
      try {
        const response = await apiClient.post('/auth/is-authenticated');
        
        if (response.data.success) {
          setIsAuth(true); // The cookie is valid.
        } else {
          setIsAuth(false); // No valid cookie found.
        }
      } catch (error) {
        setIsAuth(false); // Connection failed or rejected.
      }
    };

    verifyAccess();
  }, []);

  // While waiting for the backend to reply, show a sleek loading state
  if (isAuth === null) {
    return (
      <div className="min-h-screen bg-[#09090B] flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
        <p className="text-emerald-500/50 text-xs font-bold tracking-widest uppercase animate-pulse">
          Accessing servers...
        </p>
      </div>
    );
  }

  // If the backend rejects them, instantly redirect to the login page
  if (isAuth === false) {
    return <Navigate to="/login" replace />;
  }

  // If they have the verified cookie, let them into the Home page
  return children;
};

const App = () => {
  return (
    <div>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />
        
        {/* Protected Route */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </div>
  )
}

export default App