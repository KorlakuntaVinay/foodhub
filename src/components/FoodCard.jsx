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

import { useMemo, useState } from "react";
import { assets } from "../assets/assets";
import { useAuth } from "../Context/AuthContext";
import toast from "react-hot-toast";

export default function FoodCard({
  food,
  openModal,
  cartItems,
  addToCart,
  removeFromCart,
}) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const rating = useMemo(() => (Math.random() * 2.5 + 2.5).toFixed(1), []);

  const foodId = food._id || food.food?._id;
  const count = cartItems?.[foodId]?.quantity || 0;

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
                onClick={decrement}
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
