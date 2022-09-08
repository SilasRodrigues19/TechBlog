import './App.scss';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { onAuthStateChanged } from 'firebase/auth';
import { AuthProvider } from './context/AuthContext';

import { useState, useEffect } from 'react';
import { useAuth } from './hooks/useAuth';

import { Home, About, Login, Register } from './pages';
import { Navbar, Footer } from './components';

export const App = () => {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuth();

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if (loadingUser) return <p>Carregando...</p>;

  return (
    <div className='App'>
      <AuthProvider value={{ user }}>
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
      </AuthProvider>
    </div>
  );
};
