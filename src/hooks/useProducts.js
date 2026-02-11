import { useState, useEffect, useCallback } from 'react';
import { getProducts, sortProducts as sortProductsUtil, filterByTag } from '../services/api.js';
import { mockProducts } from '../data/mockProducts.js';

/**
 * Custom hook for managing products state and operations
 * Uses JSON-Server API for CRUD operations with fallback to mock data
 * @returns {Object} Products state and methods
 */
export function useProducts() {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usingMockData, setUsingMockData] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    sortBy: 'title',
    order: 'asc',
    tag: 'all',
    category: 'all'
  });

  // Fetch products on mount
  useEffect(() => {
    loadProducts();
  }, []);

  // Apply filters whenever they change
  useEffect(() => {
    applyFilters();
  }, [filters, allProducts]);

  /**
   * Load products from JSON-Server API with fallback to mock data
   */
  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Try to fetch from JSON-Server API first
      const data = await getProducts({
        category: filters.category,
        search: filters.search,
        sortBy: filters.sortBy,
        order: filters.order
      });
      setAllProducts(data);
      setUsingMockData(false);
    } catch (err) {
      console.warn('JSON-Server not available, using mock data:', err.message);
      // Fallback to mock data if API fails
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate loading
      setAllProducts(mockProducts);
      setUsingMockData(true);
      setError('Using offline data. Start JSON-Server with "npm run server" for full CRUD functionality.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Apply current filters to products
   */
  const applyFilters = useCallback(() => {
    let filtered = [...allProducts];

    // Apply category filter
    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchLower) ||
        (product.description && product.description.toLowerCase().includes(searchLower))
      );
    }

    // Apply tag filter
    if (filters.tag && filters.tag !== 'all') {
      filtered = filterByTag(filtered, filters.tag);
    }

    // Apply sorting
    if (filters.sortBy) {
      filtered = sortProductsUtil(filtered, filters.sortBy, filters.order);
    }

    setProducts(filtered);
  }, [allProducts, filters]);

  /**
   * Search products by query
   * @param {string} query - Search query
   */
  const searchProducts = useCallback((query) => {
    setFilters(prev => ({ ...prev, search: query }));
  }, []);

  /**
   * Sort products by field and order
   * @param {string} sortBy - Field to sort by
   * @param {string} order - Sort order ('asc' or 'desc')
   */
  const sortProductsBy = useCallback((sortBy, order = 'asc') => {
    setFilters(prev => ({ ...prev, sortBy, order }));
  }, []);

  /**
   * Filter products by tag
   * @param {string} tag - Tag to filter by
   */
  const filterProductsByTag = useCallback((tag) => {
    setFilters(prev => ({ ...prev, tag }));
  }, []);

  /**
   * Filter products by category
   * @param {string} category - Category to filter by
   */
  const filterProductsByCategory = useCallback((category) => {
    setFilters(prev => ({ ...prev, category }));
  }, []);

  /**
   * Reset all filters
   */
  const resetFilters = useCallback(() => {
    setFilters({
      search: '',
      sortBy: 'title',
      order: 'asc',
      tag: 'all',
      category: 'all'
    });
  }, []);

  return {
    products,
    allProducts,
    loading,
    error,
    filters,
    usingMockData,
    searchProducts,
    sortProductsBy,
    filterProductsByTag,
    filterProductsByCategory,
    resetFilters,
    reload: loadProducts
  };
}

