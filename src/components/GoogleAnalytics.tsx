import { useEffect } from 'react';

// Extend the Window interface to include gtag
declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: any) => void;
    dataLayer: any[];
  }
}

interface GoogleAnalyticsProps {
  measurementId: string;
}

export const GoogleAnalytics: React.FC<GoogleAnalyticsProps> = ({ measurementId }) => {
  useEffect(() => {
    // Initialize Google Analytics if not already loaded
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', measurementId);
    }
  }, [measurementId]);

  return null; // This component doesn't render anything
};

// Utility functions for tracking events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// E-commerce tracking functions
export const trackPurchase = (transactionId: string, value: number, currency: string = 'GHS', items?: any[]) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: transactionId,
      value: value,
      currency: currency,
      items: items,
    });
  }
};

export const trackAddToCart = (value: number, currency: string = 'GHS', items?: any[]) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'add_to_cart', {
      currency: currency,
      value: value,
      items: items,
    });
  }
};

export const trackViewItem = (itemId: string, itemName: string, category: string, value: number, currency: string = 'GHS') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'view_item', {
      currency: currency,
      value: value,
      items: [{
        item_id: itemId,
        item_name: itemName,
        item_category: category,
        price: value,
        quantity: 1,
      }],
    });
  }
};

export const trackBeginCheckout = (value: number, currency: string = 'GHS', items?: any[]) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'begin_checkout', {
      currency: currency,
      value: value,
      items: items,
    });
  }
};

export const trackContact = () => {
  trackEvent('contact', 'engagement');
};

export const trackSearch = (searchTerm: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'search', {
      search_term: searchTerm,
    });
  }
};

export const trackPageView = (pagePath: string, pageTitle?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-J8VM57QN5N', {
      page_path: pagePath,
      page_title: pageTitle,
    });
  }
};
