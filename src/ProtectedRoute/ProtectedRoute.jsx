import React from 'react';
import { useAuth } from '../auth/AuthContext'; 
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const { logged } = useAuth();
  
  return logged ? <Outlet /> : <Navigate to="/user" />;
};

export default ProtectedRoute; 