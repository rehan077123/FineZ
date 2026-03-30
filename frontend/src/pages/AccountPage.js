import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

export default function AccountPage() {
  const navigate = useNavigate();
  const { user, token, logout, isAuthenticated } = useAuth();
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [affiliateEarnings, setAffiliateEarnings] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const fetchDashboard = async () => {
      try {
        const response = await fetch(
          `${BACKEND_URL}/api/users/${user.id}/dashboard`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setDashboard(data);
        }
      } catch (error) {
        console.error("Error fetching dashboard:", error);
      }
    };

    const fetchAffiliateEarnings = async () => {
      try {
        const response = await fetch(
          `${BACKEND_URL}/api/affiliate-earnings`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setAffiliateEarnings(data);
        }
      } catch (error) {
        console.error("Error fetching affiliate earnings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
    fetchAffiliateEarnings();
  }, [isAuthenticated, token, user, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0F172A] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-2">
              Your Account
            </h1>
            <p className="text-gray-400">
              Welcome back, {user?.first_name}! 👋
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-slate-700">
          {["overview", "purchases", "earnings", "settings"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold capitalize transition border-b-2 ${
                activeTab === tab
                  ? "border-blue-500 text-blue-400"
                  : "border-transparent text-gray-400 hover:text-gray-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && dashboard && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Total Spent */}
              <div className="bg-[#1E293B] border border-slate-700 rounded-lg p-6">
                <p className="text-gray-400 text-sm mb-2">Total Spent</p>
                <p className="text-3xl font-bold text-blue-400">
                  ${dashboard.total_spent?.toFixed(2) || "0.00"}
                </p>
                <p className="text-gray-500 text-xs mt-2">
                  {dashboard.total_purchases} purchases
                </p>
              </div>

              {/* Account Balance */}
              <div className="bg-[#1E293B] border border-slate-700 rounded-lg p-6">
                <p className="text-gray-400 text-sm mb-2">Account Balance</p>
                <p className="text-3xl font-bold text-green-400">
                  ${dashboard.account_balance?.toFixed(2) || "0.00"}
                </p>
              </div>

              {/* Total Earnings */}
              <div className="bg-[#1E293B] border border-slate-700 rounded-lg p-6">
                <p className="text-gray-400 text-sm mb-2">Total Earnings</p>
                <p className="text-3xl font-bold text-purple-400">
                  ${dashboard.total_earnings?.toFixed(2) || "0.00"}
                </p>
              </div>

              {/* Pending Earnings */}
              <div className="bg-[#1E293B] border border-slate-700 rounded-lg p-6">
                <p className="text-gray-400 text-sm mb-2">Pending Earnings</p>
                <p className="text-3xl font-bold text-yellow-400">
                  ${dashboard.pending_earnings?.toFixed(2) || "0.00"}
                </p>
              </div>
            </div>

            {/* Recent Purchases */}
            <div className="bg-[#1E293B] border border-slate-700 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">
                Recent Purchases
              </h3>
              {dashboard.recent_purchases && dashboard.recent_purchases.length > 0 ? (
                <div className="space-y-3">
                  {dashboard.recent_purchases.map((purchase) => (
                    <div
                      key={purchase.id}
                      className="flex justify-between items-center p-3 bg-slate-800 rounded"
                    >
                      <div>
                        <p className="text-white font-semibold">
                          {purchase.product_id}
                        </p>
                        <p className="text-gray-400 text-sm">
                          Qty: {purchase.quantity}
                        </p>
                      </div>
                      <p className="text-green-400 font-bold">
                        ${purchase.total_price?.toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">No purchases yet</p>
              )}
            </div>
          </div>
        )}

        {/* Purchases Tab */}
        {activeTab === "purchases" && (
          <div className="bg-[#1E293B] border border-slate-700 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">Your Purchases</h3>
            <p className="text-gray-400">
              You have made {dashboard?.total_purchases || 0} purchases
            </p>
          </div>
        )}

        {/* Earnings Tab */}
        {activeTab === "earnings" && affiliateEarnings && (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-[#1E293B] border border-slate-700 rounded-lg p-6">
                <p className="text-gray-400 text-sm mb-2">Pending</p>
                <p className="text-3xl font-bold text-yellow-400">
                  ${affiliateEarnings.summary?.total_pending?.toFixed(2) || "0.00"}
                </p>
              </div>

              <div className="bg-[#1E293B] border border-slate-700 rounded-lg p-6">
                <p className="text-gray-400 text-sm mb-2">Approved</p>
                <p className="text-3xl font-bold text-blue-400">
                  ${affiliateEarnings.summary?.total_approved?.toFixed(2) || "0.00"}
                </p>
              </div>

              <div className="bg-[#1E293B] border border-slate-700 rounded-lg p-6">
                <p className="text-gray-400 text-sm mb-2">Paid</p>
                <p className="text-3xl font-bold text-green-400">
                  ${affiliateEarnings.summary?.total_paid?.toFixed(2) || "0.00"}
                </p>
              </div>

              <div className="bg-[#1E293B] border border-slate-700 rounded-lg p-6">
                <p className="text-gray-400 text-sm mb-2">Total Earned</p>
                <p className="text-3xl font-bold text-purple-400">
                  ${affiliateEarnings.summary?.total_earned?.toFixed(2) || "0.00"}
                </p>
              </div>
            </div>

            {/* Earnings Table */}
            <div className="bg-[#1E293B] border border-slate-700 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">
                Affiliate Earnings
              </h3>
              {affiliateEarnings.earnings && affiliateEarnings.earnings.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b border-slate-600">
                      <tr>
                        <th className="text-left py-3 px-4 text-gray-400">
                          Product
                        </th>
                        <th className="text-left py-3 px-4 text-gray-400">
                          Commission
                        </th>
                        <th className="text-left py-3 px-4 text-gray-400">
                          Rate
                        </th>
                        <th className="text-left py-3 px-4 text-gray-400">
                          Status
                        </th>
                        <th className="text-left py-3 px-4 text-gray-400">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {affiliateEarnings.earnings.map((earning) => (
                        <tr
                          key={earning.id}
                          className="border-b border-slate-700 hover:bg-slate-800/50"
                        >
                          <td className="py-3 px-4 text-white">
                            {earning.product_id}
                          </td>
                          <td className="py-3 px-4 text-green-400 font-semibold">
                            ${earning.commission_amount?.toFixed(2)}
                          </td>
                          <td className="py-3 px-4 text-gray-300">
                            {(earning.commission_rate * 100).toFixed(0)}%
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                earning.status === "paid"
                                  ? "bg-green-500/20 text-green-400"
                                  : earning.status === "approved"
                                    ? "bg-blue-500/20 text-blue-400"
                                    : "bg-yellow-500/20 text-yellow-400"
                              }`}
                            >
                              {earning.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-gray-400">
                            {new Date(earning.earned_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-400">No affiliate earnings yet</p>
              )}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="bg-[#1E293B] border border-slate-700 rounded-lg p-6 space-y-6">
            <h3 className="text-xl font-bold text-white mb-4">Account Settings</h3>

            {/* User Info */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-300">Personal Information</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">First Name</p>
                  <p className="text-white font-semibold">{user?.first_name}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Last Name</p>
                  <p className="text-white font-semibold">{user?.last_name}</p>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-600"></div>

            {/* Email */}
            <div>
              <p className="text-gray-400 text-sm mb-2">Email Address</p>
              <p className="text-white font-semibold">{user?.email}</p>
            </div>

            <div className="border-t border-slate-600"></div>

            {/* Account Status */}
            <div>
              <p className="text-gray-400 text-sm mb-2">Account Status</p>
              <div className="flex gap-2 flex-wrap">
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                  Active
                </span>
              </div>
            </div>

            <div className="border-t border-slate-600 pt-6">
              <button
                onClick={handleLogout}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
