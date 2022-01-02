import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Phone from '@layout/Phone/Phone';
import Login from '@pages/Auth/Login';
import Register from '@pages/Auth/Register';
import Splash from '@pages/Splash/Splash';

const App = () => {
  return (
    <Phone>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/splash' element={<Splash />} />
        </Routes>
      </BrowserRouter>
    </Phone>
  );
};

export default App;
