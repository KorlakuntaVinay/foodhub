import React from "react";
import header_img from "../assets/header_img.png";
import { NavLink } from "react-router-dom";
import Footer from "../components/Footer";
import { useAuth } from "../Context/AuthContext";

const Home = ({ setShowLogin }) => {
  const { user } = useAuth();
  return (
    <div>
      <div
        className="
          relative w-[96%] mx-auto mt-6 rounded-xl
          min-h-[70vh] sm:min-h-[80vh] lg:min-h-screen
          bg-cover bg-center bg-no-repeat
          flex items-end
        "
        style={{ backgroundImage: `url(${header_img})` }}
      >
        <div className="absolute inset-0  from-black/60 to-transparent rounded-xl"></div>

        <div
          className="
            relative z-10
            p-4 sm:p-6 md:p-10
            max-w-full sm:max-w-[80%] md:max-w-[60%]
            text-white
          "
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Order your favourite food here
          </h2>

          <p className="mt-3 text-sm sm:text-base leading-relaxed text-white">
            Choose from a diverse menu featuring a delectable array of dishes
            crafted with the finest ingredients and culinary expertise. Our
            mission is to satisfy your cravings and elevate your dining
            experience, one delicious meal at a time.
          </p>

          <NavLink
            to={user ? "/FoodList" : "#"}
            onClick={(e) => {
              if (!user) {
                e.preventDefault();
                setShowLogin(true);
              }
            }}
            className="
              inline-block mt-5
              bg-amber-50 px-5 py-2 sm:px-6 sm:py-2.5
              rounded-full text-black font-medium
              hover:bg-amber-300 transition
            "
          >
            View Menu
          </NavLink>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
