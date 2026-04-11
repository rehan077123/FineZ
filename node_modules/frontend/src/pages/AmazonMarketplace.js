/**
 * AmazonMarketplace.js
 * Display Amazon products with affiliate links
 * Show all Amazon products and earn commissions
 */

import React, { useEffect, useState, useCallback } from 'react';
import { AmazonProductCard, AmazonProductGrid } from '@/components/AmazonAffiliateWidget';
import { api } from '@/utils/api';

export default function AmazonMarketplace() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [stats, setStats] = useState({
    totalProducts: 12,
    totalClicks: 0,
    estimatedEarnings: 0
  });

  const categories = [
    'All',
    'Electronics',
    'AI Tools',
    'Home & Kitchen',
    'Fitness',
    'Smartwatches'
  ];

  const loadAmazonProducts = useCallback(async () => {
    try {
      setLoading(true);
      
      const response = await fetch('http://localhost:8000/api/feeds/amazon-products');
      if (!response.ok) throw new Error('Failed to fetch');
      
      const data = await response.json();
      
      let amazonProducts = data;
      if (selectedCategory !== 'All') {
        amazonProducts = data.filter(p => p.category === selectedCategory);
      }
      
      setProducts(amazonProducts);
      setStats(prev => ({
        ...prev,
        totalProducts: data.length
      }));
    } catch (error) {
      console.error('Error loading products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    loadAmazonProducts();
  }, [loadAmazonProducts]);

  return (
    <div className="amazon-marketplace">
      {/* Header */}
      <div className="marketplace-header">
        <h1>🛍️ Amazon Marketplace</h1>
        <p>Curated Amazon products with affiliate links - Earn commission on every purchase!</p>
      </div>

      {/* Stats Bar */}
      <div className="stats-bar">
        <div className="stat">
          <span className="stat-label">Products</span>
          <span className="stat-value">{stats.totalProducts}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Clicks This Month</span>
          <span className="stat-value">{stats.totalClicks}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Est. Earnings</span>
          <span className="stat-value">₹{stats.estimatedEarnings?.toLocaleString()}</span>
        </div>
      </div>

      {/* Category Filter */}
      <div className="category-filter">
        <h3>Categories:</h3>
        <div className="filter-buttons">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="products-section">
        {loading ? (
          <div className="loading">
            <p>⏳ Loading Amazon products...</p>
          </div>
        ) : products.length > 0 ? (
          <div className="products-grid">
            {products.map(product => (
              <div key={product._id} className="product-card-wrapper">
                <AmazonProductCard product={product} affiliate={true} />
              </div>
            ))}
          </div>
        ) : (
          <div className="no-products">
            <p>No products found in this category</p>
          </div>
        )}
      </div>

      {/* How It Works */}
      <div className="how-it-works">
        <h2>💰 How You Earn Money</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Share Products</h3>
            <p>Browse and share Amazon products from FineZ</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Earn Commission</h3>
            <p>Get 5% commission when someone buys through your link</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Get Paid</h3>
            <p>Receive payments every month to your bank account</p>
          </div>
        </div>
      </div>

      {/* Styles */}
      <style>{`
        .amazon-marketplace {
          padding: 40px 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
        }

        .marketplace-header {
          text-align: center;
          color: white;
          margin-bottom: 40px;
        }

        .marketplace-header h1 {
          font-size: 2.5em;
          margin-bottom: 10px;
        }

        .marketplace-header p {
          font-size: 1.1em;
          opacity: 0.9;
        }

        .stats-bar {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }

        .stat {
          background: white;
          padding: 20px;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .stat-label {
          font-size: 0.9em;
          color: #666;
        }

        .stat-value {
          font-size: 1.8em;
          font-weight: bold;
          color: #667eea;
        }

        .category-filter {
          background: white;
          padding: 20px;
          border-radius: 10px;
          margin-bottom: 40px;
        }

        .category-filter h3 {
          margin-bottom: 15px;
        }

        .filter-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .filter-btn {
          padding: 8px 16px;
          border: 2px solid #ddd;
          background: white;
          color: #333;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 14px;
          font-weight: 500;
        }

        .filter-btn:hover {
          border-color: #667eea;
          color: #667eea;
        }

        .filter-btn.active {
          background: #667eea;
          color: white;
          border-color: #667eea;
        }

        .products-section {
          margin-bottom: 40px;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }

        .product-card-wrapper {
          background: white;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .product-card-wrapper:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }

        .btn-Amazon-affiliate {
          display: inline-block;
          background: #FF9900;
          color: white;
          padding: 10px 20px;
          border-radius: 5px;
          text-decoration: none;
          font-weight: bold;
          transition: background 0.2s;
          cursor: pointer;
        }

        .btn-Amazon-affiliate:hover {
          background: #FF7700;
        }

        .how-it-works {
          background: white;
          padding: 40px 20px;
          border-radius: 10px;
          margin-top: 40px;
        }

        .how-it-works h2 {
          text-align: center;
          margin-bottom: 40px;
        }

        .steps {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
        }

        .step {
          text-align: center;
        }

        .step-number {
          width: 50px;
          height: 50px;
          background: #667eea;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5em;
          font-weight: bold;
          margin: 0 auto 15px;
        }

        .step h3 {
          margin-bottom: 10px;
        }

        .step p {
          color: #666;
        }

        .loading, .no-products {
          text-align: center;
          padding: 40px;
          background: white;
          border-radius: 10px;
          color: #666;
        }
      `}</style>
    </div>
  );
}
