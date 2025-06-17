import React, { useState } from 'react';
import { Package, ShoppingBag, DollarSign, TrendingUp, Plus, BarChart3, Truck } from 'lucide-react';
import { StatsCard } from '../components/Dashboard/StatsCard';
import { ProductManagement } from '../components/Vendor/ProductManagement';
import { OrderManagement } from '../components/Vendor/OrderManagement';
import { mockProducts, mockOrders } from '../data/mockData';
import { Product, Order } from '../types';

export function VendorDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [products, setProducts] = useState<Product[]>(mockProducts.filter(product => product.vendorId === '2'));
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  const handleAddProduct = () => {
    // In a real app, this would open a product creation modal/form
    alert('Add Product functionality would be implemented here');
  };

  const handleEditProduct = (product: Product) => {
    // In a real app, this would open a product edit modal/form
    alert(`Edit product: ${product.name}`);
  };

  const handleDeleteProduct = (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== productId));
    }
  };

  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status } : order
    ));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'products':
        return (
          <ProductManagement
            products={products}
            onAddProduct={handleAddProduct}
            onEditProduct={handleEditProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        );
      case 'orders':
        return (
          <OrderManagement
            orders={orders}
            onUpdateOrderStatus={handleUpdateOrderStatus}
          />
        );
      case 'analytics':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Vendor Analytics</h2>
              <p className="text-gray-600">Track your business performance</p>
            </div>
            
            {/* Revenue Chart Placeholder */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Sales Performance</h3>
              <div className="h-64 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Sales analytics chart would be displayed here</p>
                </div>
              </div>
            </div>

            {/* Top Products */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Performing Products</h3>
              <div className="space-y-4">
                {products.slice(0, 5).map((product, index) => (
                  <div key={product.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div>
                        <p className="font-medium text-gray-800">{product.name}</p>
                        <p className="text-sm text-gray-600">{product.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-800">${product.price}</p>
                      <p className="text-sm text-gray-600">★ {product.rating}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'overview':
      default:
        return (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="Total Products"
                value={products.length}
                icon={Package}
                trend={{ value: "2 new", isPositive: true }}
                color="blue"
              />
              <StatsCard
                title="Orders This Month"
                value="24"
                icon={ShoppingBag}
                trend={{ value: "18%", isPositive: true }}
                color="green"
              />
              <StatsCard
                title="Revenue"
                value="$3,240"
                icon={DollarSign}
                trend={{ value: "12%", isPositive: true }}
                color="green"
              />
              <StatsCard
                title="Conversion Rate"
                value="3.2%"
                icon={TrendingUp}
                trend={{ value: "0.5%", isPositive: true }}
                color="orange"
              />
            </div>

            {/* Products Overview */}
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-800">My Products</h2>
                  <button
                    onClick={() => setActiveTab('products')}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    View All
                  </button>
                </div>
              </div>
              <div className="p-6">
                {products.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">No products yet</p>
                    <button
                      onClick={handleAddProduct}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Add Your First Product
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {products.slice(0, 3).map((product) => (
                      <div key={product.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                          <div>
                            <p className="font-medium text-gray-800">{product.name}</p>
                            <p className="text-sm text-gray-600">{product.category}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-6">
                          <div className="text-right">
                            <p className="font-semibold text-gray-800">${product.price}</p>
                            <p className="text-sm text-gray-600">Stock: {product.stock}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleEditProduct(product)}
                              className="text-blue-600 hover:text-blue-700 px-3 py-1 rounded"
                            >
                              Edit
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
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
                <div className="text-center py-8">
                  <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No orders yet</p>
                </div>
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
          <h1 className="text-2xl font-bold text-gray-800">Vendor Dashboard</h1>
          <p className="text-gray-600">Manage your products and track your sales.</p>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex items-center space-x-2">
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
              onClick={() => setActiveTab('products')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'products' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Products
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
          
          <button
            onClick={handleAddProduct}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {renderContent()}
    </div>
  );
}