// import { useMemo, useState } from "react";
// import { assets } from "../assets/assets";
// import { useAuth } from "../Context/AuthContext";

// export default function FoodCard({
//   food,
//   openModal,
//   cartItems,
//   addToCart,
//   removeFromCart,
// }) {
//   const { user } = useAuth();
//   const [loading, setLoading] = useState(false);

//   // stable rating
//   const rating = useMemo(() => {
//     return (Math.random() * 2.5 + 2.5).toFixed(1);
//   }, []);

//   // ✅ backend-synced count
//   const count = cartItems?.[food._id]?.quantity || 0;

//   const increment = async () => {
//     if (!user) return alert("Please login first");

//     try {
//       setLoading(true);
//       await addToCart(food._id);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const decrement = async () => {
//     if (count === 0) return;

//     try {
//       setLoading(true);
//       await removeFromCart(food._id);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-3 shadow hover:scale-105 transition rounded-xl">
//       <img
//         src={food.image}
//         alt={food.name}
//         className="w-full h-80 object-cover rounded-xl sm:h-48 lg:h-56 cursor-pointer"
//         onClick={openModal}
//       />

//       <div className="flex justify-between items-center mt-4 px-2">
//         <div>
//           <h2 className="font-medium text-lg">{food.name}</h2>
//           <p className="text-sm">⭐ {rating}</p>
//           <span className="text-green-600 font-semibold">₹{food.price}</span>
//         </div>

//         <div className="flex items-center gap-2">
//           {count === 0 ? (
//             <img
//               src={assets.add_icon_white}
//               alt="add"
//               onClick={increment}
//               className={`cursor-pointer ${
//                 loading && "opacity-50 pointer-events-none"
//               }`}
//             />
//           ) : (
//             <div className="flex items-center gap-2">
//               <img
//                 src={assets.remove_icon_red}
//                 alt="remove"
//                 onClick={decrement}
//                 className={`cursor-pointer ${
//                   loading && "opacity-50 pointer-events-none"
//                 }`}
//               />
//               <p>{count}</p>
//               <img
//                 src={assets.add_icon_green}
//                 alt="add"
//                 onClick={increment}
//                 className={`cursor-pointer ${
//                   loading && "opacity-50 pointer-events-none"
//                 }`}
//               />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import { useMemo, useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { useAuth } from "../Context/AuthContext";
import toast from "react-hot-toast";
import { updateCartQuantity } from "../services/cartapi";
import axios from "axios";
export default function FoodCard({
  food,
  openModal,
  cartItems,
  addToCart,
  removeFromCart,
}) {
  const { user, token, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);

  const rating = useMemo(() => (Math.random() * 2.5 + 2.5).toFixed(1), []);

  const foodId = food._id || food.food?._id;
  const count = cartItems?.[foodId]?.quantity || 0;

  const [cartdata, setCartData] = useState([]);
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

  // const handleQuantity = async (foodId, type) => {
  //   if (!isAuthenticated || !token) {
  //     toast.error("Please login first");
  //     console.log(foodId);
  //     return;
  //   }

  //   try {
  //     await updateCartQuantity({ foodId, type }, token);

  //     // 🔥 Optimistic UI update
  //     setCartData((prev) => {
  //       const updated = { ...prev };

  //       if (!updated[foodId]) return prev;

  //       if (type === "increase") {
  //         updated[foodId].quantity += 1;
  //       }

  //       if (type === "decrease") {
  //         if (updated[foodId].quantity <= 1) {
  //           delete updated[foodId];
  //         } else {
  //           updated[foodId].quantity -= 1;
  //         }
  //       }

  //       return updated;
  //     });
  //   } catch (err) {
  //     console.error("Quantity update failed:", err);
  //     toast.error("Failed to update quantity");
  //   }
  // };
  const handleQuantity = async (foodId, type) => {
    if (!isAuthenticated || !token) {
      toast.error("Please login first");
      return;
    }

    setCartData((prev) =>
      prev.map((item) =>
        item.foodId === foodId
          ? {
              ...item,
              quantity:
                type === "increase"
                  ? item.quantity + 1
                  : Math.max(1, item.quantity - 1),
            }
          : item,
      ),
    );
    toast.success(
      type === "increase" ? "Quantity increased" : "Quantity decreased",
      { duration: 800 },
    );

    try {
      await updateCartQuantity({ foodId, type }, token);
    } catch (err) {
      setCartData((prev) =>
        prev.map((item) =>
          item.foodId === foodId
            ? {
                ...item,
                quantity:
                  type === "increase" ? item.quantity - 1 : item.quantity + 1,
              }
            : item,
        ),
      );

      toast.error("Failed to update quantity");
    }
  };

  const items = Object.values(cartdata || []);
  const subtotal = items.reduce(
    (acc, food) => acc + food.quantity * food.price,
    0,
  );

  const increment = async () => {
    if (!user) {
      toast.error("Please login first");
      return;
    }

    if (!addToCart) {
      console.error("addToCart function missing in props");
      return;
    }

    try {
      setLoading(true);
      await addToCart(food);
    } catch (err) {
      toast.error("Failed to add item");
    } finally {
      setLoading(false);
    }
  };

  const decrement = async () => {
    if (count === 0) return;

    if (!removeFromCart) {
      console.error("removeFromCart function missing in props");
      return;
    }

    try {
      setLoading(true);
      await removeFromCart(foodId);
    } catch (err) {
      toast.error("Failed to remove item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3 shadow hover:scale-105 transition rounded-xl bg-white">
      <img
        src={food.image}
        alt={food.name}
        className="w-full h-80 object-cover rounded-xl sm:h-48 lg:h-56 cursor-pointer"
        onClick={openModal}
      />

      <div className="flex justify-between items-center mt-4 px-2">
        <div>
          <h2 className="font-medium text-lg">{food.name}</h2>
          <p className="text-sm">⭐ {rating}</p>
          <span className="text-green-600 font-semibold">₹{food.price}</span>
        </div>

        <div className="flex items-center gap-2">
          {count === 0 ? (
            <img
              src={assets.add_icon_white}
              alt="add"
              onClick={increment}
              className={`cursor-pointer ${loading && "opacity-50 pointer-events-none"}`}
            />
          ) : (
            <div className="flex items-center gap-2">
              <img
                src={assets.remove_icon_red}
                alt="remove"
                onClick={() => handleQuantity(food._id, "decrease")}
                className={`cursor-pointer ${loading && "opacity-50 pointer-events-none"}`}
              />
              <p className="font-semibold">{count}</p>
              <img
                src={assets.add_icon_green}
                alt="add"
                onClick={increment}
                className={`cursor-pointer ${loading && "opacity-50 pointer-events-none"}`}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
