import { useState, useEffect } from 'react';
import { useProducts } from '../hooks/useProducts.js';
import { categories } from '../data/mockProducts.js';
import { FiltersBar } from '../components/products/FiltersBar.jsx';
import { ProductGrid } from '../components/products/ProductGrid.jsx';
import { ToastContainer } from '../components/ui/Toast.jsx';

/**
 * Shop Page
 * Browse and filter products
 */
export function Shop() {
  const {
    products,
    loading,
    error,
    usingMockData,
    filters,
    searchProducts,
    sortProductsBy,
    filterProductsByTag,
    filterProductsByCategory,
    resetFilters
  } = useProducts(); // Use JSON-Server API with fallback to mock data

  const [toasts, setToasts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    filterProductsByCategory(categoryId);
  };

  const handleAddToCart = (product) => {
    // Show success toast
    addToast({
      message: `${product.title} added to cart!`,
      type: 'success'
    });
  };

  const addToast = (toast) => {
    const id = Date.now();
    setToasts(prev => [...prev, { ...toast, id }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page page--shop">
      <div className="shop">
        <div className="shop__container">
          <div className="shop__header">
            <h1 className="shop__title">Shop Groceries</h1>
            <p className="shop__description">
              Browse our fresh selection of quality groceries
            </p>
          </div>

          {/* Category Tabs */}
          <div className="shop__categories">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`shop__category ${selectedCategory === category.id ? 'shop__category--active' : ''}`}
                onClick={() => handleCategoryChange(category.id)}
              >
                <span className="shop__category-icon">{category.icon}</span>
                <span className="shop__category-name">{category.name}</span>
              </button>
            ))}
          </div>

          {/* Filters */}
          <FiltersBar
            onSearch={searchProducts}
            onSort={sortProductsBy}
            onFilterTag={filterProductsByTag}
            onReset={() => {
              resetFilters();
              setSelectedCategory('all');
            }}
            filters={filters}
          />

          {/* Info Banner (when using mock data) */}
          {usingMockData && error && (
            <div className="shop__info" style={{
              padding: '12px 16px',
              marginBottom: '20px',
              backgroundColor: '#FFF3CD',
              border: '1px solid #FFC107',
              borderRadius: '8px',
              color: '#856404'
            }}>
              <strong>ℹ️ Info:</strong> {error}
            </div>
          )}

          {/* Error State (only for real errors) */}
          {!usingMockData && error && (
            <div className="shop__error">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <path d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M24 16V24M24 32H24.02" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h3>Oops! Something went wrong</h3>
              <p>{error}</p>
            </div>
          )}

          {/* Products Grid */}
          {(!error || usingMockData) && (
            <>
              {!loading && products.length > 0 && (
                <div className="shop__results-count">
                  Showing {products.length} product{products.length !== 1 ? 's' : ''}
                </div>
              )}
              <ProductGrid
                products={products}
                loading={loading}
                onAddToCart={handleAddToCart}
              />
            </>
          )}
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}

