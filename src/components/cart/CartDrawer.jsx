import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext.jsx';
import { CartItem } from './CartItem.jsx';
import { CartSummary } from './CartSummary.jsx';
import { Button } from '../ui/Button.jsx';

/**
 * Cart Drawer Component
 * Slide-in cart panel from the right
 */
export function CartDrawer({ isOpen, onClose }) {
  const { cartItems, totals } = useCart();

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="cart-drawer__backdrop"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className={`cart-drawer ${isOpen ? 'cart-drawer--open' : ''}`}>
        <div className="cart-drawer__header">
          <h2 className="cart-drawer__title">
            Shopping Cart
            {totals.itemsCount > 0 && (
              <span className="cart-drawer__count"> ({totals.itemsCount})</span>
            )}
          </h2>
          <button 
            className="cart-drawer__close"
            onClick={onClose}
            aria-label="Close cart"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="cart-drawer__content">
          {cartItems.length === 0 ? (
            <div className="cart-drawer__empty">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <circle cx="40" cy="40" r="38" stroke="currentColor" strokeWidth="2" opacity="0.2"/>
                <path d="M20 20H28L30.4 30M30.4 30H60L52 50H36L30.4 30ZM52 50L56 60H36L30.4 30M52 50H36M42 70C42 71.1046 41.1046 72 40 72C38.8954 72 38 71.1046 38 70C38 68.8954 38.8954 68 40 68C41.1046 68 42 68.8954 42 70ZM54 70C54 71.1046 53.1046 72 52 72C50.8954 72 50 71.1046 50 70C50 68.8954 50.8954 68 52 68C53.1046 68 54 68.8954 54 70Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p className="cart-drawer__empty-text">Your cart is empty</p>
              <Link to="/shop" onClick={onClose}>
                <Button variant="primary" size="medium">
                  Start Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="cart-drawer__items">
                {cartItems.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>

              <div className="cart-drawer__footer">
                <CartSummary onCheckout={onClose} />
                
                <Link 
                  to="/cart" 
                  className="cart-drawer__view-cart"
                  onClick={onClose}
                >
                  View Full Cart
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

