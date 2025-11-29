import { CheckCircle, Package, Clock } from "lucide-react";
import { useNavigate, useLocation } from "react-router";

export default function OrderSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const orderId = location.state?.orderId;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-black opacity-10 rounded-full blur-xl animate-pulse" />
            <div className="relative bg-black rounded-full p-6">
              <CheckCircle className="h-16 w-16 text-white" />
            </div>
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">
          Order Placed Successfully!
        </h1>
        
        <p className="text-lg text-gray-700 mb-8">
          Thank you for your order. We've received your request and will process it shortly.
        </p>

        {/* Delivery Info */}
        <div className="bg-white border-2 border-black rounded-lg p-6 mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Clock className="h-6 w-6 text-black" />
            <h2 className="text-xl font-semibold text-black">
              Delivery Information
            </h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Expect your order to arrive within <span className="font-semibold text-black">48 hours</span> or <span className="font-semibold text-black">2 days</span>.
          </p>
        </div>

        {/* Order Details */}
        {orderId && (
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-2">Order ID:</p>
            <p className="text-base font-mono font-semibold text-black">
              {orderId}
            </p>
          </div>
        )}
        
        <div className="flex items-center justify-center gap-2 text-gray-600 mb-6">
          <Package className="h-5 w-5" />
          <p className="text-sm">
            You will receive an order confirmation email shortly
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/products")}
            className="border-2 border-black text-black hover:bg-black hover:text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-black text-white hover:bg-gray-800 px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

