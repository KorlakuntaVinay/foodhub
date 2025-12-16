 import React from 'react'
 
 const Pagination = ({ page, total, setPage }) => {

  return (
    <div className="flex justify-center items-center gap-4 py-6 bg-gray-50">
     
      <button disabled={page === 1} onClick={() => setPage(page - 1)}
        className="flex items-center gap-2 px-4 py-2 bg-slate-500 text-white rounded-md disabled:opacity-50">
        ← prev
      </button>

      <div className="w-10 h-10 flex items-center justify-center border rounded-full text-sm font-semibold">
        {page}
      </div>

      <button disabled={page === total} onClick={() => setPage(page + 1)}
        className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-md disabled:opacity-50">
        next →
      </button>

    </div>
  );
}
 
 export default Pagination
 