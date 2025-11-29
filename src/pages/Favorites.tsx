import { ArrowLeft, Heart, Trash2 } from "lucide-react";
import { useNavigate } from "react-router";
import { useFavorites } from "@/contexts/FavoritesContext";
import { LazyImage } from "@/components/LazyImage";
import { cn } from "@/lib/utils";

export default function FavoritesPage() {
  const navigate = useNavigate();
  const { favorites, removeFromFavorites, clearFavorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header - Mobile */}
        <div className="sticky top-0 z-40 flex items-center justify-between bg-white px-4 py-3 shadow-sm lg:hidden">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center rounded-full p-2 hover:bg-gray-100"
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-semibold">My Favorites</h1>
          <div className="w-10" />
        </div>

        {/* Empty Favorites */}
        <div className="flex min-h-screen items-center justify-center px-4">
          <div className="text-center">
            <div className="text-6xl mb-4">❤️</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              No favorites yet
            </h2>
            <p className="text-gray-600 mb-6">
              Start adding products to your favorites!
            </p>
            <button
              onClick={() => navigate("/products")}
              className="bg-black text-white px-6 py-3 rounded-lg font-medium transition-colors hover:bg-gray-800"
            >
              Browse Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header - Mobile */}
      <div className="sticky top-0 z-40 flex items-center justify-between bg-white px-4 py-3 shadow-sm lg:hidden">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center rounded-full p-2 hover:bg-gray-100"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-semibold">My Favorites</h1>
        <button
          onClick={clearFavorites}
          className="text-red-500 hover:text-red-700 text-sm"
        >
          Clear All
        </button>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Favorites</h1>
            <button
              onClick={clearFavorites}
              className="text-red-500 hover:text-red-700 text-sm font-medium"
            >
              Clear All Favorites
            </button>
          </div>
        </div>
      </div>

      {/* Favorites Grid */}
      <div className="px-4 pb-20 lg:pb-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favorites.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              {/* Product Image */}
              <div className="relative bg-white p-4 pb-2">
                <div className="absolute top-3 right-3 z-10">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromFavorites(product.id);
                    }}
                    className="h-8 w-8 rounded-full bg-white/80 hover:bg-white shadow-sm flex items-center justify-center text-red-500 hover:text-red-700 transition-colors"
                    aria-label="Remove from favorites"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex-1 flex justify-center items-center mb-2">
                  <LazyImage
                    src={product.image}
                    alt={product.name}
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

              {/* Product Details */}
              <div className="bg-white p-4 pt-2">
                <p className="text-luxury-gold text-sm font-medium mb-1">Tomus</p>
                <h4 className="font-bold text-black text-base mb-2 leading-tight">
                  {product.name}
                </h4>
                <p className="font-bold text-black text-lg mb-4">
                  {product.price}
                </p>

                {/* Favorite Status */}
                <div className="flex items-center gap-2 text-red-500">
                  <Heart className="h-4 w-4 fill-current" />
                  <span className="text-sm font-medium">In Favorites</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
