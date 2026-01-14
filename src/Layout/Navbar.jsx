// import React, { useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { useAuth } from "../Context/AuthContext";
// import { assets } from "../assets/assets";

// const Navbar = ({}) => {
//   const [menu, setMenu] = useState("menu");
//   const [open, setOpen] = useState(false);

//   const { user, logout } = useAuth("");
//   const navigate = useNavigate();

//   const handleAuthClick = () => {
//     if (user) {
//       logout();
//       navigate("/");
//     } else {
//       navigate("/sign-in");
//     }
//   };

//   const linkClass = ({ isActive }) =>
//     `cursor-pointer pb-1 ${
//       isActive ? "text-black border-b-2 border-orange-500" : "text-gray-500"
//     }`;

//   return (
//     <div className="w-full px-4 py-4 flex justify-between items-center md:px-8">
//       <NavLink to="/">
//         <img src={assets.foodhub} alt="" className="h-10 w-10 rounded-3xl" />
//       </NavLink>
//       <ul className="hidden md:flex gap-5 text-md text-gray-500">
//         <ul className="flex md:flex gap-5 text-md list-none text-gray-500">
//           <li
//             onClick={() => setMenu("Home")}
//             className={({ isActive }) =>
//               `cursor-pointer pb-1 ${
//                 isActive
//                   ? "text-black border-b-2 border-orange-500"
//                   : "text-gray-500"
//               }`
//             }
//           >
//             <NavLink to="/" className={linkClass}>
//               Home
//             </NavLink>
//           </li>

//           <li
//             onClick={() => setMenu("Menu")}
//             className={({ isActive }) =>
//               `cursor-pointer pb-1 ${
//                 isActive
//                   ? "text-black border-b-2 border-orange-500"
//                   : "text-gray-500"
//               }`
//             }
//           >
//             <NavLink
//               to={user ? "/:userId/foodlist" : "#"}
//               className={linkClass}
//               onClick={(e) => {
//                 if (!user) {
//                   e.preventDefault();
//                   alert("Please sign in");
//                 }
//               }}
//             >
//               Menu
//             </NavLink>
//           </li>

//           <li
//             onClick={() => setMenu("Contact-us")}
//             className={({ isActive }) =>
//               `cursor-pointer pb-1 ${
//                 isActive
//                   ? "text-black border-b-2 border-orange-500"
//                   : "text-gray-500"
//               }`
//             }
//           >
//             <NavLink to="/contact" className={linkClass}>
//               Contact us
//             </NavLink>
//           </li>
//         </ul>
//       </ul>
//       {/* mobile*/}
//       {open && (
//         <ul className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center gap-4 py-4 md:hidden">
//           <li
//             onClick={() => {
//               setMenu("Home");
//               setOpen(false);
//             }}
//           >
//             <NavLink to="/" onClick={() => setOpen(false)}>
//               Home
//             </NavLink>
//           </li>
//           <li
//             onClick={() => {
//               setMenu("Menu");
//               setOpen(false);
//             }}
//           >
//             <NavLink
//               to={user ? "/:userId/foodlist" : "#"}
//               onClick={(e) => {
//                 setOpen(false); // close mobile menu
//                 if (!user) {
//                   e.preventDefault();
//                   alert("Please sign in");
//                 }
//               }}
//             >
//               Menu
//             </NavLink>
//           </li>
//           <li
//             onClick={() => {
//               setMenu("Contact-us");
//               setOpen(false);
//             }}
//           >
//             <NavLink to="/contact" onClick={() => setOpen(false)}>
//               Contact us
//             </NavLink>
//           </li>
//         </ul>
//       )}

//       <button className="md:hidden text-2xl" onClick={() => setOpen(!open)}>
//         ☰
//       </button>
//       <div className="flex items-center gap-4">
//         <img src={assets.search_icon} alt="" />

//         {/* {user && <span className="text-gray-700 font-medium">{user.name}</span>}

//         <button
//           className="px-[30px] py-[10py] text-base bg-transparent border border-solid transition rounded-4xl cursor-pointer hover:bg-amber-200"
//           onClick={handleAuthClick}
//         >
//           {user ? "Sign Out" : "Sign In"}
//         </button> */}

