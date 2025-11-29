import { useState } from "react";
import { ArrowLeft, Truck, Package, Trash2 } from "lucide-react";
import { useNavigate } from "react-router";
import Select from "react-select";
import { useCart } from "@/contexts/CartContext";
import { LazyImage } from "@/components/LazyImage";
import { cn } from "@/lib/utils";
import { trackInitiateCheckout, trackPurchase } from "@/components/MetaPixel";
import { trackPurchase as trackGAPurchase, trackBeginCheckout } from "@/components/GoogleAnalytics";

interface ShippingInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  region: string;
  additionalInfo: string;
  shippingMethod: "delivery" | "pickup";
}

interface ValidationErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  location?: string;
}

interface RegionOption {
  value: string;
  label: string;
}

// Ghana regions data
const ghanaRegions: RegionOption[] = [
  { value: "", label: "Please choose" },
  { value: "ahafo", label: "Ahafo" },
  { value: "ashanti", label: "Ashanti" },
  { value: "bono", label: "Bono" },
  { value: "bono-east", label: "Bono East" },
  { value: "brong-ahafo", label: "Brong-Ahafo" },
  { value: "central", label: "Central" },
  { value: "eastern", label: "Eastern" },
  { value: "greater-accra", label: "Greater Accra" },
  { value: "north-east", label: "North East" },
  { value: "northern", label: "Northern" },
  { value: "oti", label: "Oti" },
  { value: "savannah", label: "Savannah" },
  { value: "upper-east", label: "Upper East" },
  { value: "upper-west", label: "Upper West" },
  { value: "volta", label: "Volta" },
  { value: "western", label: "Western" },
  { value: "western-north", label: "Western North" },
  { value: "outside-ghana", label: "Outside Ghana" },
];

// Declare PaystackPop as a global variable
declare global {
  interface Window {
    PaystackPop: {
      setup: (options: any) => {
        openIframe: () => void;
      };
    };
  }
}

