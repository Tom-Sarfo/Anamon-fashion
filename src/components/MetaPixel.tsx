import { useEffect } from "react";

// Extend the Window interface to include fbq
declare global {
  interface Window {
    fbq: (action: string, event: string, data?: any) => void;
  }
}

interface MetaPixelProps {
  pixelId: string;
}

export const MetaPixel: React.FC<MetaPixelProps> = ({ pixelId }) => {
  useEffect(() => {
    // Initialize Meta Pixel if not already loaded
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("init", pixelId);
      window.fbq("track", "PageView");
    }
  }, [pixelId]);

  return null; // This component doesn't render anything
};

// Utility functions for tracking events
export const trackEvent = (eventName: string, data?: any) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", eventName, data);
  }
};

// Common e-commerce events
export const trackPurchase = (
  value: number,
  currency: string = "GHS",
  contentIds?: string[]
) => {
  trackEvent("Purchase", {
    value: value,
    currency: currency,
    content_ids: contentIds,
  });
};

export const trackAddToCart = (
  value: number,
  currency: string = "GHS",
  contentId?: string
) => {
  trackEvent("AddToCart", {
    value: value,
    currency: currency,
    content_id: contentId,
  });
};

export const trackViewContent = (
  contentId: string,
  value?: number,
  currency: string = "GHS"
) => {
  trackEvent("ViewContent", {
    content_id: contentId,
    value: value,
    currency: currency,
  });
};

export const trackInitiateCheckout = (
  value: number,
  currency: string = "GHS",
  contentIds?: string[]
) => {
  trackEvent("InitiateCheckout", {
    value: value,
    currency: currency,
    content_ids: contentIds,
  });
};

export const trackCompleteRegistration = () => {
  trackEvent("CompleteRegistration");
};

export const trackContact = () => {
  trackEvent("Contact");
};
