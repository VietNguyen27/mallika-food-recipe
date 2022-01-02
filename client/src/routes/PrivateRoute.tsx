import { Outlet, Navigate, useLocation } from 'react-router-dom';

export const PrivateRoute = () => {
  const token = localStorage.getItem('token');
  const location = useLocation();

  if (!token) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return <Outlet />;
};
