import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { assets } from "../assets/assets";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("menu");
  const [open, setOpen] = useState(false);

  const { user, logout } = useAuth(""); // get user state
  const navigate = useNavigate();

  const handleAuthClick = () => {
    if (user) {
      logout();
      navigate("/"); // redirect to home
    } else {
      setShowLogin(true); // show login popup
    }
  };

  const linkClass = ({ isActive }) =>
    `cursor-pointer pb-1 ${
      isActive ? "text-black border-b-2 border-orange-500" : "text-gray-500"
    }`;

  return (
    <div className="w-full px-4 py-4 flex justify-between items-center md:px-8">
      <NavLink to="/">
        <img src={assets.foodhub} alt="" className="h-10 w-10 rounded-3xl" />
      </NavLink>
      <ul className="hidden md:flex gap-5 text-md text-gray-500">
        <ul className="flex md:flex gap-5 text-md list-none text-gray-500">
          <li
            onClick={() => setMenu("Home")}
            className={({ isActive }) =>
              `cursor-pointer pb-1 ${
                isActive
                  ? "text-black border-b-2 border-orange-500"
                  : "text-gray-500"
              }`
            }
          >
            <NavLink to="/" className={linkClass}>
              Home
            </NavLink>
          </li>

          <li
            onClick={() => setMenu("Menu")}
            className={({ isActive }) =>
              `cursor-pointer pb-1 ${
                isActive
                  ? "text-black border-b-2 border-orange-500"
                  : "text-gray-500"
              }`
            }
          >
            <NavLink
              to={user ? "/foodlist" : "#"}
              className={linkClass}
              onClick={(e) => {
                if (!user) {
                  e.preventDefault(); // prevent navigation
                  alert("Please sign in"); // show alert
                }
              }}
            >
              Menu
            </NavLink>
          </li>

          <li
            onClick={() => setMenu("Contact-us")}
            className={({ isActive }) =>
              `cursor-pointer pb-1 ${
                isActive
                  ? "text-black border-b-2 border-orange-500"
                  : "text-gray-500"
              }`
            }
          >
            <NavLink to="/contact" className={linkClass}>
              Contact us
            </NavLink>
          </li>
        </ul>
      </ul>
      {/* mobile*/}
      {open && (
        <ul className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center gap-4 py-4 md:hidden">
          <li
            onClick={() => {
              setMenu("Home");
              setOpen(false);
            }}
          >
            <NavLink to="/" onClick={() => setOpen(false)}>
              Home
            </NavLink>
          </li>
          <li
            onClick={() => {
              setMenu("Menu");
              setOpen(false);
            }}
          >
            <NavLink
              to={user ? "/foodlist" : "#"}
              onClick={(e) => {
                setOpen(false); // close mobile menu
                if (!user) {
                  e.preventDefault();
                  alert("Please sign in");
                }
              }}
            >
              Menu
            </NavLink>
          </li>
          <li
            onClick={() => {
              setMenu("Contact-us");
              setOpen(false);
            }}
          >
            <NavLink to="/contact" onClick={() => setOpen(false)}>
              Contact us
            </NavLink>
          </li>
        </ul>
      )}

      <button className="md:hidden text-2xl" onClick={() => setOpen(!open)}>
        ☰
      </button>
      <div className="flex items-center gap-4">
        <img src={assets.search_icon} alt="" />

        {user && <span className="text-gray-700 font-medium">Hi,Vinay</span>}

        <button
          className="px-[30px] py-[10py] text-base bg-transparent border border-solid transition rounded-4xl cursor-pointer hover:bg-amber-200"
          onClick={handleAuthClick}
        >
          {user ? "Sign Out" : "Sign In"}
        </button>
      </div>
    </div>
  );
};
export default Navbar;
