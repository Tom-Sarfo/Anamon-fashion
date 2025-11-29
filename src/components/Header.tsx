import { Menu, Search, Bell, Settings, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchDropdown } from "./SearchDropdown";
import { SearchModal } from "./SearchModal";
import { SideMenu } from "./SideMenu";
import { useState } from "react";
import { Product } from "@/constants/products";
import { useNavigate } from "react-router";
import { useCart } from "@/contexts/CartContext";

interface HeaderProps {
  products: Product[];
  isSearchModalOpen: boolean;
  onSearchModalClose: () => void;
}

export const Header = ({
  products,
  isSearchModalOpen,
  onSearchModalClose,
}: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { getCartItemCount } = useCart();

  const handleMenuClick = () => {
    setIsMenuOpen(true);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const handleNavigate = (page: string) => {
    switch (page) {
      case "home":
        navigate("/");
        break;
      case "about":
        navigate("/about");
        break;
      case "contact":
        navigate("/contact");
        break;
      case "products":
        navigate("/products");
        break;
      case "settings":
        navigate("/settings");
        break;
      case "favorites":
        navigate("/favorites");
        break;
      case "notifications":
        navigate("/notifications");
        break;
      default:
        navigate("/");
    }
  };

  const handleProductSelect = (product: Product) => {
    navigate(`/product/${product.id}`);
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  return (
    <>
      <header className="flex items-center justify-between p-4 bg-background border-b border-border">
        {/* Left side - Menu and Search */}
        <div className="flex items-center gap-4 flex-1">
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0"
            onClick={handleMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Desktop Search */}
          <div className="hidden md:block flex-1 max-w-md">
            <SearchDropdown
              products={products}
              onProductSelect={handleProductSelect}
            />
          </div>
        </div>

        {/* Center - Logo */}
        <button
          onClick={() => navigate("/")}
          className="flex-shrink-0 flex items-center gap-2 focus:outline-none"
        >
          <span className="text-xl md:text-2xl font-bold text-foreground cursor-pointer hover:opacity-80 transition-opacity">
            Anamon
          </span>
        </button>

        {/* Right side - Icons */}
        <div className="flex items-center gap-2 flex-1 justify-end">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCartClick}
            className="relative"
          >
            <ShoppingBag className="h-5 w-5" />
            {getCartItemCount() > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                {getCartItemCount() > 99 ? "99+" : getCartItemCount()}
              </span>
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex"
            onClick={() => handleNavigate("settings")}
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Side Menu */}
      <SideMenu isOpen={isMenuOpen} onClose={handleMenuClose} />

      {/* Mobile Search Modal */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={onSearchModalClose}
        products={products}
      />
    </>
  );
};
