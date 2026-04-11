import { useState, useEffect, useCallback } from 'react';
import { Search, ShoppingCart } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import AdBanner from '@/components/AdBanner';
import { api } from '@/utils/api';

const MarketplacePage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('marketplace');
  const [showNew, setShowNew] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const categories = ['All', 'AI', 'AI Tools', 'Tech', 'Side Hustles', 'Learn', 'Fitness', 'Home'];
  const types = [
    { id: 'all', name: 'Everything', icon: '✨' },
    { id: 'affiliate', name: 'Affiliate', icon: '🔗' },
    { id: 'marketplace', name: 'Marketplace', icon: '🛍️' },
    { id: 'dropshipping', name: 'Dropshipping', icon: '📦' },
    { id: 'idea', name: 'Ideas', icon: '💡' },
    { id: 'blog', name: 'Blogs', icon: '📝' }
  ];
  
  // ✅ FIRST define function
const loadProducts = useCallback(async () => {
  try {
    setLoading(true);

    const params = {
      type: selectedType === 'all' ? undefined : selectedType
    };

    if (search) params.search = search;
    if (selectedCategory !== 'All') params.category = selectedCategory;
    if (showNew) params.new = true;

    const data = await api.getProducts(params);
    setProducts(Array.isArray(data) ? data : data.products || []);
  } catch (error) {
    console.error('Error loading products:', error);
  } finally {
    setLoading(false);
  }
}, [search, selectedCategory, selectedType, showNew]);


// ✅ THEN useEffect
useEffect(() => {
  loadProducts();
}, [loadProducts]);
  
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-green-500/20 mb-4">
            <ShoppingCart className="w-8 h-8 text-green-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">🛍️ Marketplace</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Buy and sell digital products, physical goods, courses, and more — all in one place.
          </p>
          <p className="text-sm text-amber-300 mt-2">
            This page contains affiliate links. <a href="/disclaimer" className="underline">Learn more</a>
          </p>
        </div>
        
        {/* Ad Banner after header */}
        <div className="mb-12">
          <AdBanner slot="MARKETPLACE_TOP_BANNER" />
        </div>
        
        {/* Search */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              id="search-marketplace"
              name="search"
              type="text"
              placeholder="Search marketplace..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full search-bar pl-12 pr-4"
            />
          </div>
          <div className="flex items-center justify-center">
            <label className="flex items-center cursor-pointer">
              <input
                id="show-new-items"
                name="showNew"
                type="checkbox"
                checked={showNew}
                onChange={(e) => setShowNew(e.target.checked)}
                className="mr-2"
              />
              <span className="text-gray-300">Show only new items (last 7 days)</span>
            </label>
          </div>
        </div>
        
        {/* Type Filters */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {types.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`category-chip ${selectedType === type.id ? 'active' : ''}`}
            >
              <span className="mr-2">{type.icon}</span>
              {type.name}
            </button>
          ))}
        </div>
        
        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Mid-page Ad Banner */}
        <div className="mb-12">
          <AdBanner slot="MARKETPLACE_MIDDLE_BANNER" />
        </div>
        
        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : products.length > 0 ? (
          <div className="masonry-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 glass-effect rounded-2xl">
            <p className="text-xl text-gray-400 mb-4">No listings found.</p>
            <button onClick={() => { setSearch(''); setSelectedCategory('All'); setShowNew(false); }} className="text-amber-400 hover:text-amber-300">
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketplacePage;
