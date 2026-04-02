import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import "./index.css";

// Pages
import HomePage from "./pages/HomePage";
import MarketplacePage from "./pages/MarketplacePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import AffiliatePage from "./pages/AffiliatePage";
import DropshipPage from "./pages/DropshipPage";
import IdeasPage from "./pages/IdeasPage";
import SellPage from "./pages/SellPage";
import AboutPage from "./pages/AboutPage";
import BlogPage from "./pages/BlogPage";
import BlogPost from "./pages/BlogPost";
import PrivacyPage from "./pages/PrivacyPage";
import DisclaimerPage from "./pages/DisclaimerPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AccountPage from "./pages/AccountPage";
import SellerDashboard from "./pages/SellerDashboard";
import AffiliateDashboard from "./pages/AffiliateDashboard";
import AdminDashboard from "./pages/AdminDashboard";

// Layout
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Context
import { AuthProvider } from "./context/AuthContext";

function App() {
  useEffect(() => {
    // Register service worker to intercept problematic image requests
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js').catch(() => {
        // Silently fail if service worker registration doesn't work
      });
    }
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen bg-[#0F172A]">
          <Navbar />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/marketplace" element={<MarketplacePage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/affiliate" element={<AffiliatePage />} />
            <Route path="/dropship" element={<DropshipPage />} />
            <Route path="/ideas" element={<IdeasPage />} />
            <Route path="/sell" element={<SellPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/disclaimer" element={<DisclaimerPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/seller/dashboard" element={<SellerDashboard />} />
            <Route path="/affiliate/dashboard" element={<AffiliateDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>

          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
