import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Product, ProductColor } from "@/constants/products";
// ANALYTICS DISABLED - Uncomment to enable
// import { trackAddToCart } from "@/components/MetaPixel";
// import { trackAddToCart as trackGAAddToCart } from "@/components/GoogleAnalytics";

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: string;
  image: string;
  size: string;
  color: ProductColor;
  quantity: number;
  totalPrice: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (
    product: Product,
    size: string,
    color: ProductColor | null,
    quantity: number
  ) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartItemCount: () => number;
  getCartTotal: () => number;
  isInCart: (
    productId: string,
    size: string,
    color: ProductColor | null
  ) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "tomus-cart";

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);

    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
      } catch (error) {
        console.error(
          "❌ CartProvider: Error loading cart from localStorage:",
          error
        );
        localStorage.removeItem(CART_STORAGE_KEY);
      }
    }

    setIsInitialized(true);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    }
  }, [cartItems, isInitialized]);

  const addToCart = (
    product: Product,
    size: string,
    color: ProductColor | null,
    quantity: number
  ) => {
    // Handle case where color is null (products without colors)
    const colorToUse = color || {
      name: "Default",
      value: "#000000",
      images: [product.image],
    };

    setCartItems((prevItems) => {
      // Check if item already exists with same product, size, and color
      const existingItemIndex = prevItems.findIndex(
        (item) =>
          item.productId === product.id &&
          item.size === size &&
          item.color.name === colorToUse.name
      );

      if (existingItemIndex !== -1) {
        // Update existing item quantity
        const updatedItems = [...prevItems];
        const existingItem = updatedItems[existingItemIndex];
        const newQuantity = existingItem.quantity + quantity;
        const priceValue = parseFloat(product.price.replace(/[^\d.]/g, ""));

        updatedItems[existingItemIndex] = {
          ...existingItem,
          quantity: newQuantity,
          totalPrice: priceValue * newQuantity,
        };
        return updatedItems;
      } else {
        // Add new item
        const priceValue = parseFloat(product.price.replace(/[^\d.]/g, ""));
        const newItem: CartItem = {
          id: `${product.id}-${size}-${colorToUse.name}-${Date.now()}`,
          productId: product.id,
          name: product.name,
          price: product.price,
          image: colorToUse.images[0] || product.image,
          size,
          color: colorToUse,
          quantity,
          totalPrice: priceValue * quantity,
        };
        const newCart = [...prevItems, newItem];

        // ANALYTICS DISABLED - Uncomment to enable
        // Track AddToCart event for Meta Pixel
        // trackAddToCart(priceValue * quantity, "GHS", product.id);

        // Track AddToCart event for Google Analytics
        // trackGAAddToCart(priceValue * quantity, "GHS", [
        //   {
        //     item_id: product.id,
        //     item_name: product.name,
        //     item_category: "Footwear",
        //     price: priceValue,
        //     quantity: quantity,
        //   },
        // ]);

        return newCart;
      }
    });
  };

  const removeFromCart = (itemId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === itemId) {
          const priceValue = parseFloat(item.price.replace(/[^\d.]/g, ""));
          return {
            ...item,
            quantity,
            totalPrice: priceValue * quantity,
          };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.totalPrice, 0);
  };

  const isInCart = (
    productId: string,
    size: string,
    color: ProductColor | null
  ) => {
    const colorName = color?.name || "Default";
    return cartItems.some(
      (item) =>
        item.productId === productId &&
        item.size === size &&
        item.color.name === colorName
    );
  };

  const value: CartContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartItemCount,
    getCartTotal,
    isInCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
