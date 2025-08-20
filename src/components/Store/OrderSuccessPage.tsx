import React from 'react';
import { CheckCircle, Package, Calendar, ArrowRight, Download } from 'lucide-react';

interface OrderSuccessPageProps {
  orderId: string;
  onContinueShopping: () => void;
}

const OrderSuccessPage: React.FC<OrderSuccessPageProps> = ({ orderId, onContinueShopping }) => {
  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 3);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl p-8 text-center border border-gray-100 shadow-lg">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-emerald-600" />
          </div>

          {/* Success Message */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your order. We'll prepare your items and deliver them to your child's classroom.
          </p>

          {/* Order Details */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-600">Order ID</span>
              <span className="text-sm font-bold text-gray-900">#{orderId}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Estimated Delivery</span>
              <span className="text-sm font-medium text-gray-900">
                {estimatedDelivery.toLocaleDateString('en-US', { 
                  weekday: 'short', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </span>
            </div>
          </div>

          {/* Next Steps */}
          <div className="text-left mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">What happens next?</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-blue-600">1</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Order Confirmation</p>
                  <p className="text-xs text-gray-600">You'll receive an email confirmation shortly</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-orange-600">2</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Order Processing</p>
                  <p className="text-xs text-gray-600">We'll prepare your items for delivery</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-emerald-600">3</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Classroom Delivery</p>
                  <p className="text-xs text-gray-600">Items will be delivered to your child's class</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              Download Receipt
            </button>
            <button
              onClick={onContinueShopping}
              className="w-full bg-orange-600 text-white py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
            >
              Continue Shopping
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Support */}
          <p className="text-xs text-gray-500 mt-6">
            Need help? Contact school office at{' '}
            <a href="tel:+919876543210" className="text-orange-600 hover:underline">
              +91 98765 43210
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;