import React, { useState } from 'react';
import { Package, Heart, Clock, Star, TrendingUp, MapPin, CreditCard } from 'lucide-react';
import { StatsCard } from '../components/Dashboard/StatsCard';
import { OrderTracking } from '../components/Customer/OrderTracking';
import { Wishlist } from '../components/Customer/Wishlist';
import { ShipmentTracking } from '../components/Logistics/ShipmentTracking';
import { mockOrders, mockProducts } from '../data/mockData';

export function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [wishlistItems, setWishlistItems] = useState(mockProducts.slice(0, 3));
  const recentOrders = mockOrders.slice(0, 3);

  // Mock shipment data
  const mockShipments = [
    {
      id: '1',
      orderId: '1',
      trackingNumber: 'KLZ123456789',
      carrier: 'shiprocket' as const,
      status: 'in_transit' as const,
      estimatedDelivery: '2024-02-20',
      currentLocation: 'Mumbai Distribution Center',
      timeline: [
        {
          timestamp: '2024-02-15T10:00:00Z',
          status: 'Order Picked Up',
          location: 'Vendor Warehouse, Delhi',
          description: 'Package picked up from vendor'
        },
        {
          timestamp: '2024-02-16T14:30:00Z',
          status: 'In Transit',
          location: 'Delhi Hub',
          description: 'Package departed from Delhi hub'
        },
        {
          timestamp: '2024-02-17T09:15:00Z',
          status: 'In Transit',
          location: 'Mumbai Distribution Center',
          description: 'Package arrived at Mumbai distribution center'
        }
      ]
    }
  ];

  const handleRemoveFromWishlist = (productId: string) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== productId));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'orders':
        return <OrderTracking orders={recentOrders} />;
      case 'wishlist':
        return <Wishlist wishlistItems={wishlistItems} onRemoveFromWishlist={handleRemoveFromWishlist} />;
      case 'tracking':
        return <ShipmentTracking shipments={mockShipments} />;
      case 'overview':
      default:
        return (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="Total Orders"
                value="12"
                icon={Package}
                trend={{ value: "2 new", isPositive: true }}
                color="blue"
              />
              <StatsCard
                title="Wishlist Items"
                value={wishlistItems.length}
                icon={Heart}
                color="red"
              />
              <StatsCard
                title="Total Spent"
                value="$1,234"
                icon={TrendingUp}
                trend={{ value: "12%", isPositive: true }}
                color="green"
              />
              <StatsCard
                title="Reward Points"
                value="450"
                icon={Star}
                color="orange"
              />
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-800">Recent Orders</h2>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    View All
                  </button>
                </div>
              </div>
              <div className="p-6">
                {recentOrders.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No orders yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Package className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">Order #{order.id}</p>
                            <p className="text-sm text-gray-600">{order.items.length} items</p>
                            <p className="text-sm text-gray-500">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-800">${order.total}</p>
                          <p className={`text-sm capitalize ${
                            order.status === 'delivered' ? 'text-green-600' :
                            order.status === 'shipped' ? 'text-blue-600' :
                            order.status === 'processing' ? 'text-orange-600' :
                            'text-gray-600'
                          }`}>
                            {order.status}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Wishlist Preview */}
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-800">Wishlist</h2>
                  <button
                    onClick={() => setActiveTab('wishlist')}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    View All
                  </button>
                </div>
              </div>
              <div className="p-6">
                {wishlistItems.length === 0 ? (
                  <div className="text-center py-8">
                    <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No items in wishlist</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {wishlistItems.slice(0, 3).map((item) => (
                      <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-32 object-cover rounded-lg mb-3"
                        />
                        <h3 className="font-medium text-gray-800 mb-1 line-clamp-1">{item.name}</h3>
                        <p className="text-blue-600 font-semibold">${item.price}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <button
                  onClick={() => setActiveTab('orders')}
                  className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-left"
                >
                  <Package className="w-8 h-8 text-blue-600 mb-2" />
                  <h3 className="font-medium text-gray-800">Track Orders</h3>
                  <p className="text-sm text-gray-600">Check your order status</p>
                </button>
                <button
                  onClick={() => setActiveTab('wishlist')}
                  className="p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors text-left"
                >
                  <Heart className="w-8 h-8 text-red-600 mb-2" />
                  <h3 className="font-medium text-gray-800">View Wishlist</h3>
                  <p className="text-sm text-gray-600">See saved items</p>
                </button>
                <button
                  onClick={() => setActiveTab('tracking')}
                  className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors text-left"
                >
                  <MapPin className="w-8 h-8 text-green-600 mb-2" />
                  <h3 className="font-medium text-gray-800">Track Shipments</h3>
                  <p className="text-sm text-gray-600">Real-time tracking</p>
                </button>
                <button className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors text-left">
                  <CreditCard className="w-8 h-8 text-purple-600 mb-2" />
                  <h3 className="font-medium text-gray-800">Payment Methods</h3>
                  <p className="text-sm text-gray-600">Manage payments</p>
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
          <h1 className="text-2xl font-bold text-gray-800">Customer Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's your account overview.</p>
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
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'orders' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Orders
          </button>
          <button
            onClick={() => setActiveTab('wishlist')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'wishlist' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Wishlist
          </button>
          <button
            onClick={() => setActiveTab('tracking')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'tracking' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Tracking
          </button>
        </div>
      </div>

      {renderContent()}
    </div>
  );
}