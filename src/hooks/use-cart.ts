import { useState, useEffect } from "react";
import { Product, ProductColor } from "@/constants/products";

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

interface UseCartReturn {
  cartItems: CartItem[];
  addToCart: (
    product: Product,
    size: string,
    color: ProductColor,
    quantity: number
  ) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartItemCount: () => number;
  getCartTotal: () => number;
  isInCart: (productId: string, size: string, color: ProductColor) => boolean;
}

const CART_STORAGE_KEY = "tomus-cart";

export const useCart = (): UseCartReturn => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error loading cart from localStorage:", error);
        localStorage.removeItem(CART_STORAGE_KEY);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (
    product: Product,
    size: string,
    color: ProductColor,
    quantity: number
  ) => {
    setCartItems((prevItems) => {
      // Check if item already exists with same product, size, and color
      const existingItemIndex = prevItems.findIndex(
        (item) =>
          item.productId === product.id &&
          item.size === size &&
          item.color.name === color.name
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
          id: `${product.id}-${size}-${color.name}-${Date.now()}`,
          productId: product.id,
          name: product.name,
          price: product.price,
          image: color.images[0] || product.image,
          size,
          color,
          quantity,
          totalPrice: priceValue * quantity,
        };
        return [...prevItems, newItem];
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

  const isInCart = (productId: string, size: string, color: ProductColor) => {
    return cartItems.some(
      (item) =>
        item.productId === productId &&
        item.size === size &&
        item.color.name === color.name
    );
  };

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartItemCount,
    getCartTotal,
    isInCart,
  };
};
