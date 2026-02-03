import React from "react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex justify-center items-center gap-4 py-6 bg-gray-50">
      {/* Prev Button */}
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="flex items-center gap-2 px-4 py-2 bg-slate-500 text-white rounded-md disabled:opacity-50"
      >
        ← Prev
      </button>

      {/* Current Page */}
      <div className="w-10 h-10 flex items-center justify-center border rounded-full text-sm font-semibold">
        {currentPage}
      </div>

      {/* Next Button */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-md disabled:opacity-50"
      >
        Next →
      </button>
    </div>
  );
}
