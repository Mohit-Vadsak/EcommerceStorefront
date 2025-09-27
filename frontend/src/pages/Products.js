import React from 'react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import './Products.css';

const Products = () => {
  const { cart, addItem } = useCart();

  const getItemQuantity = (productId) => {
    const item = cart.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  const handleAddToCart = (product) => {
    addItem(product);
  };

  return (
    <div className="products-page">
      <h1>Our Products</h1>
      <div className="products-grid">
        {products.map(product => {
          const quantity = getItemQuantity(product.id);
          
          return (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="product-price">${product.price.toFixed(2)}</p>
                <p className="product-description">{product.description}</p>
                <div className="product-meta">
                  <span className="product-rating">★ {product.rating} ({product.reviews} reviews)</span>
                  <span className="product-stock">{product.stock} in stock</span>
                </div>
                <button 
                  className="add-to-cart"
                  onClick={() => handleAddToCart(product)}
                >
                  {quantity > 0 ? `Add More (${quantity} in cart)` : 'Add to Cart'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
