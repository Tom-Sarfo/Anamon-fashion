import { useState, useEffect } from "react";
import { ArrowLeft, Heart, Star, ShoppingCart } from "lucide-react";
import { Product, ProductColor, PRODUCTS } from "@/constants/products";
import { ProductImageCarousel } from "@/components/ProductImageCarousel";
import { SizeSelector } from "@/components/SizeSelector";
import { ColorSelector } from "@/components/ColorSelector";
import { QuantitySelector } from "@/components/QuantitySelector";
import { cn } from "@/lib/utils";
import { useParams, useNavigate } from "react-router";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";
// ANALYTICS DISABLED - Uncomment to enable
// import { trackViewContent } from "@/components/MetaPixel";
// import { trackViewItem } from "@/components/GoogleAnalytics";

export const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [currentImages, setCurrentImages] = useState<string[]>([]);
  const [sizeError, setSizeError] = useState(false);

  // Scroll to top when component mounts or productId changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  useEffect(() => {
    if (productId) {
      const foundProduct = PRODUCTS.find((p) => p.id === productId);
      if (foundProduct) {
        setProduct(foundProduct);
        // Always start with the product's main images
        setCurrentImages(foundProduct.images || [foundProduct.image]);
        // Don't auto-select first color, let user choose
        setSelectedColor(null);

        // ANALYTICS DISABLED - Uncomment to enable
        // Track ViewContent event for Meta Pixel
        // const priceValue = parseFloat(
        //   foundProduct.price.replace(/[^\d.]/g, "")
        // );
        // trackViewContent(foundProduct.id, priceValue, "GHS");
        
        // Track view_item event for Google Analytics
        // trackViewItem(foundProduct.id, foundProduct.name, "Footwear", priceValue, "GHS");
      }
    }
  }, [productId]);

  useEffect(() => {
    if (selectedColor) {
      // Only show color images when user explicitly selects a color
      setCurrentImages(selectedColor.images);
    } else if (product) {
      // Show all product images when no color is selected
      setCurrentImages(product.images || [product.image]);
    }
  }, [selectedColor, product]);

  // Clear size error when size is selected
  useEffect(() => {
    if (selectedSize) {
      setSizeError(false);
    }
  }, [selectedSize]);

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="text-lg font-semibold">Product not found</div>
          <button
            onClick={() => navigate("/products")}
            className="mt-4 text-primary hover:underline"
          >
            Back to products
          </button>
        </div>
      </div>
    );
  }

  const handleFavoriteToggle = () => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    // Skip color validation if there's only one color or no colors
    if (product.colors && product.colors.length > 1 && !selectedColor) {
      alert("Please select a color");
      return;
    }

    // Use the first color if only one is available, or the selected color
    const colorToUse =
      product.colors && product.colors.length === 1
        ? product.colors[0]
        : selectedColor;

    addToCart(product, selectedSize, colorToUse, quantity);
    // Navigate to cart after adding
    navigate("/cart");
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    // Skip color validation if there's only one color or no colors
    if (product.colors && product.colors.length > 1 && !selectedColor) {
      alert("Please select a color");
      return;
    }

    // Use the first color if only one is available, or the selected color
    const colorToUse =
      product.colors && product.colors.length === 1
        ? product.colors[0]
        : selectedColor;

    addToCart(product, selectedSize, colorToUse, quantity);
    navigate("/cart");
  };

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
        <h1 className="text-lg font-semibold">Product Details</h1>
        <button
          onClick={handleFavoriteToggle}
          className={cn(
            "flex items-center justify-center rounded-full p-2 transition-colors",
            isFavorite(product.id)
              ? "text-red-500"
              : "text-gray-600 hover:text-red-500"
          )}
          aria-label={
            isFavorite(product.id)
              ? "Remove from favorites"
              : "Add to favorites"
          }
        >
          <Heart
            className={cn("h-5 w-5", isFavorite(product.id) && "fill-current")}
          />
        </button>
      </div>

      <div className="lg:container lg:mx-auto lg:px-4">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:py-8">
          {/* Product Images - Left Side */}
          <div className="lg:sticky lg:top-8">
            <ProductImageCarousel
              images={currentImages}
              productName={product.name}
              className="lg:rounded-lg"
            />
          </div>

          {/* Product Details - Right Side */}
          <div className="bg-white px-4 py-6 lg:px-0 lg:py-0">
            {/* Product Info */}
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <h1 className="text-2xl font-bold text-gray-900 lg:text-3xl">
                  {product.name}
                </h1>
                <button
                  onClick={handleFavoriteToggle}
                  className={cn(
                    "hidden rounded-full p-2 transition-colors lg:flex",
                    isFavorite(product.id)
                      ? "text-red-500"
                      : "text-gray-600 hover:text-red-500"
                  )}
                  aria-label={
                    isFavorite(product.id)
                      ? "Remove from favorites"
                      : "Add to favorites"
                  }
                >
                  <Heart
                    className={cn(
                      "h-6 w-6",
                      isFavorite(product.id) && "fill-current"
                    )}
                  />
                </button>
              </div>

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-sm font-medium">
                      {product.rating}
                    </span>
                  </div>
                  {product.reviewCount && (
                    <span className="text-sm text-gray-500">
                      ({product.reviewCount} reviews)
                    </span>
                  )}
                </div>
              )}

              {/* Price */}
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-gray-900 lg:text-3xl">
                  {product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">
                    {product.originalPrice}
                  </span>
                )}
              </div>

              {/* Stock Status */}
              {product.inStock !== undefined && (
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "rounded-full px-3 py-1 text-xs font-medium",
                      product.inStock
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    )}
                  >
                    {product.inStock ? "In stock" : "Out of stock"}
                  </div>
                  {product.stockCount && product.stockCount <= 5 && (
                    <span className="text-sm text-gray-600">
                      Last {product.stockCount} left - make it yours!
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mt-6">
                <ColorSelector
                  colors={product.colors}
                  selectedColor={selectedColor}
                  onColorSelect={setSelectedColor}
                />
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mt-6">
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                    Size
                  </h3>
                  {sizeError && (
                    <span className="text-xs text-red-500 font-medium">
                      Please select a size
                    </span>
                  )}
                </div>
                <SizeSelector
                  sizes={product.sizes}
                  selectedSize={selectedSize}
                  onSizeSelect={setSelectedSize}
                />
              </div>
            )}

            {/* Quantity Selection */}
            <div className="mt-6">
              <h3 className="text-left mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">
                Quantity
              </h3>
              <QuantitySelector
                quantity={quantity}
                onQuantityChange={setQuantity}
                max={product.stockCount || 99}
              />
            </div>

            {/* Description */}
            {product.description && (
              <div className="mt-6">
                <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">
                  About
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {product.description}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-8 flex gap-3">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 flex items-center justify-center gap-2 rounded-lg border-2 border-black bg-white px-6 py-3 text-black font-medium transition-all hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-black"
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </button>

              <button
                onClick={handleBuyNow}
                disabled={!product.inStock}
                className="flex-1 flex items-center justify-center rounded-lg bg-black px-6 py-3 text-white font-medium transition-all hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
