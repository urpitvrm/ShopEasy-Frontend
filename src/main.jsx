import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from "react-helmet-async";
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider,  } from "./context/auth.jsx";

import { SearchProvider } from "./context/search.jsx";
import { CartProvider } from './context/cart.jsx';
createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <SearchProvider>
      <CartProvider>
        <HelmetProvider>
          <BrowserRouter>
            <StrictMode>
              <App />
            </StrictMode>
          </BrowserRouter>
        </HelmetProvider>
      </CartProvider>
    </SearchProvider>
  </AuthProvider>
);
