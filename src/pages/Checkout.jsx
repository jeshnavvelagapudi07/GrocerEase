import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { Button } from '../components/ui/Button.jsx';
import { OrderSuccessModal } from '../components/ui/Modal.jsx';

/**
 * Checkout Page
 * Simple checkout form with order confirmation
 */
export function Checkout() {
  const navigate = useNavigate();
  const { cartItems, totals, clearCart } = useCart();
  const { isAuthenticated, addOrder } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: 'card'
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  // Redirect if cart is empty
  if (cartItems.length === 0 && !orderPlaced) {
    navigate('/shop');
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Create order details
    const order = {
      id: Date.now(),
      items: cartItems,
      ...totals,
      shippingAddress: {
        address: formData.address,
        city: formData.city,
        zipCode: formData.zipCode
      },
      paymentMethod: formData.paymentMethod
    };
    
    // Save order to user history if authenticated
    if (isAuthenticated) {
      addOrder(order);
    }
    
    setOrderDetails({
      id: order.id,
      total: totals.grandTotal,
      itemCount: totals.itemsCount
    });
    
    setIsSubmitting(false);
    setShowSuccessModal(true);
    clearCart();
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="page page--checkout">
        <div className="checkout">
          <div className="checkout__container">
            <div className="checkout__success">
              <div className="checkout__success-icon">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                  <circle cx="40" cy="40" r="38" fill="currentColor" opacity="0.1"/>
                  <path d="M25 40L35 50L55 30M70 40C70 56.5685 56.5685 70 40 70C23.4315 70 10 56.5685 10 40C10 23.4315 23.4315 10 40 10C56.5685 10 70 23.4315 70 40Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h1 className="checkout__success-title">Order Placed Successfully!</h1>
              <p className="checkout__success-text">
                Thank you for your order. We'll send you a confirmation email shortly.
              </p>
              <div className="checkout__success-actions">
                <Button 
                  variant="primary" 
                  size="large"
                  onClick={() => navigate('/shop')}
                >
                  Continue Shopping
                </Button>
                <Button 
                  variant="secondary" 
                  size="large"
                  onClick={() => navigate('/')}
                >
                  Go to Home
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Order Success Modal */}
      <OrderSuccessModal 
        isOpen={showSuccessModal}
        onClose={handleModalClose}
        orderDetails={orderDetails}
      />

      <div className="page page--checkout">
        <div className="checkout">
          <div className="checkout__container">
            <h1 className="checkout__title">Checkout</h1>
            
            <div className="checkout__content">
            {/* Checkout Form */}
            <form className="checkout__form" onSubmit={handleSubmit}>
              <div className="checkout__section">
                <h2 className="checkout__section-title">Contact Information</h2>
                
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`form-input ${errors.name ? 'form-input--error' : ''}`}
                    placeholder="John Doe"
                  />
                  {errors.name && <span className="form-error">{errors.name}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-input ${errors.email ? 'form-input--error' : ''}`}
                    placeholder="john@example.com"
                  />
                  {errors.email && <span className="form-error">{errors.email}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">Phone *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`form-input ${errors.phone ? 'form-input--error' : ''}`}
                    placeholder="(123) 456-7890"
                  />
                  {errors.phone && <span className="form-error">{errors.phone}</span>}
                </div>
              </div>
              
              <div className="checkout__section">
                <h2 className="checkout__section-title">Delivery Address</h2>
                
                <div className="form-group">
                  <label htmlFor="address" className="form-label">Street Address *</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`form-input ${errors.address ? 'form-input--error' : ''}`}
                    placeholder="123 Main Street"
                  />
                  {errors.address && <span className="form-error">{errors.address}</span>}
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city" className="form-label">City *</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`form-input ${errors.city ? 'form-input--error' : ''}`}
                      placeholder="New York"
                    />
                    {errors.city && <span className="form-error">{errors.city}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="zipCode" className="form-label">ZIP Code *</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className={`form-input ${errors.zipCode ? 'form-input--error' : ''}`}
                      placeholder="10001"
                    />
                    {errors.zipCode && <span className="form-error">{errors.zipCode}</span>}
                  </div>
                </div>
              </div>
              
              <div className="checkout__section">
                <h2 className="checkout__section-title">Payment Method</h2>
                
                <div className="payment-methods">
                  <label className="payment-method">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleChange}
                    />
                    <span className="payment-method__label">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
                        <path d="M2 10H22" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      Credit/Debit Card
                    </span>
                  </label>
                  
                  <label className="payment-method">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={formData.paymentMethod === 'cash'}
                      onChange={handleChange}
                    />
                    <span className="payment-method__label">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="2"/>
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      Cash on Delivery
                    </span>
                  </label>
                </div>
              </div>
              
              <Button
                type="submit"
                variant="primary"
                size="large"
                fullWidth
                disabled={isSubmitting}
                className="checkout__submit"
              >
                {isSubmitting ? 'Processing...' : `Place Order - $${totals.grandTotal.toFixed(2)}`}
              </Button>
            </form>
            
            {/* Order Summary */}
            <div className="checkout__summary">
              <h2 className="checkout__summary-title">Order Summary</h2>
              
              <div className="checkout__items">
                {cartItems.map((item) => (
                  <div key={item.id} className="checkout__item">
                    <img src={item.image} alt={item.title} className="checkout__item-image" />
                    <div className="checkout__item-details">
                      <h4 className="checkout__item-title">{item.title}</h4>
                      <p className="checkout__item-quantity">Qty: {item.quantity}</p>
                    </div>
                    <span className="checkout__item-price">${item.subtotal.toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <div className="checkout__totals">
                <div className="checkout__total-line">
                  <span>Subtotal</span>
                  <span>${totals.subtotal.toFixed(2)}</span>
                </div>
                {totals.discount > 0 && (
                  <div className="checkout__total-line checkout__total-line--discount">
                    <span>Discount</span>
                    <span>-${totals.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="checkout__total-line">
                  <span>Delivery</span>
                  <span>{totals.delivery === 0 ? 'FREE' : `$${totals.delivery.toFixed(2)}`}</span>
                </div>
                <div className="checkout__total-line checkout__total-line--grand">
                  <span>Total</span>
                  <span>${totals.grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}


