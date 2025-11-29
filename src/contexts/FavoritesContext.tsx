import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Product } from "@/constants/products";

interface FavoritesContextType {
  favorites: Product[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  getFavoritesCount: () => number;
  clearFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

const FAVORITES_STORAGE_KEY = "tomus-favorites";

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load favorites from localStorage on mount
  useEffect(() => {
    console.log("❤️ FavoritesProvider: Loading favorites from localStorage...");
    const savedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
    console.log("❤️ FavoritesProvider: Saved favorites data:", savedFavorites);

    if (savedFavorites) {
      try {
        const parsedFavorites = JSON.parse(savedFavorites);
        console.log(
          "❤️ FavoritesProvider: Parsed favorites data:",
          parsedFavorites
        );
        setFavorites(parsedFavorites);
      } catch (error) {
        console.error(
          "❌ FavoritesProvider: Error loading favorites from localStorage:",
          error
        );
        localStorage.removeItem(FAVORITES_STORAGE_KEY);
      }
    } else {
      console.log(
        "❤️ FavoritesProvider: No saved favorites found in localStorage"
      );
    }

    setIsInitialized(true);
  }, []);

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      console.log(
        "❤️ FavoritesProvider: Saving favorites to localStorage:",
        favorites
      );
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    }
  }, [favorites, isInitialized]);

  const addToFavorites = (product: Product) => {
    console.log("❤️ FavoritesProvider: Adding to favorites:", product.name);
    setFavorites((prevFavorites) => {
      if (prevFavorites.some((fav) => fav.id === product.id)) {
        console.log("❤️ FavoritesProvider: Product already in favorites");
        return prevFavorites; // Already in favorites
      }
      const newFavorites = [...prevFavorites, product];
      console.log(
        "❤️ FavoritesProvider: New favorites after adding:",
        newFavorites
      );
      return newFavorites;
    });
  };

  const removeFromFavorites = (productId: string) => {
    console.log("❤️ FavoritesProvider: Removing from favorites:", productId);
    setFavorites((prevFavorites) => {
      const newFavorites = prevFavorites.filter((fav) => fav.id !== productId);
      console.log(
        "❤️ FavoritesProvider: New favorites after removal:",
        newFavorites
      );
      return newFavorites;
    });
  };

  const isFavorite = (productId: string) => {
    return favorites.some((fav) => fav.id === productId);
  };

  const getFavoritesCount = () => {
    return favorites.length;
  };

  const clearFavorites = () => {
    console.log("❤️ FavoritesProvider: Clearing all favorites");
    setFavorites([]);
  };

  const value: FavoritesContextType = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    getFavoritesCount,
    clearFavorites,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
