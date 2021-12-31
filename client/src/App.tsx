import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Phone from '@layout/Phone/Phone';
import Login from '@pages/Auth/Login';

const App = () => {
  return (
    <Phone>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </Phone>
  );
};

export default App;
