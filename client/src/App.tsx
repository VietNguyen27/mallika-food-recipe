import { Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Phone from '@layout/Phone/Phone';
import { Loading } from '@components/Loading/Loading';
import { lazyImportWithDelay } from '@helpers/helpers';
import { clearErrors, fetchUser } from '@features/AuthSlice';
import { useDispatch } from 'react-redux';
import { PrivateRoute } from '@routes/PrivateRoute';
import { PublicRoute } from '@routes/PubliceRoute';

const LandingPage = lazyImportWithDelay(import('@pages/Landing/Landing'));
const LoginPage = lazyImportWithDelay(import('@pages/Auth/Login'));
const RegisterPage = lazyImportWithDelay(import('@pages/Auth/Register'));
const SplashPage = lazyImportWithDelay(import('@pages/Splash/Splash'));
const HomePage = lazyImportWithDelay(import('@pages/Home/Home'));

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const token = localStorage.getItem('token');

  useEffect(() => {
    dispatch(clearErrors());
  }, [dispatch, location]);

  if (token) {
    dispatch(fetchUser(token));
  }

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
            <Route path='/home' element={<HomePage />} />
          </Route>
        </Routes>
      </Suspense>
    </Phone>
  );
};

export default App;
