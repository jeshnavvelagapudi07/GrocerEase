import { useCart } from '../../context/CartContext.jsx';

/**
 * Cart Item Component
 * Displays individual cart item with quantity controls
 */
export function CartItem({ item }) {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  return (
    <div className="cart-item">
      <img
        src={item.image}
        alt={item.title}
        className="cart-item__image"
      />
      
      <div className="cart-item__details">
        <h4 className="cart-item__title">{item.title}</h4>
        <p className="cart-item__price">${item.price.toFixed(2)} each</p>
        
        <div className="cart-item__quantity">
          <button
            onClick={() => decreaseQuantity(item.id)}
            className="cart-item__quantity-btn"
            aria-label="Decrease quantity"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <span className="cart-item__quantity-value">{item.quantity}</span>
          
          <button
            onClick={() => increaseQuantity(item.id)}
            className="cart-item__quantity-btn"
            aria-label="Increase quantity"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
      
      <div className="cart-item__actions">
        <div className="cart-item__subtotal">
          ${item.subtotal.toFixed(2)}
        </div>
        <button
          onClick={() => removeFromCart(item.id)}
          className="cart-item__remove"
          aria-label="Remove item"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 4H14M12.6667 4V13.3333C12.6667 14.0697 12.0697 14.6667 11.3333 14.6667H4.66667C3.93029 14.6667 3.33333 14.0697 3.33333 13.3333V4M5.33333 4V2.66667C5.33333 1.93029 5.93029 1.33333 6.66667 1.33333H9.33333C10.0697 1.33333 10.6667 1.93029 10.6667 2.66667V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

