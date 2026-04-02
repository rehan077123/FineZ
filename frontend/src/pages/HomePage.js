import { useState, useEffect, useCallback } from 'react';
import { Search, TrendingUp, Zap, Package, Lightbulb, ShoppingCart, Link as LinkIcon, ArrowUpDown, Star, Flame, Trophy } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import NewsletterModal from '@/components/NewsletterModal';
import WhatsAppButton from '@/components/WhatsAppButton';
import TestimonialSlider from '@/components/TestimonialSlider';
import BestPicks from '@/components/BestPicks';
import { api } from '@/utils/api';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [stats, setStats] = useState({ total_listings: 0, total_vendors: 0, total_clicks: 0 });
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest'); // newest, popular, rating, price
  const [loading, setLoading] = useState(true);
  
  const categories = ['All', 'AI Tools', 'Tech', 'Side Hustles', 'Fashion', 'Learn', 'Fitness', 'Home'];
  
  useEffect(() => {
    loadData();
    // Track page view
    api.trackPageView('homepage').catch(console.error);
  }, []);
  
  const loadData = async () => {
    try {
      setLoading(true);
      const [productsData, featuredData, statsData] = await Promise.all([
        api.getProducts({ limit: 50 }),
        api.getFeaturedProducts(6),
        api.getStats()
      ]);
      setProducts(productsData);
      setFeaturedProducts(featuredData);
      setStats(statsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const sortProducts = (productsList) => {
    const sorted = [...productsList];
    switch(sortBy) {
      case 'popular':
        return sorted.sort((a, b) => b.clicks - a.clicks);
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'price':
        return sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
      case 'newest':
      default:
        return sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }
  };
  
  const handleSearch = useCallback(async () => {
    try {
      setLoading(true);
      const params = {};
      if (search) params.search = search;
      if (selectedCategory !== 'All') params.category = selectedCategory;
      const data = await api.getProducts(params);
      setProducts(data);
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      setLoading(false);
    }
  }, [search, selectedCategory]);
  
  useEffect(() => {
    const debounce = setTimeout(() => {
      handleSearch();
    }, 300);
    return () => clearTimeout(debounce);
  }, [search, selectedCategory, handleSearch]);
  
  const displayedProducts = sortProducts(products);
  
  return (
    <div className="min-h-screen">
      {/* Newsletter Modal */}
      <NewsletterModal />
      
      {/* WhatsApp Button */}
      <WhatsAppButton />
      {/* Hero Section */}
      <section className="hero-section py-20 px-4">
        <div className="hero-content max-w-6xl mx-auto text-center space-y-8">
          {/* Trust Badge */}
          <div className="flex justify-center animate-fade-in">
            <div className="trust-badge">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>The All-in-One Earning Platform</span>
            </div>
          </div>
          
          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight animate-slide-up">
            <span className="text-white">Buy · Sell · Earn · </span>
            <span className="bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">Repeat</span>
          </h1>
          
          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto animate-fade-in">
            FineZ is the marketplace for affiliate products, physical goods, digital downloads, 
            dropshipping, and money-making ideas — all in one place.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto animate-fade-in" data-testid="search-bar">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="search-products"
                name="search"
                type="text"
                placeholder="Search products, ideas, side hustles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full search-bar pl-12 pr-4"
              />
            </div>
          </div>
          
          {/* Stats */}
          <div className="flex justify-center space-x-8 text-center animate-fade-in" data-testid="stats-section">
            <div className="stats-card">
              <div className="text-3xl font-bold text-white">{stats.total_listings}+</div>
              <div className="text-sm text-gray-400">listings</div>
            </div>
            <div className="stats-card">
              <div className="text-3xl font-bold text-white">{stats.total_vendors}+</div>
              <div className="text-sm text-gray-400">vendors</div>
            </div>
            <div className="stats-card">
              <div className="text-3xl font-bold text-white">{stats.total_clicks}</div>
              <div className="text-sm text-gray-400">clicks tracked</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Quick Access Cards */}
      <section className="max-w-7xl mx-auto px-4 -mt-10 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <a href="/affiliate" className="glass-effect p-6 rounded-2xl hover:scale-105 transition-all duration-300 group border border-white/10 hover:border-blue-500/50">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4 group-hover:bg-blue-500 transition-colors">
              <LinkIcon className="w-6 h-6 text-blue-400 group-hover:text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Affiliate</h3>
            <p className="text-sm text-gray-400 mb-4">Earn commissions by promoting products. Free to join, instant earnings.</p>
            <span className="text-amber-400 font-semibold text-sm">Browse Affiliate Products →</span>
          </a>
          
          <a href="/marketplace" className="glass-effect p-6 rounded-2xl hover:scale-105 transition-all duration-300 group border border-white/10 hover:border-green-500/50">
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center mb-4 group-hover:bg-green-500 transition-colors">
              <ShoppingCart className="w-6 h-6 text-green-400 group-hover:text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Marketplace</h3>
            <p className="text-sm text-gray-400 mb-4">Buy & sell digital and physical products directly with other users.</p>
            <span className="text-amber-400 font-semibold text-sm">Open Marketplace →</span>
          </a>
          
          <a href="/dropship" className="glass-effect p-6 rounded-2xl hover:scale-105 transition-all duration-300 group border border-white/10 hover:border-orange-500/50">
            <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center mb-4 group-hover:bg-orange-500 transition-colors">
              <Package className="w-6 h-6 text-orange-400 group-hover:text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Dropshipping</h3>
            <p className="text-sm text-gray-400 mb-4">Source winning products with high margins. No inventory required.</p>
            <span className="text-amber-400 font-semibold text-sm">Find Drop Products →</span>
          </a>
          
          <a href="/ideas" className="glass-effect p-6 rounded-2xl hover:scale-105 transition-all duration-300 group border border-white/10 hover:border-pink-500/50">
            <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center mb-4 group-hover:bg-pink-500 transition-colors">
              <Lightbulb className="w-6 h-6 text-pink-400 group-hover:text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Ideas & Inspiration</h3>
            <p className="text-sm text-gray-400 mb-4">Discover proven money-making ideas and side hustles that actually work.</p>
            <span className="text-amber-400 font-semibold text-sm">Explore Ideas →</span>
          </a>
        </div>
      </section>
      
      {/* Top Picks Section */}
      {featuredProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <TrendingUp className="w-8 h-8 text-amber-400" />
                <h2 className="text-3xl font-bold text-white">Top Picks of the Week</h2>
              </div>
              <p className="text-gray-400">⚡ Curated by experts - Most popular money-making tools</p>
            </div>
          </div>
          
          <div className="masonry-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Testimonials */}
      <TestimonialSlider />
      
      {/* Category Filters */}
      <section className="max-w-7xl mx-auto px-4 mb-8">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`category-chip ${selectedCategory === category ? 'active' : ''}`}
              data-testid={`category-${category.toLowerCase().replace(' ', '-')}`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>
      
      {/* All Products - Masonry Grid */}
      <section className="max-w-7xl mx-auto px-4 mb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">All Products</h2>
            <p className="text-gray-400">Browse {products.length} curated products to boost your income</p>
          </div>
          
          {/* Sort Dropdown */}
          <div className="flex items-center space-x-2">
            <ArrowUpDown className="w-4 h-4 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="search-bar py-2 px-4 text-sm"
            >
              <option value="newest">Newest First</option>
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price">Lowest Price</option>
            </select>
          </div>
        </div>
        
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-400 mt-4">Loading amazing products...</p>
          </div>
        ) : displayedProducts.length > 0 ? (
          <div className="masonry-grid" data-testid="products-grid">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 glass-effect rounded-2xl">
            <p className="text-xl text-gray-400">No products found. Try a different search or category.</p>
          </div>
        )}
      </section>

      {/* Best Picks of the Week Section */}
      <BestPicks products={featuredProducts} />

      {/* Testimonials */}
      <TestimonialSlider />
      
      {/* Trust Element */}
      <section className="max-w-4xl mx-auto px-4 mb-16">
        <div className="glass-effect rounded-2xl p-8 text-center border border-amber-500/30">
          <Zap className="w-12 h-12 text-amber-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">⚡ Curated tools used by 10,000+ users</h3>
          <p className="text-gray-400">
            Every product is hand-picked and tested by our team. We only recommend tools that deliver real value and results.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
