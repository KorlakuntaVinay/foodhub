import { useEffect, useState } from "react";
import {
  getAllMeals,
  getAreas,
  getMealById,
  getMealsByArea,
} from "../services/api";
import FoodCard from "../components/FoodCard.jsx";
import Filters from "../components/Filters.jsx";
import Pagination from "../components/Pagination.jsx";
import Modal from "../components/Model.jsx";
import Header from "../components/Header.jsx";

export default function FoodList() {
  const [meals, setMeals] = useState([]);
  const [areas, setAreas] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [area, setArea] = useState("");
  const [sortType, setSortType] = useState("");
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(null);

  const limit = 8;

  useEffect(() => {
    getAllMeals().then((res) => {
      setMeals(res.data.meals);
      setFiltered(res.data.meals);
    });

    getAreas().then((res) => setAreas(res.data.meals));
  }, []);

  useEffect(() => {
    if (area) {
      getMealsByArea(area).then((res) => {
        setFiltered(res.data.meals);
        setPage(1);
      });
    } else {
      setFiltered(meals);
    }
  }, [area]);

  const openModal = (id) => {
    getMealById(id).then((res) => setModal(res.data.meals[0]));
  };

  const closeModal = () => setModal(null);

  const totalPages = Math.ceil(filtered.length / limit);
  const sorted = [...filtered];

  if (sortType === "asc") {
    sorted.sort((a, b) => a.strMeal.localeCompare(b.strMeal));
  }

  const paginated = sorted.slice((page - 1) * limit, page * limit);

  const clearFilters = () => {
    setArea("");
    setSortType("");
    setFiltered("");
    setPage(1);
  };

  return (
    <>
      <Header />
      <Filters
        areas={areas}
        setArea={setArea}
        sortType={sortType}
        setSortType={setSortType}
        clearFilters={clearFilters}
        area={area}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {paginated.map((item) => (
          <FoodCard key={item.idMeal} item={item} openModal={openModal} />
        ))}
      </div>

      <Pagination total={totalPages} page={page} setPage={setPage} />

      <Modal item={modal} close={closeModal} />
    </>
  );
}
