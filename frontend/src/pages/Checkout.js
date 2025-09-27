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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
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
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
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
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
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
                required
              />
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
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="state">State</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="zipCode">ZIP Code</label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  required
                  pattern="[0-9]{5}"
                  title="Five digit zip code"
                />
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
                required
                maxLength="16"
                pattern="[0-9]{16}"
                title="16 digit card number"
                placeholder="1234 5678 9012 3456"
              />
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
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="expiryDate">Expiry Date</label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  required
                  placeholder="MM/YY"
                  pattern="(0[1-9]|1[0-2])\/([0-9]{2})"
                  title="MM/YY format"
                  maxLength="5"
                />
              </div>
              <div className="form-group">
                <label htmlFor="cvv">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  required
                  pattern="[0-9]{3,4}"
                  title="3 or 4 digit CVV"
                  maxLength="4"
                  placeholder="123"
                />
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
