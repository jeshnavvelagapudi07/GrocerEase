# GrocerEase - Simplifying Your Shopping Experience 🛒✨

A modern, feature-rich React SPA for online grocery shopping with authentication, wishlist, user profiles, and a beautiful animated UI.

## 🌟 **New Features Added!**

### 🔐 **Authentication System**
- User registration and login
- Protected routes for checkout and profile
- Persistent sessions with localStorage
- User profile dropdown in navbar

### ❤️ **Wishlist/Favorites**
- Add products to wishlist with heart icon animation
- Dedicated wishlist page
- Wishlist badge in navbar
- Persistent across sessions

### 👤 **User Profile**
- Editable profile information
- Order history tracking
- Member dashboard
- Avatar display

### 📦 **Enhanced Product Catalog**
- **50+ Products** across 10 categories
- Category filtering with icons
- Multiple product categories:
  - 🍎 Fresh Fruits
  - 🥕 Vegetables
  - 🥛 Dairy & Eggs
  - 🍖 Meat & Seafood
  - 🍞 Bakery
  - 🥤 Beverages
  - 🍿 Snacks
  - ❄️ Frozen Foods
  - 🏺 Pantry Staples

### 🎯 **Additional Features**
- Recently viewed products tracking
- Protected checkout (requires login)
- Order history in user profile
- Enhanced navbar with user menu
- Improved animations and microinteractions
- Mobile-responsive design

## ✨ Complete Features List

### 🛍️ **Shopping Experience**
- Browse 50+ grocery products across 10 categories
- Real-time search with debouncing (300ms)
- Advanced filtering:
  - Sort by: Name, Price, Rating
  - Filter by category with emoji icons
  - Quick filter tags
- Product cards with hover effects
- Wishlist heart button on each product
- Recently viewed tracking

### 🛒 **Cart Management**
- Persistent cart with localStorage
- Add/remove/update quantities
- Slide-in cart drawer from right
- Full cart page view
- Real-time totals calculation
- Automatic discounts (10% over $50)
- Free delivery over $30
- Cart badge in navbar

### 🔐 **User Authentication**
- Login and signup pages
- Form validation
- Protected routes
- User sessions
- Profile dropdown menu
- Google OAuth UI (demo)

### 👤 **User Profile**
- Personal information management
- Editable profile fields
- Order history
- Member since date
- Avatar display
- Tab interface (Profile/Orders)

### 💳 **Checkout Process**
- Protected checkout route
- Contact information form
- Delivery address form
- Payment method selection
- Form validation
- Order summary sidebar
- Order saved to user history
- Success confirmation page

### 🎨 **UI/UX Excellence**
- **Modern Animations:**
  - Floating bubbles background
  - Hero section animations
  - Product card hover effects (lift, scale, tilt)
  - Add-to-cart microinteraction
  - Wishlist heart animation
  - Toast notifications
  - Page transitions
  - Skeleton loaders
  - Smooth cart drawer slide

- **Theme Support:**
  - Light and dark mode
  - Theme toggle with rotation animation
  - Persistent theme preference

- **Responsive Design:**
  - Mobile: Single column, full-width drawers
  - Tablet: 2-column grid
  - Desktop: 3-4 column grid, side-by-side layouts

## 🎨 Design Highlights

### Color Palette
- **Primary (Green)**: #4CAF50 - Fresh, natural
- **Secondary (Orange)**: #FF9800 - Energy, warmth
- **Accent (Blue)**: #2196F3 - Trust, reliability
- **Danger (Red)**: #F44336 - Alerts, favorites
- **Neutrals**: Adaptive grays for text and backgrounds

### Typography
- Clean, modern sans-serif font stack
- Proper hierarchy with size and weight
- Excellent readability

### Animations
- CSS keyframes for smooth animations
- Transform-based hover effects
- Entrance animations on page load
- Microinteractions on user actions

## 📂 Project Structure

