import { Suspense, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Phone from '@layout/Phone/Phone';
import Main from '@layout/Main/Main';
import Content from '@layout/Content/Content';
import { Loading } from '@components/Loading/Loading';
import { lazyImportWithDelay } from '@helpers/helpers';
import {
  clearErrors,
  fetchUser,
  logout,
  selectorUser,
} from '@features/auth-slice';
import { useDispatch, useSelector } from 'react-redux';
import { PrivateRoute } from '@routes/PrivateRoute';
import { PublicRoute } from '@routes/PubliceRoute';
import AuthVerify from '@common/AuthVerify';

const LandingPage = lazyImportWithDelay(import('@pages/Landing/Landing'));
const LoginPage = lazyImportWithDelay(import('@pages/Auth/Login'));
const RegisterPage = lazyImportWithDelay(import('@pages/Auth/Register'));
const SplashPage = lazyImportWithDelay(import('@pages/Splash/Splash'));
const HomePage = lazyImportWithDelay(import('@pages/Home/Home'));
const SearchPage = lazyImportWithDelay(import('@pages/Search/Search'));
const GroceryPage = lazyImportWithDelay(import('@pages/Grocery/Grocery'));
const ProfilePage = lazyImportWithDelay(import('@pages/Profile/Profile'));
const DetailCookbookPage = lazyImportWithDelay(
  import('@pages/DetailCookbook/DetailCookbook')
);
const RecipeDetailPage = lazyImportWithDelay(
  import('@pages/RecipeDetail/RecipeDetail')
);

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user: any = useSelector(selectorUser);
  const token = localStorage.getItem('token');

  useEffect(() => {
    dispatch(clearErrors());
  }, [dispatch, location]);

  useEffect(() => {
    if (user && user.firstLogin) {
      navigate('/splash');
    }

    if (token && !user) {
      dispatch(fetchUser());
    }
  }, [dispatch, user]);

  return (
    <Phone>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path='/' element={<LandingPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
          </Route>
          <Route path='/splash' element={<SplashPage />} />
          <Route element={<PrivateRoute />}>
            <Route element={<Main />}>
              <Route path='/home' element={<HomePage />} />
              <Route path='/search' element={<SearchPage />} />
              <Route path='/grocery' element={<GroceryPage />} />
              <Route path='/profile' element={<ProfilePage />} />
            </Route>
            <Route element={<Content />}>
              <Route path='/detail-cookbook' element={<DetailCookbookPage />} />
              <Route path='/recipe/:id' element={<RecipeDetailPage />} />
            </Route>
          </Route>
        </Routes>
        <AuthVerify logout={logout} />
      </Suspense>
    </Phone>
  );
};

export default App;
