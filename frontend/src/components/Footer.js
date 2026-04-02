import { Link } from 'react-router-dom';
import { Zap, Mail, Twitter, Instagram, Linkedin, ShieldCheck, Award, Star, CheckCircle2 } from 'lucide-react';

const Footer = () => {
  const categories = [
    'AI Tools',
    'Side Hustles',
    'Study & Learn',
    'Fitness',
    'Home Design',
    'Tech',
    'Fashion'
  ];
  
  const company = [
    { name: 'About Us', path: '/about' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Affiliate Disclaimer', path: '/disclaimer' },
    { name: 'Contact', path: '/contact' },
    { name: 'Sitemap', path: '/sitemap.xml' }
  ];
  
  return (
    <footer className="bg-[#0F172A] border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Trust Badges Section - CRITICAL FOR AUTHORITY */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 py-8 border-b border-white/5">
          <TrustBadge icon={<ShieldCheck className="text-green-400" />} title="Verified Tools" desc="Hand-picked & tested" />
          <TrustBadge icon={<Award className="text-blue-400" />} title="Top Rated" desc="By 50k+ users" />
          <TrustBadge icon={<Star className="text-yellow-400" />} title="Expert Picks" desc="Daily updates" />
          <TrustBadge icon={<CheckCircle2 className="text-purple-400" />} title="Secure Site" desc="SSL Encrypted" />
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-xl trust-blue-gradient flex items-center justify-center shadow-lg shadow-blue-500/50">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">FineZ</span>
            </div>
            <p className="text-gray-400 text-sm mb-4 max-w-md">
              FineZ helps you discover the best tools and resources to earn money online, learn new skills, and improve your lifestyle.
            </p>
            <div className="inline-block p-4 glass-effect rounded-lg border border-amber-500/30">
              <p className="text-xs text-amber-200 font-medium">
                <span className="font-bold">⚡ Affiliate Disclosure:</span> This website contains affiliate links. 
                We may earn a commission when you click on links and make a purchase, at no additional cost to you. 
                We only recommend products we genuinely believe in.
              </p>
            </div>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category}>
                  <a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {company.map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Social & Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2026 FineZ. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-4">
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="mailto:hello@finez.com" className="text-gray-400 hover:text-blue-400 transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            This site contains affiliate links. See our <Link to="/disclaimer" className="text-amber-400 hover:text-amber-300">Affiliate Disclaimer</Link> for details.
          </p>
        </div>
      </div>
    </footer>
  );
};

const TrustBadge = ({ icon, title, desc }) => (
  <div className="flex items-center space-x-3 group">
    <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-white/20 transition-all">
      {icon}
    </div>
    <div>
      <h4 className="text-white text-xs font-bold uppercase tracking-wider">{title}</h4>
      <p className="text-gray-500 text-[10px]">{desc}</p>
    </div>
  </div>
);

export default Footer;
