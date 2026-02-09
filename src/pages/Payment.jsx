import { useLocation } from "react-router-dom";
import { readytopayment } from "../services/paymentapi";
import toast from "react-hot-toast";
import { useState } from "react";
const Payment = () => {
  const { state } = useLocation();

  const [payUrl, setPayUrl] = useState();
  const paymentSessionId = state?.paymentSessionId;
  const orderId = state?.orderId;
  const amount = state?.amount;

  console.log("Session ID:", paymentSessionId);
  const pay = async (e) => {
    e.preventDefault();

    try {
      const paysesId = state?.paymentSessionId;

      if (!paymentSessionId) {
        throw new Error("Payment session id missing");
      }
      const payload = {
        paymentSessionId: paysesId,
      };
      const payres = await readytopayment(payload);
      setPayUrl(payres.data.paymentUrl);
      console.log(payres.data);
      toast.success("Payment pending");
    } catch (err) {
      console.error(err?.response?.data || err.message);
      toast.error("Payment failed");
    }
  };

  return (
    <div className="w-[80%] mx-auto h-screen px-4 py-8 mt-10 flex justify-between gap-14 items-center">
      <div className="w-[10%]"></div>
      <div>
        <h2>Payment Page</h2>
        <p>Order ID: {orderId}</p>
        <p>Amount: ₹{amount}</p>
        <button
          type="submit"
          onClick={pay}
          className="mt-6 w-full bg-orange-500 text-white py-3 rounded-md font-semibold"
        >
          PAYMENT
        </button>
        {/* <a href="">{payUrl}</a> */}
      </div>
      <div className="w-[10%]"></div>
    </div>
  );
};

export default Payment;
