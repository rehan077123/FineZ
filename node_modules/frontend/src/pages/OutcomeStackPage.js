import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Target, AlertCircle, Zap, TrendingUp } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { api } from '@/utils/api';

const STACK_DETAILS = {
    'dropshipping-2026': {
      title: '📦 Dropshipping 2026',
      banner: 'linear-gradient(135deg, #EC4899 0%, #F97316 100%)',
      description: 'Complete setup to launch your dropshipping business this year',
      roi: '₹50k-500k+',
      setupTime: '1-3 days',
      difficulty: 'Advanced',
      steps: [
        {
          num: 1,
          title: 'Find Your Niche',
          desc: 'Research trending products with <5% competition'
        },
        {
          num: 2,
          title: 'Build Store',
          desc: 'Set up Shopify store with upsell templates'
        },
        {
          num: 3,
          title: 'Supplier Setup',
          desc: 'Connect with AliExpress/Winning Dropshipper'
        },
        {
          num: 4,
          title: 'Drive Traffic',
          desc: 'TikTok/Instagram ads for scale'
        }
      ],
      coming: 'Started 50k+ users. Average revenue: ₹100k-300k/month'
    },
    'ai-creator-stack': {
      title: '🤖 AI Creator Stack',
      banner: 'linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)',
      description: 'AI tools + personal branding = consistent passive income',
      roi: '₹10k-100k+',
      setupTime: '1-2 hours',
      difficulty: 'Beginner',
      steps: [
        {
          num: 1,
          title: 'Choose Platform',
          desc: 'YouTube Shorts / Reels / TikTok'
        },
        {
          num: 2,
          title: 'AI Content Tools',
          desc: 'Setup Claude/ChatGPT for scripts'
        },
        {
          num: 3,
          title: 'Video Generation',
          desc: 'Use D-ID for avatars or RunwayML'
        },
        {
          num: 4,
          title: 'Monetize',
          desc: 'Ad revenue + sponsorships + links'
        }
      ],
      coming: 'Started 20k+ creators. 1 video = ₹500-5k earnings'
    },
    'affiliate-mastery': {
      title: '💰 Affiliate Mastery',
      banner: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
      description: 'Turn recommendations into 30-50% commissions',
      roi: '₹5k-50k+',
      setupTime: '< 30 mins',
      difficulty: 'Beginner',
      steps: [
        {
          num: 1,
          title: 'Join Networks',
          desc: 'Amazon Associates, SkimLinks, CJ'
        },
        {
          num: 2,
          title: 'Build Audience',
          desc: 'Email list, YouTube, or blog'
        },
        {
          num: 3,
          title: 'Share Reviews',
          desc: 'Honest recommendations with links'
        },
        {
          num: 4,
          title: 'Scale',
          desc: 'Repurpose content across platforms'
        }
      ],
      coming: '200k+ affiliates. Avg commission rate: 8-15%'
    },
    'youtube-automation': {
      title: '🎬 YouTube Automation',
      banner: 'linear-gradient(135deg, #F43F5E 0%, #E11D48 100%)',
      description: 'Faceless channels with system → monthly passive income',
      roi: '₹20k-200k+',
      setupTime: '1-3 days',
      difficulty: 'Intermediate',
      steps: [
        {
          num: 1,
          title: 'Content Niche',
          desc: 'Facts, motivation, or educational'
        },
        {
          num: 2,
          title: 'Automate Scripts',
          desc: 'AI generates scripts daily'
        },
        {
          num: 3,
          title: 'Video Production',
          desc: 'Stock footage + voiceover automation'
        },
        {
          num: 4,
          title: 'Publish & Repeat',
          desc: 'Schedule 5-7 videos/week'
        }
      ],
      coming: '10k+ channels. Monetize at 1k subscribers'
    },
    'budget-office-setup': {
      title: '🏢 Budget Office Setup',
      banner: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
      description: 'Work from home essentials under ₹25k',
      roi: '₹0-100k+',
      setupTime: '< 30 mins',
      difficulty: 'Beginner',
      steps: [
        {
          num: 1,
          title: 'Workspace',
          desc: 'Desk + chair for ergonomic setup'
        },
        {
          num: 2,
          title: 'Tech Basics',
          desc: 'Laptop stand, keyboard, mouse'
        },
        {
          num: 3,
          title: 'Lighting',
          desc: 'Ring light + LED for video calls'
        },
        {
          num: 4,
          title: 'Comfort',
          desc: 'Headphones, cables, organizers'
        }
      ],
      coming: 'Invest ₹15k-25k, boost productivity 50%'
    },
    'gym-transformation': {
      title: '💪 Gym Transformation',
      banner: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
      description: 'Perfect home gym + online coaching = ₹50k/month recurring',
      roi: '₹50k-500k+',
      setupTime: '1-2 hours',
      difficulty: 'Intermediate',
      steps: [
        {
          num: 1,
          title: 'Equipment',
          desc: 'Dumbbells, pulls bar, mat'
        },
        {
          num: 2,
          title: 'Space Setup',
          desc: 'Create 200-300 sqft gym area'
        },
        {
          num: 3,
          title: 'Build Audience',
          desc: 'TikTok/Instagram fitness content'
        },
        {
          num: 4,
          title: 'Monetize',
          desc: 'Online coaching + product sales'
        }
      ],
      coming: '50k+ coaches. Avg revenue: ₹50k-200k/month'
    }
};

