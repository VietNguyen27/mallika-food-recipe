import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

const AuthVerify = ({ logout }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const decodedJwt = parseJwt(token);

      if (decodedJwt.exp * 1000 < Date.now()) {
        dispatch(logout());
      }
    }
  }, [dispatch, location, logout]);

  return null;
};

export default AuthVerify;
