import { createContext, useState } from "react";
import type { ReactNode } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const ShoppingCartContext = createContext<SContextType | null>(null);

export interface SContextType {
  getItemQuantity: (id: string) => number;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  openCart: () => void;
  closeCart: () => void;
  cartQuantity: number;
  isOpen: boolean;
}

interface Props {
  children: ReactNode;
}

export interface CartItem {
  id: string;
  quantity: number;
}

const ShoppingCartProvider = ({ children }: Props) => {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("cart", []);
  const [isOpen, setIsOpen] = useState(false);

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  function getItemQuantity(id: string) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  function increaseQuantity(id: string) {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id, quantity: 1 }];
    });
  }

  function decreaseQuantity(id: string) {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === id);
      if (existingItem?.quantity === 1) {
        return prev.filter((item) => item.id !== id);
      }
      return prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  }

  function removeFromCart(id: string) {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }

  function openCart() {
    setIsOpen(true);
  }

  function closeCart() {
    setIsOpen(false);
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        cartItems,
        setCartItems,
        openCart,
        closeCart,
        cartQuantity,
        isOpen,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export default ShoppingCartProvider;
