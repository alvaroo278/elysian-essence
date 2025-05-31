import React, { createContext, useContext, useState, useEffect } from 'react';
import { Perfume, CartItem } from '@/lib/types';

interface CartContextType {
  items: CartItem[];
  addItem: (perfume: Perfume, quantity?: number) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  totalItems: 0,
  totalPrice: 0,
});

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('elysian_cart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('elysian_cart', JSON.stringify(items));
  }, [items]);

  const addItem = (perfume: Perfume, quantity = 1) => {
    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.perfume.id === perfume.id
      );

      if (existingItemIndex >= 0) {
        // Item already in cart, update quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        // Add new item to cart
        return [...prevItems, { perfume, quantity }];
      }
    });
  };

  const removeItem = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.perfume.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.perfume.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  
  const totalPrice = items.reduce(
    (total, item) => total + item.perfume.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};