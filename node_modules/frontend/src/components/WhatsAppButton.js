import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const phoneNumber = '1234567890'; // Replace with your WhatsApp number
  const message = 'Hi! I found FineZ and want to learn more about making money online!';
  
  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };
  
  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 group"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white" />
      
      {/* Tooltip */}
      <div className="absolute right-16 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Chat with us!
      </div>
      
      {/* Pulse animation */}
      <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75"></div>
    </button>
  );
};

export default WhatsAppButton;
