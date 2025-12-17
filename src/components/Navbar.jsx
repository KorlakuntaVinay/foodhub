import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [open, setOpen] = useState(false);

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
            className={`cursor-pointer pb-1 ${
              menu === "Home" ? "text-black border-b-2 border-orange-500" : ""
            }`}
          >
            <NavLink to="/" className={linkClass}>
              Home
            </NavLink>
          </li>

          <li
            onClick={() => setMenu("Menu")}
            className={`cursor-pointer pb-1 ${
              menu === "Menu" ? "text-black border-b-2 border-orange-500" : ""
            }`}
          >
            <NavLink to="/foodlist" className={linkClass}>
              Menu
            </NavLink>
          </li>

          <li
            onClick={() => setMenu("Contact-us")}
            className={`cursor-pointer pb-1 ${
              menu === "Contact-us"
                ? "text-black border-b-2 border-orange-500"
                : ""
            }`}
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
            <NavLink to="/foodlist" onClick={() => setOpen(false)}>
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
      <div className="flex items-center gap-8">
        <img src={assets.search_icon} alt="" />
        <button
          className="px-[30px] py-[10py] text-base bg-transparent border border-solid transition rounded-4xl cursor-pointer hover:bg-amber-200"
          onClick={() => setShowLogin(true)}
        >
          sign in
        </button>
      </div>
    </div>
  );
};
export default Navbar;
