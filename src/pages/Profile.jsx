import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button.jsx';

/**
 * Profile Page
 * User profile with order history
 */
export function Profile() {
  const { user, updateProfile, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' or 'orders'
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const orderHistory = user?.orderHistory || [];

  return (
    <div className="page page--profile">
      <div className="profile">
        <div className="profile__container">
          {/* Profile Header */}
          <div className="profile__header">
            <div className="profile__avatar">
              <img src={user?.avatar} alt={user?.name} />
            </div>
            <div className="profile__info">
              <h1 className="profile__name">{user?.name}</h1>
              <p className="profile__email">{user?.email}</p>
              <p className="profile__member-since">
                Member since {new Date(user?.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </p>
            </div>
            <Button
              variant="danger"
              size="medium"
              onClick={handleLogout}
              className="profile__logout"
            >
              Logout
            </Button>
          </div>

          {/* Tabs */}
          <div className="profile__tabs">
            <button
              className={`profile__tab ${activeTab === 'profile' ? 'profile__tab--active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 11C12.7614 11 15 8.76142 15 6C15 3.23858 12.7614 1 10 1C7.23858 1 5 3.23858 5 6C5 8.76142 7.23858 11 10 11Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M1 19C1 14.5817 4.58172 11 9 11H11C15.4183 11 19 14.5817 19 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Profile Information
            </button>
            <button
              className={`profile__tab ${activeTab === 'orders' ? 'profile__tab--active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M3 3H5L5.4 5M5.4 5H17L14 13H7L5.4 5ZM14 13L16 17H7L5.4 5M14 13H7M9 19C9 19.5523 8.55228 20 8 20C7.44772 20 7 19.5523 7 19C7 18.4477 7.44772 18 8 18C8.55228 18 9 18.4477 9 19ZM15 19C15 19.5523 14.5523 20 14 20C13.4477 20 13 19.5523 13 19C13 18.4477 13.4477 18 14 18C14.5523 18 15 18.4477 15 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Order History ({orderHistory.length})
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'profile' && (
            <div className="profile__content">
              <div className="profile__section">
                <div className="profile__section-header">
                  <h2 className="profile__section-title">Personal Information</h2>
                  {!isEditing && (
                    <Button
                      variant="secondary"
                      size="small"
                      onClick={() => setIsEditing(true)}
                    >
                      Edit Profile
                    </Button>
                  )}
                </div>

                {isEditing ? (
                  <form className="profile__form" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="name" className="form-label">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email" className="form-label">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone" className="form-label">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="(123) 456-7890"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="address" className="form-label">Address</label>
                      <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="form-input"
                        rows="3"
                        placeholder="123 Main St, City, State ZIP"
                      />
                    </div>

                    <div className="profile__form-actions">
                      <Button type="submit" variant="primary" size="medium">
                        Save Changes
                      </Button>
                      <Button
                        type="button"
                        variant="secondary"
                        size="medium"
                        onClick={() => {
                          setIsEditing(false);
                          setFormData({
                            name: user?.name || '',
                            email: user?.email || '',
                            phone: user?.phone || '',
                            address: user?.address || ''
                          });
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="profile__details">
                    <div className="profile__detail">
                      <span className="profile__detail-label">Name:</span>
                      <span className="profile__detail-value">{user?.name}</span>
                    </div>
                    <div className="profile__detail">
                      <span className="profile__detail-label">Email:</span>
                      <span className="profile__detail-value">{user?.email}</span>
                    </div>
                    <div className="profile__detail">
                      <span className="profile__detail-label">Phone:</span>
                      <span className="profile__detail-value">{user?.phone || 'Not provided'}</span>
                    </div>
                    <div className="profile__detail">
                      <span className="profile__detail-label">Address:</span>
                      <span className="profile__detail-value">{user?.address || 'Not provided'}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="profile__content">
              <div className="profile__section">
                <h2 className="profile__section-title">Order History</h2>

                {orderHistory.length === 0 ? (
                  <div className="profile__empty">
                    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                      <circle cx="40" cy="40" r="38" stroke="currentColor" strokeWidth="2" opacity="0.2"/>
                      <path d="M20 20H28L30.4 30M30.4 30H60L52 50H36L30.4 30ZM52 50L56 60H36L30.4 30M52 50H36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p>No orders yet</p>
                    <Button variant="primary" size="medium" onClick={() => navigate('/shop')}>
                      Start Shopping
                    </Button>
                  </div>
                ) : (
                  <div className="profile__orders">
                    {orderHistory.map((order) => (
                      <div key={order.id} className="order-card">
                        <div className="order-card__header">
                          <div>
                            <h3 className="order-card__id">Order #{order.id}</h3>
                            <p className="order-card__date">
                              {new Date(order.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                          <div className="order-card__status order-card__status--completed">
                            Completed
                          </div>
                        </div>
                        <div className="order-card__items">
                          {order.items.slice(0, 3).map((item, index) => (
                            <div key={index} className="order-card__item">
                              <img src={item.image} alt={item.title} />
                              <span>{item.title} x{item.quantity}</span>
                            </div>
                          ))}
                          {order.items.length > 3 && (
                            <span className="order-card__more">
                              +{order.items.length - 3} more
                            </span>
                          )}
                        </div>
                        <div className="order-card__footer">
                          <span className="order-card__total">
                            Total: ${order.grandTotal.toFixed(2)}
                          </span>
                          <Button variant="secondary" size="small">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

