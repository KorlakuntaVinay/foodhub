import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const handleLogin = (e) => {
  //   e.preventDefault();

  //   if (email === "admin@food.com" && password === "admin123") {
  //     dispatch({
  //       type: "ADMIN_LOGIN_SUCCESS",
  //       payload: { email },
  //     });
  //     navigate("/admin");
  //   } else {
  //     alert("Invalid admin credentials");
  //   }
  // };
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "https://food-backend-wb32.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!res.ok) {
        alert("Invalid admin credentials");
        return;
      }

      const data = await res.json();

      // Save token in Redux
      dispatch({
        type: "ADMIN_LOGIN_SUCCESS",
        payload: { email: data.email, token: data.token },
      });

      navigate("/admin");
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Admin Login</h2>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>Login</button>
    </form>
  );
};

export default AdminLogin;
