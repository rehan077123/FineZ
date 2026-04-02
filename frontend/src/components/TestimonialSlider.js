import React from 'react';
import { Star, CheckCircle, ShieldCheck, Award } from 'lucide-react';

const TestimonialSlider = () => {
  const testimonials = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "E-commerce Seller",
      content: "FineZ helped me find my first winning dropshipping product. The insights are actual game-changers.",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?u=alex"
    },
    {
      id: 2,
      name: "Sarah Chen",
      role: "Affiliate Marketer",
      content: "The best affiliate selection I've seen. High margins and real products that people actually want to buy.",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?u=sarah"
    },
    {
      id: 3,
      name: "Michael Ross",
      role: "Digital Nomad",
      content: "I've tried many platforms, but FineZ's UI and product curation are top-notch. Highly recommended!",
      rating: 4,
      avatar: "https://i.pravatar.cc/150?u=michael"
    }
  ];

  return (
    <section className="py-16 bg-slate-900/50 border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Trusted by 10,000+ Entrepreneurs</h2>
          <div className="flex justify-center items-center space-x-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center space-x-2 text-white font-bold"><ShieldCheck className="text-blue-400" /> <span>Verified Sellers</span></div>
            <div className="flex items-center space-x-2 text-white font-bold"><Award className="text-amber-400" /> <span>Premium Choice</span></div>
            <div className="flex items-center space-x-2 text-white font-bold"><CheckCircle className="text-green-400" /> <span>Secure Deals</span></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.id} className="glass-effect p-8 rounded-2xl border border-white/5 hover:border-amber-500/30 transition-all duration-300">
              <div className="flex items-center space-x-1 mb-4 text-amber-400">
                {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-gray-300 italic mb-6">"{t.content}"</p>
              <div className="flex items-center space-x-4">
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border-2 border-amber-500/20" />
                <div>
                  <h4 className="text-white font-bold">{t.name}</h4>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
