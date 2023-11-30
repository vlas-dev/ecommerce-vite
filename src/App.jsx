import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Navbar from "./components/shared/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Footer from "./components/shared/Footer";
import { CRMContext, CRMProvider } from './components/context/CRMcontext';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        classNames="fade"
        timeout={300}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          {/* Add more routes as needed */}
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default function App() {
  const [auth, setAuth] = useState({
    token: '',
    isAuthenticated: false,
  });

  useEffect(() => {
    const token = localStorage.getItem('x-token');
    if (token) {
      setAuth({ token, isAuthenticated: true });
    }
  }, []);

  return (
    <CRMProvider value={[auth, setAuth]}>
      <Router>
        <Navbar />
        <div className="min-h-screen bg-gray-100">
          <AnimatedRoutes />
        </div>
        <Footer />
      </Router>
    </CRMProvider>
  );
}
