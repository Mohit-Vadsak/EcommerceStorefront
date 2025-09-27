import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import './Checkout.css';

const Checkout = () => {
  const { cart, total } = useCart();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case 'firstName':
      case 'lastName':
        return value.length < 2 ? 'Must be at least 2 characters long' : '';
      case 'email':
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Invalid email address' : '';
      case 'phone':
        return !/^\d{10}$/.test(value.replace(/\D/g, '')) ? 'Phone number must be 10 digits' : '';
      case 'address':
        return value.length < 5 ? 'Please enter a valid address' : '';
      case 'city':
      case 'state':
        return value.length < 2 ? 'This field is required' : '';
      case 'zipCode':
        return !/^\d{5}$/.test(value) ? 'ZIP code must be 5 digits' : '';
      case 'cardNumber':
        return !/^\d{16}$/.test(value.replace(/\D/g, '')) ? 'Card number must be 16 digits' : '';
      case 'cardName':
        return value.length < 3 ? 'Please enter the full name on your card' : '';
      case 'expiryDate':
        if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(value)) {
          return 'Use MM/YY format';
        }
        const [month, year] = value.split('/');
        const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
        const today = new Date();
        return expiry < today ? 'Card has expired' : '';
      case 'cvv':
        return !/^\d{3,4}$/.test(value) ? 'CVV must be 3 or 4 digits' : '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (touched[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: validateField(name, value)
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    setErrors(prev => ({
      ...prev,
      [name]: validateField(name, value)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
    
    if (validateForm()) {
      console.log('Form submitted:', formData);
    } else {
      console.log('Form has errors');
    }
  };

  return (
    <div className="checkout-container">
      <div className="checkout-form-container">
        <h1>Checkout</h1>
        
        <form onSubmit={handleSubmit} className="checkout-form">
          {/* Contact Information */}
          <section className="form-section">
            <h2>Contact Information</h2>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={touched.firstName && errors.firstName ? 'error' : ''}
                  required
                />
                {touched.firstName && errors.firstName && (
                  <span className="error-message">{errors.firstName}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={touched.lastName && errors.lastName ? 'error' : ''}
                  required
                />
                {touched.lastName && errors.lastName && (
                  <span className="error-message">{errors.lastName}</span>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={touched.email && errors.email ? 'error' : ''}
                  required
                />
                {touched.email && errors.email && (
                  <span className="error-message">{errors.email}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={touched.phone && errors.phone ? 'error' : ''}
                  placeholder="1234567890"
                  required
                />
                {touched.phone && errors.phone && (
                  <span className="error-message">{errors.phone}</span>
                )}
              </div>
            </div>
          </section>

          {/* Shipping Information */}
          <section className="form-section">
            <h2>Shipping Address</h2>
            <div className="form-group">
              <label htmlFor="address">Street Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touched.address && errors.address ? 'error' : ''}
                required
              />
              {touched.address && errors.address && (
                <span className="error-message">{errors.address}</span>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={touched.city && errors.city ? 'error' : ''}
                  required
                />
                {touched.city && errors.city && (
                  <span className="error-message">{errors.city}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="state">State</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={touched.state && errors.state ? 'error' : ''}
                  required
                />
                {touched.state && errors.state && (
                  <span className="error-message">{errors.state}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="zipCode">ZIP Code</label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={touched.zipCode && errors.zipCode ? 'error' : ''}
                  maxLength="5"
                  placeholder="12345"
                  required
                />
                {touched.zipCode && errors.zipCode && (
                  <span className="error-message">{errors.zipCode}</span>
                )}
              </div>
            </div>
          </section>

          {/* Payment Information */}
          <section className="form-section">
            <h2>Payment Information</h2>
            <div className="form-group">
              <label htmlFor="cardNumber">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touched.cardNumber && errors.cardNumber ? 'error' : ''}
                maxLength="16"
                placeholder="1234567890123456"
                required
              />
              {touched.cardNumber && errors.cardNumber && (
                <span className="error-message">{errors.cardNumber}</span>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="cardName">Name on Card</label>
                <input
                  type="text"
                  id="cardName"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={touched.cardName && errors.cardName ? 'error' : ''}
                  required
                />
                {touched.cardName && errors.cardName && (
                  <span className="error-message">{errors.cardName}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="expiryDate">Expiry Date</label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={touched.expiryDate && errors.expiryDate ? 'error' : ''}
                  placeholder="MM/YY"
                  maxLength="5"
                  required
                />
                {touched.expiryDate && errors.expiryDate && (
                  <span className="error-message">{errors.expiryDate}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="cvv">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={touched.cvv && errors.cvv ? 'error' : ''}
                  maxLength="4"
                  placeholder="123"
                  required
                />
                {touched.cvv && errors.cvv && (
                  <span className="error-message">{errors.cvv}</span>
                )}
              </div>
            </div>
          </section>

          <button type="submit" className="submit-button">
            Place Order
          </button>
        </form>
      </div>

      {/* Order Summary */}
      <div className="order-summary">
        <h2>Order Summary</h2>
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="summary-item">
              <img src={item.image} alt={item.name} />
              <div className="item-details">
                <h3>{item.name}</h3>
                <p>Quantity: {item.quantity}</p>
                <p className="item-price">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="summary-totals">
          <div className="subtotal">
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="shipping">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="tax">
            <span>Tax</span>
            <span>${(total * 0.1).toFixed(2)}</span>
          </div>
          <div className="total">
            <span>Total</span>
            <span>${(total + (total * 0.1)).toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
