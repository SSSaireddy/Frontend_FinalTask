import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import App from "./App";
import { store } from "./app/store";
import { ToastProvider } from "./context/ToastContext";
import "./styles.css";

function CartPersistence() {
  const items = useSelector((state) => state.cart.items);

  useEffect(() => {
    try {
      localStorage.setItem("spiceroute-cart", JSON.stringify(items));
    } catch (error) {
      console.error("Could not save cart:", error);
    }
  }, [items]);

  return null;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <CartPersistence />
      <ToastProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ToastProvider>
    </Provider>
  </React.StrictMode>
);