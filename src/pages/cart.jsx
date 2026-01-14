// import React from "react";
// import { useCart } from "../Context/CartContext";
// import { useFood } from "../Context/FoodContext";
// import { getAreas } from "../services/api";

// const Cart = () => {
//   const { cartItems, removeFromCart } = useCart();
//   const { meals } = useFood();

//   console.log("cartItems:", cartItems);
//   console.log("meals length:", meals.length);
//   console.log(getAreas);

//   const items = meals.filter((item) => cartItems[item.idMeal] > 0);
//   const subtotal = items.reduce((acc, item) => {
//     const qty = cartItems[item.idMeal];
//     const price = 100;
//     return acc + price * qty;
//   }, 0);

//   if (items.length === 0) {
//     return <div className="text-center mt-10 text-gray-500">Cart is empty</div>;
//   }

//   return (
//     <div className="relative  w-[96%] mx-auto mt-6 rounded-xl min-h-screen bg-white p-4">
//       <div>
//         <div className="grid grid-cols-6 font-semibold  pb-2 text-black">
//           <p>Item</p>
//           <p>Title</p>
//           <p>Price</p>
//           <p>Qty</p>
//           <p>Total</p>
//           <p>Remove</p>
//         </div>

//         {items.map((item) => {
//           const qty = cartItems[item.idMeal];
//           const price = 100;

//           return (
//             <div
//               key={item.idMeal}
//               className="grid grid-cols-6 items-center py-3  text-black"
//             >
//               <img
//                 src={item.strMealThumb}
//                 alt={item.strMeal}
//                 className="w-14 h-14 rounded"
//               />
//               <p>{item.strMeal}</p>
//               <p>₹{price}</p>
//               <p>{qty}</p>
//               <p>₹{price * qty}</p>
//               <button
//                 onClick={() => removeFromCart(item.idMeal)}
//                 className="text-red-500"
//               >
//                 X
//               </button>
//             </div>
//           );
//         })}
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
//           <div className="flex justify-between font-semibold text-lg  pt-2 mt-2">
//             <span>Total</span>
//             <span>{subtotal + 30}</span>
//           </div>

//           <button className="mt-4 w-full bg-orange-500 text-white py-2 rounded-lg ">
//             PROCEED TO CHECKOUT
//           </button>
//         </div>
//         <div className="bg-white p-6 rounded-xl ">
//           <div>
//             <p className="text-lg font-semibold mb-4">
//               If you have a Promo code, Enter it here
//             </p>
//             <div className=" flex gap-2 ">
//               <input
//                 type="text"
//                 placeholder="promo code"
//                 className="flex-1 border rounded-lg px-4 py-2 "
//               />
//               <button className="bg-orange-500 text-white px-4 py-2 rounded-lg ">
//                 Submit
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//       ;
//     </div>
//   );
// };

// export default Cart;
import React from "react";
import { useCart } from "../Context/CartContext";

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();

  const items = Object.values(cartItems);

  const PRICE = 100;

  const subtotal = items.reduce((acc, item) => acc + item.quantity * PRICE, 0);

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
        <div className="grid grid-cols-6 font-semibold pb-2 text-black">
          <p>Item</p>
          <p>Title</p>

          <p>Price</p>
          <p>Qty</p>
          <p>Total</p>
          <p>Remove</p>
        </div>

        {items.map((item) => (
          <div
            key={item.idMeal}
            className="grid grid-cols-6 items-center py-3 text-black"
          >
            <img
              src={item.strMealThumb}
              alt={item.strMeal}
              className="w-14 h-14 rounded"
            />

            <p>{item.strMeal}</p>

            <p>₹{PRICE}</p>

            <p>{item.quantity}</p>

            <p>₹{PRICE * item.quantity}</p>

            <button
              onClick={() => removeFromCart(item.idMeal)}
              className="text-red-500 font-semibold"
            >
              X
            </button>
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

          <button className="mt-4 w-full bg-orange-500 text-white py-2 rounded-lg">
            PROCEED TO CHECKOUT
          </button>
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
