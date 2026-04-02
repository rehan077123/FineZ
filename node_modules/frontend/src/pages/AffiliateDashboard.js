import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Users, 
  DollarSign, 
  Link, 
  BarChart, 
  Settings, 
  LayoutDashboard, 
  CreditCard,
  History,
  TrendingUp,
  Target
} from 'lucide-react';

const AffiliateDashboard = () => {
  const { user } = useAuth();
  const [stats] = useState({
    totalClicks: 14500,
    activeReferrals: 89,
    unpaidEarnings: 450.25,
    lifetimeEarnings: 5200.00
  });

  const [activeTab, setActiveTab] = useState('Overview');

  const recentReferrals = [
    { id: '1', user: 'Mark Taylor', amount: '$15.00', status: 'Pending', date: '2026-03-31' },
    { id: '2', user: 'Lisa Green', amount: '$25.00', status: 'Approved', date: '2026-03-30' },
    { id: '3', user: 'Sam Wilson', amount: '$12.50', status: 'Paid', date: '2026-03-29' },
  ];

  const teamMembers = [
    { id: 'T1', name: 'Alex Johnson', role: 'Sub-Affiliate', earnings: '$120.00', status: 'Active' },
    { id: 'T2', name: 'Sarah Miller', role: 'Partner', earnings: '$450.00', status: 'Active' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex">
      {/* Sidebar */}
      <div className="w-64 border-r border-white/10 p-6 hidden lg:block">
        <div className="mb-8">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
            Affiliate Center
          </h2>
        </div>
        <nav className="space-y-2">
          <SidebarItem icon={<LayoutDashboard size={20}/>} label="Overview" active={activeTab === 'Overview'} onClick={() => setActiveTab('Overview')} />
          <SidebarItem icon={<Link size={20}/>} label="Affiliate Links" active={activeTab === 'Links'} onClick={() => setActiveTab('Links')} />
          <SidebarItem icon={<Users size={20}/>} label="Team & Referrals" active={activeTab === 'Team'} onClick={() => setActiveTab('Team')} />
          <SidebarItem icon={<BarChart size={20}/>} label="Analytics" active={activeTab === 'Analytics'} onClick={() => setActiveTab('Analytics')} />
          <SidebarItem icon={<CreditCard size={20}/>} label="Payouts" active={activeTab === 'Payouts'} onClick={() => setActiveTab('Payouts')} />
          <SidebarItem icon={<Settings size={20}/>} label="Settings" active={activeTab === 'Settings'} onClick={() => setActiveTab('Settings')} />
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {user?.name || 'Partner'}!</h1>
            <p className="text-gray-400">Track your performance and earnings here.</p>
          </div>
          <div className="flex space-x-4">
            <button className="bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-lg transition-colors border border-white/10">
              <span className="flex items-center space-x-2"><History size={20} /><span>History</span></span>
            </button>
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors">
              <span className="flex items-center space-x-2"><Target size={20} /><span>Create Campaign</span></span>
            </button>
          </div>
        </header>

        {activeTab === 'Overview' && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard 
                title="Total Clicks" 
                value={stats.totalClicks.toLocaleString()} 
                icon={<TrendingUp className="text-blue-400" />} 
                trend="+2.5%" 
              />
              <StatCard 
                title="Active Referrals" 
                value={stats.activeReferrals} 
                icon={<Users className="text-purple-400" />} 
                trend="+12" 
              />
              <StatCard 
                title="Unpaid Earnings" 
                value={`$${stats.unpaidEarnings}`} 
                icon={<DollarSign className="text-green-400" />} 
                trend="$120.50 pending" 
              />
              <StatCard 
                title="Lifetime Earnings" 
                value={`$${stats.lifetimeEarnings.toLocaleString()}`} 
                icon={<CreditCard className="text-pink-400" />} 
                trend="+15.2%" 
              />
            </div>

            {/* Link Generator */}
            <div className="glass-effect p-6 rounded-2xl border border-white/10 mb-8">
              <h3 className="text-xl font-bold mb-4">Quick Link Generator</h3>
              <div className="flex space-x-4">
                <input 
                  type="text" 
                  placeholder="Paste product URL here..." 
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                />
                <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-xl font-bold transition-colors">
                  Generate Affiliate Link
                </button>
              </div>
            </div>

            {/* Referrals Table */}
            <div className="glass-effect rounded-2xl border border-white/10 overflow-hidden">
              <div className="p-6 border-b border-white/10 flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">Recent Referrals</h3>
                <button className="text-orange-400 hover:text-orange-300 text-sm font-semibold">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-white/5 text-gray-400 text-sm">
                      <th className="px-6 py-4 font-semibold">User</th>
                      <th className="px-6 py-4 font-semibold">Commission</th>
                      <th className="px-6 py-4 font-semibold">Status</th>
                      <th className="px-6 py-4 font-semibold">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {recentReferrals.map((ref) => (
                      <tr key={ref.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 font-medium">{ref.user}</td>
                        <td className="px-6 py-4 font-bold text-white">{ref.amount}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            ref.status === 'Paid' ? 'bg-green-500/20 text-green-400' : 
                            ref.status === 'Approved' ? 'bg-blue-500/20 text-blue-400' : 
                            'bg-orange-500/20 text-orange-400'
                          }`}>
                            {ref.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-400">{ref.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {activeTab === 'Team' && (
          <div className="space-y-8">
            {/* Team Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard title="Team Size" value={teamMembers.length} icon={<Users className="text-blue-400" />} trend="+1 this month" />
              <StatCard title="Team Revenue" value="$570.00" icon={<DollarSign className="text-green-400" />} trend="+22%" />
              <StatCard title="My Team Bonus" value="$57.00" icon={<TrendingUp className="text-amber-400" />} trend="10% override" />
            </div>

            {/* Team Onboarding */}
            <div className="glass-effect p-8 rounded-2xl border border-amber-500/30">
              <h3 className="text-2xl font-bold text-white mb-4">Team Onboarding System</h3>
              <p className="text-gray-400 mb-6">Invite others to join your affiliate team and earn 10% override commission on their sales.</p>
              <div className="flex items-center space-x-4">
                <div className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-gray-300 font-mono text-sm">
                  https://finez.vercel.app/signup?ref={user?.id || 'partner_id'}
                </div>
                <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-xl font-bold transition-all">
                  Copy Invite Link
                </button>
              </div>
            </div>

            {/* Team List */}
            <div className="glass-effect rounded-2xl border border-white/10 overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <h3 className="text-xl font-bold text-white">Your Team Members</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-white/5 text-gray-400 text-sm">
                      <th className="px-6 py-4 font-semibold">Name</th>
                      <th className="px-6 py-4 font-semibold">Role</th>
                      <th className="px-6 py-4 font-semibold">Total Earnings</th>
                      <th className="px-6 py-4 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {teamMembers.map((member) => (
                      <tr key={member.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 font-medium">{member.name}</td>
                        <td className="px-6 py-4 text-gray-400">{member.role}</td>
                        <td className="px-6 py-4 font-bold text-white">{member.earnings}</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400">
                            {member.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, label, active = false, onClick }) => (
  <div 
    onClick={onClick}
    className={`flex items-center space-x-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${
    active ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'
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
    </div>
    <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
    <p className="text-3xl font-bold mt-1 text-white">{value}</p>
    <p className="text-green-400 text-xs font-bold mt-2 flex items-center">
      {trend}
    </p>
  </div>
);

export default AffiliateDashboard;
