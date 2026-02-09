import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from "axios";

const BASE_URL = "https://food-backend-wb32.onrender.com/api/auth";

export const SignUp = createAsyncThunk("/signup", async (formData) => {
  try {
    const res = await axios.post(`${BASE_URL}/signup`, formData);
    toast.success("signup success");
    return res.data;
  } catch (err) {
    toast.error("signup failed");
    return;
  }
});
export const SignIn = createAsyncThunk("/signin", async (formdata) => {
  try {
    const res = await axios.post(`${BASE_URL}/signin`, formdata);
    toast.success("signin success");
    return;
  } catch (err) {
    toast.error("signin failed");
    return;
  }
});
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    isAuthenticated: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
