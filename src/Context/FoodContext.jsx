// import { createContext, useContext, useEffect, useState } from "react";
// import { getAllMeals } from "../services/api";

// const FoodContext = createContext();

// export const FoodProvider = ({ children }) => {
//   const [meals, setMeals] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     getAllMeals()
//       .then((res) => setMeals(res.data.meals || []))
//       .finally(() => setLoading(false));
//   }, []);

//   return (
//     <FoodContext.Provider value={{ meals, loading }}>
//       {children}
//     </FoodContext.Provider>
//   );
// };

// export const useFood = () => useContext(FoodContext);
import { createContext, useContext, useEffect, useState } from "react";
import { getAllMeals, getMealsByArea, getMealById } from "../services/api";

const FoodContext = createContext();

export const FoodProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllMeals = async () => {
    setLoading(true);
    try {
      const res = await getAllMeals();
      setMeals(res?.data?.meals || []);
    } finally {
      setLoading(false);
    }
  };

  const fetchMealsByArea = async (area) => {
    if (!area) {
      fetchAllMeals();
      return;
    }

    setLoading(true);
    try {
      const res = await getMealsByArea(area);
      setMeals(res?.data?.meals || []);
    } finally {
      setLoading(false);
    }
  };

  const getFullMeal = async (idMeal) => {
    const res = await getMealById(idMeal);
    return res?.data?.meals?.[0];
  };

  useEffect(() => {
    fetchAllMeals();
  }, []);

  return (
    <FoodContext.Provider
      value={{
        meals,
        loading,
        fetchMealsByArea,
        getFullMeal,
      }}
    >
      {children}
    </FoodContext.Provider>
  );
};

export const useFood = () => useContext(FoodContext);
