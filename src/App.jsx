import Navbar from "./components/shared/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Footer from "./components/shared/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Phone1 from "./pages/Phone1";

export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="min-h-screen">

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/phone1" element={<Phone1 />} />
      </Routes>
      </div>

      <Footer />
    </Router>
  );
}
