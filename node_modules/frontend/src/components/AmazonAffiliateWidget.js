/**
 * AmazonAffiliateWidget.js
 * Display Amazon products with affiliate links
 * Shows "Buy on Amazon" button that tracks clicks and revenue
 */

import React, { useEffect, useState } from 'react';

export function AmazonAffiliateWidget({
  productId,
  productTitle,
  productPrice,
  productImage,
  affiliateLink,
  onClickTracking = true
}) {
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleBuyClick = async () => {
    setLoading(true);
    setClicked(true);

    try {
      // Track the click in backend for analytics
      if (onClickTracking) {
        await fetch('/api/affiliate/click', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            product_id: productId,
            platform: 'amazon',
            timestamp: new Date().toISOString(),
          })
        });
      }

      // Open affiliate link in new tab
      window.open(affiliateLink, '_blank');
    } catch (error) {
      console.error('Error tracking affiliate click:', error);
      // Still open link even if tracking fails
      window.open(affiliateLink, '_blank');
    }

    setLoading(false);
  };

  return (
    <div className="amazon-affiliate-widget">
      <div className="product-header">
        <img 
          src={productImage} 
          alt={productTitle}
          className="product-image-small"
        />
        <div className="product-info">
          <h4>{productTitle}</h4>
          <p className="price">₹{productPrice?.toLocaleString()}</p>
          <span className="badge-amazon">Amazon</span>
        </div>
      </div>

      <button
        className={`btn-buy-amazon ${loading ? 'loading' : ''} ${clicked ? 'clicked' : ''}`}
        onClick={handleBuyClick}
        disabled={loading}
      >
        {loading ? (
          <>
            <span className="spinner"></span> Opening Amazon...
          </>
        ) : clicked ? (
          <>
            ✓ Opening in Amazon...
          </>
        ) : (
          <>
            💳 Buy on Amazon (Earn Commission)
          </>
        )}
      </button>

      <p className="commission-note">
        We earn a small commission at no extra cost to you
      </p>
    </div>
  );
}

/**
 * AmazonProductCard - Full product card with Amazon affiliation
 */
export function AmazonProductCard({ product, affiliate = true }) {
  const [showAffiliate, setShowAffiliate] = useState(affiliate);

  const getAmazonLink = () => {
    const amazonSource = product.sources?.find(s => s.source === 'amazon');
    return amazonSource?.affiliate_url || product.sources?.[0]?.affiliate_url;
  };

  const getPrice = () => {
    return product.sources?.[0]?.price || product.price || 0;
  };

  const getImage = () => {
    return product.image_url || product.images?.[0] || 'https://via.placeholder.com/300';
  };

  return (
    <div className="product-card amazon-product">
      <div className="product-image-container">
        <img
          src={getImage()}
          alt={product.title}
          className="product-image"
        />
        <div className="product-badge">Amazon</div>
        {product.rating && (
          <div className="rating-badge">
            ⭐ {product.rating} ({product.reviews} reviews)
          </div>
        )}
      </div>

      <div className="product-details">
        <h3>{product.title}</h3>
        <p className="description">{product.description}</p>

        <div className="product-footer">
          <div className="price-section">
            <span className="price">₹{getPrice()?.toLocaleString()}</span>
            <span className="commission">+5% commission</span>
          </div>

          {showAffiliate && getAmazonLink() && (
            <a
              href={getAmazonLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-Amazon-affiliate"
              onClick={() => {
                // Track click
                fetch('/api/affiliate/click', {
                  method: 'POST',
                  body: JSON.stringify({
                    product_id: product._id,
                    platform: 'amazon',
                  })
                }).catch(e => console.error(e));
              }}
            >
              Buy on Amazon 🔗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * AmazonProductGrid - Grid of products with affiliate links
 */
export function AmazonProductGrid({ products, title = "Amazon Products" }) {
  if (!products || products.length === 0) {
    return <p>No products available</p>;
  }

  return (
    <div className="amazon-product-grid">
      <h2>{title}</h2>
      <div className="products-grid">
        {products.map((product) => (
          <AmazonProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

/**
 * AffiliateLink Component - Simple affiliate link
 */
export function AffiliateLink({ children, href, productId, onTrack = true }) {
  const handleClick = async (e) => {
    if (onTrack) {
      e.preventDefault();
      
      try {
        await fetch('/api/affiliate/click', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            product_id: productId,
            platform: 'amazon',
            timestamp: new Date().toISOString(),
          })
        });
      } catch (error) {
        console.error('Tracking error:', error);
      }
      
      window.open(href, '_blank');
    }
  };

  return (
    <a
      href={href}
      onClick={onTrack ? handleClick : undefined}
      target="_blank"
      rel="noopener noreferrer"
      className="affiliate-link"
    >
      {children}
    </a>
  );
}

export default AmazonAffiliateWidget;

const styles = `
.product-card.amazon-product {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.product-card.amazon-product:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.product-image-container {
  position: relative;
  width: 100%;
  height: 200px;
  background: #f5f5f5;
  overflow: hidden;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #FF9900;
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
}

.rating-badge {
  position: absolute;
  bottom: 10px;
  left: 10px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 0.85rem;
}

.product-details {
  padding: 15px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.product-details h3 {
  margin: 0 0 8px 0;
  font-size: 1rem;
  color: #1a1a1a;
  line-height: 1.3;
}

.description {
  font-size: 0.85rem;
  color: #666;
  margin: 8px 0;
  flex: 1;
}

.product-footer {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: auto;
}

.price-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-size: 1.3rem;
  font-weight: bold;
  color: #FF9900;
}

.commission {
  font-size: 0.8rem;
  color: #28a745;
  background: #f0f8f0;
  padding: 2px 8px;
  border-radius: 12px;
}

.btn-Amazon-affiliate {
  display: inline-block;
  background: #FF9900;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  text-align: center;
  transition: all 0.2s;
  cursor: pointer;
}

.btn-Amazon-affiliate:hover {
  background: #EC7600;
  transform: scale(1.02);
}

.btn-Amazon-affiliate:active {
  transform: scale(0.98);
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  width: 100%;
}

.amazon-affiliate-widget {
  background: white;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.product-header {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
}

.product-image-small {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
}

.product-info {
  flex: 1;
}

.product-info h4 {
  margin: 0 0 6px 0;
  font-size: 0.95rem;
}

.badge-amazon {
  display: inline-block;
  background: #FF9900;
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  margin-top: 4px;
}

.btn-buy-amazon {
  width: 100%;
  padding: 10px;
  background: #FF9900;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-buy-amazon:hover:not(:disabled) {
  background: #EC7600;
}

.btn-buy-amazon:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.commission-note {
  font-size: 0.8rem;
  color: #999;
  margin: 8px 0 0 0;
  text-align: center;
}
`;
