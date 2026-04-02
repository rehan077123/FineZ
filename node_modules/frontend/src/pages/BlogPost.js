import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';

// Reusing the same mock data for simplicity, in a real app this would come from an API
const BLOG_POSTS = [
  {
    id: 1,
    title: "Top 10 AI Tools to Make $5000/Month in 2026",
    content: `
      <p>The AI revolution is no longer just a trend—it's a massive wealth creation opportunity. In 2026, the tools available to entrepreneurs have become more sophisticated, accessible, and powerful than ever before.</p>
      
      <h2>1. ChatGPT-5 Pro</h2>
      <p>With its advanced reasoning and multimodal capabilities, ChatGPT-5 is now the ultimate co-pilot for any business owner. From coding entire apps to managing customer support, it's a must-have.</p>
      
      <h2>2. Midjourney V7</h2>
      <p>Visual content is king, and Midjourney continues to dominate. For print-on-demand or digital art businesses, the level of detail now is indistinguishable from professional photography.</p>
      
      <h2>3. ElevenLabs Multi-Voice</h2>
      <p>Creating faceless YouTube channels or podcasts has never been easier. The new multi-voice feature allows for realistic conversations and storytelling in over 50 languages.</p>
      
      <p>By leveraging these tools, individuals are building lean, highly profitable businesses with minimal overhead. The key is to stay consistent and always look for ways to automate the mundane.</p>
    `,
    author: "FineZ Team",
    date: "2026-03-15",
    category: "AI Tools",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200",
    slug: "top-10-ai-tools-make-money-2026"
  },
  // Add other posts as needed
];

const BlogPost = () => {
  const { slug } = useParams();
  const post = BLOG_POSTS.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Post Not Found</h2>
          <Link to="/blog" className="text-blue-400 hover:underline">Back to Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-12 px-4">
      <article className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link to="/blog" className="inline-flex items-center space-x-2 text-gray-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft size={20} />
          <span>Back to all articles</span>
        </Link>

        {/* Hero Image */}
        <div className="rounded-3xl overflow-hidden mb-12 h-[400px]">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Main Article */}
          <div className="lg:col-span-3">
            <div className="flex items-center space-x-4 text-sm text-gray-400 mb-6">
              <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 font-semibold uppercase tracking-wider text-xs">
                {post.category}
              </span>
              <div className="flex items-center space-x-1">
                <Calendar size={14} />
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <User size={14} />
                <span>{post.author}</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
              {post.title}
            </h1>

            <div 
              className="prose prose-invert prose-blue max-w-none text-gray-300 leading-relaxed text-lg"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="glass-effect p-6 rounded-2xl border border-white/10">
              <h3 className="font-bold mb-4">Share Article</h3>
              <div className="flex space-x-4">
                <SocialIcon icon={<Twitter size={20} />} color="hover:text-blue-400" />
                <SocialIcon icon={<Facebook size={20} />} color="hover:text-blue-600" />
                <SocialIcon icon={<Linkedin size={20} />} color="hover:text-blue-500" />
                <SocialIcon icon={<Share2 size={20} />} color="hover:text-green-400" />
              </div>
            </div>

            <div className="glass-effect p-6 rounded-2xl border border-white/10">
              <h3 className="font-bold mb-4">About FineZ</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                FineZ is the world's first billionaire-ready marketplace for digital assets, dropshipping ideas, and AI tools.
              </p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

const SocialIcon = ({ icon, color }) => (
  <button className={`text-gray-400 transition-colors ${color}`}>
    {icon}
  </button>
);

export default BlogPost;
