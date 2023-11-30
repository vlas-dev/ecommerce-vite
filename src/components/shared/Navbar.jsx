import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiSearchLine, RiShoppingCartLine } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import { Twirl as Hamburger } from "hamburger-react";
import logoImage from "/assets/logo.png";
import { CRMContext } from "../../components/context/CRMcontext";
export default function Navbar() {
  const [auth, setAuth] = useContext(CRMContext);
  console.log(auth);

  const [isOpen, setOpen] = useState(false); // State to control the hamburger menu visibility
  const [showSubmenu, setShowSubmenu] = useState(false);
  const navigate = useNavigate();

  const categories = [
    {
      id: 1,
      name: "Celulares",
      link: "/category/celulares",
    },
    {
      id: 2,
      name: "Notebooks",
      link: "/category/notebooks",
    },
    {
      id: 3,
      name: "Tablets",
      link: "/category/tablets",
    },
  ];

  useEffect(() => {
    const storedToken = localStorage.getItem("x-token");
    if (storedToken) {
      setAuth({ token: storedToken, isAuthenticated: true });
    }
  }, []);

  const handleLogout = () => {
    setAuth({ token: null, isAuthenticated: false });
    localStorage.removeItem("x-token");
    setOpen(false);
    navigate("/");
  };

  return (
    <div className="bg-gray-800 fixed z-50 w-full">
      <nav className="p-2 items-center md:mx-10 lg:mx-40">
        <div className="max-w-[1200px] mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold w-20 mr-8 md:mr-16">
            <img src={logoImage} alt="Logo" />
          </Link>

          <form className="flex-grow flex items-center mr-10">
            <input
              type="text"
              placeholder="Buscar..."
              className="px-6 py-2 text-lg rounded-l border border-r-0 focus:outline-none w-full"
              aria-label="Search"
            />
            <button
              type="submit"
              className="px-4 py-3 border rounded-r bg-white text-gray-700"
              aria-label="Submit Search"
            >
              <RiSearchLine size={20} />
            </button>
          </form>

          <div className="hidden md:flex space-x-4 font-semibold text-white">
            <div className={`relative group items-center`}>
              <button
                className="p-2 flex items-center justify-center gap-2"
                onMouseEnter={() => setShowSubmenu(true)} // Show submenu on hover
                onMouseLeave={() => setShowSubmenu(false)} // Hide submenu when mouse leaves
              >
                Categorías <IoIosArrowDown />
              </button>
              <div
                className={`${
                  showSubmenu
                    ? "scale-100 opacity-100 absolute bg-white rounded text-gray-800"
                    : "scale-95 opacity-0 absolute pointer-events-none" // Use pointer-events-none to prevent interaction when hidden
                } transform transition-all duration-300 ease-in-out flex flex-col font-bold `}
                onMouseEnter={() => setShowSubmenu(true)}
                onMouseLeave={() => setShowSubmenu(false)}
              >
                <a
                  onClick={() => setOpen(false)}
                  href="/celulares"
                  className="p-2 hover:bg-gray-200 rounded"
                >
                  Celulares
                </a>
                <a
                  onClick={() => setOpen(false)}
                  href="/notebooks"
                  className="p-2 hover:bg-gray-200 rounded"
                >
                  Notebooks
                </a>
                <a
                  onClick={() => setOpen(false)}
                  href="/tablets"
                  className="p-2 hover:bg-gray-200 rounded"
                >
                  Tablets
                </a>
              </div>
            </div>

            {auth.isAuthenticated ? (
              // Logged in user view
              <>
                <Link className="p-2" to="/dashboard">
                  Dashboard
                </Link>
                <Link className="p-2" to="/profile">
                  Perfil
                </Link>
                <button onClick={handleLogout}>Log Out</button>
              </>
            ) : (
              // Guest user view
              <>
                <Link className="p-2" to="/signin">
                  Ingresar
                </Link>
                <Link className="p-2" to="/signup">
                  Registrarse
                </Link>
              </>
            )}
            <button className="p-2">
              <RiShoppingCartLine size={24} aria-label="Shopping Cart" />
            </button>
          </div>

          {/* Hamburger Menu */}
          <div
            onClick={() => setOpen(!isOpen)}
            className="z-50 md:hidden mt-2 mr-4"
          >
            <Hamburger
              color="white"
              size={20}
              toggled={isOpen}
              toggle={setOpen}
            />
          </div>
        </div>

        {/* Hamburger Menu Content */}
        <div
          className={`fixed h-screen w-full bg-black bg-opacity-50 transition-opacity ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setOpen(false)}
        ></div>
        <ul
          className={`md:hidden fixed top-0 right-0 h-screen w-3/5 px-10 space-y-8 bg-gray-800 flex flex-col pt-32 text-white text-xl transform ${
            isOpen ? "translate-x-0" : "translate-x-full"
          } transition duration-300 ease-in-out`}
        >
          {auth.isAuthenticated ? (
            // Logged in user view
            <>
              <Link className="p-2" to="/dashboard">
                Dashboard
              </Link>
              <Link className="p-2" to="/profile">
                Perfil
              </Link>
              <button onClick={handleLogout}>Log Out</button>
            </>
          ) : (
            // Guest user view
            <>
              <Link className="p-2" onClick={() => setOpen(false)} to="/">
                Home
              </Link>
              <Link className="p-2" onClick={() => setOpen(false)} to="/signin">
                Ingresar
              </Link>
              <Link className="p-2" onClick={() => setOpen(false)} to="/signup">
                Registrarse
              </Link>
            </>
          )}
          <div className={`relative group items-center`}>
            <button
              className="p-2 flex items-center justify-center gap-2"
              onClick={() => setShowSubmenu(!showSubmenu)}
            >
              Categorías <IoIosArrowDown />
            </button>
            <div
              className={`${
                showSubmenu ? "scale-100 opacity-100" : "scale-95 opacity-0"
              } transform transition-all duration-300 ease-in-out flex flex-col font-bold`}
            >
              <a
                onClick={() => setOpen(false)}
                href="/celulares"
                className="p-2"
              >
                Celulares
              </a>
              <a
                onClick={() => setOpen(false)}
                href="/notebooks"
                className="p-2"
              >
                Notebooks
              </a>
              <a onClick={() => setOpen(false)} href="/tablets" className="p-2">
                Tablets
              </a>
            </div>
          </div>
        </ul>
      </nav>
    </div>
  );
}
