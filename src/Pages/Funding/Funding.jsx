import React from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from './CheckoutForm';


const stripePromise = loadStripe("pk_test_51RpWZ4ClCGqGKxwQVpw8H9QsQFDNGVbQL2e16MbOXDZRP79FIlROk7jbTeVSPEpZMCeYjSEtCgV0enDS8tJLoFqc00B3ABsvov");

const Funding = () => {
    return (
        <div className="max-w-md mx-auto mt-10">
            <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
        </div>
    );
};

export default Funding;