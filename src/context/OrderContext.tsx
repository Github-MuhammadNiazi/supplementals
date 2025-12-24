"use client";

import React, { createContext, useContext, useState, useCallback, useMemo, ReactNode } from "react";
import { Order, OrderStatus, CustomerDetails, CartItem, OrderItem } from "@/types";
import ordersData from "@/data/orders.json";

interface OrderContextType {
  orders: Order[];
  addOrder: (customerDetails: CustomerDetails, cartItems: CartItem[], totalAmount: number, totalItems: number) => Order;
  getOrder: (orderId: string) => Order | undefined;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  getOrdersByStatus: (status: OrderStatus | "all") => Order[];
  searchOrders: (query: string) => Order[];
  filterOrdersByDateRange: (from: string, to: string) => Order[];
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(ordersData as Order[]);

  const generateOrderId = useCallback((): string => {
    const year = new Date().getFullYear();
    const orderNumber = String(orders.length + 1).padStart(3, "0");
    return `ORD-${year}-${orderNumber}`;
  }, [orders.length]);

  const addOrder = useCallback((
    customerDetails: CustomerDetails,
    cartItems: CartItem[],
    totalAmount: number,
    totalItems: number
  ): Order => {
    const orderItems: OrderItem[] = cartItems.map((item) => ({
      productId: item.product.id,
      productName: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      imageUrl: item.product.imageUrl,
    }));

    const newOrder: Order = {
      id: generateOrderId(),
      customerDetails,
      items: orderItems,
      totalAmount: Math.round(totalAmount * 100) / 100,
      totalItems,
      status: "pending",
      dateOfPurchase: new Date().toISOString(),
    };

    setOrders((prevOrders) => [newOrder, ...prevOrders]);
    return newOrder;
  }, [generateOrderId]);

  const getOrder = useCallback((orderId: string): Order | undefined => {
    return orders.find((order) => order.id === orderId);
  }, [orders]);

  const updateOrderStatus = useCallback((orderId: string, status: OrderStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  }, []);

  const getOrdersByStatus = useCallback((status: OrderStatus | "all"): Order[] => {
    if (status === "all") return orders;
    return orders.filter((order) => order.status === status);
  }, [orders]);

  const searchOrders = useCallback((query: string): Order[] => {
    const lowerQuery = query.toLowerCase().trim();
    if (!lowerQuery) return orders;

    return orders.filter((order) => {
      // Search by order ID
      if (order.id.toLowerCase().includes(lowerQuery)) return true;

      // Search by customer name
      const fullName = `${order.customerDetails.firstName} ${order.customerDetails.lastName}`.toLowerCase();
      if (fullName.includes(lowerQuery)) return true;

      // Search by product name
      if (order.items.some((item) => item.productName.toLowerCase().includes(lowerQuery))) return true;

      return false;
    });
  }, [orders]);

  const filterOrdersByDateRange = useCallback((from: string, to: string): Order[] => {
    const fromDate = from ? new Date(from) : null;
    const toDate = to ? new Date(to) : null;

    return orders.filter((order) => {
      const orderDate = new Date(order.dateOfPurchase);

      if (fromDate && orderDate < fromDate) return false;
      if (toDate) {
        const endOfDay = new Date(toDate);
        endOfDay.setHours(23, 59, 59, 999);
        if (orderDate > endOfDay) return false;
      }

      return true;
    });
  }, [orders]);

  const value = useMemo(
    () => ({
      orders,
      addOrder,
      getOrder,
      updateOrderStatus,
      getOrdersByStatus,
      searchOrders,
      filterOrdersByDateRange,
    }),
    [orders, addOrder, getOrder, updateOrderStatus, getOrdersByStatus, searchOrders, filterOrdersByDateRange]
  );

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

export function useOrder(): OrderContextType {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
}
