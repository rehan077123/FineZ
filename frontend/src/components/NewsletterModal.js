import { useState, useEffect } from 'react';
import { X, Mail, Gift, TrendingUp } from 'lucide-react';
import { api } from '@/utils/api';

const NewsletterModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  useEffect(() => {
    // Check if user already saw the modal
    const hasSeenModal = localStorage.getItem('newsletter_modal_seen');
    const hasSubscribed = localStorage.getItem('newsletter_subscribed');
    
    if (!hasSeenModal && !hasSubscribed) {
      // Show modal after 5 seconds
      const timer = setTimeout(() => {
        setIsOpen(true);
        localStorage.setItem('newsletter_modal_seen', 'true');
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await api.subscribeNewsletter(email);
      setSubmitted(true);
      localStorage.setItem('newsletter_subscribed', 'true');
      
      setTimeout(() => {
        setIsOpen(false);
      }, 3000);
    } catch (error) {
      console.error('Error subscribing:', error);
      alert('Error subscribing. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative max-w-md w-full glass-effect rounded-2xl p-8 border border-white/20 shadow-2xl animate-slide-up">
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        
        {!submitted ? (
          <>
            {/* Icon */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/50">
              <Gift className="w-8 h-8 text-white" />
            </div>
            
            {/* Headline */}
            <h2 className="text-2xl font-bold text-white text-center mb-2">
              🎁 Get Exclusive Deals!
            </h2>
            <p className="text-gray-400 text-center mb-6">
              Join 10,000+ smart earners. Get weekly money-making tips, exclusive discounts, and early access to new products.
            </p>
            
            {/* Benefits */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                </div>
                <span className="text-sm text-gray-300">Weekly curated product picks</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                  <Gift className="w-4 h-4 text-amber-400" />
                </div>
                <span className="text-sm text-gray-300">Exclusive deals & early access</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-blue-400" />
                </div>
                <span className="text-sm text-gray-300">Money-making tips & strategies</span>
              </div>
            </div>
            
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full search-bar"
              />
              
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-gold"
              >
                {loading ? 'Subscribing...' : '🎁 Get Free Access'}
              </button>
              
              <p className="text-xs text-gray-500 text-center">
                No spam, unsubscribe anytime. We respect your privacy.
              </p>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">🎉 You're In!</h3>
            <p className="text-gray-400">
              Check your inbox for exclusive deals and money-making tips!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsletterModal;
