import { createContext, useContext, ReactNode, useState, useEffect, useCallback, useMemo } from 'react';
import { useRadioPlayer } from '@/hooks/useRadioPlayer';
import { useEqualizer } from '@/hooks/useEqualizer';
import { useFavorites } from '@/hooks/useFavorites';
import { RadioStation } from '@/data/radioStations';
import { fetchInitialStations, fetchRemainingStations, stationHasGeo } from '@/services/radioBrowserApi';

interface RadioPlayerContextType {
  currentStation: RadioStation | null;
  isPlaying: boolean;
  isLoading: boolean;
  volume: number;
  error: string | null;
  play: (station: RadioStation) => void;
  pause: () => void;
  setVolume: (volume: number) => void;
  stop: () => void;
  audioElement: HTMLAudioElement | null;
  bands: number[];
  activePreset: string;
  updateBands: (bands: number[]) => void;
  applyPreset: (preset: any) => void;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  favoriteIds: Set<string>;
  // Shared stations
  stations: RadioStation[];
  geoStations: RadioStation[];
  isLoadingStations: boolean;
  isBackgroundLoading: boolean;
}

const RadioPlayerContext = createContext<RadioPlayerContextType | null>(null);

export const RadioPlayerProvider = ({ children }: { children: ReactNode }) => {
  const player = useRadioPlayer();
  const { bands, activePreset, updateBands, applyPreset, initEQ } = useEqualizer();
  const { toggleFavorite, isFavorite, favoriteIds } = useFavorites();

  // Shared station state - loaded once, used everywhere
  const [stations, setStations] = useState<RadioStation[]>([]);
  const [isLoadingStations, setIsLoadingStations] = useState(true);
  const [isBackgroundLoading, setIsBackgroundLoading] = useState(false);

  const geoStations = useMemo(() => stations.filter(stationHasGeo), [stations]);

  useEffect(() => {
    let cancelled = false;
    fetchInitialStations()
      .then((initial) => {
        if (cancelled) return;
        setStations(initial);
        setIsLoadingStations(false);
        setIsBackgroundLoading(true);
        fetchRemainingStations(
          (batch) => { if (!cancelled) setStations(prev => [...prev, ...batch]); },
          (total) => {
            console.log(`Background loading complete: ${total} additional stations loaded`);
            if (!cancelled) setIsBackgroundLoading(false);
          }
        );
      })
      .catch((err) => {
        console.error('Failed to load stations:', err);
        if (!cancelled) setIsLoadingStations(false);
      });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (player.audioElement) {
      initEQ(player.audioElement);
    }
  }, [player.audioElement, initEQ]);

  const handlePlay = useCallback((station: RadioStation) => {
    if (player.audioElement) {
      initEQ(player.audioElement);
    }
    player.play(station);
  }, [player.audioElement, initEQ, player.play]);

  return (
    <RadioPlayerContext.Provider value={{
      ...player,
      play: handlePlay,
      bands,
      activePreset,
      updateBands,
      applyPreset,
      toggleFavorite,
      isFavorite,
      favoriteIds,
      stations,
      geoStations,
      isLoadingStations,
      isBackgroundLoading,
    }}>
      {children}
    </RadioPlayerContext.Provider>
  );
};

export const useGlobalPlayer = () => {
  const ctx = useContext(RadioPlayerContext);
  if (!ctx) throw new Error('useGlobalPlayer must be used within RadioPlayerProvider');
  return ctx;
};
