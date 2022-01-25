import { Outlet } from 'react-router-dom';
import { ToastList } from '@components/Toast/Toast';

const Content = () => {
  return (
    <div className='relative w-full h-full'>
      <Outlet />
      <ToastList />
    </div>
  );
};

export default Content;
