import { Share2, Twitter, Facebook, Linkedin, Copy, Check, MessageCircle } from 'lucide-react';
import { useState } from 'react';

const SocialShare = ({ product }) => {
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  const shareUrl = `${window.location.origin}/?product=${product.id}`;
  const shareText = `Check out ${product.title} on FineZ! ${product.why_this_product}`;
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const shareOnTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };
  
  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };
  
  const shareOnLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };
  
  const shareOnWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
    window.open(url, '_blank');
  };
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-white/10 transition-colors"
        aria-label="Share product"
      >
        <Share2 className="w-5 h-5 text-gray-400 hover:text-white" />
      </button>
      
      {isOpen && (
        <div className="absolute bottom-full right-0 mb-2 glass-effect rounded-lg border border-white/10 p-3 min-w-[200px] shadow-xl z-50">
          <p className="text-xs text-gray-400 mb-2">Share this product</p>
          
          <div className="space-y-2">
            <button
              onClick={shareOnTwitter}
              className="w-full flex items-center space-x-2 p-2 rounded-lg hover:bg-blue-500/20 transition-colors text-left"
            >
              <Twitter className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-gray-300">Twitter</span>
            </button>
            
            <button
              onClick={shareOnFacebook}
              className="w-full flex items-center space-x-2 p-2 rounded-lg hover:bg-blue-600/20 transition-colors text-left"
            >
              <Facebook className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-gray-300">Facebook</span>
            </button>
            
            <button
              onClick={shareOnLinkedIn}
              className="w-full flex items-center space-x-2 p-2 rounded-lg hover:bg-blue-700/20 transition-colors text-left"
            >
              <Linkedin className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-gray-300">LinkedIn</span>
            </button>
            
            <button
              onClick={shareOnWhatsApp}
              className="w-full flex items-center space-x-2 p-2 rounded-lg hover:bg-green-500/20 transition-colors text-left"
            >
              <MessageCircle className="w-4 h-4 text-green-400" />
              <span className="text-sm text-gray-300">WhatsApp</span>
            </button>
            
            <button
              onClick={copyToClipboard}
              className="w-full flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-500/20 transition-colors text-left"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-400" />
              ) : (
                <Copy className="w-4 h-4 text-gray-400" />
              )}
              <span className="text-sm text-gray-300">
                {copied ? 'Copied!' : 'Copy Link'}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialShare;
