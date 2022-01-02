import { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Phone from '@layout/Phone/Phone';
import Loading from '@components/Loading/Loading';
import { lazyImportWithDelay } from '@helpers/helpers';

const LoginPage = lazyImportWithDelay(import('@pages/Auth/Login'));
const RegisterPage = lazyImportWithDelay(import('@pages/Auth/Register'));
const SplashPage = lazyImportWithDelay(import('@pages/Splash/Splash'));

const App = () => {
  return (
    <Phone>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/splash' element={<SplashPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Phone>
  );
};

export default App;
