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

  getDiscoverFeed: async (limit = 8) => {
    const response = await axios.get(`${API}/feeds/discover`, { params: { limit } });
    return response.data;
  },

  getTopPicksFeed: async (limit = 12) => {
    const response = await axios.get(`${API}/feeds/top-picks`, { params: { limit } });
    return response.data;
  },

  getProviders: async () => {
    const response = await axios.get(`${API}/providers`);
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
  },

  // Blogs
  getBlogs: async (category) => {
    const response = await axios.get(`${API}/blogs`, { params: { category } });
    return response.data;
  },

  getBlogBySlug: async (slug) => {
    const response = await axios.get(`${API}/blogs/${slug}`);
    return response.data;
  },

  // Reviews
  getProductReviews: async (productId) => {
    const response = await axios.get(`${API}/products/${productId}/reviews`);
    return response.data;
  },

  createProductReview: async (productId, rating, comment, token) => {
    const response = await axios.post(`${API}/products/${productId}/reviews`, { rating, comment }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  // Dashboards
  getSellerDashboard: async (token) => {
    const response = await axios.get(`${API}/seller/dashboard`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  getAffiliateDashboard: async (token) => {
    const response = await axios.get(`${API}/affiliate/dashboard`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
};

export default api;
