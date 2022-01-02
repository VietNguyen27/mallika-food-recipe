import { Outlet, Navigate, useLocation } from 'react-router-dom';

export const PublicRoute = () => {
  const token = localStorage.getItem('token');
  const location = useLocation();

  if (token) {
    return <Navigate to='/home' state={{ from: location }} />;
  }

  return <Outlet />;
};
