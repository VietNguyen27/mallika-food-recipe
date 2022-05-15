import { Navigation } from '@layout/Navigation';
import { Outlet } from 'react-router-dom';
import { FlashMessage } from '@components/FlashMessage';
import { CreateRecipeDrawer } from '@components/RecipeDrawer';

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
