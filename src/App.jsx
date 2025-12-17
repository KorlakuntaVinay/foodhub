import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import FoodList from "./pages/FoodList";
import { useState } from "react";
import LoginPop from "./components/loginpop/LoginPop";
import Contact from "./pages/Contact";

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {showLogin && <LoginPop setShowLogin={setShowLogin} />}
      <Navbar setShowLogin={setShowLogin} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/foodlist" element={<FoodList />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;
