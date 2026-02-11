import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { CartItem } from '../components/cart/CartItem.jsx';
import { CartSummary } from '../components/cart/CartSummary.jsx';
import { Button } from '../components/ui/Button.jsx';

/**
 * Cart Page
 * Full-page cart view
 */
export function CartPage() {
  const { cartItems, clearCart } = useCart();

  return (
    <div className="page page--cart">
      <div className="cart-page">
        <div className="cart-page__container">
          <div className="cart-page__header">
            <h1 className="cart-page__title">Shopping Cart</h1>
            {cartItems.length > 0 && (
              <button 
                className="cart-page__clear"
                onClick={clearCart}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginRight: '4px' }}>
                  <path d="M2 4H14M12.6667 4V13.3333C12.6667 14.0697 12.0697 14.6667 11.3333 14.6667H4.66667C3.93029 14.6667 3.33333 14.0697 3.33333 13.3333V4M5.33333 4V2.66667C5.33333 1.93029 5.93029 1.33333 6.66667 1.33333H9.33333C10.0697 1.33333 10.6667 1.93029 10.6667 2.66667V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Clear Cart
              </button>
            )}
          </div>

          {cartItems.length === 0 ? (
            <div className="cart-page__empty">
              <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                <circle cx="60" cy="60" r="58" stroke="currentColor" strokeWidth="2" opacity="0.2"/>
                <path d="M30 30H42L45.6 45M45.6 45H90L78 75H54L45.6 45ZM78 75L84 90H54L45.6 45M78 75H54M63 105C63 106.657 61.6569 108 60 108C58.3431 108 57 106.657 57 105C57 103.343 58.3431 102 60 102C61.6569 102 63 103.343 63 105ZM81 105C81 106.657 79.6569 108 78 108C76.3431 108 75 106.657 75 105C75 103.343 76.3431 102 78 102C79.6569 102 81 103.343 81 105Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h2 className="cart-page__empty-title">Your cart is empty</h2>
              <p className="cart-page__empty-text">
                Add some delicious groceries to your cart and they will appear here.
              </p>
              <Link to="/shop">
                <Button variant="primary" size="large">
                  Browse Products
                </Button>
              </Link>
            </div>
          ) : (
            <div className="cart-page__content">
              <div className="cart-page__items">
                {cartItems.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>

              <div className="cart-page__sidebar">
                <CartSummary />
                
                <Link to="/shop" className="cart-page__continue">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ marginRight: '8px' }}>
                    <path d="M12.5 5L7.5 10L12.5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Continue Shopping
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

