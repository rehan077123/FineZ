import { useState, useEffect, useCallback } from 'react';
import { Search, TrendingUp, Zap, ShieldCheck, Sparkles, ShoppingCart, Lightbulb, Package, ArrowRight, CheckCircle, AlertCircle, Target, Flashlight } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import NewsletterModal from '@/components/NewsletterModal';
import WhatsAppButton from '@/components/WhatsAppButton';
import TestimonialSlider from '@/components/TestimonialSlider';
import { api } from '@/utils/api';

const HomePage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [discoverFeed, setDiscoverFeed] = useState(null);
  const [stats, setStats] = useState({ total_listings: 0, total_vendors: 0, total_clicks: 0 });
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // Outcome stacks - the decision engine options
  const OUTCOME_STACKS = [
    {
      id: 'dropshipping-2026',
      title: 'Start Dropshipping in 2026',
      icon: '📦',
      description: 'Complete stack to launch your first store',
      roi: 'High',
      setupTime: '1-2 weeks',
      difficulty: 'Beginner',
      earning: '₹10k–₹50k/month',
      color: 'from-blue-600 to-blue-400'
    },
    {
      id: 'ai-creator-stack',
      title: 'AI Creator Monetization Stack',
      icon: '🤖',
      description: 'Tools to make money with AI-generated content',
      roi: 'Very High',
      setupTime: '3-5 days',
      difficulty: 'Beginner-friendly',
      earning: '₹5k–₹25k/month',
      color: 'from-purple-600 to-purple-400'
    },
    {
      id: 'affiliate-mastery',
      title: 'Affiliate Marketing Mastery',
      icon: '💰',
      description: 'Launch high-converting affiliate revenue',
      roi: 'Medium',
      setupTime: '2-3 weeks',
      difficulty: 'Intermediate',
      earning: '₹3k–₹15k/month',
      color: 'from-amber-600 to-amber-400'
    },
    {
      id: 'youtube-automation',
      title: 'YouTube Automation Setup',
      icon: '📹',
      description: 'Build passive income YouTube channel',
      roi: 'High',
      setupTime: '1 week',
      difficulty: 'Beginner',
      earning: '₹8k–₹40k/month',
      color: 'from-red-600 to-red-400'
    },
    {
      id: 'budget-office-setup',
      title: '₹10k Home Office Setup',
      icon: '🏠',
      description: 'Essential gear for remote work + earning',
      roi: 'Medium',
      setupTime: 'Same day',
      difficulty: 'Beginner',
      earning: 'Productivity focused',
      color: 'from-green-600 to-green-400'
    },
    {
      id: 'gym-transformation',
      title: 'Gym Transformation Starter Kit',
      icon: '💪',
      description: 'Build fitness + monetize through fitness',
      roi: 'Medium',
      setupTime: '1 week',
      difficulty: 'Beginner',
      earning: '₹2k–₹8k/month',
      color: 'from-orange-600 to-orange-400'
    }
  ];

  // Popular decision prompts
  const DECISION_PROMPTS = [
    'best laptop for video editing under ₹50k',
    'fastest way to earn ₹20k this month',
    'AI tools to make reels + monetize',
    'dropshipping products with 60% margin',
    'side hustle for complete beginners',
    'best affiliate products in 2026'
  ];

  useEffect(() => {
    loadData();
    api.trackPageView('homepage').catch(console.error);
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [discoverData, statsData] = await Promise.all([
        api.getDiscoverFeed(12),
        api.getStats()
      ]);
      setDiscoverFeed(discoverData);
      setStats(statsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = useCallback(async () => {
    try {
      setLoading(true);
      const q = (search || '').trim();
      if (!q) {
        setSearchResults([]);
        return;
      }
      const data = await api.getProducts({ search: q, limit: 50 });
      setSearchResults(Array.isArray(data) ? data : data?.products || []);
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      handleSearch();
    }, 300);
    return () => clearTimeout(debounce);
  }, [search, handleSearch]);

  const renderResults = (title, items, subtitle) => {
    if (!items || items.length === 0) return null;
    return (
      <section className="max-w-7xl mx-auto px-4 mb-16">
        <div className="mb-8">
          <h2 className="text-4xl font-semibold text-white mb-2">{title}</h2>
          {subtitle && <p className="text-slate-400">{subtitle}</p>}
        </div>
        <div className="masonry-grid">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen overflow-hidden">
      <NewsletterModal />
      <WhatsAppButton />

      {/* HERO: Decision Engine Focus */}
      <section className="hero-section relative overflow-hidden pb-20 pt-16 lg:pt-24">
        <div className="hero-glow" />
        <div className="relative mx-auto max-w-6xl px-4 text-center">
          {/* Trust badge */}
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-slate-200 backdrop-blur-md shadow-lg">
            <Sparkles className="w-4 h-4 text-[#F59E0B]" />
            The Operating System for Buying & Earning Decisions
          </div>

          {/* Main headline - Decision focus */}
          <h1 className="mx-auto mt-8 max-w-4xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Make the Right Decision
            <span className="block text-[#F59E0B]">Not Just Find Products</span>
          </h1>

          {/* Subheading - Problem focus */}
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
            Too much information. Too little confidence. FineZ solves the decision gap with curated stacks, trust signals, and execution plans.
          </p>

          {/* Natural Language Search - PRIMARY CTA */}
          <div className="mx-auto mt-12 max-w-4xl rounded-[28px] border border-white/10 bg-[#111827]/80 p-1.5 shadow-[0_40px_120px_rgba(15,23,42,0.25)] backdrop-blur-3xl">
            <div className="relative rounded-[24px] bg-[#0F172A]/95 px-6 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
              <Flashlight className="absolute left-6 top-1/2 h-5 w-5 -translate-y-1/2 text-[#F59E0B]" />
              <input
                id="search-decision"
                type="text"
                placeholder="Ask anything: 'best laptop for freelancing' or 'side hustle under ₹5k'"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent pl-14 pr-6 text-lg text-white placeholder:text-slate-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Decision Prompt Suggestions */}
          <div className="mx-auto mt-6 max-w-4xl">
            <p className="text-xs uppercase tracking-widest text-slate-500 mb-4">Try asking:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {DECISION_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => setSearch(prompt)}
                  className="glass-effect rounded-[16px] border border-white/10 px-4 py-3 text-left text-sm text-slate-300 hover:border-white/30 hover:bg-white/8 transition-all"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Trust layer */}
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            <div className="glass-effect rounded-[16px] border border-white/10 px-6 py-6 text-center">
              <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-3" />
              <p className="text-sm text-slate-400 mb-2">Trusted by</p>
              <p className="text-2xl font-semibold text-white">100K+ earners</p>
            </div>
            <div className="glass-effect rounded-[16px] border border-white/10 px-6 py-6 text-center">
              <ShieldCheck className="h-8 w-8 text-blue-400 mx-auto mb-3" />
              <p className="text-sm text-slate-400 mb-2">Verified by</p>
              <p className="text-2xl font-semibold text-white">Real results</p>
            </div>
            <div className="glass-effect rounded-[16px] border border-white/10 px-6 py-6 text-center">
              <Target className="h-8 w-8 text-amber-400 mx-auto mb-3" />
              <p className="text-sm text-slate-400 mb-2">Outcome-focused</p>
              <p className="text-2xl font-semibold text-white">Action ready</p>
            </div>
          </div>
        </div>
      </section>

      {/* OUTCOME STACKS - The Decision Engine */}
      {!search && (
        <section className="max-w-7xl mx-auto px-4 mb-20">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-white mb-2">Popular Decision Paths</h2>
            <p className="text-slate-400">Choose your goal. We'll give you the complete stack + execution plan.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {OUTCOME_STACKS.map((stack) => (
              <div
                key={stack.id}
                className="group cursor-pointer"
              >
                <div className={`glass-effect rounded-[24px] border border-white/10 overflow-hidden hover:border-white/30 transition-all hover:shadow-[0_25px_80px_rgba(245,158,11,0.15)] h-full flex flex-col`}>
                  {/* Header with gradient */}
                  <div className={`h-24 bg-gradient-to-r ${stack.color} relative overflow-hidden flex items-end justify-start p-6`}>
                    <div className="text-5xl">{stack.icon}</div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6 flex flex-col">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#F59E0B] transition-colors">
                      {stack.title}
                    </h3>
                    <p className="text-slate-400 text-sm mb-6 flex-1">{stack.description}</p>

                    {/* Confidence signals */}
                    <div className="space-y-3 mb-6 border-t border-white/10 pt-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Setup time:</span>
                        <span className="text-white font-medium">{stack.setupTime}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Difficulty:</span>
                        <span className="text-emerald-400 font-medium">{stack.difficulty}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Earning potential:</span>
                        <span className="text-amber-400 font-medium">{stack.earning}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Expected ROI:</span>
                        <span className={`font-medium ${stack.roi === 'Very High' ? 'text-green-400' : stack.roi === 'High' ? 'text-emerald-400' : 'text-blue-400'}`}>
                          {stack.roi}
                        </span>
                      </div>
                    </div>

                    {/* CTA */}
                    <button className="btn-opportunity w-full flex items-center justify-center gap-2 group-hover:gap-3 transition-all">
                      Explore Stack
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SEARCH RESULTS - Show products when user searches */}
      {loading ? (
        <section className="max-w-7xl mx-auto px-4 mb-16">
          <div className="text-center py-20">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-[#2563EB] border-t-transparent" />
          </div>
        </section>
      ) : searchResults.length > 0 ? (
        renderResults(
          `Results for "${search}"`,
          searchResults,
          `Found ${searchResults.length} products matching your decision. Ranked by confidence + ROI.`
        )
      ) : search && search.trim() ? (
        <section className="max-w-7xl mx-auto px-4 mb-16">
          <div className="glass-effect rounded-[32px] p-14 text-center border border-white/10">
            <AlertCircle className="h-12 w-12 text-amber-400 mx-auto mb-4" />
            <p className="text-xl text-slate-400">No products match your search, but try our decision stacks above.</p>
          </div>
        </section>
      ) : (
        <>
          {/* Fallback: Show top picks */}
          {renderResults(
            'Trending Wins',
            discoverFeed?.trendingNow?.slice(0, 6),
            'Products with highest conversion + real earnings'
          )}
          {renderResults(
            'Creator-Verified Stack',
            discoverFeed?.topPicksOfWeek?.slice(0, 6),
            'Trusted by creators who actually make money'
          )}
        </>
      )}

      {/* Testimonials */}
      <TestimonialSlider />
    </div>
  );
};

export default HomePage;
