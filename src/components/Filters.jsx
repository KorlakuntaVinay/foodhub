export default function Filters({ areas, setArea, sortType, setSortType , clearFilters,area }) {
  return (
    <div className="flex gap-6 p-4 sm:flex-row w-full bg-amber-10">
      <select  value={area} onChange={(e) => setArea(e.target.value)} className="sm:w-48 w-full">
        <option value="">All Areas</option>
        {areas?.map((a) => (
          <option key={a.strArea} value={a.strArea}>{a.strArea}</option>
        ))}
      </select>

      <select value={sortType} onChange={(e) => setSortType(e.target.value)} className="sm:w-48 w-full">
        <option value="">Sort</option>
        <option value="asc">A → Z</option>
      </select>
      <button onClick={clearFilters} disabled={!area && !sortType} className="px-4 py-2 border rounded hover:bg-amber-500">
      Clear Filters
      </button>

    </div>
  );
}