import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { 
  TrendingUp, 
  Package, 
  DollarSign, 
  Users, 
  ShieldCheck, 
  Trash2, 
  AlertCircle, 
  CheckCircle,
  FileText,
  MessageSquare
} from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

const AdminDashboard = () => {
  const { token, user } = useAuth();
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pendingProducts, setPendingProducts] = useState([]);
  const [reports, setReports] = useState([]);
  const [providers, setProviders] = useState([{ id: 'all', name: 'All' }]);
  const [selectedProvider, setSelectedProvider] = useState('all');

  const fetchAdminData = useCallback(async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const [metricsRes, productsRes, providersRes] = await Promise.all([
        axios.get(`${BACKEND_URL}/api/admin/dashboard`, { headers }),
        axios.get(`${BACKEND_URL}/api/admin/products/pending`, { headers }),
        axios.get(`${BACKEND_URL}/api/providers`)
      ]);
      setMetrics(metricsRes.data);
      setPendingProducts(productsRes.data);
      const providerList = Array.isArray(providersRes.data) ? providersRes.data : [];
      setProviders([{ id: 'all', name: 'All' }, ...providerList]);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  }, [token]);

  const handleApprove = async (productId) => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      await axios.post(`${BACKEND_URL}/api/admin/products/${productId}/approve`, {}, { headers });
      setPendingProducts(prev => prev.filter(p => p.id !== productId));
    } catch (error) {
      console.error('Approval failed:', error);
      alert('Failed to approve product');
    }
  };

  const handleReject = async (productId) => {
    if (!window.confirm('Are you sure you want to reject and delete this product?')) return;
    try {
      const headers = { Authorization: `Bearer ${token}` };
      await axios.delete(`${BACKEND_URL}/api/admin/products/${productId}`, { headers });
      setPendingProducts(prev => prev.filter(p => p.id !== productId));
    } catch (error) {
      console.error('Rejection failed:', error);
      alert('Failed to delete product');
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, [fetchAdminData]);

  if (loading) return <div className="p-20 text-center text-white">Loading Admin...</div>;

  const filteredPendingProducts = selectedProvider === 'all'
    ? pendingProducts
    : pendingProducts.filter(p => (p.provider || 'manual') === selectedProvider);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-black mb-2">Platform Command Center</h1>
            <p className="text-gray-400">Moderation, Analytics & Global Controls</p>
          </div>
          <div className="flex items-center space-x-2 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full">
            <ShieldCheck className="text-red-500 w-4 h-4" />
            <span className="text-xs font-bold text-red-500 uppercase">Admin Mode Active</span>
          </div>
        </header>

        {/* Moderation Queue */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 space-y-8">
            <section className="glass-effect rounded-3xl border border-white/10 overflow-hidden">
              <div className="p-6 border-b border-white/10 flex justify-between items-center">
                <h3 className="text-xl font-bold flex items-center">
                  <AlertCircle className="text-amber-400 mr-2" />
                  Product Moderation Queue
                </h3>
                <div className="flex items-center gap-3">
                  <select
                    value={selectedProvider}
                    onChange={(e) => setSelectedProvider(e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
                  >
                    {providers.map(p => (
                      <option key={p.id} value={p.id} className="bg-[#0a0a0a]">
                        {p.name}
                      </option>
                    ))}
                  </select>
                  <span className="bg-amber-400 text-black text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                    {filteredPendingProducts.length} Pending
                  </span>
                </div>
              </div>
              <div className="p-6">
                {filteredPendingProducts.length > 0 ? (
                  <div className="space-y-4">
                    {filteredPendingProducts.map(p => (
                      <div key={p.id} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                        <div className="flex items-center space-x-4">
                          <img src={p.image_url} alt="" className="w-12 h-12 rounded-lg object-cover" />
                          <div>
                            <h4 className="font-bold">{p.title}</h4>
                            <p className="text-xs text-gray-500">Provider: {p.provider || 'manual'}</p>
                            <p className="text-xs text-gray-500">By Seller: {p.seller_id}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleApprove(p.id)}
                            className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-all"
                            title="Approve Listing"
                          >
                            <CheckCircle size={18} />
                          </button>
                          <button 
                            onClick={() => handleReject(p.id)}
                            className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all"
                            title="Delete Listing"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500 py-10">Queue is clean! No pending products.</p>
                )}
              </div>
            </section>

            <div className="grid grid-cols-2 gap-8">
              <AdminToolCard icon={<MessageSquare />} title="Review Moderation" desc="Handle reported reviews" count={4} />
              <AdminToolCard icon={<FileText />} title="Blog Approval" desc="Approve team/user blogs" count={2} />
            </div>
          </div>

          <aside className="space-y-8">
            <section className="glass-effect rounded-3xl border border-white/10 p-6">
              <h3 className="text-lg font-bold mb-6">Platform Vitals</h3>
              <div className="space-y-4">
                <VitalStat label="Total Users" value={metrics?.total_users || 0} icon={<Users />} />
                <VitalStat label="Active Listings" value={metrics?.total_products || 0} icon={<Package />} />
                <VitalStat label="Global Revenue" value={`$${metrics?.total_revenue?.toFixed(2) || 0}`} icon={<DollarSign />} />
                <VitalStat label="Ecosystem Value" value="+12%" icon={<TrendingUp />} trend="up" />
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
};

const AdminToolCard = ({ icon, title, desc, count }) => (
  <div className="glass-effect p-6 rounded-3xl border border-white/10 hover:border-blue-500/30 transition-all cursor-pointer group">
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-white/5 rounded-xl text-blue-400 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <span className="text-xs font-black text-blue-400 bg-blue-400/10 px-2 py-1 rounded-md">{count}</span>
    </div>
    <h4 className="font-bold mb-1">{title}</h4>
    <p className="text-xs text-gray-500">{desc}</p>
  </div>
);

const VitalStat = ({ label, value, icon, trend }) => (
  <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
    <div className="flex items-center space-x-3">
      <div className="text-gray-400">{icon}</div>
      <span className="text-sm font-medium text-gray-300">{label}</span>
    </div>
    <span className={`font-bold ${trend === 'up' ? 'text-green-400' : 'text-white'}`}>{value}</span>
  </div>
);

export default AdminDashboard;
