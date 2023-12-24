import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import crudAxios from "../../config/axios";
import { CartContext } from "../../components/context/CartContext";
import { TailSpin } from 'react-loader-spinner';

export default function HomeCards({ dataLoaded }) {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [isLoading, setIsLoading] = useState(true);
  const { slug } = useParams();
  const { addToCart, increaseQuantity, decreaseQuantity, cartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const consultarApi = async () => {
      setIsLoading(true);
      const link = slug ? "/get/" + slug : "";

      try {
        const res = await crudAxios.get(`/product${link}`);
        setProducts(res.data);
        dataLoaded();
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (!location.search) {
      consultarApi();
    }
    window.scrollTo(0, 0);
  }, [slug, dataLoaded, location.search]);

  useEffect(() => {
    const consultarApiSearch = async () => {
      if (!location.search) return;

      setIsLoading(true);
      const search = { search: location.search.split("=")[1] };

      try {
        const res = await crudAxios.post("/search", search);
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    consultarApiSearch();
  }, [location.search]);

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = products.slice(firstItemIndex, lastItemIndex);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddToCart = (product) => {
    if (!localStorage.getItem("x-token")) {
      navigate("/signin");
    } else {
      addToCart(product);
    }
  };

  return (
    <div className="scale-90 lg:scale-95 max-w-[1300px] mx-auto">
      {isLoading ? (
        <div className="flex justify-center items-center h-full pt-96 lg:pt-40">
          <TailSpin
            type="ThreeDots"
            color="#4F46E5"
            height={50}
            width={50}
          />
        </div>
      ) : (
        <>
          <h2 className={`text-3xl font-bold mb-8 text-center ${slug ? 'pt-24 lg:pt-24' : 'pt-0 lg:pt-0'}`}>
            {slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : 'Nuestros productos'}
          </h2>
  
          <div className="flex flex-wrap justify-center gap-5 mx-auto md:pb-20">
            {currentItems.map((product) => (
              <div
                key={product.id}
                className="mx-auto lg:mx-0 bg-white rounded shadow-md hover:shadow-lg transition duration-300 w-[300px] max-w-full"
              >
            <div className="w-full">
              <div className="w-[250px] h-[286px] mx-auto flex items-center">
                <Link
                  to={`/product/${product.id}`}
                  key={product.id}
                  className="w-full h-full block"
                >
                 <img
                    src={`${import.meta.env.VITE_APP_BACKEND_URL}/uploads/productos/${product.imagen}`}
                    alt={product.titulo}
                    className="object-cover p-5"
                    style={{ maxHeight: '100%', maxWidth: '100%' }}
                  />
                </Link>
              </div> 
  
              <hr className="bg-gray-300" />
              <div className="p-4">
                <Link
                  to={`/product/${product.id}`}
                  key={product.id}
                  className="w-full h-full block"
                >
                  <h3 className="text-lg font-semibold">
                    {product.titulo}
                  </h3>
                </Link>
             
              </div>
            </div>
  
            <div className="p-4">
              <div className="items-center mb-5">
                <div className="flex">
                  <p className="text-indigo-700 text-xl font-semibold ">
                    ${product.precio}
                  </p>
                </div>
  
                <p className="font-semibold text-[14px]">
                  {product.envio ? "Envío gratis " : "Sin envío incluido"}
                </p>
              </div>
  
              {cartItems.some((item) => item.id === product.id) ? (
                <div className="flex items-center justify-center">
                  <button
                    className="bg-gray-200 text-indigo-600 px-3 py-1 rounded-md hover:bg-gray-300 min-w-[32px]"
                    onClick={() => decreaseQuantity(product.id)}
                  >
                    -
                  </button>
                  <span className="mx-2">
                    {
                      cartItems.find((item) => item.id === product.id)
                        .quantity
                    }
                  </span>
                  <button
                    className="bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-700"
                    onClick={() => increaseQuantity(product.id)}
                  >
                    +
                  </button>
  
                  <Link to="/cart">
                    <button className="bg-indigo-600 text-white px-6 py-2  rounded-md hover:bg-indigo-700 ml-4">
                      Ver Carrito
                    </button>
                  </Link>
                </div>
              ) : (
                <button
                  className="bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 w-full"
                  onClick={() => handleAddToCart(product)}
                >
                  Agregar al carrito
                </button>
              )}
            </div>
          </div>
        ))}
      </div>


      <div className="flex justify-center mt-8">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`mx-2 px-4 py-2 rounded ${currentPage === index + 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
      
      </>
    )}
  </div>
);
}
