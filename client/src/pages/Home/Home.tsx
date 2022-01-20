import { selectorUser } from '@features/auth-slice';
import { useSelector } from 'react-redux';
import { Loading } from '@components/Loading/Loading';
import Icon, { IconTypes } from '@components/Icon/Icon';
import Cookbooks from './components/Cookbooks';
import { generateBase64Image } from '@helpers/helpers';
import FeaturedRecipes from './components/FeaturedRecipes';
import Categories from './components/Categories';

const Home = () => {
  const user: any = useSelector(selectorUser);

  if (!user) return null;

  return (
    <div className='px-layout h-full select-none overflow-auto scrollbar-none pb-12'>
      <div className='flex justify-between items-center'>
        <img
          src={generateBase64Image(user.avatar)}
          className='w-[44px] h-[44px] rounded-full object-cover cursor-pointer'
          alt='default avatar'
        />
        <div>
          <h1 className='text-lg font-medium leading-8'>Hi, {user.name}</h1>
          <p className='text-sm text-gray-800'>What are you cooking today?</p>
        </div>
        <div className='flex items-center justify-center'>
          <button type='button' className='hover:text-orange delay-100'>
            <Icon type={IconTypes.OUTLINED} size={24} icon='notifications' />
          </button>
        </div>
      </div>
      <Cookbooks />
      <FeaturedRecipes />
      <Categories />
    </div>
  );
};

export default Home;
