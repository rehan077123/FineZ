import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

export default function SellerTierPage() {
  const { token, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const tiers = [
    {
      name: 'free',
      title: 'Free',
      price: '$0',
      commission: '10%',
      products: '10 products',
      featured: '0 featured slots',
      features: ['Unlimited uploads', 'Basic analytics', 'Community support'],
      color: 'border-gray-300'
    },
    {
      name: 'pro',
      title: 'Pro',
      price: '$29.99',
      period: '/month',
      commission: '15%',
      products: '100 products',
      featured: '5 featured slots',
      features: ['Priority support', 'Advanced analytics', 'Featured listings', 'Seller badge'],
      color: 'border-blue-500',
      recommended: true
    },
    {
      name: 'enterprise',
      title: 'Enterprise',
      price: '$99.99',
      period: '/month',
      commission: '20%',
      products: 'Unlimited',
      featured: '20 featured slots',
      features: ['Dedicated support', 'Custom analytics', 'API access', 'Bulk operations', 'Verified seller badge'],
      color: 'border-gold-500'
    }
  ];

  const upgradeTier = async (tierName) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/seller/upgrade-tier`,
        { tier: tierName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(`✅ Successfully upgraded to ${response.data.tier} tier!`);
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage(`❌ Error: ${error.response?.data?.detail || 'Upgrade failed'}`);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-slate-900 mb-4">
          🚀 Seller Tier System
        </h1>
        <p className="text-center text-slate-600 mb-12 text-lg">
          Choose your tier and start earning more. Upgrade anytime!
        </p>

        {message && (
          <div className="mb-6 p-4 rounded-lg bg-slate-200 text-slate-800 text-center">
            {message}
          </div>
        )}

        {/* Comparison Table */}
        <div className="mb-12 overflow-x-auto">
          <table className="w-full bg-white rounded-lg shadow-lg">
            <thead>
              <tr className="bg-slate-800 text-white">
                <th className="p-4 text-left">Feature</th>
                {tiers.map((tier) => (
                  <th key={tier.name} className="p-4 text-center font-bold">
                    {tier.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-slate-50">
                <td className="p-4 font-semibold">Monthly Cost</td>
                {tiers.map((tier) => (
                  <td key={tier.name} className="p-4 text-center text-lg font-bold text-slate-900">
                    {tier.price} {tier.period}
                  </td>
                ))}
              </tr>
              <tr className="border-b hover:bg-slate-50">
                <td className="p-4 font-semibold">Commission Rate</td>
                {tiers.map((tier) => (
                  <td key={tier.name} className="p-4 text-center text-green-600 font-bold">
                    {tier.commission}
                  </td>
                ))}
              </tr>
              <tr className="border-b hover:bg-slate-50">
                <td className="p-4 font-semibold">Max Products</td>
                {tiers.map((tier) => (
                  <td key={tier.name} className="p-4 text-center">{tier.products}</td>
                ))}
              </tr>
              <tr className="border-b hover:bg-slate-50">
                <td className="p-4 font-semibold">Featured Slots</td>
                {tiers.map((tier) => (
                  <td key={tier.name} className="p-4 text-center">{tier.featured}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Tier Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative bg-white rounded-lg shadow-lg overflow-hidden border-2 ${tier.color} transition-transform hover:scale-105`}
            >
              {tier.recommended && (
                <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 rounded-bl-lg text-sm font-bold">
                  RECOMMENDED
                </div>
              )}

              <div className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{tier.title}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-slate-900">{tier.price}</span>
                  {tier.period && <span className="text-slate-600">{tier.period}</span>}
                </div>

                <div className="bg-blue-50 p-3 rounded-lg mb-6 text-center">
                  <p className="text-sm text-slate-600">Commission Rate</p>
                  <p className="text-2xl font-bold text-green-600">{tier.commission}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-slate-700">
                      <span className="text-green-500 mr-3">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => upgradeTier(tier.name)}
                  disabled={loading}
                  className={`w-full py-3 rounded-lg font-bold text-white transition ${
                    tier.recommended
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : 'bg-slate-600 hover:bg-slate-700'
                  } disabled:opacity-50`}
                >
                  {loading ? 'Processing...' : tier.name === 'free' ? 'Start Free' : 'Upgrade Now'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">🎁 Why Upgrade?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-blue-600 mb-3">📈 Earn More</h3>
              <p className="text-slate-700">
                Higher commission rates mean more money per sale. Pro sellers earn 15%, Enterprise up to 20%!
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-blue-600 mb-3">⭐ Get Visibility</h3>
              <p className="text-slate-700">
                Featured listing slots put your products front and center where buyers see them first.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-blue-600 mb-3">📊 Better Analytics</h3>
              <p className="text-slate-700">
                Access advanced analytics and insights to optimize your products and sales strategy.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-blue-600 mb-3">🚀 Scale Faster</h3>
              <p className="text-slate-700">
                Upload more products, reach more buyers, and automate your selling with API access.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-slate-800 text-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-8">❓ Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-2">Can I downgrade my tier?</h3>
              <p className="text-slate-300">Yes, you can change tiers anytime. Your new rate applies to future sales.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">What if I don't sell enough to cover tier cost?</h3>
              <p className="text-slate-300">No hidden charges. You only pay monthly fees. There's no per-sale cost.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">How often are commissions paid?</h3>
              <p className="text-slate-300">Commissions are calculated daily and can be withdrawn once approved (min $50).</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Is there a setup fee?</h3>
              <p className="text-slate-300">No setup fees. Upgrade instantly and start earning right away!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
