import React from "react";

import ReactDOM from "react-dom/client";

import {
  BrowserRouter,
} from "react-router-dom";

import App from "./App";

import {
  CartProvider,
} from "./contexts/CartContext";

import {
  ToastContainer,
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <App />

        {/* ✅ Toastify */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          theme="colored"
        />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);