import { Home, Search, ShoppingBag, Users, User, Heart } from "lucide-react";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";

interface BottomNavigationProps {
  currentPage: string;
  onSearchClick: () => void;
}

export const BottomNavigation = ({
  currentPage,
  onSearchClick,
}: BottomNavigationProps) => {
  const navigate = useNavigate();
  const { getCartItemCount } = useCart();
  const { getFavoritesCount } = useFavorites();

  const handleNavigate = (page: string) => {
    switch (page) {
      case "home":
        navigate("/");
        break;
      case "about":
        navigate("/about");
        break;
      case "products":
        navigate("/products");
        break;
      case "favorites":
        navigate("/favorites");
        break;
      case "cart":
        navigate("/cart");
        break;
      default:
        navigate("/");
    }
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50">
      <div className="flex items-center justify-around py-2">
        <Button
          variant="ghost"
          size="icon"
          className={`flex flex-col items-center gap-1 h-auto py-2 ${
            currentPage === "home" ? "text-primary" : "text-muted-foreground"
          }`}
          onClick={() => handleNavigate("home")}
        >
          <Home className="h-5 w-5" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className={`flex flex-col items-center gap-1 h-auto py-2 ${
            currentPage === "search" ? "text-primary" : "text-muted-foreground"
          }`}
          onClick={onSearchClick}
        >
          <Search className="h-5 w-5" />
        </Button>

        <Button
          variant="default"
          size="icon"
          className={`rounded-full bg-black text-white h-12 w-12 ${
            currentPage === "products" ? "ring-2 ring-primary/20" : ""
          }`}
          onClick={() => handleNavigate("products")}
        >
          <StorefrontIcon style={{ width: "24px", height: "24px" }} />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className={`flex flex-col items-center gap-1 h-auto py-2 relative ${
            currentPage === "favorites"
              ? "text-primary"
              : "text-muted-foreground"
          }`}
          onClick={() => handleNavigate("favorites")}
        >
          <Heart className="h-5 w-5" />
          {getFavoritesCount() > 0 && (
            <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium">
              {getFavoritesCount() > 9 ? "9+" : getFavoritesCount()}
            </span>
          )}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className={`flex flex-col items-center gap-1 h-auto py-2 relative ${
            currentPage === "cart" ? "text-primary" : "text-muted-foreground"
          }`}
          onClick={() => handleNavigate("cart")}
        >
          <ShoppingBag className="h-5 w-5" />
          {getCartItemCount() > 0 && (
            <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium">
              {getCartItemCount() > 9 ? "9+" : getCartItemCount()}
            </span>
          )}
        </Button>
      </div>
    </nav>
  );
};
