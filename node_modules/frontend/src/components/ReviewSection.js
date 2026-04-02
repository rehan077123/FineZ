import React, { useState } from 'react';
import { Star, ThumbsUp, MessageSquare, ShieldCheck } from 'lucide-react';

const ReviewSection = ({ reviews: initialReviews }) => {
  const [reviews] = useState(initialReviews || [
    {
      id: 1,
      user: "Sarah Jenkins",
      rating: 5,
      date: "2026-03-28",
      comment: "This tool saved me 20+ hours of work last month. The UI is incredibly intuitive and the results are top-notch. Highly recommended for any serious digital marketer.",
      verified: true,
      helpful: 124
    },
    {
      id: 2,
      user: "David Chen",
      rating: 4,
      date: "2026-03-25",
      comment: "Excellent value for the price. Minor learning curve but once you get it, it's a powerhouse. Looking forward to more updates.",
      verified: true,
      helpful: 85
    },
    {
      id: 3,
      user: "Elena Rodriguez",
      rating: 5,
      date: "2026-03-22",
      comment: "Absolutely game-changing! The AI capabilities are far ahead of other tools I've tried. Plus, the support team is super responsive.",
      verified: true,
      helpful: 210
    }
  ]);

  return (
    <div className="my-16">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Customer Reviews</h2>
          <div className="flex items-center space-x-4">
            <div className="flex text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} fill={i < 4.8 ? "currentColor" : "none"} />
              ))}
            </div>
            <span className="text-xl font-bold text-white">4.8 / 5.0</span>
            <span className="text-gray-400">Based on {reviews.length} verified reviews</span>
          </div>
        </div>
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-600/30">
          Write a Review
        </button>
      </div>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="glass-effect p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                  {review.user.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-white flex items-center">
                    {review.user}
                    {review.verified && (
                      <span className="ml-2 inline-flex items-center text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">
                        <ShieldCheck size={10} className="mr-1" /> Verified Purchase
                      </span>
                    )}
                  </h4>
                  <div className="flex text-yellow-500 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} />
                    ))}
                  </div>
                </div>
              </div>
              <span className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</span>
            </div>
            
            <p className="text-gray-300 leading-relaxed mb-6">
              {review.comment}
            </p>

            <div className="flex items-center space-x-6 text-sm">
              <button className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors">
                <ThumbsUp size={16} />
                <span>Helpful ({review.helpful})</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors">
                <MessageSquare size={16} />
                <span>Reply</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;
