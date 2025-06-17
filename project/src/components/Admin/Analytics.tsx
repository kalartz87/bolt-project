import React from 'react';
import { TrendingUp, Users, ShoppingBag, DollarSign, Package, Eye, ArrowUp, ArrowDown } from 'lucide-react';

export function Analytics() {
  const analyticsData = {
    revenue: {
      current: 125000,
      previous: 98000,
      growth: 27.6
    },
    orders: {
      current: 1250,
      previous: 980,
      growth: 27.6
    },
    users: {
      current: 5420,
      previous: 4890,
      growth: 10.8
    },
    products: {
      current: 890,
      previous: 750,
      growth: 18.7
    }
  };

  const topProducts = [
    { name: 'Wireless Headphones', sales: 245, revenue: 48900 },
    { name: 'Smart Watch', sales: 189, revenue: 56670 },
    { name: 'Laptop Stand', sales: 156, revenue: 15600 },
    { name: 'Phone Case', sales: 134, revenue: 4020 },
    { name: 'Bluetooth Speaker', sales: 98, revenue: 9800 }
  ];

  const topVendors = [
    { name: 'TechStore Pro', orders: 456, revenue: 89000 },
    { name: 'Fashion Forward', orders: 234, revenue: 45000 },
    { name: 'Home Essentials', orders: 189, revenue: 34000 },
    { name: 'Sports Gear', orders: 145, revenue: 28000 },
    { name: 'Beauty Plus', orders: 98, revenue: 19000 }
  ];

  const MetricCard = ({ title, current, previous, growth, icon: Icon, color }: any) => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">
            {title.includes('Revenue') || title.includes('Sales') ? '$' : ''}{current.toLocaleString()}
          </p>
          <div className="flex items-center mt-2">
            {growth > 0 ? (
              <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
            ) : (
              <ArrowDown className="w-4 h-4 text-red-500 mr-1" />
            )}
            <span className={`text-sm font-medium ${growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {Math.abs(growth)}%
            </span>
            <span className="text-gray-500 text-sm ml-1">vs last month</span>
          </div>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h2>
        <p className="text-gray-600">Track your platform's performance and growth</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Revenue"
          current={analyticsData.revenue.current}
          previous={analyticsData.revenue.previous}
          growth={analyticsData.revenue.growth}
          icon={DollarSign}
          color="bg-green-50 text-green-600"
        />
        <MetricCard
          title="Total Orders"
          current={analyticsData.orders.current}
          previous={analyticsData.orders.previous}
          growth={analyticsData.orders.growth}
          icon={ShoppingBag}
          color="bg-blue-50 text-blue-600"
        />
        <MetricCard
          title="Total Users"
          current={analyticsData.users.current}
          previous={analyticsData.users.previous}
          growth={analyticsData.users.growth}
          icon={Users}
          color="bg-purple-50 text-purple-600"
        />
        <MetricCard
          title="Total Products"
          current={analyticsData.products.current}
          previous={analyticsData.products.previous}
          growth={analyticsData.products.growth}
          icon={Package}
          color="bg-orange-50 text-orange-600"
        />
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Top Selling Products</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{product.name}</p>
                      <p className="text-sm text-gray-600">{product.sales} sales</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-800">${product.revenue.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Vendors */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Top Performing Vendors</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topVendors.map((vendor, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{vendor.name}</p>
                      <p className="text-sm text-gray-600">{vendor.orders} orders</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-800">${vendor.revenue.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Chart Placeholder */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Revenue Trend</h3>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-lg">7D</button>
            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">30D</button>
            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">90D</button>
            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">1Y</button>
          </div>
        </div>
        <div className="h-64 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Revenue chart would be displayed here</p>
            <p className="text-sm text-gray-400">Integration with charting library needed</p>
          </div>
        </div>
      </div>
    </div>
  );
}