import Navigation from '@layout/Navigation/Navigation';
import { Outlet } from 'react-router-dom';
import ToastList from '@components/Toast/ToastList';
import AddRecipeDrawer from '@components/RecipeDrawer/AddRecipeDrawer';

const Main = () => {
  return (
    <div className='relative w-full h-full'>
      <Outlet />
      <Navigation />
      <ToastList />
      <AddRecipeDrawer />
    </div>
  );
};

export default Main;
