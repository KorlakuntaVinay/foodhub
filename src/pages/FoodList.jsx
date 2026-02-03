// import { useEffect, useState, useMemo } from "react";
// import { getAllFoods } from "../services/foodapi";
// import FoodCard from "../components/FoodCard";
// import Filters from "../components/Filters";
// import Pagination from "../components/Pagination";
// import Model from "../components/Model";

// export default function FoodList() {
//   const [foods, setFoods] = useState([]);
//   const [error, setError] = useState("");
//   const [selectedArea, setSelectedArea] = useState("");
//   const [areas, setAreas] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [modalFood, setModalFood] = useState(null);
//   const [sortType, setSortType] = useState("");

//   const foodsPerPage = 8;

//   // Fetch foods once
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await getAllFoods();
//         const data = res.data.data || [];
//         setFoods(data);

//         const uniqueAreas = [...new Set(data.map((f) => f.area))];
//         setAreas(uniqueAreas);
//       } catch (err) {
//         setError("Failed to load foods");
//         console.error(err);
//       }
//     };

//     fetchData();
//   }, []);

//   // Filtered and sorted foods
//   const filteredAndSortedFoods = useMemo(() => {
//     let result = [...foods];

//     // Filter by area
//     if (selectedArea) {
//       result = result.filter((f) => f.area === selectedArea);
//     }

//     // Sort by name
//     if (sortType === "asc") {
//       result.sort((a, b) => a.name.localeCompare(b.name));
//     } else if (sortType === "desc") {
//       result.sort((a, b) => b.name.localeCompare(a.name));
//     }

//     return result;
//   }, [foods, selectedArea, sortType]);

//   // Pagination
//   const indexOfLast = currentPage * foodsPerPage;
//   const indexOfFirst = indexOfLast - foodsPerPage;
//   const currentFoods = filteredAndSortedFoods.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(filteredAndSortedFoods.length / foodsPerPage);

//   const handlePageChange = (page) => setCurrentPage(page);
//   const clearFilters = () => {
//     setSelectedArea("");
//     setSortType("");
//     setCurrentPage(1);
//   };

//   if (error)
//     return (
//       <div className="text-center text-red-500 font-semibold">{error}</div>
//     );

//   return (
//     <div className="w-[95%] mx-auto px-4 py-8">
//       <Filters
//         areas={areas}
//         selectedArea={selectedArea}
//         setSelectedArea={setSelectedArea}
//         sortType={sortType}
//         setSortType={setSortType}
//         clearFilters={clearFilters}
//       />

//       {currentFoods.length === 0 ? (
//         <p className="text-center text-gray-500">No foods found</p>
//       ) : (
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
//           {currentFoods.map((food) => (
//             <FoodCard
//               key={food._id || food.foodId}
//               food={food}
//               openModal={() => setModalFood(food)}
//             />
//           ))}
//         </div>
//       )}

//       <Pagination
//         currentPage={currentPage}
//         totalPages={totalPages}
//         onPageChange={handlePageChange}
//       />

//       <Model
//         food={modalFood}
//         isOpen={!!modalFood}
//         onClose={() => setModalFood(null)}
//       />
//     </div>
//   );
// }

import { useEffect, useState, useMemo } from "react";
import { getAllFoods } from "../services/foodapi";
import FoodCard from "../components/FoodCard";
import Filters from "../components/Filters";
import Pagination from "../components/Pagination";
import Model from "../components/Model";
import { useAuth } from "../Context/AuthContext";
import {
  getCartAPI,
  addToCart as addCartAPI,
  removeCartItem as removeCartAPI,
} from "../services/cartapi";
import toast from "react-hot-toast";

