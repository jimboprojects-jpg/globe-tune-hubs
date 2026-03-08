import { createContext, useContext, ReactNode } from 'react';
import { useRadioPlayer } from '@/hooks/useRadioPlayer';
import { useEqualizer } from '@/hooks/useEqualizer';
import { useFavorites } from '@/hooks/useFavorites';
import { RadioStation } from '@/data/radioStations';
import { useEffect, useCallback } from 'react';

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
}

const RadioPlayerContext = createContext<RadioPlayerContextType | null>(null);

export const RadioPlayerProvider = ({ children }: { children: ReactNode }) => {
  const player = useRadioPlayer();
  const { bands, activePreset, updateBands, applyPreset, initEQ } = useEqualizer();
  const { toggleFavorite, isFavorite, favoriteIds } = useFavorites();

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
