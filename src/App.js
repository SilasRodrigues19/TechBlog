import './App.css';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { Home } from './pages/Home/Home';
import { About } from './pages/About/About';
import { Navbar, Footer } from './components';

export const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

