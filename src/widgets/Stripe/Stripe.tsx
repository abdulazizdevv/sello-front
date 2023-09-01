import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Payment from "@/app/payment/page";
const stripePromise = loadStripe(
  "pk_test_51NXaxvHY1oN4piIiEqXSi3YmrYJTfxkBXikQwJDVN3Jqnng6M4niNp2FzRewFrb0Emsbls2x9x7JcoLOf9cz88IQ00ZXC4iGOj"
);
function Stripe() {
  return (
    <Elements stripe={stripePromise}>
      <Payment />
    </Elements>
  );
}

export default Stripe;
