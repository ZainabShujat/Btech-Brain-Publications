'use strict';
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem } from '@/lib/types';

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'nbb_publication_cart_v1';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate cart from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load cart from storage', e);
    }
    setIsHydrated(true);
  }, []);

  // Save cart to localStorage on changes
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to persist cart to storage', e);
    }
  }, [items, isHydrated]);

  const addItem = (newItem: Omit<CartItem, 'id'>) => {
    setItems((prevItems) => {
      // Check if exact same product + format exists
      const existingIndex = prevItems.findIndex(
        (item) => item.productId === newItem.productId && item.format === newItem.format
      );

      if (existingIndex > -1) {
        // If digital product or subscription, quantity is capped at 1
        if (newItem.format === 'digital' || newItem.productType === 'subscription') {
          return prevItems;
        }
        const updated = [...prevItems];
        updated[existingIndex].quantity += newItem.quantity;
        return updated;
      }

      const id = `item_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      return [...prevItems, { ...newItem, id }];
    });
    setIsCartOpen(true);
  };

  const removeItem = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          // If digital, don't exceed 1
          if (item.format === 'digital' || item.productType === 'subscription') {
            return item;
          }
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        isCartOpen,
        setIsCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
