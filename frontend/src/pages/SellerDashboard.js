import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { 
  TrendingUp, 
  Package, 
  DollarSign, 
  Users, 
  ArrowUpRight, 
  Clock, 
  PlusCircle,
  LayoutDashboard,
  ShoppingCart,
  MessageSquare,
  Settings
} from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

const SellerDashboard = () => {
  const { token, user } = useAuth();
  const [stats, setStats] = useState({
    totalSales: 1250.50,
    activeProducts: 12,
    customerCount: 450,
    conversionRate: 3.2
  });
  const [loading, setLoading] = useState(false);

  // Mock data for initial UI
  const recentOrders = [
    { id: '#1234', customer: 'John Doe', amount: '$45.00', status: 'Completed', date: '2026-03-31' },
    { id: '#1235', customer: 'Jane Smith', amount: '$120.50', status: 'Processing', date: '2026-03-31' },
    { id: '#1236', customer: 'Mike Ross', amount: '$89.99', status: 'Pending', date: '2026-03-30' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex">
      {/* Sidebar */}
      <div className="w-64 border-r border-white/10 p-6 hidden lg:block">
        <div className="mb-8">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Seller Central
          </h2>
        </div>
        <nav className="space-y-2">
          <SidebarItem icon={<LayoutDashboard size={20}/>} label="Dashboard" active />
          <SidebarItem icon={<Package size={20}/>} label="My Products" />
          <SidebarItem icon={<ShoppingCart size={20}/>} label="Orders" />
          <SidebarItem icon={<MessageSquare size={20}/>} label="Reviews" />
          <SidebarItem icon={<DollarSign size={20}/>} label="Earnings" />
          <SidebarItem icon={<Settings size={20}/>} label="Settings" />
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {user?.name || 'Seller'}!</h1>
            <p className="text-gray-400">Here's what's happening with your store today.</p>
          </div>
          <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
            <PlusCircle size={20} />
            <span>Add New Product</span>
          </button>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Total Revenue" 
            value={`$${stats.totalSales}`} 
            icon={<DollarSign className="text-green-400" />} 
            trend="+12.5%" 
          />
          <StatCard 
            title="Active Products" 
            value={stats.activeProducts} 
            icon={<Package className="text-blue-400" />} 
            trend="+2" 
          />
          <StatCard 
            title="Total Customers" 
            value={stats.customerCount} 
            icon={<Users className="text-purple-400" />} 
            trend="+18%" 
          />
          <StatCard 
            title="Conv. Rate" 
            value={`${stats.conversionRate}%`} 
            icon={<TrendingUp className="text-orange-400" />} 
            trend="+0.4%" 
          />
        </div>

        {/* Orders Table */}
        <div className="glass-effect rounded-2xl border border-white/10 overflow-hidden">
          <div className="p-6 border-b border-white/10 flex justify-between items-center">
            <h3 className="text-xl font-bold text-white">Recent Orders</h3>
            <button className="text-blue-400 hover:text-blue-300 text-sm font-semibold">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/5 text-gray-400 text-sm">
                  <th className="px-6 py-4 font-semibold">Order ID</th>
                  <th className="px-6 py-4 font-semibold">Customer</th>
                  <th className="px-6 py-4 font-semibold">Amount</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4 font-medium text-blue-400">{order.id}</td>
                    <td className="px-6 py-4">{order.customer}</td>
                    <td className="px-6 py-4 font-bold text-white">{order.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.status === 'Completed' ? 'bg-green-500/20 text-green-400' : 
                        order.status === 'Processing' ? 'bg-blue-500/20 text-blue-400' : 
                        'bg-orange-500/20 text-orange-400'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-400">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, label, active = false }) => (
  <div className={`flex items-center space-x-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${
    active ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'
  }`}>
    {icon}
    <span className="font-semibold">{label}</span>
  </div>
);

const StatCard = ({ title, value, icon, trend }) => (
  <div className="glass-effect p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all group">
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors">
        {icon}
      </div>
      <span className="text-green-400 text-sm font-bold flex items-center">
        {trend} <ArrowUpRight size={14} className="ml-1" />
      </span>
    </div>
    <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
    <p className="text-3xl font-bold mt-1 text-white">{value}</p>
  </div>
);

export default SellerDashboard;
