import Navigation from '@layout/Navigation/Navigation';
import { Outlet } from 'react-router-dom';

const Main = () => {
  return (
    <div className='relative w-full h-full'>
      <Outlet />
      <Navigation />
    </div>
  );
};

export default Main;
