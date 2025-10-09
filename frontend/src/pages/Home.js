import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';

function Home() {
  const [apiStatus, setApiStatus] = useState('checking');
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    const checkApiConnection = async () => {
      try {
        // Test API connection
        await apiService.testConnection();
        
        // Get product count
        const products = await apiService.getAllProducts();
        setProductCount(products.length);
        
        setApiStatus('connected');
      } catch (error) {
        console.error('API connection failed:', error);
        setApiStatus('disconnected');
      }
    };

    checkApiConnection();
  }, []);

  const getStatusStyle = () => {
    switch (apiStatus) {
      case 'connected':
        return { color: '#27ae60', backgroundColor: '#d5edda', padding: '10px', borderRadius: '5px' };
      case 'disconnected':
        return { color: '#e74c3c', backgroundColor: '#f8d7da', padding: '10px', borderRadius: '5px' };
      default:
        return { color: '#f39c12', backgroundColor: '#fff3cd', padding: '10px', borderRadius: '5px' };
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '3rem', padding: '2rem' }}>
      <h1>Welcome to Ecommerce Storefront</h1>
      <p>Your one-stop shop for all your needs!</p>
      
      <div style={{ margin: '2rem 0' }}>
        <h3>System Status</h3>
        <div style={getStatusStyle()}>
          {apiStatus === 'checking' && '🔄 Checking API connection...'}
          {apiStatus === 'connected' && `✅ Backend API Connected | ${productCount} products available`}
          {apiStatus === 'disconnected' && '❌ Backend API Disconnected'}
        </div>
      </div>

      <div style={{ margin: '2rem 0' }}>
        <h3>🚀 Tech Stack</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
          <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
            <h4>Frontend</h4>
            <p>⚛️ React 19.1.1</p>
            <p>🌐 Running on :3000</p>
          </div>
          <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
            <h4>Backend</h4>
            <p>☕ Spring Boot 3.5.6</p>
            <p>🔗 API on :8080</p>
          </div>
          <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
            <h4>Database</h4>
            <p>🍃 MongoDB 8.2.1</p>
            <p>📊 Compass GUI</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
