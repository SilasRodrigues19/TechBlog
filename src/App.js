import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { onAuthStateChanged } from 'firebase/auth';
import { AuthProvider } from './context/AuthContext';

import { useState, useEffect } from 'react';
import { useAuth } from './hooks/useAuth';

import { Home, About, Login, Register, Dashboard, CreatePost } from './pages';
import { Navbar, Footer, Loader } from './components';
import { Search } from './pages/Search/Search';

export const App = () => {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuth();

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if (loadingUser) return <Loader />;

  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/search" element={<Search />} />
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/" />}
              />
              <Route
                path="/register"
                element={!user ? <Register /> : <Navigate to="/" />}
              />
              <Route
                path="/dashboard"
                element={user ? <Dashboard /> : <Navigate to="/" />}
              />
              <Route
                path="/post/create"
                element={user ? <CreatePost /> : <Navigate to="/" />}
              />
              <Route path="*" element={<h1>404 (Ainda não implementada)</h1>} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
};
