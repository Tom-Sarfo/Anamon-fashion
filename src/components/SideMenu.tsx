import {
  X,
  Home,
  User,
  ShoppingBag,
  Heart,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useNavigate } from "react-router";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { id: "home", label: "Home", icon: Home, path: "/" },
  { id: "about", label: "About Us", icon: User, path: "/about" },
  { id: "products", label: "Products", icon: ShoppingBag, path: "/products" },
  { id: "cart", label: "My Cart", icon: ShoppingBag, path: "/cart" },
  { id: "favorites", label: "Favorites", icon: Heart, path: "/favorites" },
  { id: "settings", label: "Settings", icon: Settings, path: "/settings" },
];

export const SideMenu = ({ isOpen, onClose }: SideMenuProps) => {
  const navigate = useNavigate();
  const { getCartItemCount } = useCart();
  const { getFavoritesCount } = useFavorites();

  const handleMenuClick = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-[280px] sm:w-[320px] p-0">
        <SheetHeader className="px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-semibold text-black">
              Anamon
            </SheetTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              {/* <X className="h-5 w-5" /> */}
            </Button>
          </div>
        </SheetHeader>

        <div className="flex flex-col py-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant="ghost"
                className="group justify-start px-6 py-4 h-auto text-left hover:bg-muted/50 hover:text-black relative"
                onClick={() => handleMenuClick(item.path)}
              >
                <Icon className="h-5 w-5 mr-3 text-muted-foreground group-hover:text-black transition-colors" />
                <span className="text-base font-medium text-foreground group-hover:text-black transition-colors">{item.label}</span>
                {item.id === "cart" && getCartItemCount() > 0 && (
                  <span className="absolute right-4 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {getCartItemCount() > 99 ? "99+" : getCartItemCount()}
                  </span>
                )}
                {item.id === "favorites" && getFavoritesCount() > 0 && (
                  <span className="absolute right-4 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {getFavoritesCount() > 99 ? "99+" : getFavoritesCount()}
                  </span>
                )}
              </Button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t">
          <div className="text-sm text-muted-foreground text-center">
            © 2025 Anamon Fashion
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
