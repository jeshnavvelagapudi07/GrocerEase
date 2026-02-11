/**
 * API Service for CRUD operations using Axios and JSON-Server
 */

import axios from 'axios';

// Base URL for JSON-Server
const API_BASE_URL = 'http://localhost:3001';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ===================================
// PRODUCTS CRUD OPERATIONS
// ===================================

/**
 * READ: Get all products
 * @param {Object} options - Query options
 * @param {string} options.search - Search term
 * @param {string} options.category - Filter by category
 * @param {string} options.sortBy - Sort field
 * @param {string} options.order - Sort order: 'asc' or 'desc'
 * @returns {Promise<Array>} Array of products
 */
export async function getProducts({ 
  search = '', 
  category = 'all',
  sortBy = 'title', 
  order = 'asc' 
} = {}) {
  try {
    const response = await api.get('/products');
    let products = response.data;

    // Filter by category
    if (category && category !== 'all') {
      products = products.filter(product => product.category === category);
    }

    // Filter by search term
    if (search) {
      const searchLower = search.toLowerCase();
      products = products.filter(product => 
        product.title.toLowerCase().includes(searchLower) ||
        (product.description && product.description.toLowerCase().includes(searchLower)) ||
        (product.tags && product.tags.some(tag => tag.toLowerCase().includes(searchLower)))
      );
    }

    // Sort products
    if (sortBy) {
      products = sortProducts(products, sortBy, order);
    }

    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

/**
 * READ: Get a single product by ID
 * @param {number} id - Product ID
 * @returns {Promise<Object>} Product object
 */
export async function getProductById(id) {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
}

/**
 * CREATE: Add a new product
 * @param {Object} productData - Product data
 * @returns {Promise<Object>} Created product
 */
export async function createProduct(productData) {
  try {
    const response = await api.post('/products', productData);
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
}

/**
 * UPDATE: Update an existing product
 * @param {number} id - Product ID
 * @param {Object} productData - Updated product data
 * @returns {Promise<Object>} Updated product
 */
export async function updateProduct(id, productData) {
  try {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  } catch (error) {
    console.error(`Error updating product ${id}:`, error);
    throw error;
  }
}

/**
 * DELETE: Delete a product
 * @param {number} id - Product ID
 * @returns {Promise<void>}
 */
export async function deleteProduct(id) {
  try {
    await api.delete(`/products/${id}`);
  } catch (error) {
    console.error(`Error deleting product ${id}:`, error);
    throw error;
  }
}

// ===================================
// USERS CRUD OPERATIONS
// ===================================

/**
 * READ: Get all users
 * @returns {Promise<Array>} Array of users
 */
export async function getUsers() {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

/**
 * READ: Get user by ID
 * @param {number} id - User ID
 * @returns {Promise<Object>} User object
 */
export async function getUserById(id) {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user ${id}:`, error);
    throw error;
  }
}

/**
 * CREATE: Register a new user
 * @param {Object} userData - User data
 * @returns {Promise<Object>} Created user
 */
export async function createUser(userData) {
  try {
    const response = await api.post('/users', userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

/**
 * UPDATE: Update user
 * @param {number} id - User ID
 * @param {Object} userData - Updated user data
 * @returns {Promise<Object>} Updated user
 */
export async function updateUser(id, userData) {
  try {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error(`Error updating user ${id}:`, error);
    throw error;
  }
}

/**
 * DELETE: Delete user
 * @param {number} id - User ID
 * @returns {Promise<void>}
 */
export async function deleteUser(id) {
  try {
    await api.delete(`/users/${id}`);
  } catch (error) {
    console.error(`Error deleting user ${id}:`, error);
    throw error;
  }
}

// ===================================
// ORDERS CRUD OPERATIONS
// ===================================

/**
 * READ: Get all orders
 * @returns {Promise<Array>} Array of orders
 */
export async function getOrders() {
  try {
    const response = await api.get('/orders');
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
}

/**
 * READ: Get orders by user ID
 * @param {number} userId - User ID
 * @returns {Promise<Array>} Array of user orders
 */
export async function getOrdersByUserId(userId) {
  try {
    const response = await api.get('/orders', {
      params: { userId }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching orders for user ${userId}:`, error);
    throw error;
  }
}

/**
 * CREATE: Create a new order
 * @param {Object} orderData - Order data
 * @returns {Promise<Object>} Created order
 */
export async function createOrder(orderData) {
  try {
    const response = await api.post('/orders', orderData);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}

/**
 * UPDATE: Update an order
 * @param {number} id - Order ID
 * @param {Object} orderData - Updated order data
 * @returns {Promise<Object>} Updated order
 */
export async function updateOrder(id, orderData) {
  try {
    const response = await api.put(`/orders/${id}`, orderData);
    return response.data;
  } catch (error) {
    console.error(`Error updating order ${id}:`, error);
    throw error;
  }
}

/**
 * DELETE: Delete an order
 * @param {number} id - Order ID
 * @returns {Promise<void>}
 */
export async function deleteOrder(id) {
  try {
    await api.delete(`/orders/${id}`);
  } catch (error) {
    console.error(`Error deleting order ${id}:`, error);
    throw error;
  }
}

// ===================================
// UTILITY FUNCTIONS
// ===================================

/**
 * Sort products by specified field and order
 * @param {Array} products - Array of products
 * @param {string} sortBy - Field to sort by
 * @param {string} order - 'asc' or 'desc'
 * @returns {Array} Sorted products
 */
export function sortProducts(products, sortBy, order = 'asc') {
  const sorted = [...products].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];
    
    // Handle string comparison
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    
    if (aValue < bValue) return order === 'asc' ? -1 : 1;
    if (aValue > bValue) return order === 'asc' ? 1 : -1;
    return 0;
  });
  
  return sorted;
}

/**
 * Filter products by tag
 * @param {Array} products - Array of products
 * @param {string} tag - Tag to filter by
 * @returns {Array} Filtered products
 */
export function filterByTag(products, tag) {
  if (!tag || tag === 'all') return products;
  
  const tagLower = tag.toLowerCase();
  
  return products.filter(product => {
    const title = product.title.toLowerCase();
    const description = (product.description || '').toLowerCase();
    const tags = (product.tags || []).map(t => t.toLowerCase());
    
    return title.includes(tagLower) || 
           description.includes(tagLower) ||
           tags.some(t => t.includes(tagLower));
  });
}

// Legacy function for backward compatibility
export async function fetchGroceries(options = {}) {
  const products = await getProducts(options);
  return {
    products,
    total: products.length,
    skip: 0,
    limit: products.length
  };
}
