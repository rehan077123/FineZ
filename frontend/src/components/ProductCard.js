import { ExternalLink, Star, TrendingUp, Award, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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

  const getImageUrl = () => {
    const imageUrl = product.image_small || product.image_url;
    if (imageUrl && imageUrl.includes('example') || imageUrl && imageUrl.includes('placeholder')) {
      return DEFAULT_IMAGES[product.category] || DEFAULT_IMAGES['Tech'];
    }
    return imageUrl || DEFAULT_IMAGES[product.category] || DEFAULT_IMAGES['Tech'];
  };

  const handleAffiliateLinkClick = async () => {
    try {
      await api.trackClick(product.id);
      window.open(product.affiliate_link, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('Error tracking click:', error);
      window.open(product.affiliate_link, '_blank', 'noopener,noreferrer');
    }
  };
  
  const getCtaText = () => {
    if (product.price && product.price > 0) return 'Buy Now 🛒';
    if (product.type === 'affiliate') return 'Get Deal 🔥';
    if (product.type === 'idea') return 'Start Earning 💰';
    if (product.type === 'dropshipping') return 'Source Now 📦';
    return 'View Details →';
  };
  
  const handleCTAClick = (e) => {
    e.stopPropagation();
    navigate(`/product/${product.id}`);
  };
  
  return (
    <>
      <div 
        data-testid={`product-card-${product.id}`}
        className="product-card product-card-hover masonry-item animate-fade-in group cursor-pointer"
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
        
        {/* Image */}
        <div className="relative overflow-hidden bg-gray-800">
          <img 
            src={getImageUrl()}
            alt={product.title}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              // Silently handle image load errors
              e.preventDefault?.();
              if (!e.target.dataset.fallbackApplied) {
                e.target.dataset.fallbackApplied = 'true';
                const fallbackImage = DEFAULT_IMAGES[product.category] || DEFAULT_IMAGES['Tech'];
                e.target.onerror = null; // Prevent infinite loop
                e.target.src = fallbackImage;
              }
            }}
            crossOrigin="anonymous"
            style={{ display: 'block' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
            className="w-full btn-primary flex items-center justify-center space-x-2 group-hover:scale-105 transition-transform"
            onClick={handleCTAClick}
          >
            <span>{getCtaText()}</span>
            {product.price && product.price > 0 ? (
              <ShoppingCart className="w-4 h-4" />
            ) : (
              <ExternalLink className="w-4 h-4" />
            )}
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
