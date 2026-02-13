// import React from "react";
// import { Link } from "react-router-dom";
// // import { useCart } from "../Context/CartContext";
// import { useAuth } from "../Context/AuthContext";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import {
//   clearCart as clearCartAPI,
//   removeCartItem as removeCartAPI,
//   updateCartQuantity,
// } from "../services/cartapi";

// const Cart = () => {
//   const { user, token, isAuthenticated } = useAuth();
//   // const { cartitems, removeFromCart, clearCart } = useCart();

//   const [cartdata, setCartData] = useState({});
//   const fetchCart = async () => {
//     try {
//       const res = await axios.get(
//         `https://food-backend-wb32.onrender.com/api/cart/${user.id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );
//       console.log("data:", res.data);
//       // console.log("cart data", res.data.items);
//       setCartData(res.data.items || {});
//     } catch (err) {
//       console.error("Failed to fetch cart:", err);
//     }
//   };

//   useEffect(() => {
//     if (user?.id && token) {
//       fetchCart();
//     }
//   }, [user?.id, token]);

//   const clearCart = async () => {
//     try {
//       if (!isAuthenticated || !token) return;

//       await clearCartAPI(token); // ✅ token only
//       setCartData({});
//       toast.success("Cart cleared");
//     } catch (err) {
//       console.error("Backend clear cart failed:", err);
//       toast.error("Failed to clear cart");
//     }
//   };

//   const removeFromCart = async (foodId) => {
//     if (!isAuthenticated || !token || !foodId) return;

//     try {
//       await removeCartAPI(foodId, token);

//       setCartData((prev) => {
//         const updated = { ...prev };
//         if (!updated[foodId]) return prev;

//         if (updated[foodId]?.quantity <= 1) {
//           delete updated[foodId];
//         } else {
//           updated[foodId] = {
//             ...updated[foodId],
//             quantity: updated[foodId].quantity - 1,
//           };
//         }

//         return updated;
//       });

//       toast.success("Removed from cart");
//     } catch (err) {
//       console.error("Remove from cart failed:", err);
//       toast.error("Failed to remove item");
//     }
//   };
//   // const handleQuantity = async (foodId, type) => {
//   //   if (!isAuthenticated || !token) {
//   //     toast.error("Please login first");
//   //     return;
//   //   }

//   //   try {
//   //     await updateCartQuantity({ foodId, type }, token);

//   //     //  Optimistic UI update
//   //     setCartData((prev) => {
//   //       const updated = { ...prev };

//   //       if (!updated[foodId]) return prev;

//   //       if (type === "increase") {
//   //         updated[foodId].quantity += 1;
//   //       }

//   //       if (type === "decrease") {
//   //         if (updated[foodId].quantity <= 1) {
//   //           delete updated[foodId];
//   //         } else {
//   //           updated[foodId].quantity -= 1;
//   //         }
//   //       }

//   //       return updated;
//   //     });
//   //   } catch (err) {
//   //     console.error("Quantity update failed:", err);
//   //     toast.error("Failed to update quantity");
//   //   }
//   // };
//   // const handleQuantity = async (foodId, type) => {
//   //   if (!isAuthenticated || !token) {
//   //     toast.error("Please login first");
//   //     return;
//   //   }

//   //   setCartData((prev) =>
//   //     prev.map((item) =>
//   //       item.foodId._id === foodId
//   //         ? {
//   //             ...item,
//   //             quantity:
//   //               type === "increase"
//   //                 ? item.quantity + 1
//   //                 : Math.max(1, item.quantity - 1),
//   //           }
//   //         : item,
//   //     ),
//   //   );
//   //   toast.success(
//   //     type === "increase" ? "Quantity increased" : "Quantity decreased",
//   //     { duration: 800 },
//   //   );
//   //   try {
//   //     await updateCartQuantity({ foodId, type }, token);
//   //   } catch (err) {
//   //     setCartData((prev) =>
//   //       prev.map((item) =>
//   //         item.foodId._id === foodId
//   //           ? {
//   //               ...item,
//   //               quantity:
//   //                 type === "increase" ? item.quantity - 1 : item.quantity + 1,
//   //             }
//   //           : item,
//   //       ),
//   //     );

