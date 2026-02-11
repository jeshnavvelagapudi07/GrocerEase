import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { Button } from '../components/ui/Button.jsx';

/**
 * Login Page
 * User authentication page
 */
export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const from = location.state?.from?.pathname || '/';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Special case: admin demo login (username: admin, password: 123)
    const isAdminDemo = formData.email === 'admin' && formData.password === '123';

    if (!formData.email.trim()) {
      newErrors.email = 'Email or username is required';
    } else if (!isAdminDemo && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!isAdminDemo && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const result = login(formData);
    
    if (result.success) {
      if (result.user?.role === 'admin') {
        navigate('/admin', { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="page page--auth">
      <div className="auth">
        <div className="auth__container">
          <div className="auth__card">
            <div className="auth__header">
              <div className="auth__logo">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="22" fill="#4CAF50" opacity="0.1"/>
                  <path d="M14 16H34L32 36H16L14 16Z" stroke="#4CAF50" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  <path d="M18 16V14C18 11.7909 19.7909 10 22 10H26C28.2091 10 30 11.7909 30 14V16" stroke="#4CAF50" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20 24L23 27L28 22" stroke="#FF9800" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h1 className="auth__title">Welcome Back!</h1>
              <p className="auth__subtitle">Sign in to continue shopping</p>
            </div>

            <form className="auth__form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address or Admin Username</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-input ${errors.email ? 'form-input--error' : ''}`}
                  placeholder="you@example.com"
                  autoComplete="email"
                />
                {errors.email && <span className="form-error">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`form-input ${errors.password ? 'form-input--error' : ''}`}
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                {errors.password && <span className="form-error">{errors.password}</span>}
              </div>

              <div className="auth__extras">
                <label className="auth__checkbox">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
                <a href="#" className="auth__link">Forgot password?</a>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="large"
                fullWidth
                disabled={isSubmitting}
                className="auth__submit"
              >
                {isSubmitting ? 'Signing in...' : 'Sign In'}
              </Button>

              <div className="auth__divider">
                <span>or</span>
              </div>

              <div className="auth__social">
                <button type="button" className="auth__social-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Continue with Google
                </button>
              </div>

              <div className="auth__footer">
                Don't have an account?{' '}
                <Link to="/signup" className="auth__footer-link">Sign up</Link>
              </div>
            </form>
          </div>

          {/* Demo Credentials Info */}
          <div className="auth__demo-info">
            <p><strong>Demo user:</strong> Use any email and password (min 6 characters)</p>
            <p><strong>Admin login:</strong> username <code>admin</code> and password <code>123</code></p>
          </div>
        </div>
      </div>
    </div>
  );
}

