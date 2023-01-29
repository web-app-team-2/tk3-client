import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useUserStore from '../../database/store';

function ProtectedRoute() {
  const { token } = useUserStore((state) => state);

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}

export default ProtectedRoute;
