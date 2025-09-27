import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';
import '../styles/cart-modern-new.css';
import '../styles/cart-modern.css';

const Cart = () => {
  const { cart, total, addItem, removeItem, deleteItem, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="cart-empty cart-empty-modern">
        <h2>Your Cart is Empty</h2>
        <p>Start shopping to add items to your cart!</p>
        <Link to="/products" className="continue-shopping continue-shopping-modern">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page cart-page-modern">
      <h1>Shopping Cart</h1>
      <div className="cart-content">
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item cart-item-modern">
              <img src={item.image} alt={item.name} className="cart-item-image cart-item-image-modern" />
              <div className="cart-item-details">
                <div className="cart-item-info">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <p className="cart-item-price">${item.price.toFixed(2)}</p>
                </div>
                <div className="quantity-controls">
                  <button onClick={() => removeItem(item)} className="quantity-btn">
                    -
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button onClick={() => addItem(item)} className="quantity-btn">
                    +
                  </button>
                </div>
                <div className="item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                <button onClick={() => deleteItem(item)} className="delete-btn" aria-label="Remove item">
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-summary cart-summary-modern">
          <h3>Order Summary</h3>
          <div className="cart-total">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="cart-summary-buttons">
            <div className="button-group">
              <button onClick={clearCart} className="clear-cart clear-cart-modern">
                Clear
              </button>
              <Link to="/checkout" className="checkout-btn checkout-button-modern">
                Checkout
              </Link>
            </div>
            <Link to="/products" className="continue-shopping continue-shopping-modern">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
