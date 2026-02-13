import { Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layin";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import FoodList from "./pages/FoodList";
import Profile from "./pages/profile";
import Contact from "./pages/Contact";
import PrivateRoute from "./routes/PrivateRoute";
import LoginPop from "./components/loginpop/LoginPop";
import AdminUsers from "./pages/adminusers";
import AdminRoute from "./routes/AdminRoute";
import AdminDashboard from "./pages/AdminDashboard";
import ErrorBoundary from "./components/ErrorBoundary";
import CreateOrder from "./pages/CreateOrder";
import Payment from "./pages/Payment";

import { useDispatch } from "react-redux";
import Cart from "./pages/cart";
import PlaceOrder from "./pages/PlaceOrder";
import PaymentPage from "./pages/pay";
function App() {
  const dispatch = useDispatch();
  const data = [
    { _id: "1", name: "Sandeep", email: "sandeep@gmail.com" },
    { _id: "2", name: "Anita", email: "anita@gmail.com" },
    { _id: "3", name: "Kiran", email: "kiran@gmail.com" },
  ];

  dispatch({ type: "FETCH_USERS_SUCCESS", payload: data });
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/sign-in" element={<LoginPop />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/placeorder" element={<PlaceOrder />} />
          <Route path="/createorder" element={<CreateOrder />} />
          <Route path="/paym" element={<Payment />} />
          <Route path="/pay" element={<PaymentPage />} />
          <Route path="/" element={<Home />} />
          <Route
            path="/:userId/foodlist"
            element={
              <PrivateRoute>
                <FoodList />{" "}
              </PrivateRoute>
            }
          />
          <Route path="/contact" element={<Contact />} />
        </Route>
        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <AdminUsers />
            </AdminRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
