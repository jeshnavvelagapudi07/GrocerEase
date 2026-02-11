import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { Button } from '../components/ui/Button.jsx';

/**
 * Wishlist Page
 * Display user's wishlist/favorites
 */
export function Wishlist() {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart, isInCart } = useCart();

  const handleAddToCart = (item) => {
    addToCart(item);
  };

  return (
    <div className="page page--wishlist">
      <div className="wishlist">
        <div className="wishlist__container">
          <div className="wishlist__header">
            <div>
              <h1 className="wishlist__title">My Wishlist</h1>
              <p className="wishlist__subtitle">{wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'}</p>
            </div>
            {wishlistItems.length > 0 && (
              <Button
                variant="secondary"
                size="medium"
                onClick={clearWishlist}
              >
                Clear Wishlist
              </Button>
            )}
          </div>

          {wishlistItems.length === 0 ? (
            <div className="wishlist__empty">
              <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                <circle cx="60" cy="60" r="58" stroke="currentColor" strokeWidth="2" opacity="0.2"/>
                <path d="M60 100C71.5 90 90 77 90 55C90 42 82 35 75 35C68 35 63 40 60 45C57 40 52 35 45 35C38 35 30 42 30 55C30 77 48.5 90 60 100Z" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
              <h2 className="wishlist__empty-title">Your wishlist is empty</h2>
              <p className="wishlist__empty-text">
                Save your favorite items to your wishlist for easy access later.
              </p>
              <Link to="/shop">
                <Button variant="primary" size="large">
                  Browse Products
                </Button>
              </Link>
            </div>
          ) : (
            <div className="wishlist__grid">
              {wishlistItems.map((item) => (
                <div key={item.id} className="wishlist-card">
                  <button
                    className="wishlist-card__remove"
                    onClick={() => removeFromWishlist(item.id)}
                    aria-label="Remove from wishlist"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>

                  <div className="wishlist-card__image-wrapper">
                    <img src={item.image} alt={item.title} className="wishlist-card__image" />
                  </div>

                  <div className="wishlist-card__content">
                    <h3 className="wishlist-card__title">{item.title}</h3>

                    <div className="wishlist-card__rating">
                      <div className="wishlist-card__stars">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill={i < Math.floor(item.rating) ? 'currentColor' : 'none'}
                            stroke="currentColor"
                            strokeWidth="1"
                          >
                            <path d="M8 1L10.163 5.382L15 6.09L11.5 9.494L12.326 14.31L8 12.034L3.674 14.31L4.5 9.494L1 6.09L5.837 5.382L8 1Z" />
                          </svg>
                        ))}
                      </div>
                      <span>{item.rating.toFixed(1)}</span>
                    </div>

                    <div className="wishlist-card__footer">
                      <span className="wishlist-card__price">${item.price.toFixed(2)}</span>
                      <Button
                        variant={isInCart(item.id) ? 'secondary' : 'primary'}
                        size="small"
                        onClick={() => handleAddToCart(item)}
                      >
                        {isInCart(item.id) ? 'In Cart' : 'Add to Cart'}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

