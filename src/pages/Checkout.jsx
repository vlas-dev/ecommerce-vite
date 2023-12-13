import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/checkout/CheckoutForm";
import StripeElements from "../components/checkout/StripeElements";
import CheckoutInfo from "../components/checkout/CheckoutInfo";

export const Checkout = ({ options }) => {
  const stripePromise = loadStripe(
    "pk_test_51OLTCEH1kbewROnHlhKKtvH9pYc2jholZqwoMB7gr68ao8f7RVFnaMPlgvBR2g3wlzN4qyvBTk9hYIlJ1FZOTAoi00b2wvNDoO"
  );

  return (
    <div className="pt-32">
      <Elements stripe={stripePromise} options={options}>
        <div className="flex justify-center items-center space-x-8">
          <div>
            <CheckoutForm />
          </div>

          <div>
            <CheckoutInfo />
          </div>
        </div>

        <div className="mt-8 items-center space-x-8">
          <StripeElements />
        </div>
      </Elements>
    </div>
  );
};
