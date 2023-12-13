import React from 'react';
import { useForm } from '../../hooks/useForm/useForm';
import { useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = ({ children }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { formState, onInputChange } = useForm({
    name: '',
    lastName: '',
    line1: 'calle 111',
    email: '',
    country: 'venezuela',
    city: '',
    state: '',
    phone: '',
    postal_code: '',

  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const returnUrl = `${window.location.origin}/success`;


    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: returnUrl,
        payment_method_data: {
          billing_details: {
            name: `${formState.name} ${formState.lastName}`,
            email: formState.email,
            address: {
              
              country: formState.country,
              city: formState.city,
              state: formState.state,
              line1: formState.line1,
              postal_code: formState.postal_code,

            },

            phone: formState.phone,
          },
        },
      },
    });

    if (result.error) {
      console.log(result.error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 h-[450px] w-[600px] bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Datos de Facturación</h2>

      {/* Name Field */}
      <div className="mb-4">
        <input
          type="text"
          id="name"
          value={formState.name}
          name="name"
          onChange={onInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Nombre"
        />
      </div>

      {/* Last Name Field */}
      <div className="mb-4">
        <input
          type="text"
          id="lastName"
          value={formState.lastName}
          name="lastName"
          onChange={onInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Apellido"
        />
      </div>

      {/* Email Field */}
      <div className="mb-4">
        <input
          type="email"
          id="email"
          value={formState.email}
          name="email"
          onChange={onInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Email"
        />
      </div>

      {/* Address Field */}
      <div className="mb-4">
        <input
          type="text"
          id="address"
          value={formState.address}
          name="address"
          onChange={onInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Dirección"
        />
      </div>

      {/* Payment Button */}
      <button
        disabled={!stripe}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Pagar
      </button>


    </form>
  );
};

export default CheckoutForm;
