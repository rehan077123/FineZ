import { useState, useEffect, useCallback } from 'react';
import { Search, Package } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { api } from '@/utils/api';

const DropshipPage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  
  const categories = ['All', 'Tech', 'Fashion', 'Fitness', 'Home'];
  
// ✅ FIRST define function
const loadProducts = useCallback(async () => {
  try {
    setLoading(true);

    const data = await api.getProducts({ type: "affiliate" });

    setProducts(Array.isArray(data) ? data : data.products || []);
  } catch (error) {
    console.error("Error loading affiliate products:", error);
  } finally {
    setLoading(false);
  }
}, []);


// ✅ THEN useEffect
useEffect(() => {
  loadProducts();
}, [loadProducts]);
  
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-orange-500/20 mb-4">
            <Package className="w-8 h-8 text-orange-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">📦 Dropshipping Products</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Source winning products with high margins. No inventory, no upfront cost.
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              id="search-dropship"
              name="search"
              type="text"
              placeholder="Search dropship products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full search-bar pl-12 pr-4"
            />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-orange-500 text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : products.length > 0 ? (
          <div className="masonry-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 glass-effect rounded-2xl">
            <p className="text-xl text-gray-400 mb-4">No dropship products found.</p>
            <button onClick={() => { setSearch(''); setSelectedCategory('All'); }} className="text-amber-400 hover:text-amber-300">
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DropshipPage;
