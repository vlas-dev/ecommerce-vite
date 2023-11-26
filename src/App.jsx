import Navbar from "./components/shared/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Footer from "./components/shared/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="min-h-screen">

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      </div>

      <Footer />
    </Router>
  );
}
