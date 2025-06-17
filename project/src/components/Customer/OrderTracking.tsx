import React, { useState } from 'react';
import { Package, Truck, CheckCircle, Clock, MapPin, Calendar, Star } from 'lucide-react';
import { Order } from '../../types';

interface OrderTrackingProps {
  orders: Order[];
}

export function OrderTracking({ orders }: OrderTrackingProps) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5" />;
      case 'processing':
        return <Package className="w-5 h-5" />;
      case 'shipped':
        return <Truck className="w-5 h-5" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'processing':
        return 'text-blue-600 bg-blue-100';
      case 'shipped':
        return 'text-purple-600 bg-purple-100';
      case 'delivered':
        return 'text-green-600 bg-green-100';
      case 'cancelled':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getTrackingSteps = (status: Order['status']) => {
    const steps = [
      { key: 'pending', label: 'Order Placed', icon: Clock },
      { key: 'processing', label: 'Processing', icon: Package },
      { key: 'shipped', label: 'Shipped', icon: Truck },
      { key: 'delivered', label: 'Delivered', icon: CheckCircle }
    ];

    const statusOrder = ['pending', 'processing', 'shipped', 'delivered'];
    const currentIndex = statusOrder.indexOf(status);

    return steps.map((step, index) => ({
      ...step,
      completed: index <= currentIndex,
      active: index === currentIndex
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Order Tracking</h2>
        <p className="text-gray-600">Track your orders and delivery status</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Orders List */}
        <div className="lg:col-span-1 space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              onClick={() => setSelectedOrder(order)}
              className={`bg-white rounded-lg shadow-md p-4 cursor-pointer transition-all hover:shadow-lg ${
                selectedOrder?.id === order.id ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-800">Order #{order.id}</h3>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                  {getStatusIcon(order.status)}
                  <span className="ml-1 capitalize">{order.status}</span>
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(order.createdAt).toLocaleDateString()}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Package className="w-4 h-4 mr-2" />
                  {order.items.length} items
                </div>
                <div className="text-lg font-bold text-blue-600">
                  ${order.total.toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Details */}
        <div className="lg:col-span-2">
          {selectedOrder ? (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">Order #{selectedOrder.id}</h3>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedOrder.status)}`}>
                  {getStatusIcon(selectedOrder.status)}
                  <span className="ml-2 capitalize">{selectedOrder.status}</span>
                </span>
              </div>

              {/* Tracking Progress */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Tracking Progress</h4>
                <div className="relative">
                  <div className="flex items-center justify-between">
                    {getTrackingSteps(selectedOrder.status).map((step, index) => {
                      const Icon = step.icon;
                      return (
                        <div key={step.key} className="flex flex-col items-center relative">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            step.completed 
                              ? 'bg-blue-600 text-white' 
                              : step.active 
                                ? 'bg-blue-100 text-blue-600 ring-2 ring-blue-600' 
                                : 'bg-gray-100 text-gray-400'
                          }`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className={`mt-2 text-sm font-medium ${
                            step.completed || step.active ? 'text-gray-800' : 'text-gray-400'
                          }`}>
                            {step.label}
                          </span>
                          {index < getTrackingSteps(selectedOrder.status).length - 1 && (
                            <div className={`absolute top-6 left-12 w-full h-0.5 ${
                              step.completed ? 'bg-blue-600' : 'bg-gray-200'
                            }`} style={{ width: 'calc(100vw / 4 - 3rem)' }} />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Order Items</h4>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-800">{item.product.name}</h5>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        <p className="text-sm text-gray-600">Price: ${item.product.price}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-800">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                        {selectedOrder.status === 'delivered' && (
                          <button className="mt-2 flex items-center text-sm text-blue-600 hover:text-blue-700">
                            <Star className="w-4 h-4 mr-1" />
                            Rate Product
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">Shipping Address</h4>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-gray-800">{selectedOrder.shippingAddress.street}</p>
                        <p className="text-gray-600">
                          {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state}
                        </p>
                        <p className="text-gray-600">
                          {selectedOrder.shippingAddress.zipCode}, {selectedOrder.shippingAddress.country}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">Order Summary</h4>
                  <div className="p-4 bg-gray-50 rounded-lg space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="text-gray-800">${selectedOrder.total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Shipping:</span>
                      <span className="text-gray-800">Free</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tax:</span>
                      <span className="text-gray-800">$0.00</span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between font-semibold">
                      <span className="text-gray-800">Total:</span>
                      <span className="text-blue-600">${selectedOrder.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex items-center space-x-4">
                {selectedOrder.status === 'delivered' && (
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Reorder Items
                  </button>
                )}
                <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                  Download Invoice
                </button>
                <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                  Contact Support
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-800 mb-2">Select an Order</h3>
              <p className="text-gray-600">Choose an order from the list to view tracking details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}