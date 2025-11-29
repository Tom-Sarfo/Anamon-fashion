import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "favoriteProductIds";

type FavoriteIds = string[];

export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState<FavoriteIds>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setFavoriteIds(JSON.parse(stored));
    }
  }, []);

  // Save to localStorage when favoriteIds changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  const toggleFavorite = useCallback((id: string) => {
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  }, []);

  const isFavorite = useCallback(
    (id: string) => favoriteIds.includes(id),
    [favoriteIds]
  );

  return { favoriteIds, toggleFavorite, isFavorite };
}
