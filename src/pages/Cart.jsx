import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiDeleteBin7Line, RiDeleteBin7Fill } from "react-icons/ri";
import { CartContext } from "../components/context/CartContext";
import { useEffect } from "react";
import crudAxios from "../config/axios";

export default function CartPage({ setOption }) {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } =
    useContext(CartContext);

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.precio * item.quantity, 0);
  };
  const totalPrice = calculateTotalPrice();
  const navigate = useNavigate();
  const [precio, setPrecio] = useState(0);
  const [amount, setAmount] = useState({
    amount: 0,
  });

  const turnFloatIntoInt = (numero) => {
    let cadena = numero.toString();
    let sinPunto = cadena.replace(".", "");
    let entero = parseInt(sinPunto);
    return parseInt(entero / 10);
  };

  const toCheckOut = () => {
    // Log the amount and product details for debugging
    console.log("Amount to be charged:", amount);
    console.log("Cart items:", cartItems);
  
    const consultarApi = async () => {
      try {
        // Validate the amount
        if (typeof amount.amount !== 'number' || isNaN(amount.amount)) {
          console.error('Invalid amount:', amount);
          return;
        }
    
        // Define the config object with the necessary headers
        const token = localStorage.getItem("x-token");
        const config = {
          headers: { "x-token": token }
        };
    
        // Axios POST request with config
        const res = await crudAxios.post(`/payment/process`, amount, config);
        const { client_secret } = res.data;
        setOption({
          clientSecret: client_secret,
        });
      } catch (error) {
        // Error handling
        console.error('Error in consultarApi:', error);
        // Additional error handling can be added here
      }
    };
    
    consultarApi();
  };

  useEffect(() => {
    const amount = {
      amount: turnFloatIntoInt(precio),
    };
    setAmount(amount);
  }, [precio]);

  useEffect(() => {
    setPrecio(totalPrice);
  }, [totalPrice]);

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const [hoveredItemId, setHoveredItemId] = useState(null);

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto text-center pt-44">
        <h2 className="text-2xl font-bold">Carrito vacío</h2>
        <Link to="/" className="text-indigo-600 mt-3 inline-block font-bold">
          Volver
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-10 lg:px-32 ">
      <div className="flex flex-col md:flex-row shadow-md ">
        <div className="w-full bg-white px-10 py-10 rounded mt-44">
          <div className="flex justify-between border-b pb-8">
            <h1 className="text-2xl font-bold">Carrito</h1>
            <h2 className="font-semibold text-2xl">{totalItems} Productos</h2>
          </div>
          <div className="mt-4 mb-5 ">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row justify-between  border-b mb-5 pb-5"
              >
                <div className="flex items-center mb-3 md:mb-0 ">
                  <img
                    src={`/images/products/${item.titulo}.png`}
                    // src={`${import.meta.env.VITE_APP_BACKEND_URL}/uploads/productos/${item.imagen}`}
                    alt={item.titulo}
                    className="h-16 w-16 md:h-20 md:w-20 object-cover rounded mr-4 "
                  />
                  <div>
                    <p className="font-bold">{item.titulo}</p>
                    <p>${item.precio}</p>
                  </div>
                </div>
                <div className="flex justify-center">
                <div className="flex items-center font-semibold text-xl">
                  <button
                    className="bg-gray-200 text-indigo-600 px-2 sm:px-3 py-1 rounded-md hover:bg-gray-300 ml-1 sm:ml-2 min-w-[30px] sm:min-w-[36px]"
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    -
                  </button>
                  <span className="mx-2 sm:mx-3">{item.quantity}</span>
                  <button
                    className="bg-indigo-600 text-white px-2 sm:px-3 py-1 rounded-md hover:bg-indigo-700"
                    onClick={() => increaseQuantity(item.id)}
                  >
                    +
                  </button>
                  <button
                    className="ml-2 text-red-500"
                    onClick={() => removeFromCart(item.id)}
                    onMouseEnter={() => setHoveredItemId(item.id)}
                    onMouseLeave={() => setHoveredItemId(null)}
                  >
                    {hoveredItemId === item.id ? (
                      <RiDeleteBin7Fill />
                    ) : (
                      <RiDeleteBin7Line />
                    )}
                  </button>
                </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full md:w-1/2 px-4 sm:px-8 py-10">
          <h1 className="text-2xl font-bold border-b pb-4 sm:pb-8">Mi Orden</h1>
          <div className="flex md:flex-row flex-col justify-between mt-4 sm:mt-10 mb-4 sm:mb-5">
            <span className="font-semibold uppercase mb-4">Total </span>
            <span className="font-semibold ">${totalPrice.toFixed(2)}</span>
          </div>
          <div>
            <button
              onClick={toCheckOut}
              className="bg-indigo-600 hover:bg-indigo-700 px-4 sm:px-5 py-2 text-sm text-white w-full rounded font-bold"
            >
              Completar Orden
            </button>
          </div>
        </div>
      </div>
      <Link to="/" className="text-indigo-600 inline-block font-semibold mt-4">
        Continuar comprando
      </Link>
    </div>
  );
}
