import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import LoginPop from "../components/loginpop/LoginPop";

const Layout = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="sticky ">
        {showLogin && <LoginPop setShowLogin={setShowLogin} />}
        <Navbar setShowLogin={setShowLogin} />
      </div>
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
