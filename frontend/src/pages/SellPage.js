import { useState } from 'react';
import { Plus, CheckCircle, LinkIcon, ShoppingBag, Package, Lightbulb, FileText } from 'lucide-react';
import { api } from '@/utils/api';
import { useAuth } from '@/context/AuthContext';

const SellPage = () => {
  const { user, isAuthenticated } = useAuth();
  const [selectedType, setSelectedType] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    why_this_product: '',
    price: '',
    category: 'AI Tools',
    section: 'Affiliate',
    affiliate_link: '',
    affiliate_network: '',
    image_url: '',
    image_small: '',
    image_full: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchingMeta, setFetchingMeta] = useState(false);
  const [metaMessage, setMetaMessage] = useState('');
  const [showPricing, setShowPricing] = useState(false);
  
  const baseListingTypes = [
    {
      id: 'affiliate',
      name: 'List an Affiliate Product',
      description: 'Add a product with your affiliate link. You earn commission every time someone clicks and buys.',
      icon: LinkIcon,
      color: 'blue',
      earnings: '5–50% commission per sale',
      bestFor: 'Digital products, SaaS tools, courses'
    },
    {
      id: 'marketplace',
      name: 'Sell Your Product',
      description: 'List a physical or digital product. Buyers contact you directly to purchase.',
      icon: ShoppingBag,
      color: 'green',
      earnings: '100% of the sale price',
      bestFor: 'Handmade goods, digital downloads, services'
    },
    {
      id: 'dropshipping',
      name: 'List a Dropship Product',
      description: 'Share a dropshipping product with its supplier link. Other sellers pay to source from your find.',
      icon: Package,
      color: 'orange',
      earnings: 'Supplier referral + platform reach',
      bestFor: 'Electronics, fitness gear, home decor'
    },
    {
      id: 'idea',
      name: 'Share a Money Idea',
      description: 'Post a proven side hustle or earning strategy. Include a link to get started.',
      icon: Lightbulb,
      color: 'pink',
      earnings: 'Build your audience & authority',
      bestFor: 'Side hustles, passive income strategies'
    }
  ];

  const blogListingType = {
    id: 'blog',
    name: 'List Your Blog',
    description: 'Share your blog post or article. Drive traffic to your content and build your audience.',
    icon: FileText,
    color: 'purple',
    earnings: 'Build audience & monetize through ads/affiliates',
    bestFor: 'Bloggers, content creators, writers'
  };

  // Only show blog option for admin users
  const listingTypes = user?.is_admin ? [...baseListingTypes, blogListingType] : baseListingTypes;
  
  const categories = ['AI', 'AI Tools', 'Tech', 'Side Hustles', 'Learn', 'Fitness', 'Home'];
  const sections = ['Affiliate', 'Marketplace', 'Dropshipping', 'Idea', 'Blog'];
  
  const b2bPlans = [
    { name: 'Free', price: '$0', features: ['10 listings', 'Basic analytics', 'Standard support'], color: 'slate' },
    { name: 'Pro', price: '$29', features: ['100 listings', 'Advanced analytics', 'Priority support', 'Featured slots'], color: 'blue', recommended: true },
    { name: 'Enterprise', price: '$99', features: ['Unlimited listings', 'Custom branding', 'Dedicated manager', 'API access'], color: 'purple' }
  ];
  
  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      green: 'bg-green-500/20 text-green-400 border-green-500/30',
      orange: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      pink: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
      purple: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
    };
    return colors[color] || colors.blue;
  };
  
  const handleFetchMetaFromAffiliate = async () => {
    if (!formData.affiliate_link) {
      alert('Please enter an affiliate link first.');
      return;
    }

    setFetchingMeta(true);
    setMetaMessage('Fetching product metadata from affiliate link...');

    try {
      const meta = await api.fetchAffiliateData(formData.affiliate_link);
      setFormData((prev) => ({
        ...prev,
        title: meta.title || prev.title,
        description: meta.description || prev.description,
        why_this_product: prev.why_this_product || '',
        price: meta.price > 0 ? meta.price : prev.price,
        image_url: meta.image_full || meta.image_small || meta.image_url || prev.image_url,
        affiliate_network: meta.affiliate_network || prev.affiliate_network,
      }));
      setMetaMessage('Metadata fetched. Review and adjust if needed.');
    } catch (error) {
      console.error('fetch affiliate meta error', error);
      setMetaMessage('Unable to auto-fetch metadata; please paste image URL manually.');
    } finally {
      setFetchingMeta(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const productData = {
        ...formData,
        type: formData.section.toLowerCase(), // Use section for internal logic
        price: formData.price ? parseFloat(formData.price) : 0,
        benefits: formData.why_this_product || formData.description,
        image: formData.image_small || formData.image_url,
        fullImage: formData.image_full || formData.image_url,
        affiliateLink: formData.affiliate_link,
      };
      
      await api.createProduct(productData);
      setSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        setSelectedType(null);
        setFormData({
          title: '',
          description: '',
          why_this_product: '',
          price: '',
          category: 'AI Tools',
          section: 'Affiliate',
          affiliate_link: '',
          affiliate_network: '',
          image_url: '',
          image_small: '',
          image_full: ''
        });
      }, 3000);
    } catch (error) {
      console.error('Error submitting product:', error);
      alert('Error submitting product. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center animate-fade-in">
          <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">✅ Listing Submitted!</h2>
          <p className="text-xl text-gray-400 mb-2">Your product has been added successfully.</p>
          <p className="text-sm text-gray-500">It's now live on FineZ!</p>
        </div>
      </div>
    );
  }
  
  if (!selectedType && !showPricing) {
    return (
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-4">Grow Your Business on FineZ</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Choose how you want to list and start earning from our 50k+ monthly visitors.
            </p>
            <div className="mt-8 flex justify-center space-x-4">
              <button 
                onClick={() => setShowPricing(true)}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/30"
              >
                View B2B Pricing Plans
              </button>
            </div>
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500 mt-4">
              <span>✅ Free to list</span>
              <span>•</span>
              <span>✅ Approved within 24 hours</span>
              <span>•</span>
              <span>✅ You own your commissions</span>
            </div>
          </div>
          
          {/* Listing Type Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {listingTypes.map((type) => {
              const Icon = type.icon;
              return (
                <div
                  key={type.id}
                  className="glass-effect p-8 rounded-2xl border border-white/10 hover:border-white/30 transition-all cursor-pointer group"
                  onClick={() => setSelectedType(type.id)}
                >
                  <div className={`w-14 h-14 rounded-xl ${getColorClasses(type.color)} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3">{type.name}</h3>
                  <p className="text-gray-400 mb-6">{type.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-sm text-gray-400">Earnings:</span>
                        <span className="text-sm text-white ml-2 font-semibold">{type.earnings}</span>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-sm text-gray-400">Best for:</span>
                        <span className="text-sm text-white ml-2">{type.bestFor}</span>
                      </div>
                    </div>
                  </div>
                  
                  <button className="w-full btn-primary group-hover:scale-105 transition-transform">
                    List this type →
                  </button>
                </div>
              );
            })}
          </div>
          
          {/* How It Works */}
          <div className="glass-effect p-8 rounded-2xl border border-white/10">
            <h2 className="text-2xl font-bold text-white text-center mb-8">How It Works</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  01
                </div>
                <h3 className="font-semibold text-white mb-2">Choose Type</h3>
                <p className="text-sm text-gray-400">Pick affiliate, sell, dropship, or idea listing</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  02
                </div>
                <h3 className="font-semibold text-white mb-2">Fill Details</h3>
                <p className="text-sm text-gray-400">Add your product info, image, and link</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  03
                </div>
                <h3 className="font-semibold text-white mb-2">Get Approved</h3>
                <p className="text-sm text-gray-400">We review within 24 hours for quality</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  04
                </div>
                <h3 className="font-semibold text-white mb-2">Start Earning</h3>
                <p className="text-sm text-gray-400">Your listing goes live and starts getting clicks</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (showPricing) {
    return (
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => setShowPricing(false)}
            className="text-gray-400 hover:text-white mb-8 flex items-center"
          >
            ← Back to listing types
          </button>
          
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">B2B Seller Plans</h2>
            <p className="text-gray-400">Scale your business with advanced tools and reach.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {b2bPlans.map((plan) => (
              <div key={plan.name} className={`glass-effect p-8 rounded-3xl border ${plan.recommended ? 'border-blue-500/50 ring-2 ring-blue-500/20' : 'border-white/10'} relative overflow-hidden group`}>
                {plan.recommended && (
                  <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-black px-4 py-1 rounded-bl-xl uppercase tracking-widest">
                    Recommended
                  </div>
                )}
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-black text-white">{plan.price}</span>
                  <span className="text-gray-500 ml-1">/mo</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center text-gray-400 text-sm">
                      <CheckCircle className="w-4 h-4 text-blue-400 mr-2" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-xl font-bold transition-all ${plan.recommended ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30' : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'}`}>
                  Choose {plan.name}
                </button>
              </div>
            ))}
          </div>

          {/* Payment Providers */}
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-6 uppercase tracking-widest font-bold">Securely Processed By</p>
            <div className="flex justify-center items-center space-x-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-8" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg" alt="Razorpay" className="h-8" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-8" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Form View
  const selectedTypeData = listingTypes.find(t => t.id === selectedType);
  const Icon = selectedTypeData.icon;
  
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <button
          onClick={() => setSelectedType(null)}
          className="text-gray-400 hover:text-white mb-6 flex items-center"
        >
          ← Back to listing types
        </button>
        
        <div className="glass-effect p-8 rounded-2xl border border-white/10 mb-8">
          <div className={`w-14 h-14 rounded-xl ${getColorClasses(selectedTypeData.color)} flex items-center justify-center mb-4`}>
            <Icon className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">{selectedTypeData.name}</h1>
          <p className="text-gray-400">{selectedTypeData.description}</p>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="glass-effect p-8 rounded-2xl border border-white/10 space-y-6">
          <div>
            <label className="block text-white font-semibold mb-2">Product Title *</label>
            <input
              id="product-title"
              name="title"
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full search-bar"
              placeholder="e.g., ChatGPT Plus - AI Assistant"
            />
          </div>
          
          <div>
            <label className="block text-white font-semibold mb-2">Description *</label>
            <textarea
              id="product-description"
              name="description"
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full search-bar resize-none"
              placeholder="Describe your product in detail..."
            />
          </div>
          
          <div>
            <label className="block text-white font-semibold mb-2">Why This Product? * (Conversion booster)</label>
            <input
              id="why-product"
              name="why_this_product"
              type="text"
              required
              value={formData.why_this_product}
              onChange={(e) => setFormData({ ...formData, why_this_product: e.target.value })}
              className="w-full search-bar"
              placeholder="⚡ 10x your productivity with AI that understands context"
            />
            <p className="text-xs text-gray-500 mt-1">This appears prominently on the card - make it compelling!</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white font-semibold mb-2">Category *</label>
              <select
                id="product-category"
                name="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full search-bar"
              >
                <option value="" disabled>Select Category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-white font-semibold mb-2">Section *</label>
              <select
                id="product-section"
                name="section"
                value={formData.section}
                onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                className="w-full search-bar"
              >
                {sections.map(sec => (
                  <option key={sec} value={sec}>{sec}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white font-semibold mb-2">Price (USD)</label>
              <input
                id="product-price"
                name="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full search-bar"
                placeholder="0 for free"
              />
            </div>
            
            <div>
              <label className="block text-white font-semibold mb-2">Affiliate Network</label>
              <input
                id="affiliate-network"
                name="affiliate_network"
                type="text"
                value={formData.affiliate_network}
                onChange={(e) => setFormData({ ...formData, affiliate_network: e.target.value })}
                className="w-full search-bar"
                placeholder="e.g., Amazon, CJ Affiliate, ShareASale"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-white font-semibold mb-2">
              {formData.section === 'Blog' ? 'Blog URL' : 'Affiliate/Product Link'} *
            </label>
            <div className="flex items-center gap-2">
              <input
                id="affiliate-link"
                name="affiliate_link"
                type="url"
                required
                value={formData.affiliate_link}
                onChange={(e) => setFormData({ ...formData, affiliate_link: e.target.value })}
                className="w-full search-bar"
                placeholder={formData.section === 'Blog' ? "https://yourblog.com/post" : "https://example.com?ref=yourid"}
              />
              {formData.section !== 'Blog' && (
                <button
                  type="button"
                  onClick={handleFetchMetaFromAffiliate}
                  disabled={fetchingMeta}
                  className="btn-secondary"
                >
                  {fetchingMeta ? 'Fetching...' : 'Fetch from Link'}
                </button>
              )}
            </div>
            {metaMessage && <p className="text-xs text-gray-300 mt-1">{metaMessage}</p>}
          </div>
          <div>
            <label className="block text-white font-semibold mb-2">Image URL *</label>
            <input
              id="product-image-url"
              name="image_url"
              type="url"
              required
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              className="w-full search-bar"
              placeholder="https://images.unsplash.com/..."
            />
            <p className="text-xs text-gray-500 mt-1">Provide a working image URL for the product.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-3">
            <div>
              <label className="block text-white font-semibold mb-2">Card Image (small)</label>
              <input
                id="image-small"
                name="image_small"
                type="url"
                value={formData.image_small || ''}
                onChange={(e) => setFormData({ ...formData, image_small: e.target.value })}
                className="w-full search-bar"
                placeholder="(optional) small card image URL"
              />
            </div>
            <div>
              <label className="block text-white font-semibold mb-2">Full Image (popup)</label>
              <input
                id="image-full"
                name="image_full"
                type="url"
                value={formData.image_full || ''}
                onChange={(e) => setFormData({ ...formData, image_full: e.target.value })}
                className="w-full search-bar"
                placeholder="(optional) high-res popup image URL"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-gold text-lg"
          >
            {loading ? 'Submitting...' : `✅ Submit ${selectedTypeData.name}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SellPage;
