import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "./components/shared/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Me from "./pages/Me";
import Celulares from "./pages/Celulares";
import Notebooks from "./pages/Notebooks";
import Tablets from "./pages/Tablets";
import Footer from "./components/shared/Footer";
import { CRMContext, CRMProvider } from "./components/context/CRMcontext";

function AnimatedRoutes() {
  const location = useLocation();

  // Animation variants
  const pageTransition = {
    in: {
      opacity: 1,
    },
    out: {
      opacity: 0,
    },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="out"
        animate="in"
        exit="out"
        variants={pageTransition}
        transition={{ duration: 0.2 }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/me" element={<Me />} />
          <Route path="/celulares" element={<Celulares />} />
          <Route path="/notebooks" element={<Notebooks />} />
          <Route path="/tablets" element={<Tablets />} />
          {/* Add more routes as needed */}
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  const [auth, setAuth] = useState({
    token: "",
    isAuthenticated: false,
  });

  useEffect(() => {
    const token = localStorage.getItem("x-token");
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
