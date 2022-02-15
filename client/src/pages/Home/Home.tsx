import { selectorUser } from '@features/user-slice';
import { useSelector } from 'react-redux';
import { generateBase64Image } from '@helpers/helpers';
import Cookbooks from './components/Cookbooks';
import FeaturedRecipes from './components/FeaturedRecipes';
import Categories from './components/Categories';
import { Alert24Regular } from '@fluentui/react-icons';
import { Loading } from '@components/Loading/Loading';
import { Link } from 'react-router-dom';

const Home = () => {
  const user: any = useSelector(selectorUser);

  if (!user) return <Loading />;

  return (
    <div className='px-layout h-full select-none overflow-auto scrollbar-none pb-12'>
      <div className='flex justify-between items-center'>
        <Link to='/profile'>
          <img
            src={generateBase64Image(user.avatar)}
            className='w-11 h-11 rounded-full object-cover cursor-pointer'
            alt='default avatar'
          />
        </Link>
        <div>
          <h1 className='text-lg font-medium leading-8'>Hi, {user.name}</h1>
          <p className='text-sm text-gray-800'>What are you cooking today?</p>
        </div>
        <div className='flex items-center justify-center'>
          <button type='button'>
            <Alert24Regular />
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
