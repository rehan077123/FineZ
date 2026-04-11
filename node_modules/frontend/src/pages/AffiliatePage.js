import { useState, useEffect, useCallback } from 'react';
import { Search, Link as LinkIcon, DollarSign, Globe, ShieldCheck, TrendingUp } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { api } from '@/utils/api';

const AffiliatePage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  
  const categories = ['All', 'AI', 'AI Tools', 'Tech', 'Side Hustles', 'Learn', 'Fitness', 'Home'];
  
  // Categorize products for "All" view
  const categorizedProducts = categories.slice(1).reduce((acc, cat) => {
    const catProducts = (products || [])
      .filter(p => {
        const pCat = (p.category || "").toLowerCase().trim();
        const targetCat = cat.toLowerCase().trim();
        return pCat === targetCat;
      })
      .filter(p => {
        const s = (search || "").toLowerCase().trim();
        return !s || (p.title && p.title.toLowerCase().includes(s)) || (p.description && p.description.toLowerCase().includes(s));
      })
      .sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return new Date(b.created_at) - new Date(a.created_at);
      });
    
    if (catProducts.length > 0) {
      acc[cat] = catProducts;
    }
    return acc;
  }, {});

  // Add "Other" category for anything not in the main 7 list
  const otherProducts = (products || []).filter(p => {
    const categoryNames = categories.slice(1).map(c => c.toLowerCase().trim());
    return !p.category || !categoryNames.includes(p.category.toLowerCase().trim());
  }).filter(p => {
    const s = (search || "").toLowerCase().trim();
    return !s || (p.title && p.title.toLowerCase().includes(s)) || (p.description && p.description.toLowerCase().includes(s));
  });

  if (otherProducts.length > 0) {
    categorizedProducts['Other'] = otherProducts;
  }

  // Sorting logic for non-categorized view
  const getSortedFilteredProducts = () => {
    const filtered = (products || []).filter(p => {
      const matchesCategory = selectedCategory === 'All' || (p.category && p.category.toLowerCase().trim() === selectedCategory.toLowerCase().trim());
      const s = (search || "").toLowerCase().trim();
      const matchesSearch = !s || (p.title && p.title.toLowerCase().includes(s)) || (p.description && p.description.toLowerCase().includes(s));
      return matchesCategory && matchesSearch;
    });
    
    return filtered.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.created_at) - new Date(a.created_at);
    });
  };

  const displayedProductsList = getSortedFilteredProducts();

  // ✅ FIRST define function
  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      console.log("Fetching affiliate products...");
      // Try fetching both with lowercase and capitalized section just in case
      const data = await api.getProducts({ type: "affiliate" });
      console.log("Received products:", data?.length || 0);
      setProducts(Array.isArray(data) ? data : (data.products || []));
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
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-500/20 mb-4">
            <LinkIcon className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">🔗 Affiliate Products</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Promote these products and earn commissions. You keep 100% of what you earn.
          </p>
          <p className="text-sm text-amber-300 mt-2">
            This page contains affiliate links. <a href="/disclaimer" className="underline">Learn more</a>
          </p>
        </div>

        {/* Affiliate Networks Support */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="glass-effect p-4 rounded-xl border border-white/5 text-center">
            <DollarSign className="w-6 h-6 text-green-400 mx-auto mb-2" />
            <span className="text-xs text-gray-400 block uppercase tracking-wider">High Commission</span>
            <span className="text-white font-bold">Amazon & Shopify</span>
          </div>
          <div className="glass-effect p-4 rounded-xl border border-white/5 text-center">
            <Globe className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <span className="text-xs text-gray-400 block uppercase tracking-wider">Global Reach</span>
            <span className="text-white font-bold">CJ & Impact</span>
          </div>
          <div className="glass-effect p-4 rounded-xl border border-white/5 text-center">
            <ShieldCheck className="w-6 h-6 text-amber-400 mx-auto mb-2" />
            <span className="text-xs text-gray-400 block uppercase tracking-wider">Verified</span>
            <span className="text-white font-bold">ShareASale</span>
          </div>
          <div className="glass-effect p-4 rounded-xl border border-white/5 text-center">
            <TrendingUp className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <span className="text-xs text-gray-400 block uppercase tracking-wider">Top Tiers</span>
            <span className="text-white font-bold">ClickBank</span>
          </div>
        </div>
        
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              id="search-affiliate"
              name="search"
              type="text"
              placeholder="Search affiliate products..."
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
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-400 mt-4">Loading affiliate tools...</p>
          </div>
        ) : (products || []).length === 0 ? (
          <div className="text-center py-20 glass-effect rounded-2xl">
            <p className="text-xl text-gray-400 mb-4">No affiliate products found in the system.</p>
            <button onClick={() => loadProducts()} className="btn-primary">
              Retry Loading
            </button>
          </div>
        ) : (
          <div className="space-y-16">
            {/* Show Categorized View when All is selected and not searching */}
            {selectedCategory === 'All' && !search ? (
              <div className="space-y-16">
                {Object.keys(categorizedProducts).length > 0 ? (
                  Object.keys(categorizedProducts).map(category => (
                    <div key={category} className="animate-fade-in">
                      <div className="flex items-center space-x-3 mb-8">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                          <TrendingUp className="w-6 h-6 text-blue-400" />
                        </div>
                        <h2 className="text-3xl font-bold text-white">{category} Platforms</h2>
                      </div>
                      <div className="masonry-grid">
                        {categorizedProducts[category].map(product => (
                          <ProductCard key={product.id} product={product} />
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="animate-fade-in">
                    <div className="flex items-center space-x-3 mb-8">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-blue-400" />
                      </div>
                      <h2 className="text-3xl font-bold text-white">All Affiliate Platforms</h2>
                    </div>
                    <div className="masonry-grid">
                      {(products || []).map(product => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Show Filtered View when category is selected or searching */
              <div className="animate-fade-in">
                <div className="flex items-center space-x-3 mb-8">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-blue-400" />
                  </div>
                  <h2 className="text-3xl font-bold text-white">
                    {search ? `Search Results for "${search}"` : `${selectedCategory} Platforms`}
                  </h2>
                </div>
                
                {displayedProductsList.length > 0 ? (
                  <div className="masonry-grid">
                    {displayedProductsList.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 glass-effect rounded-2xl">
                    <p className="text-xl text-gray-400 mb-4">No listings found for this filter.</p>
                    <button onClick={() => { setSearch(''); setSelectedCategory('All'); }} className="text-amber-400 hover:text-amber-300">
                      Clear filters
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AffiliatePage;
