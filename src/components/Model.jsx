const Modal= ({ item, close }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 px-4">
      
      <div className="bg-white w-full max-w-2xl rounded-xl relative overflow-hidden">

        <button onClick={close}
          className="absolute top-4 right-4 border border-red-500 text-red-500 px-3 py-1 rounded-md hover:bg-red-500 hover:text-white transition">
          Close
        </button>

        <img src={item.strMealThumb} alt={item.strMeal} className="w-full h-64 sm:h-80 object-cover"/>

        <div className="p-5">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            {item.strMeal},
          </h2>

          <p className="text-gray-600 text-sm leading-relaxed"><span className="font-semibold text-gray-800">Details:</span>{" "}
            {item.strInstructions.substring(0, 220)}...<span className="text-blue-600 cursor-pointer ml-1">Read more</span>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Modal