export default function FoodList() {
  const { user, token, isAuthenticated } = useAuth();

  const [foods, setFoods] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [error, setError] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [areas, setAreas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalFood, setModalFood] = useState(null);
  const [sortType, setSortType] = useState("");

  const foodsPerPage = 8;

  /* ================= FETCH FOODS ================= */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllFoods();
        const data = res.data.data || [];
        setFoods(data);

        const uniqueAreas = [...new Set(data.map((f) => f.area))];
        setAreas(uniqueAreas);
      } catch (err) {
        setError("Failed to load foods");
        console.error(err);
      }
    };

    fetchData();
  }, []);

  /* ================= FETCH CART ================= */
  useEffect(() => {
    const fetchCart = async () => {
      if (!user?.id || !token) return;

      try {
        const data = await getCartAPI(user.id, token);
        const itemsArray = data?.items || [];

        const cartObj = {};
        itemsArray.forEach((item) => {
          cartObj[item.foodId] = {
            quantity: item.quantity,
            ...item.food,
          };
        });

        setCartItems(cartObj);
      } catch (err) {
        console.error("Failed to fetch cart:", err);
      }
    };

    fetchCart();
  }, [user, token]);

  /* ================= ADD TO CART ================= */
  const addToCart = async (food) => {
    if (!isAuthenticated || !user?.id || !token) {
      toast.error("Please log in to add items to your cart");
      return;
    }

    const foodId = food._id || food.food?._id;
    if (!foodId) return;

    try {
      await addCartAPI({ foodId, userId: user.id, quantity: 1 }, token);

      setCartItems((prev) => ({
        ...prev,
        [foodId]: {
          ...food,
          quantity: (prev[foodId]?.quantity || 0) + 1,
        },
      }));

      toast.success("Added to cart");
    } catch (err) {
      console.error("Add to cart failed:", err);
      toast.error("Failed to add item");
    }
  };

  /* ================= REMOVE FROM CART ================= */
  const removeFromCart = async (foodId) => {
    if (!isAuthenticated || !token || !foodId) return;

    try {
      await removeCartAPI(foodId, token);

      setCartItems((prev) => {
        const updated = { ...prev };
        if (!updated[foodId]) return prev;

        if (updated[foodId]?.quantity <= 1) {
          delete updated[foodId];
        } else {
          updated[foodId] = {
            ...updated[foodId],
            quantity: updated[foodId].quantity - 1,
          };
        }

        return updated;
      });

      toast.success("Removed from cart");
    } catch (err) {
      console.error("Remove from cart failed:", err);
      toast.error("Failed to remove item");
    }
  };

  /* ================= FILTER + SORT ================= */
  const filteredAndSortedFoods = useMemo(() => {
    let result = [...foods];

    if (selectedArea) result = result.filter((f) => f.area === selectedArea);

    if (sortType === "asc") result.sort((a, b) => a.name.localeCompare(b.name));
    else if (sortType === "desc")
      result.sort((a, b) => b.name.localeCompare(a.name));

    return result;
  }, [foods, selectedArea, sortType]);

  /* ================= PAGINATION ================= */
  const indexOfLast = currentPage * foodsPerPage;
  const indexOfFirst = indexOfLast - foodsPerPage;
  const currentFoods = filteredAndSortedFoods.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredAndSortedFoods.length / foodsPerPage);

  const handlePageChange = (page) => setCurrentPage(page);
  const clearFilters = () => {
    setSelectedArea("");
    setSortType("");
    setCurrentPage(1);
  };

  if (error)
    return (
      <div className="text-center text-red-500 font-semibold">{error}</div>
    );

  /* ================= UI ================= */
  return (
    <div className="w-[95%] mx-auto px-4 py-8">
      <Filters
        areas={areas}
        selectedArea={selectedArea}
        setSelectedArea={setSelectedArea}
        sortType={sortType}
        setSortType={setSortType}
        clearFilters={clearFilters}
      />

      {currentFoods.length === 0 ? (
        <p className="text-center text-gray-500">No foods found</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {currentFoods.map((food) => (
            <FoodCard
              key={food._id || food.foodId}
              food={food}
              openModal={() => setModalFood(food)}
              cartItems={cartItems} // ✅ pass cart state
              addToCart={addToCart} // ✅ pass add function
              removeFromCart={removeFromCart} // ✅ pass remove function
            />
          ))}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <Model
        food={modalFood}
        isOpen={!!modalFood}
        onClose={() => setModalFood(null)}
      />
    </div>
  );
}
