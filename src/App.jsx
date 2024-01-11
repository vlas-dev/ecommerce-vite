import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "./components/shared/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import RecoverPassword from "./pages/RecoverPassword";
import Me from "./pages/Me";
import Users from "./pages/Users";
import MisCompras from "./components/orders/MisCompras";
import MisPublicaciones from "./components/catalog/MisPublicaciones";
import Cart from "./pages/Cart";
import Success from "./pages/Success";

import Footer from "./components/shared/Footer";
import { CRMContext, CRMProvider } from "./components/context/CRMcontext";

import { CartProvider } from "./components/context/CartContext";

import ProductPage from "./pages/productsPage";
import { Checkout } from "./pages/Checkout";
import crudAxios from "./config/axios";

function AnimatedRoutes() {
  const location = useLocation();
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);
  const [options, setOption] = useState({
    clientSecret: "",
  });

  // ... existing code ...

  // Fetch user data for role
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("x-token");
        if (!token) {
          throw new Error("No token found");
        }
        const config = {
          headers: { "x-token": token },
        };

        const response = await crudAxios.get("/me", config);
        setUserRole(response.data.usuario.role);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserRole(null);
      }
    };

    fetchUserData();
  }, []);

  // Redirect if not admin
  useEffect(() => {
    if (userRole !== "ADMIN_ROLE" && (location.pathname === '/catalog' || location.pathname === '/users')) {
      navigate('/');
    }
  }, [userRole, location.pathname, navigate]);
 
  
  // Animation variants
  const pageTransition = {
    in: {
      opacity: 1,
    },
    out: {
      opacity: 0,
    },
  };

  useEffect(() => {
    if (options.clientSecret.length > 0) {
      navigate("/checkout");
    }
  }, [options, navigate]);

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
          <Route path="/catalog" element={<MisPublicaciones />} />
          <Route path="/orders" element={<MisCompras />} />
          <Route path="/users" element={<Users />} />
          <Route path="/product/get/:slug" element={<Home />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<Cart setOption={setOption} />} />
          <Route path="/checkout" element={<Checkout options={options} />} />
          <Route path="/recover" element={<RecoverPassword />} />

          <Route path="/success" element={<Success />} />

          {/* SEARCH AGREGADO */}
          <Route path="/search" element={<Home />} />

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
      <CartProvider>
        <Router>
          <Navbar />
          <div className="min-h-screen bg-gray-100">
            <AnimatedRoutes />
          </div>
          <Footer />
        </Router>
      </CartProvider>
    </CRMProvider>
  );
}
