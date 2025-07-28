import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../Contexts/AuthContext";

export default function CheckoutForm() {
    const {user}=useContext(AuthContext)
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();

  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setProcessing(true);

    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      setError("Please enter a valid amount.");
      setProcessing(false);
      return;
    }

    try {
      const res = await axiosSecure.post("/create-payment-intent", {
        amount: parseFloat(amount),
      });

      const clientSecret = res.data.clientSecret;

      const { error: pmError, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });

      if (pmError) {
        setError(pmError.message);
        setProcessing(false);
        return;
      }

      const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

      if (confirmError) {
        setError(confirmError.message);
      } else if (paymentIntent.status === "succeeded") {
        

         await axiosSecure.post("/add-funding", {
    amount:parseInt(amount),
    name: user.displayName,
    email: user.email,
    date: new Date(),
  }).then(res=>{
   console.log(res.data)
   if(res.data.insertedId){
 
 Swal.fire({
          icon: "success",
          title: "Payment Successful",
          text: `Thank you for donating $${amount}`,
        });
        setAmount("");
   }
  }).catch((error) => {
    setError(error.message)
  });
        
      }
    } catch (error) {
      setError(error.message);
      console.log(error)
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-2">Give a Donation</h2>

      <input
        type="number"
        placeholder="Enter Amount ($)"
        value={amount}
        min={1}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full border px-3 py-2 rounded"
      />

      <CardElement
        className="p-3 border rounded"
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": { color: "#aab7c4" },
            },
            invalid: { color: "#9e2146" },
          },
        }}
      />

      <button
        type="submit"
        disabled={!stripe || processing}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
      >
        {processing ? "Processing..." : `Pay $${amount || ""}`}
      </button>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
}
