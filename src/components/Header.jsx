import React from "react";
import header_img from "../assets/header_img.png";
const Header = () => {
  return (
    <div
      className=" w-[99%] min-h-screen bg-no-repeat m-7 relative bg-cover rounded-xl z-10 "
      style={{ backgroundImage: `url(${header_img})` }}
    >
      <div className="absolute tpo-[10%] left-[10%] flex  flex-col items-start gap-4 max-w-[50%] text-white">
        <h2 className="text-4xl font-bold">Order your favourite food here</h2>
        <p className="text-base leading-relaxed">
          Choose from a diverse menu featuring a delectable array of dishes
          crafted with the finest ingredients and culinary expertise. Our
          mission is to satisfy your carvings and elevate your dining
          experience, one delicious meal at time.{" "}
        </p>
        <button className="bg-orange-500 px-6 py-2 rounded-full text-white hover:bg-orange-600">
          View Menu
        </button>
      </div>
    </div>
  );
};

export default Header;
