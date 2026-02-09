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

// export const getOrderById = async (orderId, token) => {
//   try {
//     const res = await axios.get(`${BASE_URL}/${orderId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     console.log(res);
//     return res; //
//   } catch (error) {
//     console.error(
//       "Get order by ID failed:",
//       error.response?.data || error.message,
//     );
//     throw error; // rethrow so component can handle it
//   }
// };
