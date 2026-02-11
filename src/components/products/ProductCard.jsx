import { useState } from 'react';
import { useCart } from '../../context/CartContext.jsx';
import { useWishlist } from '../../context/WishlistContext.jsx';
import { useRecentlyViewed } from '../../hooks/useRecentlyViewed.js';
import { Button } from '../ui/Button.jsx';
import { Badge } from '../ui/Badge.jsx';

/**
 * Product Card Component
 * Displays individual product with image, details, and add-to-cart button
 */
export function ProductCard({ product, onAddToCart }) {
  const { addToCart, isInCart, getQuantity } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToRecentlyViewed } = useRecentlyViewed();
  const [isAdding, setIsAdding] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product);
    
    // Call parent handler if provided
    if (onAddToCart) {
      onAddToCart(product);
    }

    // Reset animation state
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };

  const inCart = isInCart(product.id);
  const quantity = getQuantity(product.id);
  const discount = product.discountPercentage || 0;
  const hasDiscount = discount > 0;
  const inWishlist = isInWishlist(product.id);

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleCardClick = () => {
    // Track recently viewed
    addToRecentlyViewed(product);
  };

  return (
    <div className="product-card" onClick={handleCardClick}>
      {/* Discount Badge */}
      {hasDiscount && (
        <Badge variant="danger" className="product-card__badge">
          -{Math.round(discount)}%
        </Badge>
      )}

      {/* Wishlist Button */}
      <button 
        className={`product-card__wishlist ${inWishlist ? 'product-card__wishlist--active' : ''}`}
        onClick={handleWishlistClick}
        aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill={inWishlist ? 'currentColor' : 'none'}>
          <path d="M10 18C9.5 17.5 2 13 2 7.5C2 5 4 3 6.5 3C7.5 3 8.5 3.5 10 5C10.5 3.5 11.5 3 12.5 3C15 3 17 5 17 7.5C17 13 10.5 17.5 10 18Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Product Image */}
      <div className="product-card__image-wrapper">
        {!imageLoaded && (
          <div className="product-card__image-skeleton"></div>
        )}
        <img
          src={product.thumbnail || product.images?.[0]}
          alt={product.title}
          className={`product-card__image ${imageLoaded ? 'product-card__image--loaded' : ''}`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
      </div>

      {/* Product Info */}
      <div className="product-card__content">
        <h3 className="product-card__title">{product.title}</h3>
        <p className="product-card__description">
          {product.description?.substring(0, 80)}
          {product.description?.length > 80 ? '...' : ''}
        </p>

        {/* Rating */}
        <div className="product-card__rating">
          <div className="product-card__stars">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill={i < Math.floor(product.rating || 0) ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth="1"
              >
                <path d="M8 1L10.163 5.382L15 6.09L11.5 9.494L12.326 14.31L8 12.034L3.674 14.31L4.5 9.494L1 6.09L5.837 5.382L8 1Z" />
              </svg>
            ))}
          </div>
          <span className="product-card__rating-text">
            {product.rating?.toFixed(1) || 'N/A'}
          </span>
        </div>

        {/* Price */}
        <div className="product-card__footer">
          <div className="product-card__price">
            <span className="product-card__price-current">
              ${product.price?.toFixed(2)}
            </span>
            {hasDiscount && (
              <span className="product-card__price-original">
                ${(product.price / (1 - discount / 100)).toFixed(2)}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <Button
            variant={inCart ? 'secondary' : 'primary'}
            size="small"
            onClick={handleAddToCart}
            className={`product-card__button ${isAdding ? 'product-card__button--adding' : ''}`}
          >
            {isAdding ? (
              <>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginRight: '4px' }}>
                  <path d="M13 4L6 11L3 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Added!
              </>
            ) : inCart ? (
              <>
                In Cart ({quantity})
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginRight: '4px' }}>
                  <path d="M2 2H3.2L3.6 4M3.6 4H14L11.2 9.6H5.2L3.6 4ZM11.2 9.6L12.4 12H5.2L3.6 4M11.2 9.6H5.2M6 15.2C6 15.6418 5.64183 16 5.2 16C4.75817 16 4.4 15.6418 4.4 15.2C4.4 14.7582 4.75817 14.4 5.2 14.4C5.64183 14.4 6 14.7582 6 15.2ZM12.4 15.2C12.4 15.6418 12.0418 16 11.6 16C11.1582 16 10.8 15.6418 10.8 15.2C10.8 14.7582 11.1582 14.4 11.6 14.4C12.0418 14.4 12.4 14.7582 12.4 15.2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Add
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

