import Navigation from '@layout/Navigation/Navigation';
import { Outlet } from 'react-router-dom';
import FlashMessage from '@components/FlashMessage/FlashMessage';
import CreateRecipeDrawer from '@components/RecipeDrawer/CreateRecipeDrawer';

const Main = () => {
  return (
    <div className='relative w-full h-full'>
      <Outlet />
      <Navigation />
      <FlashMessage />
      <CreateRecipeDrawer />
    </div>
  );
};

export default Main;
