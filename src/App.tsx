import { useState } from "react";
import { Routes, Route, useLocation } from "react-router";
import { Header } from "@/components/Header";
import { BottomNavigation } from "@/components/BottomNavigation";
import { SearchModal } from "@/components/SearchModal";
import { SideMenu } from "@/components/SideMenu";
import { AbandonedCartCallout } from "@/components/AbandonedCartCallout";
// ANALYTICS DISABLED - Uncomment to enable
// import { MetaPixel } from "@/components/MetaPixel";
// import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { Home } from "@/pages/Home";
import { Products } from "@/pages/Products";
import { ProductDetail } from "@/pages/ProductDetail";
import { AboutUs } from "@/pages/AboutUs";
import { Contact } from "@/pages/Contact";
import Favorites from "@/pages/Favorites";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import OrderSuccess from "@/pages/OrderSuccess";
import { Settings } from "@/pages/Settings";
import { Notifications } from "@/pages/Notifications";
import NotFound from "@/pages/NotFound";
import { useDarkMode } from "@/hooks/use-dark-mode";
import { PRODUCTS } from "@/constants/products";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import NeoSuede from "@/pages/NeoSuede";
function App() {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const location = useLocation();

  const getCurrentPage = () => {
    const path = location.pathname;
    if (path === "/") return "home";
    if (path === "/products") return "products";
    if (path === "/about") return "about";
    if (path === "/contact") return "contact";
    if (path === "/favorites") return "favorites";
    if (path === "/cart") return "cart";
    if (path === "/checkout") return "checkout";
    if (path === "/settings") return "settings";
    if (path === "/notifications") return "notifications";
    if (path.startsWith("/product/")) return "product";
    return "home";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* ANALYTICS DISABLED - Uncomment to enable */}
      {/* <MetaPixel pixelId="1299330035267164" /> */}
      {/* <GoogleAnalytics measurementId="G-J8VM57QN5N" /> */}
      <Header
        products={PRODUCTS}
        isSearchModalOpen={isSearchModalOpen}
        onSearchModalClose={() => setIsSearchModalOpen(false)}
      />

      <main className="pb-20 md:pb-4">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/neosuede" element={<NeoSuede />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route
            path="/settings"
            element={
              <Settings
                isDarkMode={isDarkMode}
                onToggleDarkMode={toggleDarkMode}
              />
            }
          />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <BottomNavigation
        currentPage={getCurrentPage()}
        onSearchClick={() => setIsSearchModalOpen(true)}
      />

      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        products={PRODUCTS}
      />

      <SideMenu
        isOpen={isSideMenuOpen}
        onClose={() => setIsSideMenuOpen(false)}
      />

      <AbandonedCartCallout />
    </div>
  );
}

export default App;
