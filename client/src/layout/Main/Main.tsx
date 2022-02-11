import Navigation from '@layout/Navigation/Navigation';
import { Outlet } from 'react-router-dom';
import { ToastList } from '@components/Toast/Toast';
import CreateRecipeDrawer from '@components/RecipeDrawer/CreateRecipeDrawer';

const Main = () => {
  return (
    <div className='relative w-full h-full'>
      <Outlet />
      <Navigation />
      <ToastList />
      <CreateRecipeDrawer />
    </div>
  );
};

export default Main;
