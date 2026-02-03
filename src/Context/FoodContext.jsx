/* eslint-disable react-refresh/only-export-components */
// // import { createContext, useContext, useEffect, useState } from "react";
// // import { getAllMeals } from "../services/api";

// // const FoodContext = createContext();

// // export const FoodProvider = ({ children }) => {
// //   const [meals, setMeals] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     getAllMeals()
// //       .then((res) => setMeals(res.data.meals || []))
// //       .finally(() => setLoading(false));
// //   }, []);

// //   return (
// //     <FoodContext.Provider value={{ meals, loading }}>
// //       {children}
// //     </FoodContext.Provider>
// //   );
// // };

// // export const useFood = () => useContext(FoodContext);
// import { createContext, useContext, useEffect, useState } from "react";
// import { getAllMeals, getMealsByArea, getMealById } from "../services/api";

// const FoodContext = createContext();

// export const FoodProvider = ({ children }) => {
//   const [meals, setMeals] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fetchAllMeals = async () => {
//     setLoading(true);
//     try {
//       const res = await getAllMeals();
//       setMeals(res?.data?.meals || []);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchMealsByArea = async (area) => {
//     if (!area) {
//       fetchAllMeals();
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await getMealsByArea(area);
//       setMeals(res?.data?.meals || []);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getFullMeal = async (idMeal) => {
//     const res = await getMealById(idMeal);
//     return res?.data?.meals?.[0];
//   };

//   useEffect(() => {
//     fetchAllMeals();
//   }, []);

//   return (
//     <FoodContext.Provider
//       value={{
//         meals,
//         loading,
//         fetchMealsByArea,
//         getFullMeal,
//       }}
//     >
//       {children}
//     </FoodContext.Provider>
//   );
// };

// // eslint-disable-next-line react-refresh/only-export-components
// export const useFood = () => useContext(FoodContext);
// import { createContext, useContext, useState, useRef } from "react";
// import { getAllMeals, getMealById, getMealsByArea } from "../services/foodapi";

// const FoodContext = createContext();

// export const FoodProvider = ({ children }) => {
//   const [meals, setMeals] = useState([]); // ✅ always array
//   const [loading, setLoading] = useState(false);

//   // 🔒 Prevent duplicate calls in React StrictMode (DEV)
//   const lastAreaRef = useRef(null);

//   // 🟢 Helper: always normalize meals to array
//   const normalizeMeals = (res) =>
//     Array.isArray(res?.data?.meals) ? res.data.meals : [];

//   // ✅ Fetch all meals
//   const fetchMeals = async () => {
//     try {
//       setLoading(true);
//       lastAreaRef.current = "ALL";

//       const res = await getAllMeals();
//       setMeals(normalizeMeals(res));
//     } catch (err) {
//       console.error(" Error fetching meals:", err);
//       setMeals([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Fetch single meal (Modal / Details)
//   const getFullMeal = async (id) => {
//     if (!id) return null;

//     try {
//       const res = await getMealById(id);
//       return res?.data?.meals?.[0] ?? null; //  ThemealDB single item
//     } catch (err) {
//       console.error(" Failed to fetch meal:", err);
//       return null;
//     }
//   };

//   // ✅ Fetch meals by area
//   const fetchMealsByArea = async (area) => {
//     if (!area) return;

//     // Handle "All"
//     if (area === "All") {
//       if (lastAreaRef.current === "ALL") return;
//       return fetchMeals();
//     }

//     // Prevent duplicate fetch
//     if (lastAreaRef.current === area) return;

//     try {
//       setLoading(true);
//       lastAreaRef.current = area;

//       console.log(" Fetching meals for area:", area);

//       const res = await getMealsByArea(area);
//       setMeals(normalizeMeals(res));
//     } catch (err) {
//       console.error(" Error fetching meals by area:", err);
//       setMeals([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <FoodContext.Provider
//       value={{
//         meals,
//         loading,
//         fetchMeals,
//         fetchMealsByArea,
//         getFullMeal,
//       }}
//     >
//       {children}
//     </FoodContext.Provider>
//   );
// };

// export const useFood = () => {
//   const context = useContext(FoodContext);
//   if (!context) {
//     throw new Error("useFood must be used inside FoodProvider");
//   }
//   return context;
// };

// import { createContext, useContext, useState, useRef } from "react";
// import { getAllFoods, getFoodById, getFoodsByArea } from "../services/foodapi";

// const FoodContext = createContext();

// export const FoodProvider = ({ children }) => {
//   const [meals, setMeals] = useState([]); // Always array
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Ref to prevent duplicate fetches in StrictMode
//   const lastAreaRef = useRef(null);

//   // Helper: normalize API response to array
//   const normalizeMeals = (res) =>
//     Array.isArray(res?.data?.meals) ? res.data.meals : [];

//   // Fetch all meals
//   const fetchMeals = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       lastAreaRef.current = "ALL";

//       const res = await getAllFoods();
//       setMeals(normalizeMeals(res));
//     } catch (err) {
//       console.error(" Error fetching meals:", err);
//       setMeals([]);
//       setError("Failed to load meals");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch single meal by ID
//   const getFullMeal = async (id) => {
//     if (!id) return null;

//     try {
//       const res = await getFoodById(id);
//       return res?.data?.meals?.[0] ?? null;
//     } catch (err) {
//       console.error(" Failed to fetch meal:", err);
//       return null;
//     }
//   };

//   // Fetch meals filtered by area
//   const fetchMealsByArea = async (area) => {
//     if (!area) return;

//     // Handle "All" area
//     if (area.toLowerCase() === "all") {
//       if (lastAreaRef.current === "ALL") return;
//       return fetchMeals();
//     }

//     // Prevent duplicate fetch for same area
//     if (lastAreaRef.current === area) return;

//     try {
//       setLoading(true);
//       setError(null);
//       lastAreaRef.current = area;

//       console.log("🔹 Fetching meals for area:", area);
//       const res = await getFoodsByArea(area);
//       setMeals(normalizeMeals(res));
//     } catch (err) {
//       console.error(" Error fetching meals by area:", err);
//       setMeals([]);
//       setError(`Failed to load meals for ${area}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <FoodContext.Provider
//       value={{
//         meals,
//         loading,
//         error,
//         fetchMeals,
//         fetchMealsByArea,
//         getFullMeal,
//       }}
//     >
//       {children}
//     </FoodContext.Provider>
//   );
// };

// // Custom hook for consuming context
// export const useFood = () => {
//   const context = useContext(FoodContext);
//   if (!context) {
//     throw new Error("useFood must be used inside FoodProvider");
//   }
//   return context;
// };
