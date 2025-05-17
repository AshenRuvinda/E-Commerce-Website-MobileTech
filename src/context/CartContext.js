import { createContext, useState } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    if (!product || !product.id || typeof product.price !== 'number') {
      console.error('Invalid product:', product);
      return;
    }
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    if (!productId) {
      console.error('Invalid productId:', productId);
      return;
    }
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (!productId || quantity < 0) {
      console.error('Invalid input:', { productId, quantity });
      return;
    }
    if (quantity === 0) {
      removeFromCart(productId);
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotalQuantity = () => {
    return cart.reduce((total, item) => total + (item.quantity || 0), 0);
  };

  const getCartTotalPrice = () => {
    return cart
      .reduce((total, item) => total + (item.price || 0) * (item.quantity || 0), 0)
      .toFixed(2);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotalQuantity,
        getCartTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}