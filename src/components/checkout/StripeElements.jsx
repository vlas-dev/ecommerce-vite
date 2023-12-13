import React from 'react';
import { useStripe, PaymentElement } from '@stripe/react-stripe-js';

export const StripeElements = () => {

  return (
    <div className="ml-80 p-8 h-[550px] w-[600px] bg-white shadow-md rounded-lg">
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Métodos de Pago</h2>
        <PaymentElement />
      </div>
    </div>
  );
};

export default StripeElements;
