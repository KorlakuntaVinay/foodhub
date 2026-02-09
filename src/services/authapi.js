import axios from "axios";

const BASE_URL = "https://food-backend-wb32.onrender.com/api/auth";
// const BASE_URL = "https://food-mangement-task.onrender.com/api/auth";
export const signupApi = (data) => axios.post(`${BASE_URL}/signup`, data);

export const loginApi = (data) => axios.post(`${BASE_URL}/signin`, data);
