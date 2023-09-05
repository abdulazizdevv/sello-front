"use client";
import React, { useState } from "react";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { BASE_URL } from "@/api/main";

const CARD_OPTIONS: any = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "black",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "black" },
      "::placeholder": { color: "black" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "black",
    },
  },
};

export default function Payment() {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardNumberElement);

    if (!cardElement) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (!error && paymentMethod) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post(
          `${BASE_URL}/wallet`,
          {
            amount: 50,
            payment_id: id,
            user_id: 4,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.success) {
          console.log("Successful Payment");
          setSuccess(true);
        }
      } catch (error: any) {
        console.log("Error", error.message);
      }
    } else if (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-[32px]">Payment</h1>
      <div>
        {!success ? (
          <form onSubmit={handleSubmit}>
            <fieldset className="FormGroup border border-bgColor p-3 mb-3 rounded-md">
              <div className="FormRow">
                <CardNumberElement options={CARD_OPTIONS} />
              </div>
            </fieldset>
            <fieldset className="FormGroup border border-bgColor p-3 mb-3 rounded-md">
              <div className="FormRow">
                <CardExpiryElement options={CARD_OPTIONS} />
              </div>
            </fieldset>
            <fieldset className="FormGroup border border-bgColor p-3 mb-3 rounded-md">
              <div className="FormRow">
                <CardCvcElement options={CARD_OPTIONS} />
              </div>
            </fieldset>
            <button className="bg-mainColor text-white px-8 py-1 rounded-md">
              Pay
            </button>
          </form>
        ) : (
          <div className="payment-success">
            <h2>Payment successful</h2>
            <h3 className="Thank-you">Thank you for your patronage</h3>
          </div>
        )}
      </div>
    </div>
  );
}
