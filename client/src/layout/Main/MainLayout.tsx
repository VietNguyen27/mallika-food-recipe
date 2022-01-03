import Main from '@layout/Main/Main';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className='relative w-full h-full'>
      <Outlet />
      <Main />
    </div>
  );
};

export default MainLayout;
