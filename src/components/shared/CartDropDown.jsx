import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { RiDeleteBin7Line, RiDeleteBin7Fill } from "react-icons/ri";
import { CartContext } from "../../components/context/CartContext"; // Update the import path as per your project structure

export default function CartDropdown({ closeDropdown }) {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } =
    useContext(CartContext);

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + item.precio * item.quantity;
    }, 0);
  };

  const [hoveredItemId, setHoveredItemId] = useState(null);

  const renderCartItems = () => {
    return cartItems.length > 0 ? (
      <div className="divide-y divide-gray-200 max-h-60 overflow-auto">
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between items-center py-2">
            <div className="flex items-center">
              <img
                src={`/images/products/${item.titulo}.png`} // Assuming you have images stored in this path
                alt={item.titulo}
                className="h-10 w-10 object-cover rounded mr-2"
              />
              <div>
                <div className="font-semibold">{item.titulo}</div>
                <div className="text-sm text-gray-600">${item.precio}</div>
              </div>
            </div>
            <div className="flex items-center">
              <button
                className="bg-gray-200 text-indigo-600 rounded-md hover:bg-gray-300 min-w-[25px]"
                onClick={() => decreaseQuantity(item.id)}
              >
                -
              </button>
              <span className="mx-1">{item.quantity}</span>
              <button
                className="bg-indigo-600 text-white px-2 rounded-md hover:bg-indigo-700"
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
    ) : (
      <div className="p-2 text-center text-gray-600">Carrito vacío.</div>
    );
  };

  return (
    <div className=" bg-white text-black shadow-lg p-4 rounded z-50 w-96">
      <div className="mb-4 font-bold">Mi Carrito</div>
      {renderCartItems()}
      <div className="text-center mt-4">
        <div className="my-4 font-bold">
          Total: ${calculateTotalPrice().toFixed(2)}
        </div>
        <Link
          to="/cart"
          className="bg-indigo-600 text-white px-4 py-3  rounded-md hover:bg-indigo-700"
        >
          Ver Carrito
        </Link>
      </div>
    </div>
  );
}
