import axios from "axios";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1/";

export const getAllMeals = () => axios.get(`${BASE_URL}search.php?s=`);
export const getMealById = (id) => axios.get(`${BASE_URL}lookup.php?i=${id}`);
export const getAreas = () => axios.get(`${BASE_URL}list.php?a=list`);



export const getMealsByArea = (area) =>  axios.get(`${BASE_URL}filter.php?a=${area}`);

