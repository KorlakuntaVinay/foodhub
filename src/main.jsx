import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./Context/AuthContext.jsx";
import { CartProvider } from "./Context/CartContext.jsx";
import { FoodProvider } from "./Context/FoodContext.jsx";
import store from "./redux/store.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <FoodProvider>
            <App />
          </FoodProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </Provider>
);
