// import { createContext, useContext, useState } from "react";

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState({});

//   const addToCart = (id) => {
//     setCartItems((prev) => ({
//       ...prev,
//       [id]: (prev[id] || 0) + 1,
//     }));
//   };

//   const removeFromCart = (id) => {
//     setCartItems((prev) => {
//       if (!prev[id]) return prev;
//       return { ...prev, [id]: prev[id] - 1 };
//     });
//   };

//   return (
//     <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);

import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});

  // Add full meal object
  const addToCart = (meal) => {
    setCartItems((prev) => ({
      ...prev,
      [meal.idMeal]: {
        ...meal,
        quantity: (prev[meal.idMeal]?.quantity || 0) + 1,
      },
    }));
  };

  // Decrease quantity or remove
  const removeFromCart = (idMeal) => {
    setCartItems((prev) => {
      if (!prev[idMeal]) return prev;

      if (prev[idMeal].quantity === 1) {
        const updated = { ...prev };
        delete updated[idMeal];
        return updated;
      }

      return {
        ...prev,
        [idMeal]: {
          ...prev[idMeal],
          quantity: prev[idMeal].quantity - 1,
        },
      };
    });
  };

  const clearCart = () => setCartItems({});

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
