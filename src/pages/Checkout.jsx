import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/checkout/CheckoutForm";
import StripeElements from "../components/checkout/StripeElements";
import CheckoutInfo from "../components/checkout/CheckoutInfo";

export const Checkout = ({ options }) => {
  const [stripe, setStripe] = useState(null);

  useEffect(() => {
    // Dynamically import the Stripe module
    import("@stripe/stripe-js")
      .then((stripeJs) => stripeJs.loadStripe("pk_test_51OLTCEH1kbewROnHlhKKtvH9pYc2jholZqwoMB7gr68ao8f7RVFnaMPlgvBR2g3wlzN4qyvBTk9hYIlJ1FZOTAoi00b2wvNDoO"))
      .then((stripeInstance) => {
        setStripe(stripeInstance);
      })
      .catch((error) => {
        console.error("Error loading Stripe:", error);
      });
  }, []);

  if (!stripe) {
    return <div>Loading Stripe...</div>;
  }

  return (
    <div className="pt-32">
      <Elements stripe={stripe} options={options}>
        <div className="flex justify-center space-x-8">
          <div>
            <CheckoutForm />
          </div>
          <div>
            <CheckoutInfo />
          </div>
        </div>
        <div className="mt-8">
          <StripeElements />
        </div>
      </Elements>
    </div>
  );
};
