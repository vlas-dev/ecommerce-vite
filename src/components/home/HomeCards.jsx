import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom"; // Import useNavigate
import crudAxios from "../../config/axios";
import { CartContext } from "../../components/context/CartContext";

export default function HomeCards({ dataLoaded }) {
  const [products, setProducts] = useState([]);
  const { slug } = useParams();
  const { addToCart, increaseQuantity, decreaseQuantity, cartItems } =
    useContext(CartContext);
  const navigate = useNavigate(); // Initialize useNavigate
  const param = useParams();

  useEffect(() => {
    const consultarApi = async () => {
      if (comp) return;
      const { slug } = param;
      const link = slug ? "/get/" + slug : "";

      try {
        const res = await crudAxios.get(`/product${link}`);
        setProducts(res.data);
        dataLoaded(); // Notify parent component that data is loaded
      } catch (error) {
        console.log(error);
        return [];
      }
    };
    consultarApi();
    window.scrollTo(0, 0);
  }, [param, dataLoaded]);

  const query = useLocation().search;
  const comp = useLocation()?.search.length > 0;

  useEffect(() => {
    const search = {
      search: query.split("=")[1],
    };

    const consultarApi = async () => {
      try {
        const res = await crudAxios.post("/search", search);
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    consultarApi();
  }, [query]);

  const handleAddToCart = (product) => {
    if (!localStorage.getItem("x-token")) {
      navigate("/signin"); // Redirect to /signin if not authenticated
    } else {
      addToCart(product);
    }
  };

  return (
    <div className="">
      <h2 className="pt-40 md:pt-10 text-3xl font-bold mb-8 text-center">
        Nuestros productos
      </h2>
  
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 mx-auto md:pb-20 max-w-[300px] md:max-w-[800px] lg:max-w-[1200px]">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col justify-between bg-white rounded shadow-md hover:shadow-lg transition duration-300"
          >
            <div className="w-full">
              <div className="w-[250px] h-[286px] p-4 mx-auto flex items-center">
                <Link
                  to={`/product/${product.id}`}
                  key={product.id}
                  className="w-full h-full block"
                >
                  <img
                    src={`/images/products/${product.titulo}.png`}
                    alt={product.titulo}
                    className="w-auto h-auto object-cover"
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
                    <div className="flex items-center">
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
                        <button className="bg-indigo-600 text-white px-6 py-2  rounded-md hover:bg-indigo-700 ml-4 mr-3">
                          Ver Carrito
                        </button>
                      </Link>
                    </div>
                  ) : (
                    <button
                      className="bg-indigo-600 text-white px-16 py-2 rounded-md hover:bg-indigo-700 w-full"
                      onClick={() => handleAddToCart(product)}
                    >
                      Agregar al carrito
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      );}