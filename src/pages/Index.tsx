import { useState, useEffect, useCallback, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Globe } from '@/components/Globe';
import { Header } from '@/components/Header';
import { PlayerControls } from '@/components/PlayerControls';
import { StationList } from '@/components/StationList';
import { InfoModal } from '@/components/InfoModal';
import { FocusCircle } from '@/components/FocusCircle';
import { SatelliteLoader } from '@/components/SatelliteLoader';
import { useRadioPlayer } from '@/hooks/useRadioPlayer';
import { useEqualizer } from '@/hooks/useEqualizer';
import { useFavorites } from '@/hooks/useFavorites';
import { RadioStation } from '@/data/radioStations';
import { fetchRadioStations } from '@/services/radioBrowserApi';

const Index = () => {
  const [stations, setStations] = useState<RadioStation[]>([]);
  const [isLoadingStations, setIsLoadingStations] = useState(true);
  const [focusedStation, setFocusedStation] = useState<RadioStation | null>(null);
  const [isStationListOpen, setIsStationListOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const {
    currentStation,
    isPlaying,
    isLoading,
    volume,
    error,
    play,
    pause,
    setVolume,
    stop,
    audioElement,
  } = useRadioPlayer();

  const { bands, activePreset, updateBands, applyPreset, initEQ } = useEqualizer();
  const { toggleFavorite, isFavorite, favoriteIds } = useFavorites();

  // Initialize EQ when audio element is ready
  useEffect(() => {
    if (audioElement) {
      initEQ(audioElement);
    }
  }, [audioElement, initEQ]);

  // Resume AudioContext on any user-initiated play
  const handlePlay = useCallback((station: RadioStation) => {
    if (audioElement) {
      initEQ(audioElement); // will resume if suspended
    }
    play(station);
  }, [audioElement, initEQ, play]);

  // Fetch stations on mount
  useEffect(() => {
    fetchRadioStations()
      .then(setStations)
      .catch(console.error)
      .finally(() => setIsLoadingStations(false));
  }, []);

  // Auto-switch when already playing and user moves to new station
  useEffect(() => {
    if (isPlaying && focusedStation && focusedStation.id !== currentStation?.id) {
      handlePlay(focusedStation);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusedStation]);

  const handleGlobeClick = useCallback(() => {
    if (focusedStation) {
      handlePlay(focusedStation);
    }
  }, [focusedStation, handlePlay]);

  const handleStationSelect = useCallback(
    (station: RadioStation) => {
      handlePlay(station);
      setIsStationListOpen(false);
    },
    [handlePlay]
  );

  return (
    <div className="min-h-screen overflow-hidden">
      <Header
        onMenuClick={() => setIsStationListOpen(true)}
        onInfoClick={() => setIsInfoModalOpen(true)}
        stationCount={stations.length}
      />

      <main className="h-screen pt-14 pb-24">
        {isLoadingStations ? (
          <SatelliteLoader />
        ) : (
          <Suspense fallback={<SatelliteLoader message="Initializing globe…" />}>
            <Globe
              stations={stations}
              focusedStation={focusedStation}
              isPlaying={isPlaying}
              onStationFocus={setFocusedStation}
              onGlobeClick={handleGlobeClick}
            />
          </Suspense>
        )}

        {/* Focus circle overlay */}
        <FocusCircle station={focusedStation} isPlaying={isPlaying} />

        {/* Instructions */}
        {!currentStation && !isLoadingStations && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="absolute bottom-32 left-1/2 -translate-x-1/2 text-center pointer-events-none"
          >
            <p className="text-muted-foreground text-sm md:text-base">
              Rotate the globe to target a <span className="text-primary font-medium">station</span>
            </p>
            <p className="text-muted-foreground/60 text-xs mt-1">
              Drag to rotate · Scroll to zoom · Click to play
            </p>
          </motion.div>
        )}
      </main>

      <StationList
        stations={stations}
        currentStation={currentStation}
        isPlaying={isPlaying}
        onStationSelect={handleStationSelect}
        isOpen={isStationListOpen}
        onClose={() => setIsStationListOpen(false)}
        isFavorite={isFavorite}
        onToggleFavorite={toggleFavorite}
        favoriteIds={favoriteIds}
      />

      <PlayerControls
        station={currentStation}
        isPlaying={isPlaying}
        isLoading={isLoading}
        volume={volume}
        error={error}
        onPlay={() => currentStation && handlePlay(currentStation)}
        onPause={pause}
        onVolumeChange={setVolume}
        onStop={stop}
        eqBands={bands}
        eqActivePreset={activePreset}
        onEqBandsChange={updateBands}
        onEqPresetChange={applyPreset}
        isFavorite={currentStation ? isFavorite(currentStation.id) : false}
        onToggleFavorite={() => currentStation && toggleFavorite(currentStation.id)}
      />

      <InfoModal isOpen={isInfoModalOpen} onClose={() => setIsInfoModalOpen(false)} />
    </div>
  );
};

export default Index;
