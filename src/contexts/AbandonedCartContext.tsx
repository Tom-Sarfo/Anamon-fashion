import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useCart } from "./CartContext";

interface AbandonedCartContextType {
  showAbandonedCartCallout: boolean;
  dismissAbandonedCartCallout: () => void;
  hasAbandonedCart: boolean;
}

const AbandonedCartContext = createContext<
  AbandonedCartContextType | undefined
>(undefined);

const ABANDONED_CART_STORAGE_KEY = "abandoned_cart_callout_dismissed";

export const useAbandonedCart = () => {
  const context = useContext(AbandonedCartContext);
  if (context === undefined) {
    throw new Error(
      "useAbandonedCart must be used within an AbandonedCartProvider"
    );
  }
  return context;
};

export const AbandonedCartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { cartItems, getCartTotal } = useCart();
  const [showAbandonedCartCallout, setShowAbandonedCartCallout] =
    useState(false);
  const [hasAbandonedCart, setHasAbandonedCart] = useState(false);
  const [previousCartLength, setPreviousCartLength] = useState(0);

  // Check if user has items in cart and hasn't dismissed the callout
  useEffect(() => {
    const isCalloutDismissed =
      localStorage.getItem(ABANDONED_CART_STORAGE_KEY) === "true";
    const hasItemsInCart = cartItems.length > 0;

    setHasAbandonedCart(hasItemsInCart);

    // Reset dismissed state if cart was empty and now has items (new abandoned cart)
    if (hasItemsInCart && previousCartLength === 0 && isCalloutDismissed) {
      localStorage.removeItem(ABANDONED_CART_STORAGE_KEY);
      setShowAbandonedCartCallout(true);
    }
    // Show callout if user has items in cart and hasn't dismissed it
    else if (hasItemsInCart && !isCalloutDismissed) {
      setShowAbandonedCartCallout(true);
    } else {
      setShowAbandonedCartCallout(false);
    }

    setPreviousCartLength(cartItems.length);
  }, [cartItems, previousCartLength]);

  const dismissAbandonedCartCallout = () => {
    setShowAbandonedCartCallout(false);
    localStorage.setItem(ABANDONED_CART_STORAGE_KEY, "true");
  };

  const value: AbandonedCartContextType = {
    showAbandonedCartCallout,
    dismissAbandonedCartCallout,
    hasAbandonedCart,
  };

  return (
    <AbandonedCartContext.Provider value={value}>
      {children}
    </AbandonedCartContext.Provider>
  );
};
