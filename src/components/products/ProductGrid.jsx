import { ProductCard } from './ProductCard.jsx';

/**
 * Product Grid Component
 * Displays a grid of products with loading and empty states
 */
export function ProductGrid({ products, loading, onAddToCart }) {
  // Loading skeleton
  if (loading) {
    return (
      <div className="product-grid">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="product-card product-card--skeleton">
            <div className="product-card__image-skeleton"></div>
            <div className="product-card__content">
              <div className="skeleton skeleton--title"></div>
              <div className="skeleton skeleton--text"></div>
              <div className="skeleton skeleton--text"></div>
              <div className="skeleton skeleton--price"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Empty state
  if (!products || products.length === 0) {
    return (
      <div className="product-grid__empty">
        <div className="product-grid__empty-icon">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="40" r="38" stroke="currentColor" strokeWidth="2" opacity="0.2"/>
            <path d="M40 24V40M40 48H40.02M40 72C57.6731 72 72 57.6731 72 40C72 22.3269 57.6731 8 40 8C22.3269 8 8 22.3269 8 40C8 57.6731 22.3269 72 40 72Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h3 className="product-grid__empty-title">No products found</h3>
        <p className="product-grid__empty-text">
          Try adjusting your filters or search terms to find what you're looking for.
        </p>
      </div>
    );
  }

  // Product grid
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}

