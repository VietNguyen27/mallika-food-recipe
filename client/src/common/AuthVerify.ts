import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { logout } from '@features/auth-slice';

const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

const AuthVerify = () => {
  const [isTokenExpired, setIsTokenExpired] = useState<boolean>(false);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const timer = setInterval(() => {
      if (token) {
        const decodedJwt = parseJwt(token);

        if (decodedJwt.exp * 1000 < Date.now()) {
          dispatch(logout());
          setIsTokenExpired(true);
        } else {
          setIsTokenExpired(false);
        }
      }
    }, 60 * 1000);

    return () => {
      clearInterval(timer);
    };
  }, [dispatch, location, logout, isTokenExpired]);

  return null;
};

export default AuthVerify;
