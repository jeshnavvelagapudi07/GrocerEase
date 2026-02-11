import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import { useAuth } from './AuthContext.jsx';

const WishlistContext = createContext();

/**
 * Hook to use wishlist context
 * @returns {Object} Wishlist context value
 */
export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
}

/**
 * Wishlist Provider Component
 * Manages wishlist/favorites state
 */
export function WishlistProvider({ children }) {
  const { user } = useAuth();
  const userId = user?.id || 'guest';
  const storageKey = `grocerese-wishlist-${userId}`;

  const [wishlistItems, setWishlistItems] = useLocalStorage(storageKey, []);

  /**
   * Add item to wishlist
   * @param {Object} product - Product to add
   */
  const addToWishlist = (product) => {
    setWishlistItems(prev => {
      // Check if already in wishlist
      if (prev.some(item => item.id === product.id)) {
        return prev;
      }
      return [...prev, {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.thumbnail || product.images?.[0],
        rating: product.rating,
        addedAt: new Date().toISOString()
      }];
    });
  };

  /**
   * Remove item from wishlist
   * @param {number} productId - ID of product to remove
   */
  const removeFromWishlist = (productId) => {
    setWishlistItems(prev => prev.filter(item => item.id !== productId));
  };

  /**
   * Toggle item in wishlist
   * @param {Object} product - Product to toggle
   */
  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      return false;
    } else {
      addToWishlist(product);
      return true;
    }
  };

  /**
   * Check if product is in wishlist
   * @param {number} productId - ID of product
   * @returns {boolean}
   */
  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  /**
   * Clear wishlist
   */
  const clearWishlist = () => {
    setWishlistItems([]);
  };

  const value = {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    clearWishlist,
    wishlistCount: wishlistItems.length
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

