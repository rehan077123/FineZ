'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BarChart3, Upload, ShoppingCart, TrendingUp } from 'lucide-react';

interface ProductStats {
  totalProducts: number;
  totalClicks: number;
  pendingApproval: number;
  approved: number;
}

export default function VendorDashboard() {
  const [stats, setStats] = useState<ProductStats>({
    totalProducts: 0,
    totalClicks: 0,
    pendingApproval: 0,
    approved: 0,
  });

  useEffect(() => {
    // This would fetch user's actual stats from the backend
    // For now, we'll show placeholder stats
    setStats({
      totalProducts: 0,
      totalClicks: 0,
      pendingApproval: 0,
      approved: 0,
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Vendor Dashboard</h1>
          <p className="text-blue-100">Manage your affiliate and dropship products</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {/* Total Products */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Total Products</p>
                <p className="text-3xl font-bold text-slate-900 mt-1">{stats.totalProducts}</p>
              </div>
              <ShoppingCart className="h-12 w-12 text-blue-500 opacity-20" />
            </div>
          </div>

          {/* Total Clicks */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Total Clicks</p>
                <p className="text-3xl font-bold text-slate-900 mt-1">{stats.totalClicks}</p>
              </div>
              <TrendingUp className="h-12 w-12 text-green-500 opacity-20" />
            </div>
          </div>

          {/* Pending Approval */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Pending Review</p>
                <p className="text-3xl font-bold text-slate-900 mt-1">{stats.pendingApproval}</p>
              </div>
              <BarChart3 className="h-12 w-12 text-yellow-500 opacity-20" />
            </div>
          </div>

          {/* Approved */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Live Products</p>
                <p className="text-3xl font-bold text-slate-900 mt-1">{stats.approved}</p>
              </div>
              <ShoppingCart className="h-12 w-12 text-emerald-500 opacity-20" />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Upload New Product */}
          <Link href="/vendor/sell">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg shadow-lg p-8 cursor-pointer transition transform hover:scale-105">
              <Upload className="h-12 w-12 text-white mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Upload Product</h2>
              <p className="text-blue-100">Add your affiliate or dropship product to the marketplace</p>
            </div>
          </Link>

          {/* View My Products */}
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-8">
            <ShoppingCart className="h-12 w-12 text-white mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">My Products</h2>
            <p className="text-purple-100">View and manage all your uploaded products</p>
          </div>
        </div>

        {/* Getting Started Guide */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Getting Started</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white font-bold">
                  1
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Upload Your Product</h3>
                <p className="text-slate-600">Click "Upload Product" to add your first affiliate or dropship product with images and details.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white font-bold">
                  2
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">We Review Your Product</h3>
                <p className="text-slate-600">Our team reviews your product to ensure quality and authenticity. Most products are approved within 24 hours.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white font-bold">
                  3
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Go Live on Marketplace</h3>
                <p className="text-slate-600">Once approved, your product appears on FineZ marketplace for customers to discover and purchase through your affiliate link.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white font-bold">
                  4
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Earn Commissions</h3>
                <p className="text-slate-600">Earn commissions when customers click through and purchase. Track performance in your dashboard.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Pro Tips</h3>
          <ul className="space-y-2 text-blue-800 text-sm">
            <li>• Use clear, high-quality product images for better conversions</li>
            <li>• Write detailed descriptions highlighting key features and benefits</li>
            <li>• Ensure your affiliate links are valid and working correctly</li>
            <li>• Include current pricing and any available discounts</li>
            <li>• Monitor product performance and update as needed</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