//   //     toast.error("Failed to update quantity");
//   //   }
//   // };
//   //
//   const handleQuantity = async (foodId, type) => {
//     if (!isAuthenticated || !token) {
//       toast.error("Please login first");
//       return;
//     }

//     // Optimistic UI update
//     setCartData((prev) => {
//       const updated = { ...prev };

//       if (!updated[foodId]) return prev;

//       if (type === "increase") {
//         updated[foodId].quantity += 1;
//       } else {
//         if (updated[foodId].quantity <= 1) return prev;
//         updated[foodId].quantity -= 1;
//       }

//       return updated;
//     });

//     try {
//       await updateCartQuantity({ foodId, type }, token);
//     } catch (err) {
//       toast.error("Failed to update quantity");

//       // rollback
//       setCartData((prev) => {
//         const updated = { ...prev };
//         if (!updated[foodId]) return prev;

//         if (type === "increase") {
//           updated[foodId].quantity -= 1;
//         } else {
//           updated[foodId].quantity += 1;
//         }

//         return updated;
//       });
//     }
//   };

//   const items = Object.values(cartdata);
//   const subtotal = items.reduce(
//     (acc, food) => acc + food.quantity * food.price,
//     0,
//   );

//   // const handlegetdata = async () => {
//   //   const res = await axios.get(
//   //     `https://food-backend-wb32.onrender.com/api/foods${getFoodImage}`,
//   //     {
//   //       headers: { Authorization: `Bearer ${token}` },
//   //     },
//   //   );
//   //   console.log(res);
//   // };
//   // useEffect(() => {
//   //   if (getFoodImage) {
//   //     handlegetdata();
//   //   }
//   // }, []);
//   // useEffect(() => {
//   //   if (!cartItems) {
//   //     cartItems();
//   //   }
//   // }, []);
//   // const datacart = async (cartitems)=>{
//   //   const data = object.values(cartItems);
//   //   return
//   // }
//   // useEffect(()=>{
//   //   datacart()
//   // },[]);

//   if (items.length === 0) {
//     return (
//       <div className="text-center mt-10 text-gray-500 text-lg">
//         Cart is empty
//       </div>
//     );
//   }

//   return (
//     <div className="relative w-[96%] mx-auto mt-6 rounded-xl min-h-screen bg-white p-4 -z-10">
//       <div>
//         <div className="grid grid-cols-7 font-semibold pb-2 text-black">
//           <p>Item</p>
//           <p>Title</p>

//           <p>Price</p>
//           <p>Qty</p>
//           <p>Total</p>
//           <p>Remove</p>
//           <p>Clear</p>
//         </div>

//         {items.map((food) => (
//           <div
//             key={food._id}
//             className="grid grid-cols-7 items-center py-3 text-black"
//           >
//             <img
//               src={food.image}
//               alt={food.name}
//               className="w-14 h-14 rounded"
//             />

//             <p>{food.name}</p>

//             <p>₹{food.price}</p>

//             {/* <p>{food.quantity}</p> */}
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => handleQuantity(food.foodId, "decrease")}
//                 disabled={food.quantity === 1}
//                 className="px-2 bg-red-200 rounded"
//               >
//                 -
//               </button>

//               <span>{food.quantity}</span>

//               <button
//                 onClick={() => handleQuantity(food.foodId, "increase")}
//                 className="px-2 bg-green-200 rounded"
//               >
//                 +
//               </button>
//             </div>

//             <p>₹{food.price * food.quantity}</p>

//             <button
//               onClick={() => removeFromCart(food.foodId)}
//               className="text-red-500 font-semibold"
//             >
//               X
//             </button>

//             <button onClick={clearCart}>Clear Cart</button>
//           </div>
//         ))}
//       </div>

