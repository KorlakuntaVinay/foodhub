import React from "react";
import { Link } from "react-router-dom";
// import { useCart } from "../Context/CartContext";
import { useAuth } from "../Context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  clearCart as clearCartAPI,
  removeCartItem as removeCartAPI,
} from "../services/cartapi";

const Cart = () => {
  const { user, token, isAuthenticated } = useAuth();
  // const { cartitems, removeFromCart, clearCart } = useCart();

  const [cartdata, setCartData] = useState({});
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
      console.log("data:", res.data);
      // console.log("cart data", res.data.items);
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

  const clearCart = async () => {
    try {
      if (!isAuthenticated || !token) return;

      await clearCartAPI(token); // ✅ token only
      setCartData({});
      toast.success("Cart cleared");
    } catch (err) {
      console.error("Backend clear cart failed:", err);
      toast.error("Failed to clear cart");
    }
  };

  const removeFromCart = async (foodId) => {
    if (!isAuthenticated || !token || !foodId) return;

    try {
      await removeCartAPI(foodId, token);

      setCartData((prev) => {
        const updated = { ...prev };
        if (!updated[foodId]) return prev;

        if (updated[foodId]?.quantity <= 1) {
          delete updated[foodId];
        } else {
          updated[foodId] = {
            ...updated[foodId],
            quantity: updated[foodId].quantity - 1,
          };
        }

        return updated;
      });

      toast.success("Removed from cart");
    } catch (err) {
      console.error("Remove from cart failed:", err);
      toast.error("Failed to remove item");
    }
  };

  const items = Object.values(cartdata || {});
  const subtotal = items.reduce(
    (acc, food) => acc + food.quantity * food.price,
    0,
  );
  // const handlegetdata = async () => {
  //   const res = await axios.get(
  //     `https://food-backend-wb32.onrender.com/api/foods${getFoodImage}`,
  //     {
  //       headers: { Authorization: `Bearer ${token}` },
  //     },
  //   );
  //   console.log(res);
  // };
  // useEffect(() => {
  //   if (getFoodImage) {
  //     handlegetdata();
  //   }
  // }, []);
  // useEffect(() => {
  //   if (!cartItems) {
  //     cartItems();
  //   }
  // }, []);
  // const datacart = async (cartitems)=>{
  //   const data = object.values(cartItems);
  //   return
  // }
  // useEffect(()=>{
  //   datacart()
  // },[]);

  if (items.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-500 text-lg">
        Cart is empty
      </div>
    );
  }

  return (
    <div className="relative w-[96%] mx-auto mt-6 rounded-xl min-h-screen bg-white p-4 z-50">
      <div>
        <div className="grid grid-cols-7 font-semibold pb-2 text-black">
          <p>Item</p>
          <p>Title</p>

          <p>Price</p>
          <p>Qty</p>
          <p>Total</p>
          <p>Remove</p>
          <p>Clear</p>
        </div>

        {items.map((food) => (
          <div
            key={food._id}
            className="grid grid-cols-7 items-center py-3 text-black"
          >
            <img
              src={food.image}
              alt={food.name}
              className="w-14 h-14 rounded"
            />

            <p>{food.name}</p>

            <p>₹{food.price}</p>

            <p>{food.quantity}</p>

            <p>₹{food.price * food.quantity}</p>

            <button
              onClick={() => removeFromCart(food.foodId)}
              className="text-red-500 font-semibold"
            >
              X
            </button>

            <button onClick={clearCart}>Clear Cart</button>
          </div>
        ))}
      </div>

      <div className="w-[96%] mx-auto mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Cart Totals</h2>

          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span>Delivery Fee</span>
            <span>₹30</span>
          </div>

          <div className="flex justify-between font-semibold text-lg pt-2 mt-2">
            <span>Total</span>
            <span>₹{subtotal + 30}</span>
          </div>
          <Link to="/placeorder">
            <button className="mt-4 w-full bg-orange-500 text-white py-2 rounded-lg">
              PROCEED TO CHECKOUT
            </button>
          </Link>
        </div>

        <div className="bg-white p-6 rounded-xl">
          <p className="text-lg font-semibold mb-4">
            If you have a Promo code, Enter it here
          </p>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Promo code"
              className="flex-1 border rounded-lg px-4 py-2"
            />
            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
