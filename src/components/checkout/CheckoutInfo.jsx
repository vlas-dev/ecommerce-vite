import React, { useContext } from 'react';
import { CartContext } from './../context/CartContext';
import { RiDeleteBin7Line, RiDeleteBin7Fill } from "react-icons/ri";

const CheckoutInfo = () => {
  const { cartItems } = useContext(CartContext);

  const total = cartItems.reduce((total, item) => total + item.precio * item.quantity, 0);

  return (
    <div className="p-8 h-[450px] w-[600px] bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Información de la compra</h2>
      {cartItems.map((item) => (
        <div key={item.id} className="mb-4 flex justify-between items-center">
          <div className="flex items-center">
            <img
              src={`/images/products/${item.titulo}.png`}
              alt={item.titulo}
              className="h-10 w-10 object-cover rounded mr-2"
            />
            <div>
              <h2 className="text-lg font-semibold">{item.titulo}</h2>
              <p className="text-gray-500">${item.precio.toFixed(2)}</p>
              <p className="text-gray-500">Cantidad: {item.quantity}</p>
            </div>
          </div>
         
        </div>
      ))}

      <div className="mb-6 text-xl font-bold text-gray-800 flex justify-between items-center">
        <p>Total:</p>
        <p>${total.toFixed(2)}</p>
      </div>

    </div>
  );
};

export default CheckoutInfo;
