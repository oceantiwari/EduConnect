import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Wallet, Building, Check, Lock, ShoppingBag } from 'lucide-react';

interface CheckoutPageProps {
  cartItems: Array<{
    id: string;
    title: string;
    price: number;
    quantity: number;
    imageUrl: string;
  }>;
  total: number;
  onBack: () => void;
  onOrderComplete: () => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ cartItems, total, onBack, onOrderComplete }) => {
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    // Delivery Information
    studentName: 'Emma Johnson',
    className: 'Grade 5-A',
    parentName: 'Sarah Johnson',
    phone: '+91 9876543210',
    email: 'sarah.johnson@email.com',
    
    // Payment Information
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    
    // UPI Information
    upiId: '',
    
    // Net Banking
    bankName: '',
    
    // Special Instructions
    instructions: ''
  });

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: CreditCard,
      description: 'Pay securely with your card'
    },
    {
      id: 'upi',
      name: 'UPI Payment',
      icon: Wallet,
      description: 'Pay using UPI apps like GPay, PhonePe'
    },
    {
      id: 'netbanking',
      name: 'Net Banking',
      icon: Building,
      description: 'Pay through your bank account'
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsProcessing(false);
    onOrderComplete();
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
            <p className="text-gray-600">Complete your order</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Information */}
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Student Name</label>
                  <input
                    type="text"
                    value={formData.studentName}
                    onChange={(e) => handleInputChange('studentName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
                  <input
                    type="text"
                    value={formData.className}
                    onChange={(e) => handleInputChange('className', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Parent Name</label>
                  <input
                    type="text"
                    value={formData.parentName}
                    onChange={(e) => handleInputChange('parentName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
              <div className="space-y-3 mb-6">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedPayment === method.id
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedPayment(method.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        selectedPayment === method.id ? 'bg-orange-100' : 'bg-gray-100'
                      }`}>
                        <method.icon className={`w-5 h-5 ${
                          selectedPayment === method.id ? 'text-orange-600' : 'text-gray-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{method.name}</p>
                        <p className="text-sm text-gray-600">{method.description}</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedPayment === method.id
                          ? 'border-orange-500 bg-orange-500'
                          : 'border-gray-300'
                      }`}>
                        {selectedPayment === method.id && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Payment Details */}
              {selectedPayment === 'card' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
                      maxLength={19}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={(e) => handleInputChange('expiryDate', formatExpiryDate(e.target.value))}
                        maxLength={5}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, ''))}
                        maxLength={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={formData.cardName}
                      onChange={(e) => handleInputChange('cardName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              )}

              {selectedPayment === 'upi' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">UPI ID</label>
                  <input
                    type="text"
                    placeholder="yourname@paytm"
                    value={formData.upiId}
                    onChange={(e) => handleInputChange('upiId', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              )}

              {selectedPayment === 'netbanking' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Bank</label>
                  <select
                    value={formData.bankName}
                    onChange={(e) => handleInputChange('bankName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">Choose your bank</option>
                    <option value="sbi">State Bank of India</option>
                    <option value="hdfc">HDFC Bank</option>
                    <option value="icici">ICICI Bank</option>
                    <option value="axis">Axis Bank</option>
                    <option value="kotak">Kotak Mahindra Bank</option>
                    <option value="pnb">Punjab National Bank</option>
                  </select>
                </div>
              )}
            </div>

            {/* Special Instructions */}
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Special Instructions (Optional)</h3>
              <textarea
                rows={3}
                placeholder="Any special delivery instructions or notes..."
                value={formData.instructions}
                onChange={(e) => handleInputChange('instructions', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 border border-gray-100 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{item.title}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium text-gray-900">₹{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">₹{total}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery</span>
                  <span className="text-emerald-600">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Processing Fee</span>
                  <span className="text-gray-900">₹10</span>
                </div>
                <div className="border-t border-gray-200 pt-2">
                  <div className="flex justify-between font-semibold text-lg">
                    <span className="text-gray-900">Total</span>
                    <span className="text-gray-900">₹{total + 10}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full mt-6 bg-orange-600 text-white py-3 rounded-lg font-medium hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    Pay ₹{total + 10}
                  </>
                )}
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
                <Lock className="w-3 h-3" />
                <span>Your payment information is secure and encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;