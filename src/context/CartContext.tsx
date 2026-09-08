import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem } from '../types';

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  markOrderSubmitted: () => void;
  totalItems: number;
  subtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('brasa-massa-cart');
    const orderTime = localStorage.getItem('brasa-massa-order-time');
    
    if (saved && orderTime) {
      const timePassed = Date.now() - parseInt(orderTime);
      const threeHours = 3 * 60 * 60 * 1000;
      if (timePassed > threeHours) {
        localStorage.removeItem('brasa-massa-cart');
        localStorage.removeItem('brasa-massa-order-time');
        return [];
      }
    }
    
    return saved ? JSON.parse(saved) : [];
  });
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('brasa-massa-cart', JSON.stringify(items));
  }, [items]);

  const addItem = (newItem: CartItem) => {
    setItems(currentItems => {
      // Check if exact same item exists (same id/config)
      // Actually we are generating unique IDs in the component, so we just append.
      // Or we can try to find similar items and merge quantities. For simplicity, just append.
      return [...currentItems, newItem];
    });
    setIsCartOpen(true);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => {
    setItems([]);
  };

  const markOrderSubmitted = () => {
    localStorage.setItem('brasa-massa-order-time', Date.now().toString());
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + (item.finalPrice * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      items, addItem, removeItem, updateQuantity, clearCart, markOrderSubmitted,
      totalItems, subtotal,
      isCartOpen, setIsCartOpen,
      isCheckoutOpen, setIsCheckoutOpen
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
