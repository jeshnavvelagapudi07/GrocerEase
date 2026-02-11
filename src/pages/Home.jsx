import { HeroSection } from '../components/layout/HeroSection.jsx';

/**
 * Home Page
 * Landing page with hero section and features
 */
export function Home() {
  return (
    <div className="page page--home">
      <HeroSection />
      
      {/* Features Section */}
      <section className="features">
        <div className="features__container">
          <h2 className="features__heading">Why Choose GrocerEase?</h2>
          <div className="features__grid">
            <div className="feature-card">
              <div className="feature-card__icon feature-card__icon--green">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M10 16L14 20L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="feature-card__title">Fresh Products</h3>
              <p className="feature-card__description">
                We source the freshest groceries directly from local farms and trusted suppliers.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-card__icon feature-card__icon--orange">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M16 4V16L22 19M28 16C28 22.6274 22.6274 28 16 28C9.37258 28 4 22.6274 4 16C4 9.37258 9.37258 4 16 4C22.6274 4 28 9.37258 28 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="feature-card__title">Fast Delivery</h3>
              <p className="feature-card__description">
                Get your groceries delivered to your doorstep within hours of ordering.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-card__icon feature-card__icon--blue">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M4 8L16 2L28 8M4 8L16 14M4 8V24L16 30M28 8L16 14M28 8V24L16 30M16 14V30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="feature-card__title">Wide Selection</h3>
              <p className="feature-card__description">
                Browse through hundreds of products across multiple categories.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-card__icon feature-card__icon--purple">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M28 20V12C28 10.8954 27.1046 10 26 10H6C4.89543 10 4 10.8954 4 12V20C4 21.1046 4.89543 22 6 22H26C27.1046 22 28 21.1046 28 20Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M4 16H28M16 10V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="feature-card__title">Great Prices</h3>
              <p className="feature-card__description">
                Enjoy competitive prices and regular discounts on your favorite products.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

