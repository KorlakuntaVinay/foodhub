import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import FoodList from "./pages/FoodList";
import { useState } from "react";
import LoginPop from "./components/loginpop/LoginPop";

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <>
        {showLogin ? <LoginPop /> : <></>}
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/FoodList" element={<FoodList />} />
        </Routes>
      </>
    </div>
  );
}

export default App;
