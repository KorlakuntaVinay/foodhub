import { useAuth } from "../Context/AuthContext";
import { useState, useEffect } from "react";
import { create_order } from "../services/createOrderapi";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const createorder = () => {
  const { user, token } = useAuth();

  const [orders, setOrderId] = useState([]);

  const navigate = useNavigate();

  const fetchorder = async () => {
    try {
      const res = await axios.get(
        `https://food-backend-wb32.onrender.com/api/orders/my-orders`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setOrderId(res.data.orders);

      console.log("Order data:", res.data.orders[0].totalAmount);
    } catch (err) {
      console.error("Failed to fetch order details:", err);
    }
  };
  useEffect(() => {
    if (user?.id) {
      fetchorder();
    }
  }, [user]);

  const createorder = async (e) => {
    e.preventDefault();

    try {
      const orderIdValue = orders[0]?._id;
      const amountValue = (orders[0]?.totalAmount ?? 0) + 30;

      if (!orderIdValue || !amountValue) {
        throw new Error("Order data missing");
      }

      const paymentPayload = {
        orderId: orderIdValue,
        userId: user.id,
        amount: amountValue,
      };

      const paymentRes = await create_order(paymentPayload, token);

      console.log("Payment Order Created:", paymentRes.data.paymentSessionId);
      toast.success("Proceed to payment");
      const paymentSessionId = paymentRes.data.paymentSessionId;
      navigate("/paym", {
        state: {
          paymentSessionId,
          orderId: orderIdValue,
          amount: amountValue,
        },
      });
    } catch (err) {
      console.error(err?.response?.data || err.message);
      toast.error("Order / Payment failed");
    }
  };

  return (
    <form className="  w-[80%] mx-auto px-4 py-8 mt-10 flex justify-between gap-14 items-center">
      <div className="w-[10%]"></div>
      <div className="w-[60%]">
        <div className="p-6 rounded-xl ">
          <h2 className="text-xl font-semibold mb-6">Cart Totals</h2>

          <div className="flex justify-between pb-3  mb-3">
            <span className="text-gray-600">Subtotal</span>
            <span>₹{orders[0]?.totalAmount ?? 0}</span>
          </div>

          <div className="flex justify-between pb-3  mb-3">
            <span className="text-gray-600">Delivery Fee</span>
            <span>₹30</span>
          </div>

          <div className="flex justify-between font-semibold text-lg mt-4">
            <span>Total</span>
            <span>₹{(orders[0]?.totalAmount ?? 0) + 30}</span>
          </div>

          <button
            type="submit"
            onClick={createorder}
            className="mt-6 w-full bg-orange-500 text-white py-3 rounded-md font-semibold"
          >
            PROCEED TO PAYMENT
          </button>
        </div>
      </div>
      <div className="w-[10%]"></div>
    </form>
  );
};
export default createorder;
