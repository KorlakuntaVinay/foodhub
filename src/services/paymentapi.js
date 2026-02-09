import axios from "axios";

const BASE_URL = "https://food-backend-wb32.onrender.com/api/payments";

export const readytopayment = (Data, token) =>
  axios.post(`${BASE_URL}/pay`, Data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
