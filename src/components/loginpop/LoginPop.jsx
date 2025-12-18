import React, { useState } from "react";
import "./LoginPop.css";
import { assets } from "../../assets/assets";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPop = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Login");
  const [name, setName] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  {
    currState !== "Login" && (
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // fake login (replace with API later)
    login({ name: currState === "Login" ? "User" : name.trim(name) });

    setShowLogin(false);
    navigate("/foodlist");
  };

  return (
    <div className="login-pop">
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="login-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-input">
          {currState === "Login" ? (
            <></>
          ) : (
            <input type="text" placeholder="Your Name" required />
          )}

          <input type="email" placeholder="Your email" required />
          <input type="password" placeholder="password" required />
        </div>
        <button>{currState === "Sign Up" ? "Create account" : "Login"}</button>
        <div className="login-condition">
          <input type="checkbox" required />
          <p>By continuing , i agree to the terms of use & privacy policy.</p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new account?
            <span onClick={() => setCurrState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?
            <span onClick={() => setCurrState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPop;
