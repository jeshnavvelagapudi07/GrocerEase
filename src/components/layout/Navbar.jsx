import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext.jsx';
import { useWishlist } from '../../context/WishlistContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';
import { Badge } from '../ui/Badge.jsx';
import { useState, useRef, useEffect } from 'react';

/**
 * Navigation Bar Component
 * Main navigation with logo, links, cart icon, and theme toggle
 */
export function Navbar({ onCartOpen }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { totals } = useCart();
  const { wishlistCount } = useWishlist();
  const { isAuthenticated, user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    if (onCartOpen) {
      onCartOpen();
    }
  };

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar__container">
        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="navbar__logo-icon">
            <path d="M12 4L4 8V14C4 21 8 26 12 28C16 26 20 21 20 14V8L12 4Z" fill="currentColor" opacity="0.2"/>
            <path d="M12 4L4 8V14C4 21 8 26 12 28C16 26 20 21 20 14V8L12 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 12L11 15L16 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20 12H28M20 16H26M20 20H28" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span className="navbar__logo-text">GrocerEase</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="navbar__menu">
          <Link 
            to="/" 
            className={`navbar__link ${isActive('/') ? 'navbar__link--active' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/shop" 
            className={`navbar__link ${isActive('/shop') ? 'navbar__link--active' : ''}`}
          >
            Shop
          </Link>
          <Link 
            to="/wishlist" 
            className={`navbar__link ${isActive('/wishlist') ? 'navbar__link--active' : ''}`}
          >
            Wishlist
          </Link>
          <Link 
            to="/cart" 
            className={`navbar__link ${isActive('/cart') ? 'navbar__link--active' : ''}`}
          >
            Cart
          </Link>
          {isAuthenticated && user?.role === 'admin' && (
            <Link 
              to="/admin" 
              className={`navbar__link ${isActive('/admin') ? 'navbar__link--active' : ''}`}
            >
              Admin
            </Link>
          )}
        </div>

        {/* Actions */}
        <div className="navbar__actions">
          {/* Theme Toggle */}
          <button 
            className="navbar__theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 3V1M10 19V17M17 10H19M1 10H3M15.657 4.343L17.071 2.929M2.929 17.071L4.343 15.657M15.657 15.657L17.071 17.071M2.929 2.929L4.343 4.343M14 10C14 12.2091 12.2091 14 10 14C7.79086 14 6 12.2091 6 10C6 7.79086 7.79086 6 10 6C12.2091 6 14 7.79086 14 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M17 10.85C16.0832 11.2635 15.0753 11.485 14 11.485C9.85786 11.485 6.5 8.12716 6.5 4.00001C6.5 2.92472 6.72149 1.9168 7.135 1C4.13419 2.25341 2 5.31234 2 9.00001C2 13.9706 6.02944 18 11 18C14.6877 18 17.7466 15.8658 19 12.865C18.0832 13.2785 17.0753 13.5 16 13.5C15.3965 13.5 14.8117 13.4185 14.255 13.2655" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>

          {/* Wishlist Button */}
          <Link to="/wishlist" className="navbar__wishlist-button" aria-label="Wishlist">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 21C11.5 20.5 3 14 3 8.5C3 5.5 5.5 3 8.5 3C10 3 11.5 4 12 5C12.5 4 14 3 15.5 3C18.5 3 21 5.5 21 8.5C21 14 12.5 20.5 12 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill={wishlistCount > 0 ? "currentColor" : "none"} fillOpacity="0.3"/>
            </svg>
            {wishlistCount > 0 && (
              <Badge variant="danger" size="small" className="navbar__wishlist-badge">
                {wishlistCount}
              </Badge>
            )}
          </Link>

          {/* Cart Button */}
          <button 
            className="navbar__cart-button"
            onClick={handleCartClick}
            aria-label="Open cart"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 3H5L5.4 5M5.4 5H21L17 13H7L5.4 5ZM17 13L19 17H7L5.4 5M17 13H7M9 21C9 21.5523 8.55228 22 8 22C7.44772 22 7 21.5523 7 21C7 20.4477 7.44772 20 8 20C8.55228 20 9 20.4477 9 21ZM18 21C18 21.5523 17.5523 22 17 22C16.4477 22 16 21.5523 16 21C16 20.4477 16.4477 20 17 20C17.5523 20 18 20.4477 18 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {totals.itemsCount > 0 && (
              <Badge variant="danger" size="small" className="navbar__cart-badge">
                {totals.itemsCount}
              </Badge>
            )}
          </button>

          {/* User Profile or Login */}
          {isAuthenticated ? (
            <div className="navbar__profile" ref={profileRef}>
              <button 
                className="navbar__profile-button"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                aria-label="User menu"
              >
                <img src={user?.avatar} alt={user?.name} className="navbar__avatar" />
              </button>

              {isProfileOpen && (
                <div className="navbar__dropdown">
                  <div className="navbar__dropdown-header">
                    <img src={user?.avatar} alt={user?.name} className="navbar__dropdown-avatar" />
                    <div>
                      <p className="navbar__dropdown-name">{user?.name}</p>
                      <p className="navbar__dropdown-email">{user?.email}</p>
                    </div>
                  </div>
                  <div className="navbar__dropdown-divider"></div>
                  <Link 
                    to="/profile" 
                    className="navbar__dropdown-item"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M9 10C11.2091 10 13 8.20914 13 6C13 3.79086 11.2091 2 9 2C6.79086 2 5 3.79086 5 6C5 8.20914 6.79086 10 9 10Z" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M1 17C1 13.134 4.13401 10 8 10H10C13.866 10 17 13.134 17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    My Profile
                  </Link>
                  <Link 
                    to="/wishlist" 
                    className="navbar__dropdown-item"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M9 16C8.5 15.5 2 11 2 6.5C2 4 4 2 6.5 2C7.5 2 8.5 2.5 9 3.5C9.5 2.5 10.5 2 11.5 2C14 2 16 4 16 6.5C16 11 9.5 15.5 9 16Z" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                    Wishlist
                  </Link>
                  <div className="navbar__dropdown-divider"></div>
                  <button 
                    className="navbar__dropdown-item navbar__dropdown-item--danger"
                    onClick={handleLogout}
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M7 17H3C1.89543 17 1 16.1046 1 15V3C1 1.89543 1.89543 1 3 1H7M12 13L17 9M17 9L12 5M17 9H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="navbar__login-button">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 11C12.7614 11 15 8.76142 15 6C15 3.23858 12.7614 1 10 1C7.23858 1 5 3.23858 5 6C5 8.76142 7.23858 11 10 11Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M1 19C1 14.5817 4.58172 11 9 11H11C15.4183 11 19 14.5817 19 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span>Login</span>
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            className="navbar__mobile-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="navbar__mobile-menu">
          <Link 
            to="/" 
            className={`navbar__mobile-link ${isActive('/') ? 'navbar__mobile-link--active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/shop" 
            className={`navbar__mobile-link ${isActive('/shop') ? 'navbar__mobile-link--active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Shop
          </Link>
          <Link 
            to="/wishlist" 
            className={`navbar__mobile-link ${isActive('/wishlist') ? 'navbar__mobile-link--active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
          </Link>
          <Link 
            to="/cart" 
            className={`navbar__mobile-link ${isActive('/cart') ? 'navbar__mobile-link--active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Cart {totals.itemsCount > 0 && `(${totals.itemsCount})`}
          </Link>
          {isAuthenticated && user?.role === 'admin' && (
            <Link 
              to="/admin" 
              className={`navbar__mobile-link ${isActive('/admin') ? 'navbar__mobile-link--active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Admin
            </Link>
          )}
          {isAuthenticated ? (
            <>
              <Link 
                to="/profile" 
                className={`navbar__mobile-link ${isActive('/profile') ? 'navbar__mobile-link--active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                My Profile
              </Link>
              <button 
                className="navbar__mobile-link navbar__mobile-link--danger"
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <Link 
              to="/login" 
              className={`navbar__mobile-link ${isActive('/login') ? 'navbar__mobile-link--active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
