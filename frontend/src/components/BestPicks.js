import React from 'react';
import { Star, Flame, Trophy, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const BestPicks = ({ products }) => {
  // Use first 3 featured products as best picks
  const bestPicks = products?.slice(0, 3) || [];

  if (bestPicks.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      <div className="flex flex-col md:flex-row items-center justify-between mb-12">
        <div>
          <h2 className="text-4xl font-bold text-white mb-4 flex items-center">
            <Trophy className="text-yellow-400 mr-3 w-8 h-8" />
            Best Picks of the Week
          </h2>
          <p className="text-gray-400 max-w-xl">
            Our expert team analyzed 100+ tools this week. These 3 stood out for their massive potential and value.
          </p>
        </div>
        <div className="mt-6 md:mt-0 flex space-x-4">
          <div className="flex items-center space-x-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
            <Flame className="text-orange-500 w-4 h-4" />
            <span className="text-xs font-bold text-white uppercase">Trending Now</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {bestPicks.map((product, index) => (
          <div 
            key={product.id} 
            className="relative group glass-effect rounded-3xl overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all duration-500 hover:-translate-y-2"
          >
            {/* Rank Badge */}
            <div className="absolute top-6 left-6 z-10 w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-600/40">
              #{index + 1}
            </div>

            {/* Image Container */}
            <div className="h-64 overflow-hidden">
              <img 
                src={product.image_url || 'https://via.placeholder.com/600x400'} 
                alt={product.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent opacity-60"></div>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill={i < 5 ? "currentColor" : "none"} />
                  ))}
                </div>
                <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Master Pick</span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                {product.title}
              </h3>
              
              <p className="text-gray-400 text-sm mb-6 line-clamp-2">
                {product.why_this_product || product.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-white">${product.price}</span>
                <Link 
                  to={`/product/${product.id}`}
                  className="flex items-center space-x-2 text-blue-400 font-bold group/btn"
                >
                  <span>Analyze Case</span>
                  <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BestPicks;
