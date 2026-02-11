import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

/**
 * Protected Route Component
 * Redirects to login if user is not authenticated.
 * Can optionally require admin role.
 */
export function ProtectedRoute({ children, requireAdmin = false }) {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login page but save the location they were trying to go to
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && user?.role !== 'admin') {
    // If not admin, send user to home
    return <Navigate to="/" replace />;
  }

  return children;
}

