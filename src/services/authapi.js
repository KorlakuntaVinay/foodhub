import axios from "axios";

const BASE_URL = "https://food-backend-wb32.onrender.com/api/auth";

export const signupApi = (data) =>
  axios.post(`${BASE_URL}/signup`, data);

export const loginApi = (data) =>{
  axios.post(`${BASE_URL}/signin`, data)
  const admindata = [
      { _id: "1", name: "Sandeep", email: "sandeep@gmail.com" },
      { _id: "2", name: "Anita", email: "anita@gmail.com" },
      { _id: "3", name: "Kiran", email: "kiran@gmail.com" },
    ];

    dispatch({ type: "FETCH_USERS_SUCCESS", payload: admindata });
};
