import React, { useState } from "react";
import { X, ShoppingBag, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";
import { useAbandonedCart } from "@/contexts/AbandonedCartContext";
import { useCart } from "@/contexts/CartContext";
import { LazyImage } from "./LazyImage";

export const AbandonedCartCallout: React.FC = () => {
  const navigate = useNavigate();
  const { showAbandonedCartCallout, dismissAbandonedCartCallout } =
    useAbandonedCart();
  const { cartItems, getCartTotal } = useCart();
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  if (!showAbandonedCartCallout || cartItems.length === 0) {
    return null;
  }

  const total = getCartTotal();
  const itemCount = cartItems.length;
  const firstItem = cartItems[0];

  const handleCompleteOrder = () => {
    navigate("/checkout");
  };

  const handleDismiss = () => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      dismissAbandonedCartCallout();
      setIsAnimatingOut(false);
    }, 300);
  };

  return (
    <div
      className={`fixed top-4 right-4 z-50 w-80 bg-white rounded-lg shadow-lg border border-gray-200 ${isAnimatingOut ? "animate-out" : "animate-in"}`}
    >
      {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5 text-luxury-gold" />
          <h3 className="font-semibold text-gray-900">Complete Your Order</h3>
        </div>
        <button
          onClick={handleDismiss}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Dismiss callout"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Cart Preview */}
        <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex-shrink-0">
            <LazyImage
              src={firstItem.image}
              alt={firstItem.name}
              className="w-12 h-12 object-cover rounded-lg"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-gray-900 truncate">
              {firstItem.name}
            </p>
            <p className="text-sm text-gray-500">
              {itemCount} {itemCount === 1 ? "item" : "items"} in cart
            </p>
            <p className="text-sm font-semibold text-luxury-gold">
              ₵{total.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Message */}
        <div className="mb-4">
          <p className="text-sm text-gray-700 leading-relaxed">
            Don't miss out! Your items are waiting for you. Complete your
            purchase now and enjoy your new products.
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={handleCompleteOrder}
          className="w-full bg-luxury-gold text-luxury-black py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 hover:bg-[hsl(var(--luxury-gold-muted))]"
        >
          Complete Order
          <ArrowRight className="h-4 w-4" />
        </button>

        {/* Dismiss Link */}
        <button
          onClick={handleDismiss}
          className="w-full text-center text-sm text-gray-500 hover:text-gray-700 mt-2 transition-colors"
        >
          Maybe later
        </button>
      </div>
    </div>
  );
};