const LUXURY_GOLD = "hsl(38 45% 59%)";
const LUXURY_GOLD_MUTED = "hsl(38 35% 50%)";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } =
    useCart();
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    region: "",
    additionalInfo: "",
    shippingMethod: "delivery",
  });
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );
  const [isProcessing, setIsProcessing] = useState(false);

  const deliveryCost = shippingInfo.shippingMethod === "delivery" ? 45.0 : 0;
  // const tax = getCartTotal() * 0.15; // 15% tax
  const tax = 0;
  const total = getCartTotal() + deliveryCost + tax;

  // Custom styles for React Select
  const selectStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      border: state.isFocused ? `2px solid ${LUXURY_GOLD}` : "1px solid #d1d5db",
      borderRadius: "0.5rem",
      boxShadow: state.isFocused ? `0 0 0 0 ${LUXURY_GOLD}` : "none",
      textAlign: "left",
      "&:hover": {
        border: "1px solid #9ca3af",
      },
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? LUXURY_GOLD
        : state.isFocused
          ? "#f3f4f6"
          : "white",
      color: state.isSelected ? "white" : "#374151",
      textAlign: "left",
      "&:hover": {
        backgroundColor: state.isSelected ? LUXURY_GOLD : "#f3f4f6",
      },
    }),
    menu: (provided: any) => ({
      ...provided,
      borderRadius: "0.5rem",
      boxShadow:
        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: "#9ca3af",
    }),
  };

  const handleInputChange = (field: keyof ShippingInfo, value: string) => {
    setShippingInfo((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear validation error when user starts typing
    if (validationErrors[field as keyof ValidationErrors]) {
      setValidationErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const handleShippingMethodChange = (method: "delivery" | "pickup") => {
    setShippingInfo((prev) => ({
      ...prev,
      shippingMethod: method,
    }));
  };

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};

    // Validate full name
    if (!shippingInfo.fullName.trim()) {
      errors.fullName = "Full name is required";
    }

    // Validate email
    if (!shippingInfo.email.trim()) {
      errors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(shippingInfo.email)) {
        errors.email = "Please enter a valid email address";
      }
    }

    // Validate phone
    if (!shippingInfo.phone.trim()) {
      errors.phone = "Phone number is required";
    }

    // Validate location
    if (!shippingInfo.location.trim()) {
      errors.location = "Location/Address is required";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const generateOrderId = () => {
    return `TOMUS-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  };

  const handleMakePayment = async () => {
    // Validate form before proceeding
    if (!validateForm()) {
      return;
    }

    // Track begin_checkout event for Google Analytics
    const items = cartItems.map(item => ({
      item_id: item.productId,
      item_name: item.name,
      item_category: "Footwear",
      price: parseFloat(item.price.replace(/[^\d.]/g, "")),
      quantity: item.quantity,
    }));
    trackBeginCheckout(total, "GHS", items);

    setIsProcessing(true);

    try {
      // Check if PaystackPop is available
      if (typeof window.PaystackPop === "undefined") {
        throw new Error(
          "Paystack is not loaded. Please check your internet connection."
        );
      }

      // Prepare payment data
      const orderId = generateOrderId();
      const paymentData = {
        email: shippingInfo.email,
        amount: Math.round(total * 100), // Convert to kobo (smallest currency unit)
        reference: orderId,
        metadata: {
          fullName: shippingInfo.fullName,
          phone: shippingInfo.phone,
          email: shippingInfo.email,
          location: shippingInfo.location,
          region: shippingInfo.region,
          shippingMethod: shippingInfo.shippingMethod,
          additionalInfo: shippingInfo.additionalInfo,
          items: cartItems.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            size: item.size,
            color: item.color,
            quantity: item.quantity,
          })),
        },
      };

      // Initialize Paystack payment
      const handler = window.PaystackPop.setup({
        key: "pk_live_698e365ac9893b43779ad106c7b7a6ffec9cc3c7", // Replace with your actual public key
        email: paymentData.email,
        amount: paymentData.amount,
        currency: "GHS", // Add currency parameter - Nigerian Naira
        reference: paymentData.reference,
        metadata: paymentData.metadata,
        callback: function (response: any) {
          // Payment successful
          console.log("Payment successful:", response.reference);

          // Track purchase event for Meta Pixel
          const contentIds = cartItems.map((item) => item.productId);
          trackPurchase(total, "GHS", contentIds);

          // Track purchase event for Google Analytics
          const items = cartItems.map(item => ({
            item_id: item.productId,
            item_name: item.name,
            item_category: "Footwear",
            price: parseFloat(item.price.replace(/[^\d.]/g, "")),
            quantity: item.quantity,
          }));
          trackGAPurchase(response.reference, total, "GHS", items);

          alert(
            "Payment successful! You will receive an order confirmation email shortly."
          );
          clearCart(); // Clear cart after successful payment
          navigate("/"); // Redirect to home page
        },
        onClose: function () {
          // Payment cancelled
          console.log("Payment cancelled");
          alert("Payment was cancelled. Please try again.");
          setIsProcessing(false);
        },
      });

      handler.openIframe();
    } catch (error) {
      console.error("Payment initialization error:", error);
      alert("Payment initialization failed. Please try again.");
      setIsProcessing(false);
    }
  };

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
          <h1 className="text-lg font-semibold">Checkout</h1>
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
              Add some products to your cart to proceed to checkout
            </p>
            <button
              onClick={() => navigate("/products")}
              className="bg-luxury-gold text-luxury-black px-6 py-3 rounded-lg font-medium transition-colors hover:bg-[hsl(var(--luxury-gold-muted))]"
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
        <h1 className="text-lg font-semibold">Checkout</h1>
        <div className="w-10" />
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        </div>
      </div>

      <div className="lg:container lg:mx-auto lg:px-4">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:py-8">
          {/* Cart Summary - Left Side (Desktop) / Top (Mobile) */}
          <div className="lg:order-1">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6 lg:mb-0">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Cart Summary
              </h2>

              {/* Cart Items */}
              <div className="space-y-4 mb-6">
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
                          -
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
                          +
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

              {/* Order Summary */}
              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Order Summary
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">
                      ₵{getCartTotal().toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Delivery fee{" "}
                      {shippingInfo.shippingMethod === "pickup"
                        ? "(Free for pickup)"
                        : "(fee varies)"}
                    </span>
                    <span className="font-medium">
                      ₵{deliveryCost.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (0%)</span>
                    <span className="font-medium">₵{tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between text-base font-semibold">
                    <span>Total</span>
                    <span>₵{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Information - Right Side (Desktop) / Bottom (Mobile) */}
          <div className="lg:order-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Shipping Information
              </h2>

              {/* Shipping Method Selection */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  Shipping Method
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleShippingMethodChange("delivery")}
                    className={cn(
                      "flex items-center gap-3 p-4 border-2 rounded-lg transition-colors",
                      shippingInfo.shippingMethod === "delivery"
                        ? "border-luxury-gold bg-[hsl(var(--luxury-gold))/0.05]"
                        : "border-gray-200 hover:border-gray-300"
                    )}
                  >
                    <div
                      className={cn(
                        "w-4 h-4 rounded-full border-2 flex items-center justify-center",
                        shippingInfo.shippingMethod === "delivery"
                          ? "border-luxury-gold bg-luxury-gold"
                          : "border-gray-300"
                      )}
                    >
                      {shippingInfo.shippingMethod === "delivery" && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <Truck className="h-5 w-5 text-gray-600" />
                    <span className="font-medium">Delivery</span>
                  </button>

                  <button
                    onClick={() => handleShippingMethodChange("pickup")}
                    className={cn(
                      "flex items-center gap-3 p-4 border-2 rounded-lg transition-colors",
                      shippingInfo.shippingMethod === "pickup"
                        ? "border-luxury-gold bg-[hsl(var(--luxury-gold))/0.05]"
                        : "border-gray-200 hover:border-gray-300"
                    )}
                  >
                    <div
                      className={cn(
                        "w-4 h-4 rounded-full border-2 flex items-center justify-center",
                        shippingInfo.shippingMethod === "pickup"
                          ? "border-luxury-gold bg-luxury-gold"
                          : "border-gray-300"
                      )}
                    >
                      {shippingInfo.shippingMethod === "pickup" && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <Package className="h-5 w-5 text-gray-600" />
                    <span className="font-medium">Pick up</span>
                  </button>
                </div>

                {/* Delivery Fee Information */}
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-xs text-blue-700 leading-relaxed">
                    Delivery fees may vary depending on your location. Final
                    charges will be confirmed at checkout or by our team before
                    dispatch.
                  </p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <div>
                  <label className="block text-left text-sm font-medium text-gray-700 mb-2">
                    Full name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={shippingInfo.fullName}
                    onChange={(e) =>
                      handleInputChange("fullName", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--luxury-gold))] focus:border-transparent"
                    placeholder="Enter your full name"
                    required
                  />
                  {validationErrors.fullName && (
                    <p className="text-red-500 text-xs mt-1 text-left">
                      {validationErrors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-left text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={shippingInfo.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--luxury-gold))] focus:border-transparent"
                    placeholder="Enter your email address"
                    required
                  />
                  {validationErrors.email && (
                    <p className="text-red-500 text-xs mt-1 text-left">
                      {validationErrors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-left text-sm font-medium text-gray-700 mb-2">
                    Phone number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={shippingInfo.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--luxury-gold))] focus:border-transparent"
                    placeholder="Enter your phone number"
                    required
                  />
                  {validationErrors.phone && (
                    <p className="text-red-500 text-xs mt-1 text-left">
                      {validationErrors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-left text-sm font-medium text-gray-700 mb-2">
                    Location/Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={shippingInfo.location}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--luxury-gold))] focus:border-transparent"
                    placeholder="Enter your location or address"
                    required
                  />
                  {validationErrors.location && (
                    <p className="text-red-500 text-xs mt-1 text-left">
                      {validationErrors.location}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-left text-sm font-medium text-gray-700 mb-2">
                    Region/State
                  </label>
                  <Select
                    options={ghanaRegions}
                    value={ghanaRegions.find(
                      (option) => option.value === shippingInfo.region
                    )}
                    onChange={(selectedOption) =>
                      handleInputChange("region", selectedOption?.value || "")
                    }
                    placeholder="Select your region"
                    styles={selectStyles}
                    isClearable={false}
                    isSearchable={true}
                  />
                </div>

                <div>
                  <label className="block text-left text-sm font-medium text-gray-700 mb-2">
                    Additional Information
                  </label>
                  <textarea
                    value={shippingInfo.additionalInfo}
                    onChange={(e) =>
                      handleInputChange("additionalInfo", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--luxury-gold))] focus:border-transparent resize-none"
                    rows={4}
                    placeholder="Enter any relevant information (location details, order customization, etc.)"
                  />
                </div>
              </div>

              {/* Make Payment Button */}
              <div className="mt-8">
                <button
                  onClick={handleMakePayment}
                  disabled={isProcessing}
                  className="w-full bg-luxury-gold text-luxury-black py-3 px-6 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[hsl(var(--luxury-gold-muted))]"
                >
                  {isProcessing
                    ? "Processing..."
                    : `Make Payment - ₵${total.toFixed(2)}`}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
