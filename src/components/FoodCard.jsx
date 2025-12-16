const FoodCard = ({ item, openModal }) => {
  return (
    <div
      className="p-3  shadow hover:scale-105 transition cursor-pointer rounded-xl sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      onClick={() => openModal(item.idMeal)}
    >
      <img
        src={item.strMealThumb}
        className=" w-full h-80 object-cover rounded-xl sm:h-48 lg:h-56"
      />

      <h2 className="font-medium mask-type-alpha text-xl mt-2 sm:text-base">
        {item.strMeal}
      </h2>
      <p className="text-sm">⭐ {(Math.floor(Math.random() * 9) + 2) / 2} </p>
      <span>{item.strMeal}</span>
    </div>
  );
};
export default FoodCard;
