import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { WishlistProvider } from './context/WishlistContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { Navbar } from './components/layout/Navbar.jsx';
import { Footer } from './components/layout/Footer.jsx';
import { CartDrawer } from './components/cart/CartDrawer.jsx';
import { ProtectedRoute } from './components/ui/ProtectedRoute.jsx';
import { Home } from './pages/Home.jsx';
import { Shop } from './pages/Shop.jsx';
import { CartPage } from './pages/CartPage.jsx';
import { Checkout } from './pages/Checkout.jsx';
import { Login } from './pages/Login.jsx';
import { Signup } from './pages/Signup.jsx';
import { Profile } from './pages/Profile.jsx';
import { Wishlist } from './pages/Wishlist.jsx';
import { Admin } from './pages/Admin.jsx';

function AppRoutes() {
  const { user } = useAuth();
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  const openCartDrawer = () => setIsCartDrawerOpen(true);
  const closeCartDrawer = () => setIsCartDrawerOpen(false);

  const isAdmin = user?.role === 'admin';

  // Admin-only layout: no shop/user components, only admin routes
  if (isAdmin) {
    return (
      <Router>
        <div className="app app--admin">
          <main className="app__main">
            <Routes>
              <Route
                path="/admin"
                element={
                  <ProtectedRoute requireAdmin>
                    <Admin />
                  </ProtectedRoute>
                }
              />
              {/* Any other path redirects to admin panel */}
              <Route path="*" element={<Navigate to="/admin" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    );
  }

  // Regular user layout
  return (
    <Router>
      <div className="app">
        <Navbar onCartOpen={openCartDrawer} />
        
        <main className="app__main">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/wishlist" element={<Wishlist />} />
            
            {/* Protected Routes */}
            <Route 
              path="/checkout" 
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
        
        <Footer />
        
        <CartDrawer 
          isOpen={isCartDrawerOpen} 
          onClose={closeCartDrawer} 
        />
      </div>
    </Router>
  );
}

/**
 * Main App Component
 * Root component with routing and global providers
 */
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <WishlistProvider>
          <CartProvider>
            <AppRoutes />
          </CartProvider>
        </WishlistProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
