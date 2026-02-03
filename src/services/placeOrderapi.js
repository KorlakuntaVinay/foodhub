import axios from "axios";

const BASE_URL = "https://food-backend-wb32.onrender.com/api/orders";
// const BASE_URL = "https://food-mangement-task.onrender.com/api/orders/place";

export const orderData = (Data, token) =>
  axios.post(`${BASE_URL}/place`, Data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
