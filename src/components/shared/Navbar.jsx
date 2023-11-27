import React from "react";
import { Link } from "react-router-dom";
import { RiSearchLine, RiShoppingCartLine } from "react-icons/ri";
import logoImage from "../../assets/logo.png";

export default function Navbar() {
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

  return (
    <div className="bg-[#6F0571]">
      <nav className=" p-2 flex flex-col items-center  md:mx-10 lg:mx-56">
        <div className="w-full flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold w-20 mr-16">
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

          <div className="flex space-x-4 font-semibold text-white">
            <div className="relative group items-center">
              <button className=" p-2">Categorías</button>
              <div className="dropdown-content hidden absolute bg-white shadow-lg group-hover:block">
                {categories.map((category) => (
                  <Link key={category.id} to={category.link}>
                    <button className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                      {category.name}
                    </button>
                  </Link>
                ))}
              </div>
            </div>

            <button className=" p-2">Ingresar</button>
            <Link to="/signup">
              <button className="bg-[#c047c2] hover:bg-[#a03ba1] p-2 rounded font-bold">
                Registrarse
              </button>
            </Link>
            <button className="p-2">
              <RiShoppingCartLine size={24} aria-label="Shopping Cart" />
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
