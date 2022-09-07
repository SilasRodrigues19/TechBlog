import './App.scss';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { Home, About, Login, Register } from './pages';
import { Navbar, Footer } from './components';

export const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <div className='container'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
};
