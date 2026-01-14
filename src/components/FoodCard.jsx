// import { useState } from "react";
// import { assets } from "../assets/assets";
// import { useCart } from "../Context/CartContext";

// const FoodCard = ({ item, openModal }) => {
//   const { cartItems, addToCart, removeFromCart } = useCart();
//   const Count = cartItems[item.idMeal] || 0;
//   return (
//     <div className="p-3   shadow hover:scale-105 transition cursor-pointer rounded-xl sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//       <img
//         src={item.strMealThumb}
//         className=" w-full h-80 object-cover rounded-xl sm:h-48 lg:h-56"
//         onClick={() => openModal(item.idMeal)}
//       />
//       <div className="w-full px-4 py-4 flex justify-between items-center md:px-8">
//         <div className="justify-between items-row">
//           <h2 className="font-medium  mask-type-alpha text-xl mt-2 sm:text-base">
//             {item.strMeal}
//           </h2>
//           <p className="text-sm ">
//             ⭐ {(Math.floor(Math.random() * 9) + 2) / 2}{" "}
//           </p>
//           <span>{item.strMeal}</span>
//         </div>
//         <div className="justify-between ">
//           <div className="  flex justify-between items-center gap-2 ">
//             {!Count ? (
//               <img
//                 src={assets.add_icon_white}
//                 onClick={() => addToCart(item.idMeal)}
//                 className="cursor-pointer"
//               />
//             ) : (
//               <div className="flex items-center gap-2">
//                 <img
//                   src={assets.remove_icon_red}
//                   onClick={() => removeFromCart(item.idMeal)}
//                   className="cursor-pointer"
//                 />
//                 <p>{Count}</p>
//                 <img
//                   src={assets.add_icon_green}
//                   onClick={() => addToCart(item.idMeal)}
//                   className="cursor-pointer"
//                 />
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default FoodCard;

import { assets } from "../assets/assets";
import { useCart } from "../Context/CartContext";
import { useFood } from "../Context/FoodContext";

const FoodCard = ({ item, openModal }) => {
  const { cartItems, addToCart, removeFromCart } = useCart();
  const { getFullMeal } = useFood();

  const cartItem = cartItems[item.idMeal];
  const count = cartItem?.quantity || 0;

  const handleAddToCart = async () => {
    const fullMeal = await getFullMeal(item.idMeal);
    if (fullMeal) {
      addToCart(fullMeal);
    }
  };

  return (
    <div className="p-3 shadow hover:scale-105 transition cursor-pointer rounded-xl">
      <img
        src={item.strMealThumb}
        className="w-full h-80 object-cover rounded-xl sm:h-48 lg:h-56"
        onClick={() => openModal(item.idMeal)}
        alt={item.strMeal}
      />

      <div className="w-full px-4 py-4 flex justify-between items-center md:px-8">
        <div>
          <h2 className="font-medium text-xl mt-2 sm:text-base">
            {item.strMeal}
          </h2>
          <p className="text-sm">
            ⭐ {(Math.floor(Math.random() * 9) + 2) / 2}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {!count ? (
            <img
              src={assets.add_icon_white}
              onClick={handleAddToCart}
              className="cursor-pointer"
              alt="add"
            />
          ) : (
            <div className="flex items-center gap-2">
              <img
                src={assets.remove_icon_red}
                onClick={() => removeFromCart(item.idMeal)}
                className="cursor-pointer"
                alt="remove"
              />
              <p>{count}</p>
              <img
                src={assets.add_icon_green}
                onClick={handleAddToCart}
                className="cursor-pointer"
                alt="add"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
