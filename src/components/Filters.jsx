// export default function Filters({ areas, setArea, sortType, setSortType , clearFilters,area }) {
//   return (
//     <div className="flex gap-6 p-4 sm:flex-row w-full bg-amber-10">
//       <select  value={area} onChange={(e) => setArea(e.target.value)} className="sm:w-48 w-full">
//         <option value="">All Areas</option>
//         {areas?.map((a) => (
//           <option key={a.strArea} value={a.strArea}>{a.strArea}</option>
//         ))}
//       </select>

//       <select value={sortType} onChange={(e) => setSortType(e.target.value)} className="sm:w-48 w-full">
//         <option value="">Sort</option>
//         <option value="asc">A → Z</option>
//       </select>
//       <button onClick={clearFilters} disabled={!area && !sortType} className="px-4 py-2 border rounded hover:bg-amber-500">
//       Clear Filters
//       </button>

//     </div>
//   );
// }
// import React from "react";
// import { useFood } from "../Context/FoodContext";

// export default function Filters({
//   areas = [], // array of strings like ["Uruguayan", "Turkish"]
//   area,
//   setArea,
//   sortType,
//   setSortType,
//   clearFilters,
// }) {
//   const { fetchfoodsByArea } = useFood();

//   const handleAreaChange = (e) => {
//     const selectedArea = e.target.value;
//     setArea(selectedArea);

//     if (selectedArea) {
//       fetchfoodsByArea(selectedArea);
//     } else {
//       fetchfoodsByArea(""); // fetch all foods
//     }
//   };

//   return (
//     <div className="flex gap-6 p-4 sm:flex-row w-full bg-amber-10">
//       <select value={area} onChange={handleAreaChange}>
//         <option value="">All Areas</option>

//         {areas?.map((a) => (
//           <option key={a} value={a}>
//             {a}
//           </option>
//         ))}
//       </select>

//       <select
//         value={sortType}
//         onChange={(e) => setSortType(e.target.value)}
//         className="sm:w-48 w-full"
//       >
//         <option value="">Sort</option>
//         <option value="asc">A → Z</option>
//       </select>

//       <button
//         onClick={clearFilters}
//         disabled={!area && !sortType}
//         className="px-4 py-2 border rounded hover:bg-amber-500"
//       >
//         Clear Filters
//       </button>
//     </div>
//   );
// }
// src/components/Filter.jsx
// import React from "react";

// export default function Filter({
//   areas,
//   selectedArea,
//   setSelectedArea,
//   clearFilters,
// }) {
//   return (
//     <div className="flex items-center gap-4 mb-6">
//       <select
//         value={selectedArea}
//         onChange={(e) => setSelectedArea(e.target.value)}
//         className="border rounded px-3 py-1.5"
//       >
//         <option value="">All Areas</option>
//         {areas.map((area) => (
//           <option key={area} value={area}>
//             {area}
//           </option>
//         ))}
//       </select>

//       <button
//         onClick={clearFilters}
//         className="bg-gray-300 px-3 py-1.5 rounded hover:bg-gray-400 transition"
//       >
//         Clear
//       </button>
//     </div>
//   );
// }
import React from "react";

export default function Filter({
  areas,
  selectedArea,
  setSelectedArea,
  sortType,
  setSortType,
  clearFilters,
}) {
  return (
    <div className="flex gap-6 p-4 sm:flex-row w-full bg-amber-10">
      {/* Area Filter */}
      <select
        value={selectedArea}
        onChange={(e) => setSelectedArea(e.target.value)}
        className=" rounded px-3 py-1.5"
      >
        <option value="">All Areas</option>
        {areas.map((area) => (
          <option key={area} value={area}>
            {area}
          </option>
        ))}
      </select>

      {/* Sort Filter */}
      <select
        value={sortType}
        onChange={(e) => setSortType(e.target.value)}
        className=" rounded px-3 py-1.5"
      >
        <option value="">Sort</option>
        <option value="asc">Name A → Z</option>
        <option value="desc">Name Z → A</option>
      </select>

      {/* Clear */}
      <button
        onClick={clearFilters}
        className="bg-gray-300 px-3 py-1.5 rounded hover:bg-amber-500 "
      >
        Clear Filters
      </button>
    </div>
  );
}
