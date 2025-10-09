import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { apiService } from '../services/api';
import './Products.css';

const Products = () => {
  const { cart, addItem } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from backend API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await apiService.getAllProducts();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const getItemQuantity = (productId) => {
    const item = cart.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  const handleAddToCart = (product) => {
    // Convert backend product format to cart format
    const cartProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.imageUrl || '/api/placeholder/300/200',
      description: product.description
    };
    addItem(cartProduct);
  };

  // Loading state
  if (loading) {
    return (
      <div className="products-page">
        <h1>Our Products</h1>
        <div className="loading">Loading products...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="products-page">
        <h1>Our Products</h1>
        <div className="error">
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="products-page">
      <h1>Our Products</h1>
      <div className="api-status">
        <small>✅ Connected to Backend API | {products.length} products loaded</small>
      </div>
      <div className="products-grid">
        {products.map(product => {
          const quantity = getItemQuantity(product.id);
          
          return (
            <div key={product.id} className="product-card">
              <img 
                src={product.imageUrl || '/api/placeholder/300/200'} 
                alt={product.name} 
                className="product-image"
                onError={(e) => {
                  e.target.src = '/api/placeholder/300/200';
                }}
              />
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="product-price">${product.price.toFixed(2)}</p>
                <p className="product-description">{product.description}</p>
                <div className="product-meta">
                  <span className="product-category">📂 {product.category}</span>
                  <span className="product-stock">📦 {product.stock} in stock</span>
                </div>
                <button 
                  className="add-to-cart"
                  onClick={() => handleAddToCart(product)}
                  disabled={product.stock === 0}
                >
                  {product.stock === 0 
                    ? 'Out of Stock' 
                    : quantity > 0 
                      ? `Add More (${quantity} in cart)` 
                      : 'Add to Cart'
                  }
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {products.length === 0 && (
        <div className="no-products">
          <p>No products available at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default Products;
