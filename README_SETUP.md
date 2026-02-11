# Grocerese - Project Setup Guide

## ✅ Project Requirements Met

This project now meets all the minimum requirements:

- ✅ **Axios** - Installed and configured for API requests
- ✅ **JSON-Server** - Set up as backend for data management
- ✅ **React Router DOM** - Already implemented for navigation
- ✅ **Full CRUD Operations** - Create, Read, Update, Delete implemented
- ✅ **db.json** - Database file with initial product data

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start JSON-Server (Backend):**
   Open a new terminal and run:
   ```bash
   npm run server
   ```
   This will start JSON-Server on `http://localhost:3001`

3. **Start React Development Server:**
   Open another terminal and run:
   ```bash
   npm run dev
   ```
   This will start the React app on `http://localhost:5173`

## 📁 Project Structure

```
Grocerese/
├── db.json                 # JSON-Server database file
├── src/
│   ├── services/
│   │   └── api.js          # Axios-based API service with CRUD operations
│   ├── hooks/
│   │   └── useProducts.js  # Updated to use JSON-Server API
│   └── ...
└── package.json            # Updated with JSON-Server script
```

## 🔧 API Endpoints

### Products CRUD
- **GET** `/products` - Get all products
- **GET** `/products/:id` - Get product by ID
- **POST** `/products` - Create new product
- **PUT** `/products/:id` - Update product
- **DELETE** `/products/:id` - Delete product

### Users CRUD
- **GET** `/users` - Get all users
- **GET** `/users/:id` - Get user by ID
- **POST** `/users` - Create new user
- **PUT** `/users/:id` - Update user
- **DELETE** `/users/:id` - Delete user

### Orders CRUD
- **GET** `/orders` - Get all orders
- **POST** `/orders` - Create new order
- **PUT** `/orders/:id` - Update order
- **DELETE** `/orders/:id` - Delete order

## 📝 Usage Examples

### Using the API Service

```javascript
import { getProducts, createProduct, updateProduct, deleteProduct } from './services/api';

// Read all products
const products = await getProducts({ category: 'fruits', search: 'apple' });

// Create a new product
const newProduct = await createProduct({
  title: "New Product",
  price: 9.99,
  category: "fruits",
  // ... other fields
});

// Update a product
const updated = await updateProduct(1, { price: 10.99 });

// Delete a product
await deleteProduct(1);
```

## ⚠️ Important Notes

1. **JSON-Server must be running** before starting the React app, otherwise API calls will fail.

2. **Port Configuration:**
   - React Dev Server: `http://localhost:5173`
   - JSON-Server: `http://localhost:3001`

3. **Database File:**
   - The `db.json` file contains initial product data
   - Changes made through the API will be persisted in `db.json`
   - You can manually edit `db.json` if needed

## 🎯 Next Steps

You can now:
- Add product management pages (Create/Edit/Delete products)
- Implement user management
- Add order management
- Create admin dashboard for CRUD operations

## 📚 Additional Libraries (Optional)

You can install additional libraries as mentioned in requirements:
- `react-toastify` - For toast notifications
- `react-icons` - For icons
- Form libraries (e.g., `react-hook-form`, `formik`)
- PDF export tools (e.g., `jspdf`, `react-pdf`)

```bash
npm install react-toastify react-icons react-hook-form
```



