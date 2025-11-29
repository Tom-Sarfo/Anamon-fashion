import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.tsx";
import { CartProvider } from "./contexts/CartContext.tsx";
import { FavoritesProvider } from "./contexts/FavoritesContext.tsx";
import { AbandonedCartProvider } from "./contexts/AbandonedCartContext.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <FavoritesProvider>
        <CartProvider>
          <AbandonedCartProvider>
            <App />
          </AbandonedCartProvider>
        </CartProvider>
      </FavoritesProvider>
    </BrowserRouter>
  </React.StrictMode>
);
