import { Heart, ShoppingBag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LazyImage } from "./LazyImage";
import { useFavorites } from "@/contexts/FavoritesContext";

interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  image: string;
  externalUrl: string;
  isBestSeller?: boolean;
  onProductSelect?: (productId: string) => void;
}

export const ProductCard = ({
  id,
  name,
  price,
  image,
  externalUrl,
  isBestSeller = false,
  onProductSelect,
}: ProductCardProps) => {
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();

  const handleCardClick = () => {
    if (onProductSelect) {
      onProductSelect(id);
    } else {
      window.open(externalUrl, "_blank", "noopener,noreferrer");
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when clicking favorite button
    if (isFavorite(id)) {
      removeFromFavorites(id);
    } else {
      // We need to create a product object for the favorites context
      const product = {
        id,
        name,
        price,
        image,
        externalUrl,
      };
      addToFavorites(product);
    }
  };

  const handleBuyNowClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onProductSelect) {
      onProductSelect(id);
    } else {
      window.open(externalUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <Card
      className="bg-white border-0 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col cursor-pointer group"
      onClick={handleCardClick}
    >
      <CardContent className="p-0 flex flex-col h-full">
        {/* Upper Section - Product Image Area */}
        <div className="relative bg-white p-4 pb-2 flex-1 flex flex-col">
          {/* Best Seller Badge */}
          {isBestSeller && (
            <div className="absolute top-3 left-3 z-10">
              <Badge className="bg-luxury-gold text-white text-xs font-medium px-3 py-1 rounded-full border-0 shadow-sm">
                New Arrival
              </Badge>
            </div>
          )}

          {/* Favorite Button */}
          <div className="absolute top-3 right-3 z-10">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full bg-white/80 hover:bg-white shadow-sm"
              onClick={handleFavoriteClick}
              aria-label={
                isFavorite(id) ? "Remove from favorites" : "Add to favorites"
              }
            >
              <Heart
                className={`h-4 w-4 ${isFavorite(id) ? "fill-red-500 text-red-500" : "text-gray-400"}`}
              />
            </Button>
          </div>

          {/* Product Image */}
          <div className="flex-1 flex justify-center items-center mb-2">
            <LazyImage
              src={image}
              alt={name}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-1 mt-2">
            <div className="w-2 h-2 rounded-full bg-luxury-gold"></div>
            <div className="w-2 h-2 rounded-full bg-[#8B5A9B]"></div>
            <div className="w-2 h-2 rounded-full bg-[#B8A5C4]"></div>
          </div>
        </div>

        {/* Lower Section - Product Details */}
        <div className="bg-white p-4 pt-2">
          {/* Brand Name */}
          <p className="text-luxury-gold text-sm font-medium mb-1">Tomus</p>

          {/* Product Name */}
          <h4 className="font-bold text-black text-base mb-2 leading-tight">
            {name}
          </h4>

          {/* Price */}
          <p className="font-bold text-black text-lg mb-4">{price}</p>

          {/* Buy Now Button */}
          <Button
            className="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 rounded-xl transition-colors group-hover:bg-luxury-gold group-hover:text-luxury-black"
            onClick={handleBuyNowClick}
          >
            <ShoppingBag className="h-4 w-4 mr-2" />
            Buy Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
