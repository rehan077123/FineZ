import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

export default function AdminDashboard() {
  const { token, user } = useAuth();
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [topSellers, setTopSellers] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, [token]);

  const fetchDashboardData = async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      
      const [metricsRes, sellersRes, withdrawalsRes] = await Promise.all([
        axios.get(`${BACKEND_URL}/api/admin/dashboard`, { headers }),
        axios.get(`${BACKEND_URL}/api/admin/top-sellers`, { headers }),
        axios.get(`${BACKEND_URL}/api/admin/withdrawals/pending`, { headers })
      ]);

      setMetrics(metricsRes.data);
      setTopSellers(sellersRes.data);
      setWithdrawals(withdrawalsRes.data.pending_requests);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching admin data:', error);
      setLoading(false);
    }
  };

  const approveWithdrawal = async (withdrawalId) => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      await axios.post(`${BACKEND_URL}/api/admin/withdrawals/${withdrawalId}/approve`, {}, { headers });
      fetchDashboardData();
    } catch (error) {
      console.error('Error approving withdrawal:', error);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (!metrics) return <div className="p-8 text-center text-red-600">Admin access required</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <h1 className="text-4xl font-bold text-white mb-8">💰 Platform Admin Dashboard</h1>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Total Revenue"
          value={`$${metrics.total_revenue.toFixed(2)}`}
          color="from-blue-500 to-blue-600"
        />
        <MetricCard
          title="Platform Earnings"
          value={`$${metrics.platform_earnings.toFixed(2)}`}
          color="from-green-500 to-green-600"
        />
        <MetricCard
          title="Active Users"
          value={metrics.total_users}
          color="from-purple-500 to-purple-600"
        />
        <MetricCard
          title="Total Products"
          value={metrics.total_products}
          color="from-orange-500 to-orange-600"
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <MetricCard
          title="Active Sellers"
          value={metrics.total_sellers}
          subtitle="Tier-verified sellers"
          color="from-pink-500 to-pink-600"
        />
        <MetricCard
          title="Avg Order Value"
          value={`$${metrics.avg_order_value.toFixed(2)}`}
          color="from-cyan-500 to-cyan-600"
        />
        <MetricCard
          title="Pending Withdrawals"
          value={`$${metrics.pending_withdrawals.toFixed(2)}`}
          color="from-red-500 to-red-600"
        />
      </div>

      {/* Top Sellers */}
      <div className="bg-slate-700 rounded-lg p-6 mb-8 shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-4">🏆 Top Earning Sellers</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-white">
            <thead>
              <tr className="border-b border-slate-600">
                <th className="text-left p-3">Seller</th>
                <th className="text-left p-3">Total Earnings</th>
                <th className="text-left p-3">Tier</th>
                <th className="text-left p-3">Products</th>
              </tr>
            </thead>
            <tbody>
              {topSellers.map((seller, idx) => (
                <tr key={idx} className="border-b border-slate-600 hover:bg-slate-600">
                  <td className="p-3">{seller.first_name} {seller.last_name}</td>
                  <td className="p-3 font-bold">${seller.total_earnings.toFixed(2)}</td>
                  <td className="p-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      seller.seller_tier === 'free' ? 'bg-gray-500' :
                      seller.seller_tier === 'pro' ? 'bg-blue-500' :
                      'bg-gold-500'
                    }`}>
                      {seller.seller_tier.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-3">{seller.total_products}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pending Withdrawals */}
      <div className="bg-slate-700 rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-4">💳 Pending Withdrawals</h2>
        {withdrawals.length === 0 ? (
          <p className="text-slate-300">No pending withdrawals</p>
        ) : (
          <div className="space-y-4">
            {withdrawals.map((w) => (
              <div key={w.id} className="bg-slate-600 p-4 rounded-lg flex justify-between items-center">
                <div>
                  <p className="text-white font-semibold">${w.amount.toFixed(2)}</p>
                  <p className="text-slate-300 text-sm">Requested: {new Date(w.requested_at).toLocaleDateString()}</p>
                </div>
                <button
                  onClick={() => approveWithdrawal(w.id)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold"
                >
                  Approve
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function MetricCard({ title, value, subtitle, color }) {
  return (
    <div className={`bg-gradient-to-br ${color} rounded-lg p-6 text-white shadow-lg`}>
      <p className="text-sm opacity-90 mb-2">{title}</p>
      <p className="text-3xl font-bold">{value}</p>
      {subtitle && <p className="text-xs opacity-75 mt-2">{subtitle}</p>}
    </div>
  );
}
