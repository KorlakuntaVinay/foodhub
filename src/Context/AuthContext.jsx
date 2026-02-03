/* eslint-disable react-refresh/only-export-components */
// import { createContext, useContext, useState, useEffect } from "react";
// import toast from "react-hot-toast";
// import { loginApi, signupApi } from "../services/authapi";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null); // stores user object
//   const [token, setToken] = useState(null); // stores JWT token
//   const [loading, setLoading] = useState(true); // page loading / auth loading

//   // Restore user on page refresh
//   useEffect(() => {
//     const savedUser = localStorage.getItem("user");
//     const savedToken = localStorage.getItem("token");

//     if (savedUser && savedToken) {
//       setUser(JSON.parse(savedUser));
//       setToken(savedToken);
//     }
//     setLoading(false);
//   }, []);
//   // useEffect(() => {
//   //   console.log("AuthContext user:", user);
//   // }, [user]);
//   // console.log(user?.id);
//   // 🔹 Login function
//   const login = async (formData) => {
//     setLoading(true);
//     const toastId = toast.loading("Signing in...");

//     try {
//       const res = await loginApi(formData);

//       // backend should return { token, user }
//       const { token, user } = res.data;

//       setUser(user);
//       setToken(token);

//       localStorage.setItem("user", JSON.stringify(user));
//       localStorage.setItem("token", token);

//       toast.success("Login successful", { id: toastId });
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Login failed", {
//         id: toastId,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🔹 Signup function
//   const signup = async (formData) => {
//     setLoading(true);
//     const toastId = toast.loading("Signing up...");

//     try {
//       const res = await signupApi(formData);

//       // backend may return { token, user } after signup
//       const { token, user } = res.data;

//       setUser(user);
//       setToken(token);

//       localStorage.setItem("user", JSON.stringify(user));
//       localStorage.setItem("token", token);

//       toast.success("Signup successful", { id: toastId });
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Signup failed", {
//         id: toastId,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🔹 Logout function
//   const logout = () => {
//     setUser(null);
//     setToken(null);
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     toast.success("Logged out");
//   };

//   return (
//     <AuthContext.Provider
//       value={{ user, token, login, signup, logout, loading }}
//     >
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
// import { createContext, useContext, useState, useEffect } from "react";
// import toast from "react-hot-toast";
// import { loginApi, signupApi } from "../services/authapi";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const savedUser = localStorage.getItem("user");
//     const savedToken = localStorage.getItem("token");

//     if (savedUser && savedToken) {
//       setUser(JSON.parse(savedUser));
//       setToken(savedToken);
//     }
//     setLoading(false);
//   }, []);

//   const login = async (formData) => {
//     setLoading(true);
//     const toastId = toast.loading("Signing in...");
//     try {
//       const res = await loginApi(formData);
//       const { token, user } = res.data;

//       setUser(user);
//       setToken(token);
//       localStorage.setItem("user", JSON.stringify(user));
//       localStorage.setItem("token", token);

//       console.log("Logged-in user _id:", user._id); // ✅ debug
//       toast.success("Login successful", { id: toastId });
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Login failed", {
//         id: toastId,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const signup = async (formData) => {
//     setLoading(true);
//     const toastId = toast.loading("Signing up...");
//     try {
//       const res = await signupApi(formData);
//       const { token, user } = res.data;
//       console.log("FoodList user:", user);
//       console.log("FoodList token:", token);

//       setUser(user);
//       setToken(token);
//       localStorage.setItem("user", JSON.stringify(user));
//       localStorage.setItem("token", token);

//       toast.success("Signup successful", { id: toastId });
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Signup failed", {
//         id: toastId,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     setToken(null);
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     toast.success("Logged out");
//   };

//   return (
//     <AuthContext.Provider
//       value={{ user, token, login, signup, logout, loading }}
//     >
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { loginApi, signupApi } from "../services/authapi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ================= REHYDRATE AUTH ================= */
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user");
      const savedToken = localStorage.getItem("token");

      if (savedUser && savedToken) {
        setUser(JSON.parse(savedUser));
        setToken(savedToken);
      }
    } catch (err) {
      console.error("Auth restore failed", err);
      localStorage.clear();
    } finally {
      setLoading(false);
    }
  }, []);

  /* ================= LOGIN ================= */
  const login = async (formData) => {
    setLoading(true);
    const toastId = toast.loading("Signing in...");

    try {
      const res = await loginApi(formData);
      const { token, user } = res.data;

      setUser(user);
      setToken(token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      toast.success("Login successful", { id: toastId });
      return true; // ✅ IMPORTANT
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed", {
        id: toastId,
      });
      return false; // ✅ IMPORTANT
    } finally {
      setLoading(false);
    }
  };

  /* ================= SIGNUP ================= */
  const signup = async (formData) => {
    setLoading(true);
    const toastId = toast.loading("Signing up...");

    try {
      const res = await signupApi(formData);
      const { token, user } = res.data;

      setUser(user);
      setToken(token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      toast.success("Signup successful", { id: toastId });
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed", {
        id: toastId,
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  /* ================= LOGOUT ================= */
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    toast.success("Logged out");
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        login,
        signup,
        logout,
        loading,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
