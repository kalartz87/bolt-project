import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, CreditCard } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { PaymentIntegration } from '../Payment/PaymentIntegration';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthClick: () => void;
}

export function CartSidebar({ isOpen, onClose, onAuthClick }: CartSidebarProps) {
  const { items, updateQuantity, removeItem, total, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [showPayment, setShowPayment] = useState(false);

  if (!isOpen) return null;

  const handleCheckout = () => {
    if (!isAuthenticated) {
      onAuthClick();
      return;
    }
    
    setShowPayment(true);
  };

  const handlePaymentSuccess = (paymentData: any) => {
    alert(`Payment successful! Payment ID: ${paymentData.paymentId}`);
    clearCart();
    setShowPayment(false);
    onClose();
  };

  const handlePaymentError = (error: string) => {
    alert(`Payment failed: ${error}`);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-800">
            {showPayment ? 'Payment' : 'Shopping Cart'}
          </h2>
          <button
            onClick={() => {
              setShowPayment(false);
              onClose();
            }}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {showPayment ? (
          <div className="p-6">
            <PaymentIntegration
              amount={total}
              onPaymentSuccess={handlePaymentSuccess}
              onPaymentError={handlePaymentError}
            />
            <button
              onClick={() => setShowPayment(false)}
              className="w-full mt-4 text-gray-600 hover:text-gray-800 py-2"
            >
              Back to Cart
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.productId} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-sm">{item.product.name}</h3>
                        <p className="text-blue-600 font-semibold">${item.product.price}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            className="p-1 hover:bg-gray-200 rounded"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            className="p-1 hover:bg-gray-200 rounded"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.productId)}
                        className="text-red-500 hover:text-red-700 p-2"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-xl font-bold text-blue-600">₹{(total * 83).toFixed(2)}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <CreditCard className="w-5 h-5" />
                  <span>{isAuthenticated ? 'Proceed to Payment' : 'Sign In to Checkout'}</span>
                </button>
                <button
                  onClick={clearCart}
                  className="w-full mt-2 text-gray-600 hover:text-gray-800 py-2"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}