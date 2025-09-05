"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  ArrowRight,
  Download,
  Package,
  Calendar,
  Sparkles,
} from "lucide-react";

interface OrderSuccessPageProps {
  orderId: string;
  onContinueShopping: () => void;
}

const OrderSuccessPage: React.FC<OrderSuccessPageProps> = ({
  orderId,
  onContinueShopping,
}) => {
  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 3);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 p-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.7 }}
        className="max-w-md w-full"
      >
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 text-center shadow-xl border-4 border-pink-300">
          {/* Success Icon */}
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner"
          >
            <CheckCircle className="w-14 h-14 text-emerald-600" />
          </motion.div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-purple-700 mb-2">
            Yay! Order Placed 🎉
          </h1>
          <p className="text-gray-700 text-sm mb-6">
            Thank you for your order 💖 We’ll prepare your items and deliver
            them to your child’s classroom soon.
          </p>

          {/* Order Details */}
          <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl p-4 mb-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <Package className="w-4 h-4 text-pink-500" /> Order ID
              </span>
              <span className="text-sm font-bold text-gray-900">#{orderId}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <Calendar className="w-4 h-4 text-purple-500" /> Estimated
                Delivery
              </span>
              <span className="text-sm font-medium text-gray-900">
                {estimatedDelivery.toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>

          {/* Next Steps */}
          <div className="text-left mb-6">
            <h3 className="text-lg font-semibold text-purple-800 mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-500" /> What’s Next?
            </h3>
            <div className="space-y-3">
              {[
                {
                  step: "1",
                  color: "bg-pink-200 text-pink-700",
                  title: "Order Confirmation",
                  desc: "You’ll receive an email confirmation shortly",
                },
                {
                  step: "2",
                  color: "bg-yellow-200 text-yellow-700",
                  title: "Order Processing",
                  desc: "We’ll prepare your items for delivery",
                },
                {
                  step: "3",
                  color: "bg-green-200 text-green-700",
                  title: "Classroom Delivery",
                  desc: "Items will be delivered to your child’s class",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-start gap-3"
                >
                  <div
                    className={`w-7 h-7 ${item.color} rounded-full flex items-center justify-center flex-shrink-0 font-bold`}
                  >
                    {item.step}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {item.title}
                    </p>
                    <p className="text-xs text-gray-600">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <button className="w-full bg-purple-100 text-purple-700 py-3 rounded-xl font-medium hover:bg-purple-200 transition-colors flex items-center justify-center gap-2 shadow-sm">
              <Download className="w-4 h-4" />
              Download Receipt
            </button>
            <button
              onClick={onContinueShopping}
              className="w-full bg-pink-500 text-white py-3 rounded-xl font-semibold hover:bg-pink-600 transition-all flex items-center justify-center gap-2 shadow-md"
            >
              Continue Shopping
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Support */}
          <p className="text-xs text-gray-500 mt-6">
            Need help? 💌 Contact school office at{" "}
            <a
              href="tel:+919876543210"
              className="text-pink-600 hover:underline"
            >
              +91 98765 43210
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderSuccessPage;
