import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomeChatPage from './pages/HomeChatPage';
import Signup from './components/SignUp';
import Login from './components/Login';
import { useAuth } from './context/AuthProvider';

function App() {
  //const authUsers = localStorage.getItem("ChatAppUser");
  const [authUser , setAuthUser] = useAuth();

  return (
    <Routes>
      {/* Logic:
         1. Agar user login hai -> To HomeChatPage dikhao.
         2. Agar user login NAHI hai -> To seedha "/signup" par bhej do. 
      */}
      <Route 
        path="/" 
        element={authUser ? <HomeChatPage /> : <Navigate to="/signup" />} 
      />
      
      {/* Signup Page Route */}
      <Route 
        path="/signup" 
        element={authUser ? <Navigate to="/" /> : <Signup />} 
      />

      {/* Login Page Route */}
      <Route 
        path="/login" 
        element={authUser ? <Navigate to="/" /> : <Login />} 
      />
    </Routes>
  );
}

export default App;