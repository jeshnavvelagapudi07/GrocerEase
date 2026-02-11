import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { categories } from '../data/mockProducts.js';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../services/api.js';
import { Button } from '../components/ui/Button.jsx';
import { ToastContainer } from '../components/ui/Toast.jsx';
import { useAuth } from '../context/AuthContext.jsx';

/**
 * Admin Panel
 * Manage products using JSON-Server (add & delete)
 */
export function Admin() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: 'fruits',
    thumbnail: '',
    stock: '',
    discountPercentage: '',
    tags: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError('Failed to load products. Make sure JSON-Server is running with "npm run server".');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addToast = (toast) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { ...toast, id }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const payload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        price: parseFloat(formData.price) || 0,
        rating: 0,
        category: formData.category,
        thumbnail:
          formData.thumbnail.trim() ||
          'https://images.unsplash.com/photo-1580915411954-282cb1c9c450?w=400',
        stock: parseInt(formData.stock, 10) || 0,
        discountPercentage: parseFloat(formData.discountPercentage) || 0,
        tags: formData.tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
      };

      if (editingId) {
        await updateProduct(editingId, payload);
        addToast({ message: 'Product updated successfully!', type: 'success' });
      } else {
        await createProduct(payload);
        addToast({ message: 'Product created successfully!', type: 'success' });
      }

      setFormData({
        title: '',
        description: '',
        price: '',
        category: 'fruits',
        thumbnail: '',
        stock: '',
        discountPercentage: '',
        tags: '',
      });
      setEditingId(null);
      await loadProducts();
    } catch (err) {
      console.error(err);
      setError('Failed to create product.');
      addToast({ message: 'Failed to create product.', type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      await deleteProduct(id);
      addToast({ message: 'Product deleted.', type: 'success' });
      await loadProducts();
    } catch (err) {
      console.error(err);
      addToast({ message: 'Failed to delete product.', type: 'error' });
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setFormData({
      title: product.title || '',
      description: product.description || '',
      price: product.price != null ? String(product.price) : '',
      category: product.category || 'fruits',
      thumbnail: product.thumbnail || '',
      stock: product.stock != null ? String(product.stock) : '',
      discountPercentage: product.discountPercentage != null ? String(product.discountPercentage) : '',
      tags: (product.tags || []).join(', '),
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div 
      className="page page--admin" 
      style={{ 
        minHeight: '100vh',
        padding: '24px 16px 40px',
        background: 'radial-gradient(circle at top, #ecfdf5 0, #f9fafb 55%, #e5e7eb 100%)'
      }}
    >
      <div className="admin" style={{ maxWidth: 1180, margin: '0 auto' }}>
        {/* Top bar */}
        <header 
          style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: 24
          }}
        >
          <div>
            <h1 className="shop__title" style={{ marginBottom: 4 }}>Admin Dashboard</h1>
            <p className="shop__description" style={{ margin: 0 }}>
              Manage store products. Changes are saved to <code>db.json</code> through JSON-Server.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {user && (
              <div style={{ textAlign: 'right', fontSize: 12, color: '#6B7280' }}>
                <div style={{ fontWeight: 500 }}>Signed in as Admin</div>
              </div>
            )}
            <Button 
              variant="secondary" 
              size="small" 
              onClick={() => { logout(); navigate('/login'); }}
            >
              Logout
            </Button>
          </div>
        </header>

        {error && (
          <div
            style={{
              padding: '12px 16px',
              marginBottom: 20,
              backgroundColor: '#F8D7DA',
              border: '1px solid #F5C2C7',
              borderRadius: 8,
              color: '#842029',
            }}
          >
            {error}
          </div>
        )}

        {/* Create Product Form */}
        <section
          style={{
            marginBottom: 32,
            padding: 24,
            borderRadius: 16,
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E7EB',
            boxShadow: '0 10px 25px rgba(15, 23, 42, 0.05)',
          }}
        >
          <div style={{ marginBottom: 16 }}>
            <h2 style={{ fontSize: 20, marginBottom: 4 }}>Create product</h2>
            <p style={{ fontSize: 12, color: '#6B7280', margin: 0 }}>
              {editingId
                ? 'Update the selected product. Fields marked * are required.'
                : 'Add a new item to your catalog. Fields marked * are required.'}
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)',
              gap: 20,
              alignItems: 'flex-start',
            }}
          >
            {/* Left: form fields */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div className="form-field" style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <label className="auth-form__label">Title</label>
              <input
                className="auth-form__input"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Product title"
              />
            </div>

            <div className="form-field" style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <label className="auth-form__label">Price ($)</label>
              <input
                className="auth-form__input"
                type="number"
                min="0"
                step="0.01"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                placeholder="0.00"
              />
            </div>

            <div className="form-field" style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <label className="auth-form__label">Category</label>
              <select
                className="auth-form__input"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                {categories
                  .filter((c) => c.id !== 'all')
                  .map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="form-field" style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <label className="auth-form__label">Stock</label>
              <input
                className="auth-form__input"
                type="number"
                min="0"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="e.g. 50"
              />
            </div>

            <div className="form-field" style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <label className="auth-form__label">Discount (%)</label>
              <input
                className="auth-form__input"
                type="number"
                min="0"
                max="100"
                step="1"
                name="discountPercentage"
                value={formData.discountPercentage}
                onChange={handleChange}
                placeholder="0"
              />
            </div>

            <div className="form-field" style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <label className="auth-form__label">Thumbnail URL</label>
              <input
                className="auth-form__input"
                type="url"
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleChange}
                placeholder="Leave empty to use a default image"
              />
            </div>

            <div className="form-field" style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <label className="auth-form__label">Description</label>
              <textarea
                className="auth-form__input"
                rows="3"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Short description of the product"
              />
            </div>

            <div className="form-field" style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <label className="auth-form__label">Tags (comma separated)</label>
              <input
                className="auth-form__input"
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="e.g. organic, fresh"
              />
            </div>

            <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
              <Button type="submit" variant="primary" size="large" disabled={submitting}>
                {submitting ? 'Saving...' : editingId ? 'Update Product' : 'Create Product'}
              </Button>
              {editingId && (
                <Button
                  type="button"
                  variant="secondary"
                  size="large"
                  onClick={() => {
                    setEditingId(null);
                    setFormData({
                      title: '',
                      description: '',
                      price: '',
                      category: 'fruits',
                      thumbnail: '',
                      stock: '',
                      discountPercentage: '',
                      tags: '',
                    });
                  }}
                >
                  Cancel
                </Button>
              )}
            </div>
            </div>

            {/* Right: simple preview */}
            <div
              style={{
                padding: 16,
                borderRadius: 12,
                border: '1px dashed #D1D5DB',
                backgroundColor: '#F9FAFB',
                fontSize: 13,
              }}
            >
              <p style={{ fontSize: 12, fontWeight: 500, color: '#6B7280', marginBottom: 8 }}>
                Preview
              </p>
              <div style={{ display: 'flex', gap: 12 }}>
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: 12,
                    backgroundColor: '#E5E7EB',
                    overflow: 'hidden',
                    flexShrink: 0,
                  }}
                >
                  {formData.thumbnail && (
                    <img
                      src={formData.thumbnail}
                      alt={formData.title || 'Preview'}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, marginBottom: 4 }}>
                    {formData.title || 'Product title'}
                  </div>
                  <div style={{ color: '#6B7280', marginBottom: 6 }}>
                    {formData.description || 'Short description of the product.'}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 600 }}>
                      {formData.price ? `$${Number(formData.price).toFixed(2)}` : '$0.00'}
                    </span>
                    <span style={{ textTransform: 'capitalize', color: '#6B7280' }}>
                      {formData.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </section>

        {/* Products Table */}
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h2 style={{ fontSize: 20 }}>Existing Products</h2>
            <Button variant="secondary" size="small" onClick={loadProducts} disabled={loading}>
              {loading ? 'Refreshing...' : 'Refresh'}
            </Button>
          </div>

          {loading && <p>Loading products...</p>}

          {!loading && products.length === 0 && (
            <p style={{ color: '#6B7280' }}>No products found. Add one using the form above.</p>
          )}

          {!loading && products.length > 0 && (
            <div
              style={{
                overflowX: 'auto',
                borderRadius: 12,
                border: '1px solid #E5E7EB',
                backgroundColor: '#FFFFFF',
              }}
            >
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 720 }}>
                <thead style={{ backgroundColor: '#F9FAFB' }}>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '10px 12px', fontSize: 13, color: '#6B7280' }}>
                      Title
                    </th>
                    <th style={{ textAlign: 'left', padding: '10px 12px', fontSize: 13, color: '#6B7280' }}>
                      Category
                    </th>
                    <th style={{ textAlign: 'right', padding: '10px 12px', fontSize: 13, color: '#6B7280' }}>
                      Price
                    </th>
                    <th style={{ textAlign: 'right', padding: '10px 12px', fontSize: 13, color: '#6B7280' }}>
                      Stock
                    </th>
                    <th style={{ textAlign: 'center', padding: '10px 12px', fontSize: 13, color: '#6B7280' }}>
                      Discount
                    </th>
                    <th style={{ width: 120 }}></th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} style={{ borderTop: '1px solid #E5E7EB' }}>
                      <td style={{ padding: '10px 12px', fontSize: 14 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          {product.thumbnail && (
                            <img
                              src={product.thumbnail}
                              alt={product.title}
                              style={{
                                width: 40,
                                height: 40,
                                borderRadius: 8,
                                objectFit: 'cover',
                                flexShrink: 0,
                              }}
                            />
                          )}
                          <div>
                            <div style={{ fontWeight: 500 }}>{product.title}</div>
                            <div style={{ fontSize: 12, color: '#6B7280' }}>ID: {product.id}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '10px 12px', fontSize: 14, textTransform: 'capitalize' }}>
                        {product.category}
                      </td>
                      <td style={{ padding: '10px 12px', fontSize: 14, textAlign: 'right' }}>
                        ${Number(product.price || 0).toFixed(2)}
                      </td>
                      <td style={{ padding: '10px 12px', fontSize: 14, textAlign: 'right' }}>
                        {product.stock ?? '-'}
                      </td>
                      <td style={{ padding: '10px 12px', fontSize: 14, textAlign: 'center' }}>
                        {product.discountPercentage ? `${product.discountPercentage}%` : '—'}
                      </td>
                      <td style={{ padding: '10px 12px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                          <Button
                            variant="secondary"
                            size="small"
                            onClick={() => handleEdit(product)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="danger"
                            size="small"
                            onClick={() => handleDelete(product.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}