//       <div className="w-[96%] mx-auto mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="p-6 rounded-xl">
//           <h2 className="text-xl font-semibold mb-4">Cart Totals</h2>

//           <div className="flex justify-between mb-2">
//             <span>Subtotal</span>
//             <span>₹{subtotal}</span>
//           </div>

//           <div className="flex justify-between mb-2">
//             <span>Delivery Fee</span>
//             <span>₹30</span>
//           </div>

//           <div className="flex justify-between font-semibold text-lg pt-2 mt-2">
//             <span>Total</span>
//             <span>₹{subtotal + 30}</span>
//           </div>
//           <Link to="/placeorder">
//             <button className="mt-4 w-full bg-orange-500 text-white py-2 rounded-lg">
//               PROCEED TO CHECKOUT
//             </button>
//           </Link>
//         </div>

//         <div className="bg-white p-6 rounded-xl">
//           <p className="text-lg font-semibold mb-4">
//             If you have a Promo code, Enter it here
//           </p>

// <div className="flex gap-2">
//   <input
//     type="text"
//     placeholder="Promo code"
//     className="flex-1 border rounded-lg px-4 py-2"
//   />
//   <button className="bg-orange-500 text-white px-4 py-2 rounded-lg">
//     Submit
//   </button>
// </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../Context/AuthContext";
import {
  clearCart as clearCartAPI,
  removeCartItem as removeCartAPI,
  updateCartQuantity,
  addToCart,
} from "../services/cartapi";
import { useNavigate } from "react-router-dom";
import { orderData } from "../services/placeOrderapi";

