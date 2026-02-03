import React from "react";

export default function Modal({ food, isOpen, onClose }) {
  if (!isOpen || !food) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 px-4">
      <div className="bg-white w-full max-w-2xl rounded-xl relative overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 border border-red-500 text-red-500 px-3 py-1 rounded-md hover:bg-red-500 hover:text-white transition"
        >
          Close
        </button>

        <img
          src={food.image}
          alt={food.name}
          className="w-full h-64 sm:h-80 object-cover"
        />

        <div className="p-5">
          <h2 className="text-xl font-bold text-gray-800 mb-2">{food.name}</h2>

          <p className="text-gray-600 text-sm leading-relaxed">
            <span className="font-semibold text-gray-800">Details:</span>{" "}
            {food.instructions?.substring(0, 220)}...
            <span className="text-blue-600 cursor-pointer ml-1">Read more</span>
          </p>
        </div>
      </div>
    </div>
  );
}
