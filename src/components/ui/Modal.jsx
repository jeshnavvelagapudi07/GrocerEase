import { useEffect } from 'react';

/**
 * Modal Component
 * Reusable modal/popup dialog
 */
export function Modal({ isOpen, onClose, children, size = 'medium', showCloseButton = true }) {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen && onClose) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
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
        className="modal__backdrop"
        onClick={onClose}
      />

      {/* Modal */}
      <div className={`modal ${isOpen ? 'modal--open' : ''}`}>
        <div className={`modal__content modal__content--${size}`}>
          {showCloseButton && onClose && (
            <button 
              className="modal__close"
              onClick={onClose}
              aria-label="Close modal"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
          {children}
        </div>
      </div>
    </>
  );
}

/**
 * Order Success Modal
 * Special modal for order confirmation
 */
export function OrderSuccessModal({ isOpen, onClose, orderDetails }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="medium" showCloseButton={false}>
      <div className="order-success-modal">
        <div className="order-success-modal__icon">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="40" r="38" fill="currentColor" opacity="0.1"/>
            <path d="M25 40L35 50L55 30M70 40C70 56.5685 56.5685 70 40 70C23.4315 70 10 56.5685 10 40C10 23.4315 23.4315 10 40 10C56.5685 10 70 23.4315 70 40Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <h2 className="order-success-modal__title">Order Placed Successfully! 🎉</h2>
        <p className="order-success-modal__message">
          Thank you for your order! We'll send you a confirmation email shortly.
        </p>

        {orderDetails && (
          <div className="order-success-modal__details">
            <div className="order-success-modal__detail">
              <span className="order-success-modal__label">Order ID:</span>
              <span className="order-success-modal__value">#{orderDetails.id}</span>
            </div>
            <div className="order-success-modal__detail">
              <span className="order-success-modal__label">Total Amount:</span>
              <span className="order-success-modal__value">${orderDetails.total?.toFixed(2)}</span>
            </div>
            <div className="order-success-modal__detail">
              <span className="order-success-modal__label">Items:</span>
              <span className="order-success-modal__value">{orderDetails.itemCount} items</span>
            </div>
            <div className="order-success-modal__detail">
              <span className="order-success-modal__label">Estimated Delivery:</span>
              <span className="order-success-modal__value">2-3 business days</span>
            </div>
          </div>
        )}

        <div className="order-success-modal__actions">
          <button 
            className="button button--primary button--large"
            onClick={onClose}
          >
            Continue Shopping
          </button>
        </div>

        {/* Confetti Animation */}
        <div className="order-success-modal__confetti">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="confetti-piece"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.5}s`,
                backgroundColor: ['#4CAF50', '#FF9800', '#2196F3', '#F44336'][Math.floor(Math.random() * 4)]
              }}
            />
          ))}
        </div>
      </div>
    </Modal>
  );
}