const Cart = () => {
  const { user, token, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [cartdata, setCartData] = useState({});
  const [orders, setOrderId] = useState([]);

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

      setCartData(res.data.items || {});
    } catch (err) {
      console.error("Fetch cart failed:", err);
    }
  };

  useEffect(() => {
    if (user?.id && token) {
      fetchCart();
    }
  }, [user?.id, token]);

  const clearCart = async () => {
    if (!isAuthenticated || !token) return;

    try {
      await clearCartAPI(token);
      await fetchCart();
      toast.success("Cart cleared");
    } catch (err) {
      toast.error("Failed to clear cart");
    }
  };

  const removeFromCart = async (foodId) => {
    if (!isAuthenticated || !token) return;

    try {
      await removeCartAPI(foodId, token);
      await fetchCart();
      toast.success("Item removed");
    } catch (err) {
      toast.error("Failed to remove item");
    }
  };

  const handleQuantity = async (foodId, type) => {
    if (!isAuthenticated || !token) {
      toast.error("Please login first");
      return;
    }

    try {
      await updateCartQuantity({ foodId, type }, token);
      await fetchCart();
    } catch (err) {
      toast.error("Failed to update quantity");
    }
  };

  const items = Object.values(cartdata);
  const subtotal = items.reduce(
    (acc, food) => acc + food.quantity * food.price,
    0,
  );

  const [savedAddress, setSavedAddress] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showNewAddress, setShowNewAddress] = useState(false);

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
    } catch (err) {
      console.error("Place order failed", err.response?.data || err.message);
      toast.error("Failed to place oder");
    }
  };
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

      console.log("Order data:", res.data.orders);
    } catch (err) {
      console.error("Failed to fetch order details:", err);
    }
  };
  useEffect(() => {
    if (user?.id) {
      fetchorder();
    }
  }, [user]);
  useEffect(() => {
    if (orders.length > 0) {
      setSavedAddress(orders[0].deliveryAddress);
    }
  }, [orders]);

  const handleOrderAgain = async (item) => {
    if (!user?.id || !token) {
      toast.error("Please login first");
      return;
    }
    try {
      await addToCart(
        {
          userId: user.id,
          foodId: item.foodId,
          quantity: 1,
        },
        token,
      );

      toast.success("Added to cart");
      fetchCart(); // refresh cart
    } catch (err) {
      toast.error("Failed to add item");
    }
  };

  if (items.length === 0) {
    return (
      <div className="w-[95%] mx-auto mt-6 px-4 min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-6">Your Orders</h2>

            {orders.length === 0 && (
              <p className="text-gray-500">No orders found.</p>
            )}

            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white shadow-md rounded-xl p-6 mb-6"
              >
                {/* ===== ORDER ITEMS ===== */}
                {order.items.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between items-center py-3  last:border-none"
                  >
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-gray-500 text-sm">
                        ₹{item.price} × {item.quantity}
                      </p>
                    </div>

                    <button
                      onClick={() => handleOrderAgain(item)}
                      className="bg-orange-500 text-white px-3 py-1 rounded-md text-sm"
                    >
                      Order Again
                    </button>
                  </div>
                ))}

                <div className="flex justify-between mt-4 font-semibold">
                  <span>Total</span>
                  <span>₹{order.totalAmount}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="hidden lg:block">{/* Empty for now */}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[95%] mx-auto mt-6 px-4 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 ">
        <div className="w-[90%]">
          <button
            onClick={() => navigate(`/${user.id}/foodlist`)}
            className="mb-6 flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-md"
          >
            Back to Menu
          </button>

          <div className="bg-white rounded-xl shadow-sm p-4">
            {items.map((food) => (
              <div
                key={food.foodId}
                className="flex justify-between items-center py-6"
              >
                <div className="flex gap-4">
                  <img
                    src={food.image}
                    alt={food.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />

                  <div>
                    <h3 className="text-lg font-semibold">{food.name}</h3>
                    <p className="text-gray-500 mt-1">₹{food.price}</p>

                    <button
                      onClick={() => removeFromCart(food.foodId)}
                      className="text-red-500 text-sm mt-2"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex items-center rounded-md px-4 py-2 gap-6 border">
                    <button
                      onClick={() => handleQuantity(food.foodId, "decrease")}
                      disabled={food.quantity === 1}
                      className="text-gray-500 text-xl"
                    >
                      −
                    </button>

                    <span className="text-green-600 font-semibold">
                      {food.quantity}
                    </span>

                    <button
                      onClick={() => handleQuantity(food.foodId, "increase")}
                      className="text-green-600 text-xl"
                    >
                      +
                    </button>
                  </div>

                  <p className="font-semibold text-lg">
                    ₹{food.price * food.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-md mt-6 flex flex-col gap-3 ">
            <span className="font-medium text-lg">Apply Coupon</span>
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

          <div className="mt-8 bg-white shadow-sm rounded-xl p-6">
            <div className="flex justify-between mb-3">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="flex justify-between mb-3">
              <span>Delivery Fee</span>
              <span>₹30</span>
            </div>

            <div className="flex justify-between font-semibold text-lg pt-4 ">
              <span>Total</span>
              <span>₹{subtotal + 30}</span>
            </div>
          </div>
        </div>
        <form className="  px-4 py-8 mt-10   gap-14 ">
          <div className="w-[90%]">
            {/* <h2 className="text-2xl font-semibold  mb-6">
              Delivery Information
            </h2> */}
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
            {/* <input
              type="text"
              placeholder="Street"
              onChange={dataadding}
              name="street"
              className="w-full border border-gray-300 rounded-md px-4 py-3  mb-4 "
            />
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="City"
                onChange={dataadding}
                name="city"
                className="w-full border border-gray-300 rounded-md px-4 py-3  "
              />
              <input
                type="text"
                placeholder="State"
                onChange={dataadding}
                name="state"
                className="w-full border border-gray-300 rounded-md px-4 py-3 "
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="pin code"
                onChange={dataadding}
                name="pin_code"
                className="w-full border border-gray-300 rounded-md px-4 py-3  "
              />
              <input
                type="text"
                placeholder="Country"
                onChange={dataadding}
                name="country"
                className="w-full border border-gray-300 rounded-md px-4 py-3  "
              />
            </div>
            <input
              type="text"
              placeholder="Phone"
              onChange={dataadding}
              name="phone"
              className="w-full border border-gray-300 rounded-md px-4 py-3  "
            />
            <button
              className="mt-4 w-full bg-orange-500 text-white py-2 rounded-lg"
              onClick={datasubmit}
            >
              Place Order
            </button> */}
            <div className="px-4 py-8 mt-10">
              <div className="w-[90%]">
                <h2 className="text-2xl font-semibold mb-6">
                  Delivery Information
                </h2>

                {/* ===== SAVED ADDRESS DISPLAY ===== */}
                {savedAddress && !isEditing && (
                  <div className="border rounded-lg p-4 mb-4 flex justify-between items-start">
                    <div className="flex gap-3">
                      <input type="radio" checked readOnly />
                      <p className="text-gray-700">{savedAddress}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="text-orange-500 font-medium"
                    >
                      Edit
                    </button>
                  </div>
                )}

                {/* ===== EDIT ADDRESS FORM ===== */}
                {isEditing && (
                  <div className="border rounded-lg p-4 mb-4">
                    <input
                      type="text"
                      placeholder="Street"
                      name="street"
                      onChange={dataadding}
                      className="w-full border rounded-md px-4 py-3 mb-4"
                    />

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <input
                        type="text"
                        placeholder="City"
                        name="city"
                        onChange={dataadding}
                        className="border rounded-md px-4 py-3"
                      />
                      <input
                        type="text"
                        placeholder="State"
                        name="state"
                        onChange={dataadding}
                        className="border rounded-md px-4 py-3"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <input
                        type="text"
                        placeholder="Pin Code"
                        name="pin_code"
                        onChange={dataadding}
                        className="border rounded-md px-4 py-3"
                      />
                      <input
                        type="text"
                        placeholder="Country"
                        name="country"
                        onChange={dataadding}
                        className="border rounded-md px-4 py-3"
                      />
                    </div>

                    <input
                      type="text"
                      placeholder="Phone"
                      name="phone"
                      onChange={dataadding}
                      className="w-full border rounded-md px-4 py-3"
                    />

                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md"
                    >
                      Save Address
                    </button>
                  </div>
                )}

                {/* ===== ADD NEW ADDRESS BUTTON ===== */}
                <div className="border border-dashed rounded-lg p-4 text-center mb-4">
                  <button
                    type="button"
                    onClick={() => setShowNewAddress(true)}
                    className="text-orange-500 font-medium"
                  >
                    + Add New Address
                  </button>
                </div>

                {/* ===== EMPTY DIV FOR NEW ADDRESS ===== */}
                {showNewAddress && (
                  <div className="border rounded-lg p-4 mb-4">
                    <input
                      type="text"
                      placeholder="Street"
                      name="street"
                      onChange={dataadding}
                      className="w-full border rounded-md px-4 py-3 mb-4"
                    />

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <input
                        type="text"
                        placeholder="City"
                        name="city"
                        onChange={dataadding}
                        className="border rounded-md px-4 py-3"
                      />
                      <input
                        type="text"
                        placeholder="State"
                        name="state"
                        onChange={dataadding}
                        className="border rounded-md px-4 py-3"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <input
                        type="text"
                        placeholder="Pin Code"
                        name="pin_code"
                        onChange={dataadding}
                        className="border rounded-md px-4 py-3"
                      />
                      <input
                        type="text"
                        placeholder="Country"
                        name="country"
                        onChange={dataadding}
                        className="border rounded-md px-4 py-3"
                      />
                    </div>

                    <input
                      type="text"
                      placeholder="Phone"
                      name="phone"
                      onChange={dataadding}
                      className="w-full border rounded-md px-4 py-3"
                    />
                  </div>
                )}

                {/* ===== PLACE ORDER BUTTON ===== */}
                <button
                  onClick={datasubmit}
                  className="mt-4 w-full bg-orange-500 text-white py-2 rounded-lg"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Cart;
