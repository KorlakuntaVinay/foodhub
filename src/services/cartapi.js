import axios from "axios";

const BASE_URL = "https://food-backend-wb32.onrender.com/api/cart";
// const BASE_URL = "https://food-mangement-task.onrender.com/api/cart/add";

export const addToCart = (data, token) =>
  axios.post(`${BASE_URL}/add`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

export const getCartAPI = async (userId, token) => {
  try {
    const res = await axios.get(
      `https://food-backend-wb32.onrender.com/api/cart/${userId}`,

      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return res.data;
  } catch (err) {
    console.error("Failed to fetch cart API:", err);
    return { items: [] };
  }
};

export const removeCartItem = (foodId, token) =>
  axios.delete(`${BASE_URL}/remove?foodId=${foodId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const updateCart = (data, token) =>
  axios.put(`${BASE_URL}/update`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

export const clearCart = (token) => {
  return axios.delete(`${BASE_URL}/clear`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
