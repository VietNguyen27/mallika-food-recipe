import React from 'react';
import { logout, selectorUser } from '@features/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const user: any = useSelector(selectorUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
    dispatch(logout());
  };

  if (!user) return <p>loading...</p>;

  return (
    <div>
      <p>Email: {user.email}</p>
      <p>Username: {user.name}</p>
      <p>
        <img
          src={`data:image/${user.avatar.imageFormat};base64, ${user.avatar.base64}`}
          alt=''
        />
      </p>
      <button onClick={() => handleLogout()}>Logout</button>
    </div>
  );
};

export default Home;
