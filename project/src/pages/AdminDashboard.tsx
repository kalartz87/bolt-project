import React, { useState } from 'react';
import { Users, Store, Package, ShoppingBag, TrendingUp, AlertCircle, Settings, BarChart3 } from 'lucide-react';
import { StatsCard } from '../components/Dashboard/StatsCard';
import { UserManagement } from '../components/Admin/UserManagement';
import { Analytics } from '../components/Admin/Analytics';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return <UserManagement />;
      case 'analytics':
        return <Analytics />;
      case 'overview':
      default:
        return (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="Total Users"
                value="1,234"
                icon={Users}
                trend={{ value: "12%", isPositive: true }}
                color="blue"
              />
              <StatsCard
                title="Active Vendors"
                value="45"
                icon={Store}
                trend={{ value: "3 pending", isPositive: false }}
                color="green"
              />
              <StatsCard
                title="Total Products"
                value="567"
                icon={Package}
                trend={{ value: "23", isPositive: true }}
                color="orange"
              />
              <StatsCard
                title="Total Orders"
                value="890"
                icon={ShoppingBag}
                trend={{ value: "15%", isPositive: true }}
                color="green"
              />
            </div>

            {/* Platform Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Pending Approvals */}
              <div className="bg-white rounded-lg shadow-md">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                    <AlertCircle className="w-5 h-5 text-orange-500 mr-2" />
                    Pending Approvals
                  </h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-800">New Vendor: TechGear Plus</p>
                        <p className="text-sm text-gray-600">Electronics vendor registration</p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700">
                          Approve
                        </button>
                        <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">
                          Reject
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-800">Product Review: Smart Phone</p>
                        <p className="text-sm text-gray-600">Flagged for review</p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                          Review
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-lg shadow-md">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="text-sm text-gray-800">New vendor registered: Fashion Forward</p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div>
                        <p className="text-sm text-gray-800">Product added: Wireless Headphones</p>
                        <p className="text-xs text-gray-500">4 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <div>
                        <p className="text-sm text-gray-800">Order dispute reported: #12345</p>
                        <p className="text-xs text-gray-500">6 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <div>
                        <p className="text-sm text-gray-800">New customer registered</p>
                        <p className="text-xs text-gray-500">8 hours ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <button 
                  onClick={() => setActiveTab('users')}
                  className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-left"
                >
                  <Users className="w-8 h-8 text-blue-600 mb-2" />
                  <h3 className="font-medium text-gray-800">Manage Users</h3>
                  <p className="text-sm text-gray-600">View and manage all users</p>
                </button>
                <button className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors text-left">
                  <Store className="w-8 h-8 text-green-600 mb-2" />
                  <h3 className="font-medium text-gray-800">Vendor Approvals</h3>
                  <p className="text-sm text-gray-600">Review vendor applications</p>
                </button>
                <button className="p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors text-left">
                  <Package className="w-8 h-8 text-orange-600 mb-2" />
                  <h3 className="font-medium text-gray-800">Product Reviews</h3>
                  <p className="text-sm text-gray-600">Review flagged products</p>
                </button>
                <button 
                  onClick={() => setActiveTab('analytics')}
                  className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors text-left"
                >
                  <TrendingUp className="w-8 h-8 text-purple-600 mb-2" />
                  <h3 className="font-medium text-gray-800">Analytics</h3>
                  <p className="text-sm text-gray-600">View platform insights</p>
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600">Monitor and manage your marketplace platform.</p>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'overview' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'users' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Users
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'analytics' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Analytics
          </button>
        </div>
      </div>

      {renderContent()}
    </div>
  );
}