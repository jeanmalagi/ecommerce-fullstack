import { createContext, useContext, useEffect, useState } from "react";

import { getCart } from "../services/cart";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);

  // ✅ Atualizar carrinho
  const refreshCart = async () => {
    try {
      const response = await getCart();

      // Garantir que é um array
      const cartItems = Array.isArray(response)
        ? response
        : response.items || response.cart || [];

      const total = cartItems.reduce((sum, item) => sum + item.quantity, 0);

      setCartCount(total);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Carrega ao iniciar
   
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refreshCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartCount,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);
