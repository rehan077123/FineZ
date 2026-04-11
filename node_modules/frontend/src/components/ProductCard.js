import { Star, TrendingUp, Award, ShoppingCart, Heart, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { api } from '@/utils/api';
import SocialShare from '@/components/SocialShare';

const DEFAULT_IMAGES = {
  'Tech': 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=300&fit=crop',
  'Fashion': 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&h=300&fit=crop',
  'Fitness': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&h=300&fit=crop',
  'Home': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=300&fit=crop',
  'Digital': 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
  'Side Hustles': 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop',
  'Services': 'https://images.unsplash.com/photo-1552581234-26160f608093?w=500&h=300&fit=crop',
  'Home Decor': 'https://images.unsplash.com/photo-1578500494198-246f612d0b3d?w=500&h=300&fit=crop'
};

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedProducts') || '[]');
    setIsSaved(saved.includes(product.id));
  }, [product.id]);

  const toggleSave = (e) => {
    e.stopPropagation();
    const saved = JSON.parse(localStorage.getItem('savedProducts') || '[]');
    let newSaved;
    if (isSaved) {
      newSaved = saved.filter(id => id !== product.id);
    } else {
      newSaved = [...saved, product.id];
    }
    localStorage.setItem('savedProducts', JSON.stringify(newSaved));
    setIsSaved(!isSaved);
  };

  const getImageUrl = () => {
    const imageUrl = product.image || product.image_small || product.image_url;
    if (imageUrl && (imageUrl.includes('example') || imageUrl.includes('placeholder'))) {
      return DEFAULT_IMAGES[product.category] || DEFAULT_IMAGES['Tech'];
    }
    return imageUrl || DEFAULT_IMAGES[product.category] || DEFAULT_IMAGES['Tech'];
  };

  const handleAffiliateLinkClick = async () => {
    try {
      await api.trackClick(product.id);
      const link = product.affiliateLink || product.affiliate_link;
      window.open(link, '_blank', 'noopener,noreferrer');
      
      // Track as recently viewed
      const viewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
      const newViewed = [product.id, ...viewed.filter(id => id !== product.id)].slice(0, 10);
      localStorage.setItem('recentlyViewed', JSON.stringify(newViewed));
    } catch (error) {
      console.error('Error tracking click:', error);
      const link = product.affiliateLink || product.affiliate_link;
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };
  
  const getCtaText = () => {
    return 'View Opportunity';
  };

  const getUrgencyLabel = () => {
    if (product.featured) return 'Trending';
    if (product.rating > 4.7) return 'Best Seller';
    if (product.discount > 0 || product.original_price > 0) return 'High Margin';
    if (product.review_count > 500) return 'High Demand';
    return null;
  };
  
  const handleCTAClick = (e) => {
    e.stopPropagation();
    handleAffiliateLinkClick();
  };
  
  return (
    <>
      <div 
        data-testid={`product-card-${product.id}`}
        className="product-card product-card-hover masonry-item animate-fade-in group cursor-pointer rounded-[24px]"
        onClick={() => handleAffiliateLinkClick()}
      >
        {/* Badges */}
        {product.premium && (
          <div className="premium-badge" data-testid="premium-badge">
            <Award className="w-3 h-3 inline mr-1" />
            PREMIUM
          </div>
        )}
        {product.featured && (
          <div className="featured-badge" data-testid="featured-badge">
            <TrendingUp className="w-3 h-3 inline mr-1" />
            TOP PICK
          </div>
        )}
        
        {/* Urgency Label */}
        {getUrgencyLabel() && (
          <div className="absolute top-2 left-2 z-20 bg-amber-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg">
            {getUrgencyLabel()}
          </div>
        )}

        {/* Action Buttons */}
        <div className="absolute top-2 right-2 z-20 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={toggleSave}
            className={`p-2 rounded-full shadow-lg transition-all ${isSaved ? 'bg-red-500 text-white' : 'bg-white/10 backdrop-blur-md text-white hover:bg-white/20'}`}
          >
            <Heart size={16} fill={isSaved ? "currentColor" : "none"} />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); navigate(`/product/${product.id}`); }}
            className="p-2 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 shadow-lg transition-all"
          >
            <Eye size={16} />
          </button>
        </div>
        
        {/* Image */}
<div className="relative overflow-hidden bg-[#111827] rounded-t-[24px]">
          <img 
            src={getImageUrl()}
            alt={product.title}
            className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              e.preventDefault?.();
              if (!e.target.dataset.fallbackApplied) {
                e.target.dataset.fallbackApplied = 'true';
                const fallbackImage = DEFAULT_IMAGES[product.category] || DEFAULT_IMAGES['Tech'];
                e.target.onerror = null;
                e.target.src = fallbackImage;
              }
            }}
            crossOrigin="anonymous"
            style={{ display: 'block' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        {/* Content */}
        <div className="p-5 space-y-3">
          {/* Category Badge */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 capitalize">
              {product.category || 'Shop'}
            </span>
          </div>
          
          {/* Title */}
          <h3 className="text-lg font-bold text-white line-clamp-2 group-hover:text-blue-400 transition-colors">
            {product.title}
          </h3>
          
          {/* Why This Product - Conversion Booster */}
          <p className="text-sm font-medium text-amber-300 flex items-start">
            {product.why_this_product}
          </p>
          
          {/* Trust Confidence Signals */}
          {(product.difficulty || product.roi || product.setupTime) && (
            <div className="space-y-2 my-3 text-xs text-slate-400 border-y border-white/10 py-3">
              {product.difficulty && <div className="flex justify-between"><span>Level:</span><span className="text-emerald-400 font-medium">{product.difficulty}</span></div>}
              {product.roi && <div className="flex justify-between"><span>ROI:</span><span className={`font-medium ${product.roi === 'Very High' ? 'text-green-400' : product.roi === 'High' ? 'text-emerald-400' : 'text-blue-400'}`}>{product.roi}</span></div>}
              {product.setupTime && <div className="flex justify-between"><span>Setup:</span><span className="text-white font-medium">{product.setupTime}</span></div>}
            </div>
          )}
          
          {/* Description */}
          <p className="text-sm text-gray-400 line-clamp-2">
            {product.description}
          </p>
          
          {/* Rating & Price */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-semibold text-white">{product.rating}</span>
              <span className="text-xs text-gray-400">({product.review_count})</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <SocialShare product={product} />
              {product.price > 0 && (
                <div className="text-right">
                  {product.original_price && (
                    <span className="text-xs text-gray-500 line-through mr-2">
                      ${product.original_price}
                    </span>
                  )}
                  <span className="text-lg font-bold text-white">
                    ${product.price}
                  </span>
                </div>
              )}
              {product.price === 0 && (
                <span className="text-sm font-bold text-green-400">FREE</span>
              )}
            </div>
          </div>
          
          {/* CTA Button */}
          <button
            data-testid={`cta-button-${product.id}`}
            className="w-full btn-opportunity flex items-center justify-center space-x-2 group-hover:scale-105 transition-transform"
            onClick={handleCTAClick}
          >
            <span>{getCtaText()}</span>
            <ShoppingCart className="w-4 h-4" />
          </button>
          
          {/* Payment Type Badge */}
          {product.price && product.price > 0 && (
            <div className="flex items-center justify-center pt-1">
              <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                Direct Purchase
              </span>
            </div>
          )}
          
          {/* Affiliate Network */}
          {product.affiliate_network && !product.price && (
            <div className="flex items-center justify-center pt-1">
              <span className="text-xs text-gray-500">
                via {product.affiliate_network}
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