```
src/
├── assets/              # Static assets (logo, illustrations)
├── components/
│   ├── animations/      # Animation components (FloatingBubbles)
│   ├── cart/           # Cart components (CartDrawer, CartItem, CartSummary)
│   ├── layout/         # Layout components (Navbar, Footer, HeroSection)
│   ├── products/       # Product components (ProductCard, ProductGrid, FiltersBar)
│   └── ui/             # UI components (Button, Badge, Toast, ProtectedRoute)
├── context/            # React Context providers (Auth, Cart, Wishlist, Theme)
├── data/               # Mock data (50+ products across 10 categories)
├── hooks/              # Custom hooks (useProducts, useLocalStorage, useRecentlyViewed)
├── pages/              # Page components (Home, Shop, Cart, Checkout, Login, Signup, Profile, Wishlist)
├── services/           # API services
├── styles/             # CSS files (globals, layout, components, animations, auth-profile)
├── App.jsx             # Main app component with routing
└── main.jsx            # Entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd Grocerese
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser:
```
http://localhost:3000
```

## 🎯 Pages & Routes

| Route | Description | Auth Required |
|-------|-------------|---------------|
| `/` | Home page with hero section | No |
| `/shop` | Browse products with filters | No |
| `/cart` | Shopping cart view | No |
| `/wishlist` | Wishlist/favorites | No |
| `/login` | User login | No |
| `/signup` | User registration | No |
| `/checkout` | Checkout process | **Yes** |
| `/profile` | User profile & order history | **Yes** |

## 💡 Usage

### Demo Login
Use any email and password (min 6 characters) to login. The app creates a demo account automatically.

### Shopping Flow
1. Browse products by category
2. Add items to wishlist (heart icon)
3. Add items to cart
4. View cart drawer or cart page
5. Proceed to checkout (requires login)
6. Fill out checkout form
7. Place order
8. View order in profile history

## 🎓 Key Technologies

- **React 18** - UI library with hooks
- **React Router v6** - Client-side routing with protected routes
- **Vite** - Fast build tool and dev server
- **Context API** - State management (Auth, Cart, Wishlist, Theme)
- **LocalStorage** - Data persistence
- **CSS3** - Advanced styling and animations
- **No UI Frameworks** - Pure custom CSS

## 🎨 Animation Showcase

1. **Floating Bubbles** - Background animation on hero
2. **Hero Animations** - Title with fade, slide, and scale
3. **Product Cards** - 3D hover effect with lift, scale, and tilt
4. **Wishlist Heart** - Heartbeat animation when clicked
5. **Add to Cart** - Success animation with checkmark
6. **Toast Notifications** - Slide in from right with fade
7. **Cart Drawer** - Smooth slide from right edge
8. **Category Tabs** - Smooth slide on scroll
9. **Profile Dropdown** - Fade and slide down
10. **Page Transitions** - Smooth fade between routes

## 📊 Mock Data

- 50+ products across 10 categories
- Realistic product information:
  - Names and descriptions
  - Prices ($2.49 - $15.99)
  - High-quality images (Unsplash)
  - Ratings (4.5 - 4.9 stars)
  - Discount percentages
  - Stock quantities

## 🔒 Security Features

- Protected routes for sensitive pages
- Client-side route guards
- Session management
- Form validation
- XSS protection (React default)

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎯 Best Practices Implemented

✅ **Code Quality**
- Functional components with hooks
- Custom hooks for reusable logic
- Context API for global state
- Proper component composition
- Clean file structure
- Comprehensive comments

✅ **Performance**
- Debounced search
- Lazy loading (potential)
- Optimized re-renders
- LocalStorage caching
- Image optimization

✅ **UX**
- Loading states
- Empty states
- Error handling
- Form validation
- Microinteractions
- Accessibility considerations

✅ **Responsive Design**
- Mobile-first approach
- Flexible layouts
- Touch-friendly interactions
- Adaptive navigation

## 🚧 Future Enhancements (Ideas)

- Real backend integration
- Payment gateway integration
- Email notifications
- Product reviews and ratings
- Advanced search with filters
- Product recommendations
- Social sharing
- Multiple delivery addresses
- Coupon codes
- Gift cards
- Live chat support

## 📄 License

MIT License - feel free to use this project for learning or portfolio!

## 🤝 Contributing

This is a portfolio/learning project. Feel free to fork and customize!

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Built with ❤️ using React, Context API, and Pure CSS**

**Perfect for portfolio and learning React best practices!** 🎓✨
