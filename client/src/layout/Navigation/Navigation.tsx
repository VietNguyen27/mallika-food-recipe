import {
  Home24Regular,
  Search24Regular,
  Cart24Regular,
  Person24Regular,
  Add20Filled,
} from '@fluentui/react-icons';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  const changeActive = (path) => {
    return path === location.pathname ? 'text-orange' : 'text-black';
  };

  return (
    <div className='absolute inset-x-0 bottom-0 pt-3 border-t border-gray-400 flex items-start justify-around'>
      <Link to='/home' className='text-center flex items-center justify-center'>
        <Home24Regular className={changeActive('/home')} />
      </Link>
      <Link
        to='/search'
        className='text-center flex items-center justify-center'
      >
        <Search24Regular className={changeActive('/search')} />
      </Link>
      <div className='text-center relative flex items-center justify-center'>
        <button className='absolute -translate-y-2 rounded-full bg-orange text-white flex items-center justify-center p-3.5 '>
          <Add20Filled />
        </button>
      </div>
      <Link
        to='/grocery'
        className='text-center flex items-center justify-center'
      >
        <Cart24Regular className={changeActive('/grocery')} />
      </Link>
      <Link
        to='/profile'
        className='text-center flex items-center justify-center'
      >
        <Person24Regular className={changeActive('/profile')} />
      </Link>
    </div>
  );
};

export default Navigation;
