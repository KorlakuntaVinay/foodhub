// import axios from "axios";

// const API = axios.create({
//   baseURL: "https://food-backend-wb32.onrender.com/api/foods",
//   timeout: 10000,
// });

// export const getAllFoods = (page = 1, limit = 10) => {
//   return API.get(`/?page=${page}&limit=${limit}`);
// };

// export const getFoodsByArea = (area, page = 1, limit = 5) => {
//   return API.get(`/?area=${area}&page=${page}&limit=${limit}`);
// };

// export const getFoodsAsc = () => {
//   return API.get(`/?sort=name_asc`);
// };

// export const getFoodsDesc = () => {
//   return API.get(`/?sort=name_desc`);
// };

// export const getFoodAreas = () => {
//   return API.get(`/areas`);
// };

// export const getFoodById = (foodId) => {
//   if (!foodId) throw new Error("foodId is required");
//   return API.get(`/?foodId=${foodId}`);
// };

import axios from "axios";

const BASE_URL = "https://food-backend-wb32.onrender.com/api/foods";

export const getAllFoods = async (page = 1, limit = 25) => {
  try {
    const res = await axios.get(`${BASE_URL}?page=${page}&limit=${limit}`);
    return res;
  } catch (error) {
    console.error("Error fetching foods:", error);
    throw error;
  }
};

export const getFoodById = async (foodId) => {
  if (!foodId) throw new Error("foodId is required");

  try {
    const res = await axios.get(`${BASE_URL}?foodId=${foodId}`);
    return res;
  } catch (error) {
    console.error("Error fetching food by ID:", error);
    throw error;
  }
};

export const getFoodsByArea = async (area, page = 1, limit = 10) => {
  try {
    const res = await axios.get(
      `${BASE_URL}?area=${area}&page=${page}&limit=${limit}`,
    );
    return res;
  } catch (error) {
    console.error("Error fetching foods by area:", error);
    throw error;
  }
};

export const getFoodsAsc = async () => {
  try {
    const res = await axios.get(`${BASE_URL}?sort=name_asc`);
    return res;
  } catch (error) {
    console.error("Error sorting foods ASC:", error);
    throw error;
  }
};

export const getFoodsDesc = async () => {
  try {
    const res = await axios.get(`${BASE_URL}?sort=name_desc`);
    return res;
  } catch (error) {
    console.error("Error sorting foods DESC:", error);
    throw error;
  }
};

export const getFoodAreas = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/areas`);
    return res;
  } catch (error) {
    console.error("Error fetching food areas:", error);
    throw error;
  }
};

export const getFoodImage = (image) => {
  if (!image) throw new Error("image is required");
  return `${BASE_URL}/image/${image}`;
};
