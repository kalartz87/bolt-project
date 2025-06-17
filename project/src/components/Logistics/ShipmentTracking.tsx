import React, { useState } from 'react';
import { Truck, Package, MapPin, Clock, CheckCircle, AlertCircle, Phone, Mail } from 'lucide-react';

interface Shipment {
  id: string;
  orderId: string;
  trackingNumber: string;
  carrier: 'shiprocket' | 'delhivery' | 'bluedart';
  status: 'picked_up' | 'in_transit' | 'out_for_delivery' | 'delivered' | 'exception';
  estimatedDelivery: string;
  currentLocation: string;
  timeline: {
    timestamp: string;
    status: string;
    location: string;
    description: string;
  }[];
}

interface ShipmentTrackingProps {
  shipments: Shipment[];
}

export function ShipmentTracking({ shipments }: ShipmentTrackingProps) {
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [trackingInput, setTrackingInput] = useState('');

  const getStatusIcon = (status: Shipment['status']) => {
    switch (status) {
      case 'picked_up':
        return <Package className="w-5 h-5" />;
      case 'in_transit':
        return <Truck className="w-5 h-5" />;
      case 'out_for_delivery':
        return <MapPin className="w-5 h-5" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5" />;
      case 'exception':
        return <AlertCircle className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: Shipment['status']) => {
    switch (status) {
      case 'picked_up':
        return 'text-blue-600 bg-blue-100';
      case 'in_transit':
        return 'text-purple-600 bg-purple-100';
      case 'out_for_delivery':
        return 'text-orange-600 bg-orange-100';
      case 'delivered':
        return 'text-green-600 bg-green-100';
      case 'exception':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getCarrierLogo = (carrier: Shipment['carrier']) => {
    const logos = {
      shiprocket: '🚀',
      delhivery: '📦',
      bluedart: '💙'
    };
    return logos[carrier];
  };

  const handleTrackShipment = () => {
    const shipment = shipments.find(s => s.trackingNumber === trackingInput);
    if (shipment) {
      setSelectedShipment(shipment);
    } else {
      alert('Shipment not found. Please check your tracking number.');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Shipment Tracking</h2>
        <p className="text-gray-600">Track your packages with real-time updates</p>
      </div>

      {/* Track by Number */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Track Your Shipment</h3>
        <div className="flex space-x-4">
          <input
            type="text"
            value={trackingInput}
            onChange={(e) => setTrackingInput(e.target.value)}
            placeholder="Enter tracking number"
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleTrackShipment}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Track
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Shipments List */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Your Shipments</h3>
          {shipments.map((shipment) => (
            <div
              key={shipment.id}
              onClick={() => setSelectedShipment(shipment)}
              className={`bg-white rounded-lg shadow-md p-4 cursor-pointer transition-all hover:shadow-lg ${
                selectedShipment?.id === shipment.id ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{getCarrierLogo(shipment.carrier)}</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">#{shipment.trackingNumber}</h4>
                    <p className="text-sm text-gray-600">Order #{shipment.orderId}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(shipment.status)}`}>
                  {getStatusIcon(shipment.status)}
                  <span className="ml-1 capitalize">{shipment.status.replace('_', ' ')}</span>
                </span>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  {shipment.currentLocation}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  ETA: {new Date(shipment.estimatedDelivery).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Shipment Details */}
        <div className="lg:col-span-2">
          {selectedShipment ? (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    Tracking #{selectedShipment.trackingNumber}
                  </h3>
                  <p className="text-gray-600">Order #{selectedShipment.orderId}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedShipment.status)}`}>
                    {getStatusIcon(selectedShipment.status)}
                    <span className="ml-2 capitalize">{selectedShipment.status.replace('_', ' ')}</span>
                  </span>
                  <p className="text-sm text-gray-600 mt-1">
                    via {selectedShipment.carrier.charAt(0).toUpperCase() + selectedShipment.carrier.slice(1)}
                  </p>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Current Location</h4>
                  <p className="text-blue-700">{selectedShipment.currentLocation}</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Estimated Delivery</h4>
                  <p className="text-green-700">
                    {new Date(selectedShipment.estimatedDelivery).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Shipment Timeline</h4>
                <div className="space-y-4">
                  {selectedShipment.timeline.map((event, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h5 className="font-medium text-gray-800">{event.status}</h5>
                          <span className="text-sm text-gray-500">
                            {new Date(event.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm">{event.description}</p>
                        <p className="text-gray-500 text-sm flex items-center mt-1">
                          <MapPin className="w-3 h-3 mr-1" />
                          {event.location}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Support */}
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-3">Need Help?</h4>
                <div className="flex items-center space-x-4">
                  <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Support
                  </button>
                  <button className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                    <Mail className="w-4 h-4 mr-2" />
                    Email Support
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <Truck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-800 mb-2">Select a Shipment</h3>
              <p className="text-gray-600">Choose a shipment from the list to view tracking details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}