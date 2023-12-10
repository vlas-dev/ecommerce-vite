import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { RiDeleteBin7Line, RiDeleteBin7Fill } from "react-icons/ri";
import { CartContext } from "../components/context/CartContext"; // Update the import path as per your project structure

export default function CartPage() {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } =
    useContext(CartContext);

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.precio * item.quantity,
      0
    );
  };

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const [hoveredItemId, setHoveredItemId] = useState(null);

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto pt-32 text-center">
        <h2 className="text-2xl font-bold">Carrito vacío</h2>
        <Link
          to="/"
          className="text-indigo-600 mt-3 inline-block font-semibold"
        >
          Volver
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto pt-36">
      <div className="flex flex-col md:flex-row shadow-md">
        <div className="w-full  bg-white px-10 py-10 rounded">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">Carrito</h1>
            <h2 className="font-semibold text-2xl">
              {totalItems} Productos
            </h2>{" "}
            
          </div>
          <div className="mt-10 mb-5">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b mb-5 pb-5"
              >
                <div className="flex items-center">
                  <img
                    src={`/images/products/${item.titulo}.png`}
                    alt={item.titulo}
                    className="h-20 w-20 object-cover rounded mr-4"
                  />
                  <div>
                    <p className="font-bold">{item.titulo}</p>
                    <p>${item.precio}</p>
                  </div>
                </div>
                <div className="flex items-center font-semibold text-xl">
                  <button
                    className="bg-gray-200 text-indigo-600 px-3 py-1 rounded-md hover:bg-gray-300 ml-1  min-w-[36px]"
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    -
                  </button>
                  <span className="mx-3">{item.quantity}</span>
                  <button
                    className="bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-700"
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
            ))}
          </div>
        
        </div>

        <div className="w-full px-8 py-10">
          <h1 className="font-semibold text-2xl border-b pb-8">Mi Orden</h1>
          <div className="flex md:flex-row flex-col justify-between mt-10 mb-5">
            <span className="font-semibold uppercase mb-4">Total </span>
            <span className="font-semibold ">
              ${calculateTotalPrice().toFixed(2)}
            </span>
          </div>
          <div>
            <Link to="/checkout">
              <button className="bg-indigo-600 hover:bg-indigo-700 px-5 py-2 text-sm text-white uppercase w-full rounded font-semibold">
                Pagar
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
