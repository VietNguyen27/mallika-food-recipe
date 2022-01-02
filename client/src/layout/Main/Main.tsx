import Icon, { IconTypes } from '@components/Icon/Icon';
import { Link } from 'react-router-dom';

const Main = () => {
  return (
    <div className='absolute inset-x-0 bottom-0 py-4 border-t border-gray-400 flex items-start justify-around'>
      <Link
        to=''
        className='text-center flex items-center justify-center'
      >
        <Icon type={IconTypes.Outlined} size={25} icon='other_houses' />
      </Link>
      <Link
        to=''
        className='text-center flex items-center justify-center'
      >
        <Icon type={IconTypes.Outlined} size={25} icon='search' />
      </Link>
      <div className='text-center relative flex items-center justify-center'>
        <Link
          to=''
          className='absolute rounded-full bg-orange text-white flex items-center justify-center p-3 '
        >
          <Icon type={IconTypes.Outlined} size={25} icon='add' />
        </Link>
      </div>

      <Link
        to=''
        className='text-center flex items-center justify-center'
      >
        <Icon type={IconTypes.Outlined} size={25} icon='shopping_cart' />
      </Link>
      <Link
        to=''
        className='text-center flex items-center justify-center'
      >
        <Icon type={IconTypes.Outlined} size={25} icon='calendar_today' />
      </Link>
    </div>
  );
};

export default Main;
