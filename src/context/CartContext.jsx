import { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import { useAuth } from './AuthContext.jsx';

const CartContext = createContext();

/**
 * Hook to use cart context
 * @returns {Object} Cart context value
 */
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}

/**
 * Cart Provider Component
 * Manages cart state and provides cart operations
 */
export function CartProvider({ children }) {
  const { user } = useAuth();
  const userId = user?.id || 'guest';
  const storageKey = `grocerese-cart-${userId}`;

  const [cartItems, setCartItems] = useLocalStorage(storageKey, []);
  const [totals, setTotals] = useState({
    itemsCount: 0,
    subtotal: 0,
    discount: 0,
    delivery: 0,
    grandTotal: 0
  });

  // Calculate totals whenever cart changes
  useEffect(() => {
    calculateTotals();
  }, [cartItems]);

  /**
   * Calculate cart totals
   */
  const calculateTotals = () => {
    const itemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cartItems.reduce((sum, item) => sum + item.subtotal, 0);
    
    // Calculate discount (10% if subtotal > $50)
    const discount = subtotal > 50 ? subtotal * 0.1 : 0;
    
    // Calculate delivery fee (free if subtotal > $30, otherwise $5)
    const delivery = subtotal > 30 ? 0 : subtotal > 0 ? 5 : 0;
    
    const grandTotal = subtotal - discount + delivery;

    setTotals({
      itemsCount,
      subtotal,
      discount,
      delivery,
      grandTotal
    });
  };

  /**
   * Add item to cart or increase quantity if already exists
   * @param {Object} product - Product to add
   */
  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // Increase quantity
        return prevItems.map(item =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: (item.quantity + 1) * item.price
              }
            : item
        );
      } else {
        // Add new item
        return [
          ...prevItems,
          {
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.thumbnail || product.images?.[0],
            quantity: 1,
            subtotal: product.price
          }
        ];
      }
    });
  };

  /**
   * Remove item from cart
   * @param {number} productId - ID of product to remove
   */
  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  /**
   * Update item quantity
   * @param {number} productId - ID of product
   * @param {number} quantity - New quantity
   */
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? {
              ...item,
              quantity,
              subtotal: quantity * item.price
            }
          : item
      )
    );
  };

  /**
   * Increase item quantity by 1
   * @param {number} productId - ID of product
   */
  const increaseQuantity = (productId) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? {
              ...item,
              quantity: item.quantity + 1,
              subtotal: (item.quantity + 1) * item.price
            }
          : item
      )
    );
  };

  /**
   * Decrease item quantity by 1
   * @param {number} productId - ID of product
   */
  const decreaseQuantity = (productId) => {
    setCartItems(prevItems => {
      const item = prevItems.find(i => i.id === productId);
      if (item && item.quantity <= 1) {
        return prevItems.filter(i => i.id !== productId);
      }
      return prevItems.map(i =>
        i.id === productId
          ? {
              ...i,
              quantity: i.quantity - 1,
              subtotal: (i.quantity - 1) * i.price
            }
          : i
      );
    });
  };

  /**
   * Clear all items from cart
   */
  const clearCart = () => {
    setCartItems([]);
  };

  /**
   * Check if product is in cart
   * @param {number} productId - ID of product
   * @returns {boolean}
   */
  const isInCart = (productId) => {
    return cartItems.some(item => item.id === productId);
  };

  /**
   * Get quantity of product in cart
   * @param {number} productId - ID of product
   * @returns {number}
   */
  const getQuantity = (productId) => {
    const item = cartItems.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  const value = {
    cartItems,
    totals,
    addToCart,
    removeFromCart,
    updateQuantity,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    isInCart,
    getQuantity
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

