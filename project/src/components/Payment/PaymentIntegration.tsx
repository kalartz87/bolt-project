import React, { useState } from 'react';
import { CreditCard, Smartphone, Wallet, Shield, CheckCircle } from 'lucide-react';

interface PaymentIntegrationProps {
  amount: number;
  onPaymentSuccess: (paymentData: any) => void;
  onPaymentError: (error: string) => void;
}

export function PaymentIntegration({ amount, onPaymentSuccess, onPaymentError }: PaymentIntegrationProps) {
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'upi' | 'wallet'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    upiId: '',
    walletProvider: 'paytm'
  });

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: CreditCard,
      description: 'Visa, Mastercard, RuPay'
    },
    {
      id: 'upi',
      name: 'UPI Payment',
      icon: Smartphone,
      description: 'PhonePe, Google Pay, Paytm'
    },
    {
      id: 'wallet',
      name: 'Digital Wallet',
      icon: Wallet,
      description: 'Paytm, Mobikwik, Amazon Pay'
    }
  ];

  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock payment success
      const mockPaymentResponse = {
        paymentId: `pay_${Date.now()}`,
        orderId: `order_${Date.now()}`,
        amount: amount,
        method: selectedMethod,
        status: 'success',
        timestamp: new Date().toISOString()
      };
      
      onPaymentSuccess(mockPaymentResponse);
    } catch (error) {
      onPaymentError('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRazorpayPayment = () => {
    // Razorpay integration
    const options = {
      key: 'rzp_test_1234567890', // Replace with actual Razorpay key
      amount: amount * 100, // Amount in paise
      currency: 'INR',
      name: 'Kalartz',
      description: 'Purchase from Kalartz',
      order_id: `order_${Date.now()}`,
      handler: function (response: any) {
        onPaymentSuccess({
          paymentId: response.razorpay_payment_id,
          orderId: response.razorpay_order_id,
          signature: response.razorpay_signature,
          amount: amount,
          method: 'razorpay',
          status: 'success'
        });
      },
      prefill: {
        name: 'Customer Name',
        email: 'customer@example.com',
        contact: '9999999999'
      },
      theme: {
        color: '#3B82F6'
      }
    };

    // Note: In a real implementation, you would load Razorpay script dynamically
    // const rzp = new window.Razorpay(options);
    // rzp.open();
    
    // For demo purposes, simulate Razorpay payment
    setTimeout(() => {
      onPaymentSuccess({
        paymentId: `rzp_${Date.now()}`,
        orderId: `order_${Date.now()}`,
        amount: amount,
        method: 'razorpay',
        status: 'success'
      });
    }, 2000);
  };

  const handlePhonePePayment = () => {
    // PhonePe integration simulation
    const phonePeData = {
      merchantId: 'KALARTZ',
      merchantTransactionId: `TXN_${Date.now()}`,
      merchantUserId: `USER_${Date.now()}`,
      amount: amount * 100,
      redirectUrl: window.location.href,
      redirectMode: 'POST',
      callbackUrl: `${window.location.origin}/api/phonepe/callback`,
      mobileNumber: '9999999999',
      paymentInstrument: {
        type: 'PAY_PAGE'
      }
    };

    // For demo purposes, simulate PhonePe payment
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess({
        paymentId: `phonepe_${Date.now()}`,
        orderId: phonePeData.merchantTransactionId,
        amount: amount,
        method: 'phonepe',
        status: 'success'
      });
    }, 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">Payment Details</h3>
        <div className="flex items-center space-x-2 text-green-600">
          <Shield className="w-5 h-5" />
          <span className="text-sm font-medium">Secure Payment</span>
        </div>
      </div>

      {/* Amount Summary */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Total Amount:</span>
          <span className="text-2xl font-bold text-blue-600">₹{amount.toFixed(2)}</span>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Choose Payment Method</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            return (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id as any)}
                className={`p-4 border-2 rounded-lg transition-all ${
                  selectedMethod === method.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Icon className={`w-8 h-8 mx-auto mb-2 ${
                  selectedMethod === method.id ? 'text-blue-600' : 'text-gray-400'
                }`} />
                <h5 className="font-medium text-gray-800">{method.name}</h5>
                <p className="text-sm text-gray-600">{method.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Payment Form */}
      {selectedMethod === 'card' && (
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cardholder Name
            </label>
            <input
              type="text"
              value={paymentData.cardholderName}
              onChange={(e) => setPaymentData({...paymentData, cardholderName: e.target.value})}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter cardholder name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Card Number
            </label>
            <input
              type="text"
              value={paymentData.cardNumber}
              onChange={(e) => setPaymentData({...paymentData, cardNumber: e.target.value})}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="1234 5678 9012 3456"
              maxLength={19}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expiry Date
              </label>
              <input
                type="text"
                value={paymentData.expiryDate}
                onChange={(e) => setPaymentData({...paymentData, expiryDate: e.target.value})}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="MM/YY"
                maxLength={5}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CVV
              </label>
              <input
                type="text"
                value={paymentData.cvv}
                onChange={(e) => setPaymentData({...paymentData, cvv: e.target.value})}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="123"
                maxLength={4}
              />
            </div>
          </div>
        </div>
      )}

      {selectedMethod === 'upi' && (
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              UPI ID
            </label>
            <input
              type="text"
              value={paymentData.upiId}
              onChange={(e) => setPaymentData({...paymentData, upiId: e.target.value})}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="yourname@paytm"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={handlePhonePePayment}
              disabled={isProcessing}
              className="p-4 border border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors disabled:opacity-50"
            >
              <div className="text-center">
                <div className="w-8 h-8 bg-purple-600 rounded mx-auto mb-2"></div>
                <span className="text-sm font-medium">PhonePe</span>
              </div>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
              <div className="text-center">
                <div className="w-8 h-8 bg-blue-600 rounded mx-auto mb-2"></div>
                <span className="text-sm font-medium">Google Pay</span>
              </div>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
              <div className="text-center">
                <div className="w-8 h-8 bg-blue-500 rounded mx-auto mb-2"></div>
                <span className="text-sm font-medium">Paytm</span>
              </div>
            </button>
          </div>
        </div>
      )}

      {selectedMethod === 'wallet' && (
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Wallet
            </label>
            <select
              value={paymentData.walletProvider}
              onChange={(e) => setPaymentData({...paymentData, walletProvider: e.target.value})}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="paytm">Paytm Wallet</option>
              <option value="mobikwik">Mobikwik</option>
              <option value="amazonpay">Amazon Pay</option>
              <option value="freecharge">FreeCharge</option>
            </select>
          </div>
        </div>
      )}

      {/* Payment Buttons */}
      <div className="space-y-4">
        <button
          onClick={handleRazorpayPayment}
          disabled={isProcessing}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
        >
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Processing...</span>
            </>
          ) : (
            <>
              <span>Pay with Razorpay</span>
              <span className="font-bold">₹{amount.toFixed(2)}</span>
            </>
          )}
        </button>

        <button
          onClick={handlePayment}
          disabled={isProcessing}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
        >
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Processing...</span>
            </>
          ) : (
            <>
              <span>Pay Securely</span>
              <span className="font-bold">₹{amount.toFixed(2)}</span>
            </>
          )}
        </button>
      </div>

      {/* Security Info */}
      <div className="mt-6 p-4 bg-green-50 rounded-lg">
        <div className="flex items-center space-x-2 text-green-700">
          <CheckCircle className="w-5 h-5" />
          <span className="text-sm font-medium">Your payment is secured with 256-bit SSL encryption</span>
        </div>
      </div>
    </div>
  );
}