import { createContext, useContext, useState, ReactNode } from "react";

export type CartItem = {
  id: string;
  title: string;
  image: string;
  price: number;
  qty: number;
};

export type CartContextType = {
  cart: Record<string, CartItem>;
  addToCart: (product: { id: string; title: string; image: string; price: number }) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Record<string, CartItem>>({});

  const addToCart = (product: { id: string; title: string; image: string; price: number }) => {
    setCart(prev => {
      const existing = prev[product.id];
      return {
        ...prev,
        [product.id]: existing
          ? { ...existing, qty: existing.qty + 1 }
          : { ...product, qty: 1 },
      };
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => {
      const item = prev[id];
      if (!item) return prev;
      if (item.qty <= 1) {
        const { [id]: removed, ...rest } = prev;
        return rest;
      }
      return {
        ...prev,
        [id]: { ...item, qty: item.qty - 1 },
      };
    });
  };

  const clearCart = () => setCart({});

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
