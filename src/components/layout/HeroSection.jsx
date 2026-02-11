import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button.jsx';

/**
 * Hero Section Component
 * Main landing section with call-to-action
 */
export function HeroSection() {
  const navigate = useNavigate();

  const handleStartShopping = () => {
    navigate('/shop');
  };

  return (
    <section className="hero">
      <div className="hero__container">
        <div className="hero__content">
          <h1 className="hero__title">
            GrocerEase: Simplifying Your Shopping Experience
          </h1>
          <p className="hero__subtitle">
            Fresh groceries delivered to your doorstep. Browse our wide selection of quality products and enjoy hassle-free online shopping.
          </p>
          <div className="hero__actions">
            <Button 
              variant="primary" 
              size="large"
              onClick={handleStartShopping}
              className="hero__cta"
            >
              Start Shopping
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ marginLeft: '8px' }}>
                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

