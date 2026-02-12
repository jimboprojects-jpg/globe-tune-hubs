import { useState, useEffect, useCallback, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { Globe } from '@/components/Globe';
import { Header } from '@/components/Header';
import { PlayerControls } from '@/components/PlayerControls';
import { StationList } from '@/components/StationList';
import { InfoModal } from '@/components/InfoModal';
import { FocusCircle } from '@/components/FocusCircle';
import { useRadioPlayer } from '@/hooks/useRadioPlayer';
import { RadioStation } from '@/data/radioStations';
import { fetchRadioStations } from '@/services/radioBrowserApi';

const LoadingFallback = () => (
  <div className="w-full h-full flex items-center justify-center">
    <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>
      <Loader2 className="w-12 h-12 text-primary" />
    </motion.div>
  </div>
);

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
  } = useRadioPlayer();

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
      play(focusedStation);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusedStation]);

  const handleGlobeClick = useCallback(() => {
    if (focusedStation) {
      play(focusedStation);
    }
  }, [focusedStation, play]);

  const handleStationSelect = useCallback(
    (station: RadioStation) => {
      play(station);
      setIsStationListOpen(false);
    },
    [play]
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
          <div className="w-full h-full flex flex-col items-center justify-center gap-4">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>
              <Loader2 className="w-12 h-12 text-primary" />
            </motion.div>
            <p className="text-muted-foreground text-sm">Loading radio stations worldwide…</p>
          </div>
        ) : (
          <Suspense fallback={<LoadingFallback />}>
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
      />

      <PlayerControls
        station={currentStation}
        isPlaying={isPlaying}
        isLoading={isLoading}
        volume={volume}
        error={error}
        onPlay={() => currentStation && play(currentStation)}
        onPause={pause}
        onVolumeChange={setVolume}
        onStop={stop}
      />

      <InfoModal isOpen={isInfoModalOpen} onClose={() => setIsInfoModalOpen(false)} />
    </div>
  );
};

export default Index;
