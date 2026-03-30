import { Zap, Target, Users, TrendingUp, Award, Shield } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl trust-blue-gradient mb-6 shadow-lg shadow-blue-500/50">
            <Zap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">About FineZ</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Your trusted platform for discovering the best tools, products, and ideas to earn money online.
          </p>
        </div>
        
        {/* Mission */}
        <div className="glass-effect p-8 rounded-2xl border border-white/10 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
            <Target className="w-6 h-6 mr-3 text-blue-400" />
            Our Mission
          </h2>
          <p className="text-gray-400 leading-relaxed">
            FineZ was created to help people discover genuine opportunities to earn money online. 
            We curate the best affiliate products, dropshipping opportunities, digital tools, and proven 
            money-making ideas — all in one place. Our goal is to make it easy for anyone to start 
            earning online, whether you're a creator, entrepreneur, or side hustler.
          </p>
        </div>
        
        {/* What We Offer */}
        <div className="glass-effect p-8 rounded-2xl border border-white/10 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">What We Offer</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-start space-x-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Curated Products</h3>
                  <p className="text-sm text-gray-400">Every product is hand-picked and tested by our team for quality and value.</p>
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex items-start space-x-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Community First</h3>
                  <p className="text-sm text-gray-400">Join thousands of users earning money through our platform.</p>
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex items-start space-x-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Real Opportunities</h3>
                  <p className="text-sm text-gray-400">We only promote legitimate ways to earn — no scams, no get-rich-quick schemes.</p>
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex items-start space-x-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-pink-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Transparent</h3>
                  <p className="text-sm text-gray-400">Full disclosure on all affiliate relationships. You always know what you're clicking.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Affiliate Disclosure */}
        <div className="glass-effect p-8 rounded-2xl border border-amber-500/30 bg-amber-500/5 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">⚡ Affiliate Disclosure</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            FineZ is a free platform that helps you discover quality products and earning opportunities. 
            To keep this service free, we earn commissions when you click on certain links and make purchases. 
            This comes at no additional cost to you.
          </p>
          <p className="text-gray-300 leading-relaxed">
            <strong>Our Promise:</strong> We only recommend products and services we genuinely believe in. 
            Our recommendations are based on quality, value, and user reviews — not just commission rates. 
            Your trust is more valuable to us than any commission.
          </p>
        </div>
        
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="glass-effect p-6 rounded-xl text-center border border-white/10">
            <div className="text-4xl font-bold text-white mb-2">10,000+</div>
            <div className="text-gray-400">Happy Users</div>
          </div>
          <div className="glass-effect p-6 rounded-xl text-center border border-white/10">
            <div className="text-4xl font-bold text-white mb-2">500+</div>
            <div className="text-gray-400">Curated Products</div>
          </div>
          <div className="glass-effect p-6 rounded-xl text-center border border-white/10">
            <div className="text-4xl font-bold text-white mb-2">100%</div>
            <div className="text-gray-400">Free to Use</div>
          </div>
        </div>
        
        {/* CTA */}
        <div className="text-center glass-effect p-8 rounded-2xl border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Start Earning?</h2>
          <p className="text-gray-400 mb-6">Join thousands of people using FineZ to discover new income streams.</p>
          <a href="/" className="inline-block btn-gold">
            Explore Products 🚀
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
