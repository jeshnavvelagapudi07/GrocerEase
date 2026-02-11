import { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

const AuthContext = createContext();

/**
 * Hook to use auth context
 * @returns {Object} Auth context value
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

/**
 * Auth Provider Component
 * Manages user authentication state
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage('grocerese-user', null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!user);
  }, [user]);

  /**
   * Register a new user
   * @param {Object} userData - User registration data
   */
  const register = (userData) => {
    const newUser = {
      id: Date.now(),
      name: userData.name,
      email: userData.email,
      phone: userData.phone || '',
      address: userData.address || '',
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=4CAF50&color=fff`,
      createdAt: new Date().toISOString(),
      orderHistory: []
    };
    setUser(newUser);
    return { success: true, user: newUser };
  };

  /**
   * Login user
   * @param {Object} credentials - Login credentials
   */
  const login = (credentials) => {
    // Special demo admin login: username "admin" and password "123"
    if (credentials.email === 'admin@gmail.com' && credentials.password === '123456') {
      const adminUser = {
        id: 1,
        name: 'Admin',
        email: 'admin@grocerese.local',
        phone: '',
        address: '',
        avatar: `https://ui-avatars.com/api/?name=Admin&background=EF4444&color=fff`,
        createdAt: new Date().toISOString(),
        orderHistory: [],
        role: 'admin'
      };
      setUser(adminUser);
      return { success: true, user: adminUser };
    }

    // Regular mock user login
    const displayName = credentials.email.includes('@')
      ? credentials.email.split('@')[0]
      : credentials.email;

    const mockUser = {
      id: Date.now(),
      name: displayName || 'Guest',
      email: credentials.email,
      phone: '+1 (555) 123-4567',
      address: '123 Main Street, New York, NY 10001',
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName || 'Guest')}&background=4CAF50&color=fff`,
      createdAt: new Date().toISOString(),
      orderHistory: [],
      role: 'user'
    };
    setUser(mockUser);
    return { success: true, user: mockUser };
  };

  /**
   * Logout user
   */
  const logout = () => {
    setUser(null);
  };

  /**
   * Update user profile
   * @param {Object} updates - User profile updates
   */
  const updateProfile = (updates) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      return { success: true, user: updatedUser };
    }
    return { success: false, error: 'No user logged in' };
  };

  /**
   * Add order to user's order history
   * @param {Object} order - Order details
   */
  const addOrder = (order) => {
    if (user) {
      const updatedUser = {
        ...user,
        orderHistory: [
          {
            id: Date.now(),
            date: new Date().toISOString(),
            ...order
          },
          ...user.orderHistory
        ]
      };
      setUser(updatedUser);
    }
  };

  const value = {
    user,
    isAuthenticated,
    login,
    register,
    logout,
    updateProfile,
    addOrder
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

