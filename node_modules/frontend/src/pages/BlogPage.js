import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';

// Sample blog posts - Replace with your actual content
const BLOG_POSTS = [
  {
    id: 1,
    title: "Top 10 AI Tools to Make $5000/Month in 2026",
    excerpt: "Discover the most powerful AI tools that can automate your work and generate serious income. From ChatGPT Plus to Jasper AI, these tools are game-changers.",
    author: "FineZ Team",
    date: "2026-03-15",
    category: "AI Tools",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
    slug: "top-10-ai-tools-make-money-2026"
  },
  {
    id: 2,
    title: "How to Start Affiliate Marketing with Zero Investment",
    excerpt: "Complete beginner's guide to affiliate marketing. Learn how to choose products, build audience, and earn your first commission without spending a rupee.",
    author: "FineZ Team",
    date: "2026-03-12",
    category: "Side Hustles",
    image: "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800",
    slug: "start-affiliate-marketing-zero-investment"
  },
  {
    id: 3,
    title: "Dropshipping in India: Complete Guide for 2026",
    excerpt: "Everything you need to know about starting a dropshipping business in India. Products to sell, suppliers, marketing strategies, and common mistakes to avoid.",
    author: "FineZ Team",
    date: "2026-03-10",
    category: "Dropshipping",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800",
    slug: "dropshipping-india-guide-2026"
  }
];

const BlogPage = () => {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">FineZ Blog</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Money-making strategies, product reviews, and side hustle ideas to help you earn online.
          </p>
        </div>
        
        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <article key={post.id} className="glass-effect rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all group">
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/90 text-white">
                    {post.category}
                  </span>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                {/* Meta */}
                <div className="flex items-center space-x-4 text-xs text-gray-400 mb-3">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User className="w-3 h-3" />
                    <span>{post.author}</span>
                  </div>
                </div>
                
                {/* Title */}
                <h2 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h2>
                
                {/* Excerpt */}
                <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                {/* Read More */}
                <a 
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 font-semibold text-sm transition-colors"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
        
        {/* CTA */}
        <div className="mt-16 text-center glass-effect rounded-2xl p-8 border border-white/10">
          <h3 className="text-2xl font-bold text-white mb-4">Want to Start Earning?</h3>
          <p className="text-gray-400 mb-6">
            Explore our curated products and start making money online today.
          </p>
          <Link to="/" className="inline-block btn-gold">
            Browse Products 🚀
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
