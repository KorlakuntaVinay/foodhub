/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import toast from "react-hot-toast";
import { orderData } from "../services/placeOrderapi";
import axios from "axios";
const PlaceOrder = () => {
  const { user, token } = useAuth();
  const [cartdata, setCartData] = useState([]);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const res = await axios.get(
        `https://food-backend-wb32.onrender.com/api/cart/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      // console.log("data:", res.data);
      console.log(user);
      console.log(" User ID:", user?.id);
      setCartData(res.data.items);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    }
  };
  useEffect(() => {
    if (user?.id && token) {
      fetchCart();
    }
  }, [user?.id, token]);

  // console.log(" User ID:", user?.id);
  const items = Object.values(cartdata || {});

  const subtotal = items.reduce(
    (acc, food) => acc + food.quantity * food.price,
    0,
  );
  const [formdata, setFormData] = useState({
    street: "",
    city: "",
    state: "",
    pin_code: "",
    country: "",
    phone: "",
  });
  const dataadding = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const datasubmit = async (e) => {
    e.preventDefault();
    // console.log(" Submit clicked");
    // console.log(" Form Data:", formdata);

    if (!user?.id || !token) {
      toast.error("User not logged in");
      return;
    }

    const { street, city, state, pin_code, country, phone } = formdata;
    if (!street || !city || !state || !pin_code || !country || !phone) {
      toast.error("Fill All Address Fields");
      return;
    }

    const deliveryAddress = `${street},${city},${state},${pin_code},${country},${phone}`;
    console.log(" Order payload:", {
      userId: user.id,
      deliveryAddress,
    });
    const orderPayload = {
      userId: user.id,
      deliveryAddress,
    };

    try {
      const response = await orderData(orderPayload, token);
      console.log("Order placed ", response.data);
      toast.success("Order placed");
      navigate(`/createorder`);
    } catch (err) {
      console.error("Place order failed", err.response?.data || err.message);
      toast.error("Failed to place oder");
    }
  };

  return (
    <form className="  w-[80%] mx-auto px-4 py-8 mt-10 flex justify-between gap-14 items-center">
      <div className="w-[10%]"></div>
      <div className="w-[60%]">
        <button
          onClick={() => navigate("/cart")}
          className=" top-4 left-4 z-50 flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-md"
        >
          ← Back to Cart
        </button>
        <h2 className="text-2xl font-semibold  mb-6">Delivery Information</h2>
        {/* <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="First name"
            className="w-full border border-gray-300 rounded-md px-4 py-3  "
          />
          <input
            type="text"
            placeholder="Last name"
            className="w-full border border-gray-300 rounded-md px-4 py-3  "
          />
        </div> */}
        {/* <input
          type="email"
          placeholder="Email address"
          className="w-full border border-gray-300 rounded-md px-4 py-3   mb-4"
        /> */}
        <input
          type="text"
          placeholder="Street"
          name="street"
          onChange={dataadding}
          className="w-full border border-gray-300 rounded-md px-4 py-3  mb-4 "
        />
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="City"
            name="city"
            onChange={dataadding}
            className="w-full border border-gray-300 rounded-md px-4 py-3  "
          />
          <input
            type="text"
            placeholder="State"
            name="state"
            onChange={dataadding}
            className="w-full border border-gray-300 rounded-md px-4 py-3 "
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="pin code"
            name="pin_code"
            onChange={dataadding}
            className="w-full border border-gray-300 rounded-md px-4 py-3  "
          />
          <input
            type="text"
            placeholder="Country"
            name="country"
            onChange={dataadding}
            className="w-full border border-gray-300 rounded-md px-4 py-3  "
          />
        </div>
        <input
          type="text"
          placeholder="Phone"
          name="phone"
          onChange={dataadding}
          className="w-full border border-gray-300 rounded-md px-4 py-3  "
        />
        <button
          onClick={datasubmit}
          className="mt-4 w-full bg-orange-500 text-white py-2 rounded-lg"
        >
          Place Order
        </button>
      </div>
      <div className="w-[10%]"></div>
    </form>
  );
};

export default PlaceOrder;
