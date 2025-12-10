import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

  // Get session ID from localStorage or create one
  useEffect(() => {
    const sessionId = localStorage.getItem('sessionId') || `session_${Date.now()}`;
    localStorage.setItem('sessionId', sessionId);
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/cart/get_cart/`);
      setCart(response.data);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      const response = await axios.post(`${API_URL}/cart/add_item/`, {
        product_id: productId,
        quantity: quantity
      });
      setCart(response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to add item:', error);
      throw error;
    }
  };

  const updateCartItem = async (productId, quantity) => {
    try {
      const response = await axios.put(`${API_URL}/cart/update_item/`, {
        product_id: productId,
        quantity: quantity
      });
      setCart(response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to update item:', error);
      throw error;
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await axios.delete(
        `${API_URL}/cart/remove_item/?product_id=${productId}`
      );
      setCart(response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to remove item:', error);
      throw error;
    }
  };

  const clearCart = async () => {
    try {
      const response = await axios.delete(`${API_URL}/cart/clear_cart/`);
      setCart(response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to clear cart:', error);
      throw error;
    }
  };

  const getCartCount = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((sum, item) => sum + item.quantity, 0);
  };

  const value = {
    cart,
    loading,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    getCartCount,
    fetchCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
