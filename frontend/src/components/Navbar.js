import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X, Zap, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();
  
  const navLinks = [
    { name: 'Discover', path: '/' },
    { name: 'Marketplace', path: '/marketplace' },
    { name: 'Affiliate', path: '/affiliate' },
    { name: 'Dropship', path: '/dropship' },
    { name: 'Ideas', path: '/ideas' },
    { name: 'Blog', path: '/blog' },
    { name: 'About', path: '/about' }
  ];
  
  const isActive = (path) => location.pathname === path;
  
  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };
  
  return (
    <nav className="sticky top-0 z-50 glass-effect border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-xl trust-blue-gradient flex items-center justify-center shadow-lg shadow-blue-500/50">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">FineZ</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? 'bg-[#1E40AF] text-white shadow-lg shadow-blue-500/30'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          {/* Desktop Auth & CTA */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/account" 
                  className="px-4 py-2 text-gray-300 hover:text-white transition flex items-center gap-1"
                >
                  <User className="w-4 h-4" />
                  {user?.first_name}
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-gray-300 hover:text-white transition flex items-center gap-1"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 text-gray-300 hover:text-white transition">
                  Login
                </Link>
                <Link to="/signup" className="btn-gold text-sm">
                  Sign Up
                </Link>
              </>
            )}
            <Link to="/sell" className="btn-gold text-sm">
              + List Product
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-300 hover:bg-white/5"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-white/10 glass-effect">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-all ${
                  isActive(link.path)
                    ? 'bg-[#1E40AF] text-white'
                    : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Mobile Auth */}
            <div className="border-t border-white/10 pt-3 mt-3 space-y-2">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/account"
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 rounded-lg text-base font-medium text-blue-400 hover:bg-white/5"
                  >
                    My Account
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-3 rounded-lg text-base font-medium text-red-400 hover:bg-white/5"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 rounded-lg text-base font-medium text-gray-300 hover:bg-white/5"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center btn-gold"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
            
            <Link
              to="/sell"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center btn-gold mt-4"
            >
              + List Product
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
