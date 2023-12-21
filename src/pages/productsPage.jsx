import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import crudAxios from "../config/axios";

import { CartContext } from "../components/context/CartContext";

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart, increaseQuantity, decreaseQuantity, cartItems } =
    useContext(CartContext);

  useEffect(() => {
    const consultarApi = async () => {
      try {
        setIsLoading(true);
        const res = await crudAxios.get(`/product/${id}`);
        setProduct(res.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setProduct({});
        setIsLoading(false);
      }
    };
    consultarApi();

    window.scrollTo(0, 0);
  }, [id]);

  if (!isLoading && Object.keys(product).length < 1) {
    navigate("/");
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        {/* <div className="loader"></div> */}
      </div>
    );
  }

  if (Object.keys(product).length < 1) {
    navigate("/");
  }

  const itemInCart = cartItems.find((item) => item.id === product.id);

  const handleAddToCart = () => {
    if (!localStorage.getItem("x-token")) {
      navigate("/signin");
    } else {
      addToCart(product);
    }
  };

  return (
    <>
      <div className="bg-gray-100 flex justify-center pt-32 h-screen">
        <div className="mx-auto container">
          <div className="mx-auto md:pb-20 max-w-[1000px]">
            <div
              key={product.id}
              className="md:flex bg-white rounded shadow-lg transition duration-300"
            >
              <div className="md:w-1/2 flex justify-center items-center">
                <img
                  src={`/images/products/${product.titulo}.png`}
                  alt={product.titulo}
                  className="w-3/4 p-10"
                />
              </div>

              <div className="md:w-1/2 p-4">
                <h3 className="text-lg font-semibold mt-10 mb-5">
                  {product.titulo}
                </h3>
                <p className="mb-4">{product.descripcion}</p>
                <p className="text-indigo-700 text-3xl font-semibold mb-4">
                  ${product.precio}
                </p>
                <p className="font-semibold text-sm">
                  {product.envio ? "Envío gratis " : "Sin envío incluido"}
                </p>

                <div className="my-10 flex flex-col font-semibold">
                  {itemInCart ? (
                    <div className="flex items-center">
                      <button
                        className="bg-gray-200 text-indigo-600 px-4 py-2 rounded-md hover:bg-gray-300 ml-1  min-w-[40px]"
                        onClick={() => decreaseQuantity(product.id)}
                      >
                        -
                      </button>
                      <span className="mx-2">{itemInCart.quantity}</span>
                      <button
                        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                        onClick={() => increaseQuantity(product.id)}
                      >
                        +
                      </button>

                      <Link to="/cart">
                        <button className="bg-indigo-600 text-white px-28 py-2  rounded-md hover:bg-indigo-700 ml-12">
                          Ver Carrito
                        </button>
                      </Link>
                    </div>
                  ) : (
                    <button
                      className="bg-indigo-600 text-white  py-2 rounded-md hover:bg-indigo-700"
                      onClick={handleAddToCart}
                    >
                      Agregar al carrito
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
