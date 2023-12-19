import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import logoImage from "/assets/logoFooter.png";
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div className="bg-gray-100 pt-56 md:pt-10 ">
      <footer className="bg-indigo-950 text-white py-3 ">
        <div className="container mx-auto flex flex-col items-center ">
          <div className="">
            {/* <ul className="flex space-x-4 justify-center">
            <li>
              <a href="#" className="hover:text-blue-400">Home</a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400">Categorías</a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400">Acerca de</a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400">Contacto</a>
            </li>
          </ul> */}
          </div>
          <div className="mt-4 flex space-x-4">
            <a href="#" className="hover:text-indigo-600">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="hover:text-indigo-600">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="hover:text-indigo-600">
              <FaInstagram size={24} />
            </a>
          </div>
          <div className="mt-6">
            <Link to="/" className="flex items-center">
              <img src={logoImage} alt="Logo" className="w-[150px] md:w-[15%] mx-auto" />
            </Link>
          </div>
          <div className="text-center mt-6">
            &copy; {new Date().getFullYear()} All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
