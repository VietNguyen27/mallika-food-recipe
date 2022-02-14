import { Outlet } from 'react-router-dom';
import FlashMessage from '@components/FlashMessage/FlashMessage';

const Content = () => {
  return (
    <div className='relative w-full h-full'>
      <Outlet />
      <FlashMessage />
    </div>
  );
};

export default Content;