//         <div className="relative">
//           <img
//             src={user ? "/profile_image.png" : "/profile-icon.jpg"}
//             alt="profile"
//             onClick={() => setOpen(!open)}
//             className="w-10 h-10 rounded-full cursor-pointer border"
//           />

//           {user && (
//             <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
//           )}

//           {open && (
//             <div className="absolute right-0 mt-3 w-44 bg-white rounded-lg shadow-lg border z-50">
//               <ul className="py-2 text-sm text-gray-700">
//                 {user ? (
//                   <>
//                     <li
//                       className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                       onClick={() => {
//                         navigate("/profile");
//                         setOpen(false);
//                       }}
//                     >
//                       Profile
//                     </li>

//                     <div className="my-1 border-t"></div>

//                     <li
//                       className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600"
//                       onClick={() => {
//                         logout();
//                         navigate("/");
//                         setOpen(false);
//                       }}
//                     >
//                       Logout
//                     </li>
//                   </>
//                 ) : (
//                   <li
//                     className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                     onClick={() => {
//                       navigate("/sign-in");
//                       setOpen(false);
//                     }}
//                   >
//                     Sign In
//                   </li>
//                 )}
//               </ul>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Navbar;
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { assets } from "../assets/assets";

const Navbar = () => {
  const [menu, setMenu] = useState("menu");
  const [open, setOpen] = useState(false);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleAuthClick = () => {
    if (user) {
      logout();
      navigate("/");
    } else {
      navigate("/sign-in");
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

      {/* Desktop menu */}
      <ul className="hidden md:flex gap-5 text-md list-none">
        <li onClick={() => setMenu("Home")}>
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>
        </li>

        <li onClick={() => setMenu("Menu")}>
          <NavLink
            to={user ? "/:userId/foodlist" : "#"}
            className={linkClass}
            onClick={(e) => {
              if (!user) {
                e.preventDefault();
                alert("Please sign in");
              }
            }}
          >
            Menu
          </NavLink>
        </li>

        <li onClick={() => setMenu("Contact-us")}>
          <NavLink to="/contact" className={linkClass}>
            Contact us
          </NavLink>
        </li>
      </ul>

      {/* Mobile menu */}
      {open && (
        <ul className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center gap-4 py-4 md:hidden">
          <li
            onClick={() => {
              setMenu("Home");
              setOpen(false);
            }}
          >
            <NavLink
              to="/"
              className="cursor-pointer"
              onClick={() => setOpen(false)}
            >
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
              to={user ? "/:userId/foodlist" : "#"}
              className="cursor-pointer"
              onClick={(e) => {
                setOpen(false);
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
            <NavLink
              to="/contact"
              className="cursor-pointer"
              onClick={() => setOpen(false)}
            >
              Contact us
            </NavLink>
          </li>
        </ul>
      )}

      <button className="md:hidden text-2xl" onClick={() => setOpen(!open)}>
        ☰
      </button>

      <div className="flex items-center gap-4">
        <img src={assets.search_icon} alt="search" />
        <div className="relative">
          <NavLink to="/cart">
            <img src={assets.basket_icon} alt="" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-orange-500 text-white flex items-center justify-center rounded-full"></span>
          </NavLink>
        </div>
        <div className="relative">
          <img
            src={user ? "/profile_image.png" : "/profile-icon.jpg"}
            alt="profile"
            onClick={() => setOpen(!open)}
            className="w-10 h-10 rounded-full cursor-pointer border"
          />

          {user && (
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
          )}

          {open && (
            <div className="absolute right-0 mt-3 w-44 bg-white rounded-lg  border  z-50">
              <ul className="py-2 text-sm text-gray-700">
                {user ? (
                  <>
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        navigate("/profile");
                        setOpen(false);
                      }}
                    >
                      Profile
                    </li>

                    <div className="my-1 border-t"></div>

                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600"
                      onClick={() => {
                        logout();
                        navigate("/");
                        setOpen(false);
                      }}
                    >
                      Logout
                    </li>
                  </>
                ) : (
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      navigate("/sign-in");
                      setOpen(false);
                    }}
                  >
                    Sign In
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