const OutcomeStackPage = () => {
  const { stackId } = useParams();
  const [stack, setStack] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStackDetails = useCallback(async () => {
    try {
      setLoading(true);
      
      // Get products for this stack
      const response = await api.get(`/stacks/outcomes/${stackId}`);
      const data = response.data;
      
      setProducts(data.products || []);
      setStack(STACK_DETAILS[stackId] || null);
      
      // Track engagement
      await api.post('/stacks/track-engagement', {
        stack_id: stackId,
        action: 'view'
      }).catch(e => console.log('Engagement tracked'));
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [stackId]);

  useEffect(() => {
    fetchStackDetails();
  }, [fetchStackDetails]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-400"></div>
          <p className="mt-2 text-slate-300">Loading stack details...</p>
        </div>
      </div>
    );
  }

  if (error || !stack) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 mb-6"
          >
            <ArrowLeft size={20} /> Back
          </button>
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 text-red-300">
            {error ? `Error: ${error}` : 'Stack not found'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-gradient-to-b from-slate-950 to-slate-950/50 backdrop-blur border-b border-slate-800/50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition"
          >
            <ArrowLeft size={20} /> Back
          </button>
          <h1 className="text-lg font-semibold text-slate-200">{stack.title}</h1>
          <div className="w-32"></div>
        </div>
      </div>

      {/* Hero Banner */}
      <div 
        className="h-64 relative overflow-hidden"
        style={{ background: stack.banner }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.1),transparent,50%)]"></div>
        </div>
        
        <div className="relative h-full flex items-end p-8">
          <div>
            <h2 className="text-4xl font-bold text-white mb-2">{stack.title}</h2>
            <p className="text-white/80 text-lg max-w-2xl">{stack.description}</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-slate-900/50 border-b border-slate-800/50 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-3 gap-6 md:grid-cols-3">
          <div className="text-center">
            <div className="text-emerald-400 text-2xl font-bold">{stack.roi}</div>
            <div className="text-xs text-slate-400 mt-1">Earning Potential</div>
          </div>
          <div className="text-center">
            <div className="text-blue-400 text-2xl font-bold">{stack.setupTime}</div>
            <div className="text-xs text-slate-400 mt-1">Setup Time</div>
          </div>
          <div className="text-center">
            <div className="text-orange-400 text-2xl font-bold">{stack.difficulty}</div>
            <div className="text-xs text-slate-400 mt-1">Difficulty Level</div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Action Steps */}
        <section className="mb-16">
          <div className="flex items-center gap-2 mb-8">
            <Zap size={24} className="text-emerald-400" />
            <h3 className="text-2xl font-bold text-white">Getting Started</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {stack.steps.map((step, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-lg p-6 hover:border-emerald-500/30 transition"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">{step.num}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white mb-1">{step.title}</h4>
                    <p className="text-sm text-slate-400">{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Social Proof */}
          <div className="mt-8 p-6 bg-slate-800/30 border border-slate-700/50 rounded-lg flex items-start gap-4">
            <TrendingUp size={24} className="text-emerald-400 flex-shrink-0 mt-1" />
            <p className="text-slate-300 text-sm">{stack.coming}</p>
          </div>
        </section>

        {/* Curated Products */}
        <section>
          <div className="flex items-center gap-2 mb-8">
            <CheckCircle size={24} className="text-emerald-400" />
            <h3 className="text-2xl font-bold text-white">Everything You Need</h3>
            <span className="ml-auto text-sm text-slate-400">{products.length} products</span>
          </div>

          {products.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id || product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-400">No products found for this stack yet.</p>
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className="mt-16 p-8 bg-gradient-to-r from-emerald-600/10 to-teal-600/10 border border-emerald-500/20 rounded-lg text-center">
          <h3 className="text-2xl font-bold text-white mb-3">Ready to Start?</h3>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Join thousands of people who've already started their journey with {stack.title.replace(/[^a-zA-Z\s]/g, '')} stack.
          </p>
          <button
            onClick={() => {
              api.post('/stacks/track-engagement', {
                stack_id: stackId,
                action: 'explore'
              }).catch(e => console.log('Engagement tracked'));
            }}
            className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-semibold rounded-lg transition transform hover:scale-105"
          >
            Start Your Journey →
          </button>
        </section>
      </div>
    </div>
  );
};

export default OutcomeStackPage;
