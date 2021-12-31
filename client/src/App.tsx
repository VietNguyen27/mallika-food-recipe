import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Phone from '@layout/Phone/Phone';
import Login from '@pages/Auth/Login';
import Register from '@pages/Auth/Register';

const App = () => {
  return (
    <Phone>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </Phone>
  );
};

export default App;
