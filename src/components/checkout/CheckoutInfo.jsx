import React, { useContext } from 'react';
import { CartContext } from './../context/CartContext';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import crudAxios from '../../config/axios';
 

const CheckoutInfo = ({formulario}) => {
  const { cartItems } = useContext(CartContext);
  const stripe = useStripe();
  const elements = useElements();
  const [formState,setState] = formulario

  const total = cartItems.reduce((total, item) => total + item.precio * item.quantity, 0);
  const productos = cartItems.map((item)=>{
    return{
      titulo:item.titulo,
      precio:item.precio,
      imagen:item.imagen,
      cantidad:item.quantity
    }
  })

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // First, check if Stripe and Elements are loaded
    if (!stripe || !elements) {
      return;
    }
  
    // Update the form state with the product details
    setState({...formState, productos});
  
    // Prepare the Stripe payment confirmation parameters
    const returnUrl = `${window.location.origin}/success`;
    const paymentMethodData = {
      billing_details: {
        name: `${formState.nombre} ${formState.apellido}`,
        email: formState.email,
        address: {
          line1: formState.line1,
          city: formState.ciudad,
          state: formState.estado,
          country: formState.pais,
          postal_code: formState.postal_code,
        },
        phone: formState.phone,
      },
    };
  
    // Confirm the payment with Stripe
    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: returnUrl,
        payment_method_data: paymentMethodData,
      },
    });
  
    // Handle any errors from Stripe
    if (result.error) {
      console.log(result.error.message);
      return; // Stop if there's an error
    }
  
    // If Stripe confirmation is successful, then proceed to make the backend request
    try {
      const token = localStorage.getItem("x-token");
      const config = {
        headers: { "x-token": token },
      };
      const res = await crudAxios.post("/order/crear", formState, config);
      console.log(res.data);
      
      // Optionally, redirect to success page here if Stripe doesn't handle it
      // window.location.href = returnUrl;
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div className="p-8 min-h-[300px] w-[400px] lg:w-[1035px] bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Información de la compra</h2>
      {cartItems.map((item) => (
        <div key={item.id} className="mb-4 flex justify-between items-center">
          <div className="flex items-center">
            <img
              // src={`/images/products/${item.titulo}.png`}
              src={`${import.meta.env.VITE_APP_BACKEND_URL}/uploads/productos/${item.imagen}`}
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
      <button
        onClick={handleSubmit}
        disabled={!stripe}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Pagar
      </button>


    </div>
  );
};

export default CheckoutInfo;
