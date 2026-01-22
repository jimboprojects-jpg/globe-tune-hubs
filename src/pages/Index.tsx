import { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { Globe } from '@/components/Globe';
import { Header } from '@/components/Header';
import { PlayerControls } from '@/components/PlayerControls';
import { StationList } from '@/components/StationList';
import { InfoModal } from '@/components/InfoModal';
import { useRadioPlayer } from '@/hooks/useRadioPlayer';
import { radioStations } from '@/data/radioStations';

const LoadingFallback = () => (
  <div className="w-full h-full flex items-center justify-center">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
    >
      <Loader2 className="w-12 h-12 text-primary" />
    </motion.div>
  </div>
);

const Index = () => {
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

  const handleStationSelect = (station: typeof radioStations[0]) => {
    play(station);
    setIsStationListOpen(false);
  };

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Header */}
      <Header
        onMenuClick={() => setIsStationListOpen(true)}
        onInfoClick={() => setIsInfoModalOpen(true)}
        stationCount={radioStations.length}
      />
      
      {/* Main Globe Area */}
      <main className="h-screen pt-14 pb-24">
        <Suspense fallback={<LoadingFallback />}>
          <Globe
            stations={radioStations}
            currentStation={currentStation}
            isPlaying={isPlaying}
            onStationClick={handleStationSelect}
          />
        </Suspense>
        
        {/* Instructions overlay */}
        {!currentStation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="absolute bottom-32 left-1/2 -translate-x-1/2 text-center pointer-events-none"
          >
            <p className="text-muted-foreground text-sm md:text-base">
              Click on a <span className="text-primary font-medium">glowing marker</span> to tune in
            </p>
            <p className="text-muted-foreground/60 text-xs mt-1">
              Drag to rotate • Scroll to zoom
            </p>
          </motion.div>
        )}
      </main>
      
      {/* Station List Sidebar */}
      <StationList
        stations={radioStations}
        currentStation={currentStation}
        isPlaying={isPlaying}
        onStationSelect={handleStationSelect}
        isOpen={isStationListOpen}
        onClose={() => setIsStationListOpen(false)}
      />
      
      {/* Player Controls */}
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
      
      {/* Info Modal */}
      <InfoModal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
      />
    </div>
  );
};

export default Index;
