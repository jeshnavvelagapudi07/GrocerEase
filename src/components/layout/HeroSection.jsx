import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button.jsx';

/**
 * Hero Section Component
 * Main landing section with call-to-action with video background
 */
export function HeroSection() {
  const navigate = useNavigate();

  const handleStartShopping = () => {
    navigate('/shop');
  };

  return (
    <section className="hero">
      {/* Video Background */}
      <video className="hero__video" autoPlay muted loop playsInline controls={false}>
        <source src="/WhatsApp Video 2026-02-19 at 5.47.46 PM.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Overlay for better text readability */}
      <div className="hero__overlay"></div>
      
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

