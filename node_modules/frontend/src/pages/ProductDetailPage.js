import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Star, Share2, ExternalLink, ShoppingCart, ShieldCheck, Zap, Truck } from 'lucide-react';
import SocialShare from '../components/SocialShare';
import PurchaseModal from '../components/PurchaseModal';
import ComparisonTable from '../components/ComparisonTable';
import ReviewSection from '../components/ReviewSection';
import AdBanner from '../components/AdBanner';
import { api } from '../utils/api';

const DEFAULT_IMAGES = {
  'AI Tools': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop',
  'Electronics': 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=500&fit=crop',
  'Beauty': 'https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?w=800&h=500&fit=crop',
  'Home Gadgets': 'https://images.unsplash.com/photo-1556911223-05a0a42afab8?w=800&h=500&fit=crop',
  'Fashion': 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&h=500&fit=crop',
  'Fitness': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=500&fit=crop',
  'Side Hustles': 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&h=500&fit=crop',
  'Learn': 'https://images.unsplash.com/photo-1523240715630-9415511e834b?w=800&h=500&fit=crop',
};

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, token } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await api.getProduct(id);
        if (!data) {
          setError('Product not found');
        } else {
          setProduct(data);
        }
      } catch (error) {
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    } else {
      setError('No product ID provided');
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading product...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-white text-2xl mb-4">Product not found</h2>
          <button
            onClick={() => navigate(-1)}
            className="text-blue-400 hover:text-blue-300 transition"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  const handleAffiliateLinkClick = async () => {
    try {
      await api.trackClick(product.id);
      const link = product.affiliateLink || product.affiliate_link;
      window.open(link, '_blank', 'noopener,noreferrer');
    } catch (error) {
      const link = product.affiliateLink || product.affiliate_link;
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-700 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-300 hover:text-white transition"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <h1 className="text-white font-bold text-xl text-center flex-1">{product.title}</h1>
          <div className="w-20"></div>
        </div>
      </div>

      {/* Product Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Image & Actions */}
          <div className="lg:col-span-2">
          {/* Image */}
            <div className="mb-8 rounded-xl overflow-hidden border border-slate-700 bg-gray-900">
              <img
                src={product.fullImage || product.image_full || product.image_url || DEFAULT_IMAGES[product.category] || DEFAULT_IMAGES['Tech']}
                alt={product.title}
                className="w-full h-96 object-cover"
                onError={(e) => {
                  if (!e.target.dataset.fallbackApplied) {
                    e.target.dataset.fallbackApplied = 'true';
                    e.target.src = DEFAULT_IMAGES[product.category] || DEFAULT_IMAGES['Tech'];
                  }
                }}
              />
            </div>

            {/* Product Info */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 space-y-4">
              <div>
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 capitalize">
                  {product.category}
                </span>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-white mb-2">{product.title}</h2>
                <p className="text-amber-300 font-semibold text-lg">{product.benefits || product.why_this_product}</p>
              </div>

              <div className="flex items-center space-x-6 py-4 border-y border-slate-700">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  <span className="text-white font-semibold">{product.rating || '4.8'}</span>
                  <span className="text-gray-400">({product.review_count || '1200'} reviews)</span>
                </div>
                <SocialShare product={product} />
              </div>

              <div>
                <h3 className="text-white font-bold mb-3">Benefits</h3>
                <p className="text-gray-300 leading-relaxed">{product.benefits || product.description}</p>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-700">
                {product.type && (
                  <div>
                    <label className="text-gray-400 text-sm">Type</label>
                    <p className="text-white font-semibold capitalize">{product.type}</p>
                  </div>
                )}
                {product.affiliate_network && (
                  <div>
                    <label className="text-gray-400 text-sm">Network</label>
                    <p className="text-white font-semibold">{product.affiliate_network}</p>
                  </div>
                )}
              </div>

              {/* Badges */}
              <div className="flex space-x-2 pt-4">
                {product.featured && (
                  <span className="text-xs bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full border border-purple-500/30">
                    ⭐ Featured
                  </span>
                )}
                {product.premium && (
                  <span className="text-xs bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full border border-yellow-500/30">
                    ⚡ Premium
                  </span>
                )}
              </div>
            </div>
            
            {/* Ad Banner after product info */}
            <div className="mt-8">
              <AdBanner slot="PRODUCT_DETAIL_BOTTOM_BANNER" />
            </div>
          </div>

          {/* Sidebar - Purchase/Action */}
          <div>
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-6 sticky top-24 space-y-4">
              {/* Price Section */}
              <div>
                <p className="text-gray-400 text-sm mb-2">Price per unit</p>
                <div className="flex items-baseline space-x-2">
                  {product.original_price && (
                    <span className="text-gray-500 line-through text-lg">
                      ${product.original_price}
                    </span>
                  )}
                  <span className="text-4xl font-bold text-white">
                    ${product.price}
                  </span>
                </div>
              </div>

              {/* Get Deal Button - Opens Affiliate Link */}
              <button
                onClick={handleAffiliateLinkClick}
                className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold py-3 rounded-lg flex items-center justify-center space-x-2 transition-all transform hover:scale-105"
              >
                <ExternalLink className="w-5 h-5" />
                <span>Get Deal → {product.affiliate_network}</span>
              </button>

              {product.affiliate_link && (
                <p className="text-xs text-gray-400 text-center">
                  ✓ Opens official seller link in new tab
                </p>
              )}

              {/* Info Box */}
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <p className="text-sm text-blue-300">
                  🔗 Affiliate link - Earn {"\u00A0"}
                  {product.affiliate_network === "Amazon Associates" && "10%"}
                  {product.affiliate_network === "Flipkart Affiliate" && "15-20%"}
                  {product.affiliate_network === "AliExpress" && "8-12%"}
                  {product.affiliate_network === "Shopee" && "10%"}
                  {" "} commission on sales
                </p>
              </div>

              {/* Key Benefits */}
              <div className="space-y-2 pt-4 border-t border-slate-700">
                <h4 className="text-white font-bold text-sm">Why this product?</h4>
                <ul className="space-y-2">
                  <li className="text-sm text-gray-300 flex items-start space-x-2">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>Real product with proven market demand</span>
                  </li>
                  <li className="text-sm text-gray-300 flex items-start space-x-2">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>Trusted by thousands of users</span>
                  </li>
                  <li className="text-sm text-gray-300 flex items-start space-x-2">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>Earn commissions on every sale</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust & Conversion Section */}
      <div className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="flex flex-col items-center text-center p-6 bg-slate-800/30 rounded-xl border border-slate-700">
            <div className="mb-4 p-3 bg-green-500/10 rounded-full">
              <ShieldCheck className="w-8 h-8 text-green-400" />
            </div>
            <h4 className="text-white font-bold mb-2">Secure Payments</h4>
            <p className="text-gray-400 text-sm">Every transaction is encrypted and secured by industry standards.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-slate-800/30 rounded-xl border border-slate-700">
            <div className="mb-4 p-3 bg-blue-500/10 rounded-full">
              <Zap className="w-8 h-8 text-blue-400" />
            </div>
            <h4 className="text-white font-bold mb-2">Instant Access</h4>
            <p className="text-gray-400 text-sm">Get immediate access to digital products or tracking for physical items.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-slate-800/30 rounded-xl border border-slate-700">
            <div className="mb-4 p-3 bg-purple-500/10 rounded-full">
              <Truck className="w-8 h-8 text-purple-400" />
            </div>
            <h4 className="text-white font-bold mb-2">Global Support</h4>
            <p className="text-gray-400 text-sm">Our team is available 24/7 to help you with any issues.</p>
          </div>
        </div>

        <ComparisonTable />
        <ReviewSection />
      </div>

      {/* Purchase Modal */}
      {product && (
        <PurchaseModal 
          product={product} 
          isOpen={showPurchaseModal} 
          onClose={() => setShowPurchaseModal(false)}
        />
      )}
    </div>
  );
}
