import { useLocalStorage } from './useLocalStorage.js';

/**
 * Custom hook for managing recently viewed products
 * @returns {Object} Recently viewed products and methods
 */
export function useRecentlyViewed() {
  const [recentlyViewed, setRecentlyViewed] = useLocalStorage('grocerese-recently-viewed', []);

  /**
   * Add product to recently viewed
   * @param {Object} product - Product to add
   */
  const addToRecentlyViewed = (product) => {
    setRecentlyViewed(prev => {
      // Remove if already exists
      const filtered = prev.filter(item => item.id !== product.id);
      
      // Add to beginning
      const updated = [{
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.thumbnail || product.images?.[0],
        rating: product.rating,
        viewedAt: new Date().toISOString()
      }, ...filtered];
      
      // Keep only last 10
      return updated.slice(0, 10);
    });
  };

  /**
   * Clear recently viewed
   */
  const clearRecentlyViewed = () => {
    setRecentlyViewed([]);
  };

  return {
    recentlyViewed,
    addToRecentlyViewed,
    clearRecentlyViewed
  };
}

