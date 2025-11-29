import { ArrowLeft, Trash2, Minus, Plus } from "lucide-react";
import { useNavigate } from "react-router";
import { useCart } from "@/contexts/CartContext";
import { LazyImage } from "@/components/LazyImage";

export default function CartPage() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

  const deliveryCost = 45.0;
  // const tax = getCartTotal() * 0.15; // 15% tax
  const tax = 0;

  const total = getCartTotal() + deliveryCost + tax;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header - Mobile */}
        <div className="sticky top-0 z-40 flex items-center justify-between bg-white px-4 py-3 shadow-sm lg:hidden">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center rounded-full p-2 hover:bg-gray-100"
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-semibold">My Cart</h1>
          <div className="w-10" />
        </div>

        {/* Empty Cart */}
        <div className="flex min-h-screen items-center justify-center px-4">
          <div className="text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-6">
              Add some products to your cart to get started
            </p>
            <button
              onClick={() => navigate("/products")}
              className="bg-black text-white px-6 py-3 rounded-lg font-medium transition-colors hover:bg-gray-800"
            >
              Browse Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header - Mobile */}
      <div className="sticky top-0 z-40 flex items-center justify-between bg-white px-4 py-3 shadow-sm lg:hidden">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center rounded-full p-2 hover:bg-gray-100"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-semibold">My Cart</h1>
        <div className="w-10" />
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900">My Cart</h1>
        </div>
      </div>

      <div className="lg:container lg:mx-auto lg:px-4">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:py-8">
          {/* Cart Items - Left Side (Desktop) / Top (Mobile) */}
          <div className="lg:order-1">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6 lg:mb-0">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Cart Items
              </h2>

              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex-shrink-0">
                      <LazyImage
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Size: {item.size} | Color: {item.color.name}
                      </p>
                      <p className="text-sm font-medium text-gray-900">
                        {item.price}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-3 py-1 text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary - Right Side (Desktop) / Bottom (Mobile) */}
          <div className="lg:order-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Order Summary
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">
                    ₵{getCartTotal().toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Delivery fee (fee varies)
                  </span>
                  <span className="font-medium">
                    ₵{deliveryCost.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (0%)</span>
                  <span className="font-medium">₵{tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-4 flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>₵{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Coupon Code */}
              <div className="mt-6">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--luxury-gold))] focus:border-transparent"
                  />
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    Apply
                  </button>
                </div>
              </div>

              {/* Proceed to Checkout Button */}
              <div className="mt-6">
                <button
                  onClick={() => navigate("/checkout")}
                  className="w-full bg-black text-white py-3 px-6 rounded-lg font-medium transition-colors hover:bg-gray-800"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
