import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext.jsx';
import { Button } from '../ui/Button.jsx';

/**
 * Cart Summary Component
 * Displays cart totals and checkout button
 */
export function CartSummary({ onCheckout }) {
  const navigate = useNavigate();
  const { totals } = useCart();

  const handleCheckout = () => {
    if (onCheckout) {
      onCheckout();
    }
    navigate('/checkout');
  };

  return (
    <div className="cart-summary">
      <h3 className="cart-summary__title">Order Summary</h3>
      
      <div className="cart-summary__line">
        <span className="cart-summary__label">Subtotal ({totals.itemsCount} items)</span>
        <span className="cart-summary__value">${totals.subtotal.toFixed(2)}</span>
      </div>
      
      {totals.discount > 0 && (
        <div className="cart-summary__line cart-summary__line--discount">
          <span className="cart-summary__label">Discount (10%)</span>
          <span className="cart-summary__value">-${totals.discount.toFixed(2)}</span>
        </div>
      )}
      
      <div className="cart-summary__line">
        <span className="cart-summary__label">
          Delivery
          {totals.delivery === 0 && totals.subtotal > 0 && (
            <span className="cart-summary__note"> (Free over $30)</span>
          )}
        </span>
        <span className="cart-summary__value">
          {totals.delivery === 0 && totals.subtotal > 0 ? 'FREE' : `$${totals.delivery.toFixed(2)}`}
        </span>
      </div>
      
      <div className="cart-summary__divider"></div>
      
      <div className="cart-summary__line cart-summary__line--total">
        <span className="cart-summary__label">Total</span>
        <span className="cart-summary__value">${totals.grandTotal.toFixed(2)}</span>
      </div>
      
      {totals.subtotal > 0 && totals.subtotal < 30 && (
        <p className="cart-summary__hint">
          Add ${(30 - totals.subtotal).toFixed(2)} more for free delivery!
        </p>
      )}
      
      <Button
        variant="primary"
        size="large"
        fullWidth
        onClick={handleCheckout}
        disabled={totals.itemsCount === 0}
        className="cart-summary__checkout"
      >
        Proceed to Checkout
      </Button>
    </div>
  );
}

