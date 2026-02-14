import { useState, useCallback, useEffect } from 'react';

const STORAGE_KEY = 'radioverse-favorites';

export const useFavorites = () => {
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...favoriteIds]));
    } catch {}
  }, [favoriteIds]);

  const toggleFavorite = useCallback((stationId: string) => {
    setFavoriteIds(prev => {
      const next = new Set(prev);
      if (next.has(stationId)) {
        next.delete(stationId);
      } else {
        next.add(stationId);
      }
      return next;
    });
  }, []);

  const isFavorite = useCallback((stationId: string) => favoriteIds.has(stationId), [favoriteIds]);

  return { favoriteIds, toggleFavorite, isFavorite, count: favoriteIds.size };
};
