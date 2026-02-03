import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  addToCart as addCartAPI,
  removeCartItem as removeCartAPI,
  clearCart as clearCartAPI,
  updateCart as updateCartAPI,
  getCartAPI,
} from "../services/cartapi";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, token, isAuthenticated } = useAuth();
  // console.log(user);
  /* ================= CART STATE ================= */
  const [cartItems, setCartItems] = useState({});

  useEffect(() => {
    if (!token) {
      setCartItems({});
    }
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      if (!user) return;

      try {
        const data = await getCartAPI(user.id, token);

        const itemsArray = data?.items || [];

        const cartObj = {};
        itemsArray.forEach((item) => {
          cartObj[item.foodId] = {
            quantity: item.quantity,
            ...item.food,
          };
        });
        setCartItems(cartObj);
      } catch (err) {
        console.error("Failed to fetch cart:", err);
      }
    };

    fetchCart();
  }, [user, token]);

  /* ================= ADD TO CART ================= */
  const addToCart = async (food) => {
    if (!isAuthenticated || !user?.id || !token) {
      toast.error("Please log in to add items to your cart");
      return;
    }

    const foodId = food._id || food.food?._id;
    if (!foodId) {
      toast.error("Invalid food item");
      return;
    }

    try {
      await addCartAPI(
        {
          foodId,
          userId: user.id,
          quantity: 1,
        },
        token,
      );

      // const normalizedFood = {
      //   _id: foodId,
      //   name: food.name || food.food?.name,
      //   image: food.image || food.food?.image,
      //   price: food.price || food.food?.price || 100,
      // };

      setCartItems((prev) => ({
        ...prev,
        [foodId]: {
          ...prev,
          quantity: (prev[foodId]?.quantity || 0) + 1,
        },
      }));

      toast.success("Added to cart");
    } catch (err) {
      console.error("Add to cart failed:", err);
      toast.error("Failed to add to cart");
    }
  };
  // useEffect(() => {
  //   if (foodId) {
  //     addToCart();
  //   }
  // }, []);

  /* ================= REMOVE FROM CART ================= */
  const removeFromCart = async (foodId) => {
    if (!isAuthenticated || !token || !foodId) return;

    try {
      await removeCartAPI(foodId, token);

      setCartItems((prev) => {
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
  /* ================= UPDATE CART ================= */
  const updateCart = async (foodId, quantity) => {
    if (!isAuthenticated || !token || !foodId) return;

    // remove item if quantity <= 0
    if (quantity <= 0) {
      removeFromCart(foodId);
      return;
    }

    try {
      await updateCartAPI(
        {
          foodId,
          quantity,
        },
        token,
      );

      setCartItems((prev) => ({
        ...prev,
        [foodId]: {
          ...prev[foodId],
          quantity,
        },
      }));
    } catch (err) {
      console.error("Update cart failed:", err);
      toast.error("Failed to update cart");
    }
  };

  /* ================= CLEAR CART ================= */
  const clearCart = async () => {
    try {
      if (!isAuthenticated || !token) return;

      await clearCartAPI(token); // ✅ token only
      setCartItems({});
      toast.success("Cart cleared");
    } catch (err) {
      console.error("Backend clear cart failed:", err);
      toast.error("Failed to clear cart");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
