"use client";

import React, { createContext, useContext, useState, useCallback, useMemo, ReactNode } from "react";
import { Product, CartItem, Cart } from "@/types";

interface CartContextType {
  cart: Cart;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  incrementQuantity: (productId: string) => void;
  decrementQuantity: (productId: string) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
  getCartItem: (productId: string) => CartItem | undefined;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const initialCart: Cart = {
  items: [],
  totalItems: 0,
  totalAmount: 0,
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart>(initialCart);

  const calculateTotals = useCallback((items: CartItem[]): { totalItems: number; totalAmount: number } => {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalAmount = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    return { totalItems, totalAmount: Math.round(totalAmount * 100) / 100 };
  }, []);

  const addToCart = useCallback((product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.items.find((item) => item.product.id === product.id);

      let newItems: CartItem[];
      if (existingItem) {
        // Product already in cart, increment quantity
        newItems = prevCart.items.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new product to cart
        newItems = [...prevCart.items, { product, quantity: 1 }];
      }

      const { totalItems, totalAmount } = calculateTotals(newItems);
      return { items: newItems, totalItems, totalAmount };
    });
  }, [calculateTotals]);

  const removeFromCart = useCallback((productId: string) => {
    setCart((prevCart) => {
      const newItems = prevCart.items.filter((item) => item.product.id !== productId);

      if (newItems.length === 0) {
        return initialCart;
      }

      const { totalItems, totalAmount } = calculateTotals(newItems);
      return { items: newItems, totalItems, totalAmount };
    });
  }, [calculateTotals]);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) => {
      const newItems = prevCart.items.map((item) =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      );

      const { totalItems, totalAmount } = calculateTotals(newItems);
      return { items: newItems, totalItems, totalAmount };
    });
  }, [calculateTotals, removeFromCart]);

  const incrementQuantity = useCallback((productId: string) => {
    setCart((prevCart) => {
      const item = prevCart.items.find((i) => i.product.id === productId);
      if (!item) return prevCart;

      const newItems = prevCart.items.map((i) =>
        i.product.id === productId
          ? { ...i, quantity: i.quantity + 1 }
          : i
      );

      const { totalItems, totalAmount } = calculateTotals(newItems);
      return { items: newItems, totalItems, totalAmount };
    });
  }, [calculateTotals]);

  const decrementQuantity = useCallback((productId: string) => {
    setCart((prevCart) => {
      const item = prevCart.items.find((i) => i.product.id === productId);
      if (!item) return prevCart;

      if (item.quantity <= 1) {
        const newItems = prevCart.items.filter((i) => i.product.id !== productId);
        if (newItems.length === 0) {
          return initialCart;
        }
        const { totalItems, totalAmount } = calculateTotals(newItems);
        return { items: newItems, totalItems, totalAmount };
      }

      const newItems = prevCart.items.map((i) =>
        i.product.id === productId
          ? { ...i, quantity: i.quantity - 1 }
          : i
      );

      const { totalItems, totalAmount } = calculateTotals(newItems);
      return { items: newItems, totalItems, totalAmount };
    });
  }, [calculateTotals]);

  const clearCart = useCallback(() => {
    setCart(initialCart);
  }, []);

  const isInCart = useCallback((productId: string): boolean => {
    return cart.items.some((item) => item.product.id === productId);
  }, [cart.items]);

  const getCartItem = useCallback((productId: string): CartItem | undefined => {
    return cart.items.find((item) => item.product.id === productId);
  }, [cart.items]);

  const value = useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      incrementQuantity,
      decrementQuantity,
      clearCart,
      isInCart,
      getCartItem,
    }),
    [cart, addToCart, removeFromCart, updateQuantity, incrementQuantity, decrementQuantity, clearCart, isInCart, getCartItem]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
