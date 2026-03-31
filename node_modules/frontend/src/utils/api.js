import axios from 'axios';

// Prefer explicit BACKEND_URL, fallback to API_URL, then local default.
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || process.env.REACT_APP_API_URL || 'http://localhost:8000';
const API = `${BACKEND_URL.replace(/\/$/, '')}/api`;

export const api = {
  // Products
  getProducts: async (params = {}) => {
    const response = await axios.get(`${API}/products`, { params });
    return response.data;
  },
  
  getFeaturedProducts: async (limit = 6) => {
    const response = await axios.get(`${API}/products/featured`, { params: { limit } });
    return response.data;
  },
  
  getProduct: async (id) => {
    const response = await axios.get(`${API}/products/${id}`);
    return response.data;
  },
  
  fetchAffiliateData: async (affiliate_link) => {
    const response = await axios.post(`${API}/products/scrape`, { affiliate_link });
    return response.data;
  },
  
  createProduct: async (productData) => {
    const response = await axios.post(`${API}/products`, productData);
    return response.data;
  },
  
  trackClick: async (productId) => {
    await axios.post(`${API}/products/${productId}/click`);
  },
  
  // Stats
  getStats: async () => {
    const response = await axios.get(`${API}/stats`);
    return response.data;
  },
  
  // Categories
  getCategories: async () => {
    const response = await axios.get(`${API}/categories`);
    return response.data;
  },
  
  // Newsletter
  subscribeNewsletter: async (email) => {
    const response = await axios.post(`${API}/newsletter/subscribe`, { email });
    return response.data;
  },
  
  getNewsletterCount: async () => {
    const response = await axios.get(`${API}/newsletter/count`);
    return response.data;
  },
  
  // Analytics
  trackPageView: async (page) => {
    await axios.post(`${API}/analytics/pageview`, null, { params: { page } });
  },
  
  getAnalytics: async () => {
    const response = await axios.get(`${API}/analytics/stats`);
    return response.data;
  }
};

export default api;
