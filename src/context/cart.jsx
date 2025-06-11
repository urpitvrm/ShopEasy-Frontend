import React, { useState, createContext, useContext, useEffect } from "react"; 

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [search, setCart] = useState([]);
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  return (
    <CartContext.Provider value={[search, setCart]}>
      {children}
    </CartContext.Provider>
  );
};
const useCart = () => useContext(CartContext);

export { CartProvider, useCart };
