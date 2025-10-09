// API Service for backend communication
const API_BASE_URL = 'http://localhost:8080/api';

class ApiService {
  // Generic fetch wrapper with error handling
  async fetchWithErrorHandling(url, options = {}) {
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Product API methods
  async getAllProducts() {
    return this.fetchWithErrorHandling(`${API_BASE_URL}/products`);
  }

  async getProductById(id) {
    return this.fetchWithErrorHandling(`${API_BASE_URL}/products/${id}`);
  }

  async createProduct(product) {
    return this.fetchWithErrorHandling(`${API_BASE_URL}/products`, {
      method: 'POST',
      body: JSON.stringify(product),
    });
  }

  async updateProduct(id, product) {
    return this.fetchWithErrorHandling(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(product),
    });
  }

  async deleteProduct(id) {
    return this.fetchWithErrorHandling(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
    });
  }

  async searchProducts(query) {
    return this.fetchWithErrorHandling(`${API_BASE_URL}/products/search?q=${encodeURIComponent(query)}`);
  }

  async getProductsByCategory(category) {
    return this.fetchWithErrorHandling(`${API_BASE_URL}/products/category/${encodeURIComponent(category)}`);
  }

  // Health check endpoint
  async testConnection() {
    return this.fetchWithErrorHandling(`${API_BASE_URL}/health`);
  }

  // Hello endpoint
  async getHello() {
    return this.fetchWithErrorHandling(`${API_BASE_URL}/hello`);
  }
}

// Export singleton instance
export const apiService = new ApiService();
export default apiService;
