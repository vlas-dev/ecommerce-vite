import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiSearchLine, RiShoppingCartLine } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import crudAxios from "../../config/axios";
import { Twirl as Hamburger } from "hamburger-react";
import logoImage from "/assets/logo.png";
import { CRMContext } from "../../components/context/CRMcontext";
import { CartContext } from "../../components/context/CartContext";
import CartDropDown from "../../components/shared/CartDropDown"; // Import the CartDropdown component
import { useForm } from "../../hooks/useForm/useForm";

export default function Navbar() {
  const [auth, setAuth] = useContext(CRMContext);
  const [isOpen, setOpen] = useState(false);
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [showProfileSubmenu, setShowProfileSubmenu] = useState(false);
  const [showCartDropdown, setShowCartDropdown] = useState(false);


  //CAMBIOS EN SEARCH
  const {formState,onInputChange} = useForm({
    search:''
  })
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
 
  const { cartItems, clearCart } = useContext(CartContext);
  const cartItemCount = cartItems.reduce(
    (count, item) => count + item.quantity,
    0
  );

  useEffect(() => {
    const consultarApi = async () => {
      try {
        const res = await crudAxios.get("/category");
        setCategories(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    consultarApi();
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem("x-token");
    if (storedToken) {
      setAuth({ token: storedToken, isAuthenticated: true });
    }
  }, []);

  const handleLogout = () => {
    setAuth({ token: null, isAuthenticated: false });
    localStorage.removeItem("x-token");
    navigate("/");
    clearCart();
  };

  useEffect(() => {
    const closeCartDropdown = () => {
      setShowCartDropdown(false);
    };

    // Listen for clicks on the document to close the cart dropdown
    document.addEventListener("click", closeCartDropdown);

    return () => {
      // Remove the event listener when the component unmounts
      document.removeEventListener("click", closeCartDropdown);
    };
  }, []);


  //CAMBIOS EN NAVBAR
  const handleSearch = async(e) =>{
    e.preventDefault()
    if(formState.search.length<1) return navigate('/')
    
    navigate(`/search?termino=${formState.search}`)
 
  
  }
  const handleCartClickHamburger = (e) => {
    if (auth.isAuthenticated) {
      navigate("/cart");
    } else {
      navigate("/signin");
    }
  };

  return (
    <div className="bg-indigo-950 fixed z-50 w-full">
      <nav className="p-2 items-center md:mx-10 lg:mx-40">
        <div className="max-w-[1200px] mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold w-20 mr-8 md:mr-16">
            <img src={logoImage} alt="Logo" />
          </Link>
          {/* CAMBIOS EN EL SEARCH */}
          <form className="flex-grow flex items-center mr-10" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Buscar..."
              className="px-6 py-2 text-lg rounded-l border border-r-0 focus:outline-none w-full"
              aria-label="Search"
              name="search" 
              value={formState.search}
              onChange={onInputChange}
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
            <div className="relative group items-center">
              <button className="p-2 flex items-center justify-center gap-2">
                Categorías <IoIosArrowDown />
              </button>
              <div className="absolute p-2 opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-95 bg-white rounded text-gray-800 transform transition-all duration-300 ease-in-out flex flex-col font-bold pointer-events-none group-hover:pointer-events-auto">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    onClick={() => setOpen(false)}
                    to={`product/get/${category.slug}`}
                    className="p-2 hover:bg-gray-200 rounded"
                  >
                    {category.nombre}
                  </Link>
                ))}
              </div>
            </div>

            {auth.isAuthenticated ? (
              <>
                <div className="relative group items-center">
                  <button className="p-3 flex items-center justify-center gap-2">
                    <FaRegUser /> <IoIosArrowDown />
                  </button>
                  <div className="absolute p-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-95 bg-white rounded text-gray-800 transition-all duration-300 ease-in-out flex flex-col font-bold pointer-events-none group-hover:pointer-events-auto">
                    <Link
                      to="/me"
                      className="p-2 hover:bg-gray-200 rounded text-start"
                    >
                      Perfil
                    </Link>
                    <a
                      href="/"
                      onClick={handleLogout}
                      className="p-2 hover:bg-gray-200 rounded text-start cursor-pointer"
                    >
                      Salir
                    </a>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link className="p-2" to="/signin">
                  Ingresar
                </Link>
                <Link
                  className="p-2 bg-indigo-600 hover:bg-indigo-700 rounded"
                  to="/signup"
                >
                  Registrarse
                </Link>
              </>
            )}

<div className="relative group">
  <button className="p-2 flex items-center justify-center">
    <RiShoppingCartLine size={24} aria-label="Shopping Cart" />
    {cartItemCount > 0 && (
      <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
        {cartItemCount}
      </span>
    )}
  </button>
  <div className="absolute top-full left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-95 bg-white rounded text-gray-800 transition-all duration-300 ease-in-out flex flex-col font-bold pointer-events-none group-hover:pointer-events-auto">
    <CartDropDown />
  </div>
</div>


          </div>

          <button
            className="md:hidden text-white mr-6"
            onClick={handleCartClickHamburger}
          >
            <RiShoppingCartLine size={24} aria-label="Shopping Cart" />
            {cartItemCount > 0 && (
              <span className="absolute top-4 right-20 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>

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

        <div
          className={`md:hidden fixed h-screen w-full  bg-black bg-opacity-50 transition-opacity ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setOpen(false)}
        ></div>

        <ul
          className={`md:hidden fixed top-0 right-0 h-screen w-3/5 px-10 space-y-8 bg-indigo-950 flex flex-col pt-32 text-white text-xl transform ${
            isOpen ? "translate-x-0" : "translate-x-full"
          } transition duration-300 ease-in-out`}
        >
          {auth.isAuthenticated ? (
            <>
              <div className="relative group items-center">
                <button
                  className="p-2 flex items-center justify-center gap-2"
                  onClick={() => setShowProfileSubmenu(!showProfileSubmenu)}
                >
                  Mi Cuenta <IoIosArrowDown />
                </button>
                <div
                  className={`${
                    showProfileSubmenu ? "block" : "hidden"
                  } flex flex-col font-bold`}
                >
                  <Link
                    onClick={() => {
                      setOpen(false);
                      setShowProfileSubmenu(false);
                    }}
                    to="/me"
                    className="p-2 my-2"
                  >
                    Perfil
                  </Link>
                  <a
                    href="/"
                    onClick={() => {
                      handleLogout();
                      setShowProfileSubmenu(false);
                    }}
                    className="p-2"
                  >
                    Salir
                  </a>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link
                onClick={() => {
                  setOpen(false);
                }}
                className="p-2"
                to="/signin"
              >
                Ingresar
              </Link>
              <Link
                onClick={() => {
                  setOpen(false);
                }}
                className="p-2"
                to="/signup"
              >
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
                showSubmenu ? "block" : "hidden"
              } flex flex-col font-bold`}
            >
              {categories.map((category) => (
                <Link
                  key={category.id}
                  onClick={() => {
                    setOpen(false);
                    setShowSubmenu(false);
                  }}
                  to={`product/get/${category.slug}`}
                  className="p-2 hover:bg-gray-200 rounded"
                >
                  {category.nombre}
                </Link>
              ))}
            </div>
          </div>
        </ul>
      </nav>
    </div>
  );
}
