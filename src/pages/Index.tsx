import { useState, useEffect, useCallback, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Globe } from '@/components/Globe';
import { Header } from '@/components/Header';
import { PlayerControls } from '@/components/PlayerControls';
import { StationList } from '@/components/StationList';
import { InfoModal } from '@/components/InfoModal';
import { FocusCircle } from '@/components/FocusCircle';
import { SatelliteLoader } from '@/components/SatelliteLoader';
import { SEOHead } from '@/components/SEOHead';
import { useGlobalPlayer } from '@/contexts/RadioPlayerContext';
import { RadioStation } from '@/data/radioStations';
import { useTranslation } from 'react-i18next';

const Index = () => {
  const [focusedStation, setFocusedStation] = useState<RadioStation | null>(null);
  const [isStationListOpen, setIsStationListOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const { t } = useTranslation();

  const {
    stations, geoStations, isLoadingStations, isBackgroundLoading,
    currentStation, isPlaying, isLoading, volume, error,
    play, pause, setVolume, stop, audioElement,
    bands, activePreset, updateBands, applyPreset,
    toggleFavorite, isFavorite, favoriteIds,
  } = useGlobalPlayer();

  const handlePlay = useCallback((station: RadioStation) => {
    play(station);
  }, [play]);

  useEffect(() => {
    if (isPlaying && focusedStation && focusedStation.id !== currentStation?.id) {
      handlePlay(focusedStation);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusedStation]);

  const handleGlobeClick = useCallback(() => {
    if (focusedStation) handlePlay(focusedStation);
  }, [focusedStation, handlePlay]);

  const handleStationSelect = useCallback((station: RadioStation) => {
    handlePlay(station);
    setIsStationListOpen(false);
  }, [handlePlay]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "CartoFM",
    "url": "https://cartofm.com",
    "description": "Stream thousands of live radio stations from around the world on an interactive 3D globe.",
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "Web",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

  return (
    <div className="min-h-screen overflow-hidden">
      <SEOHead
        title="CartoFM – Stream Live Radio Stations Worldwide"
        description="CartoFM lets you listen to thousands of live radio stations from around the world in one place. Discover music, news, talk shows, and local broadcasts from every country."
        jsonLd={jsonLd}
      />

      <Header
        onMenuClick={() => setIsStationListOpen(true)}
        onInfoClick={() => setIsInfoModalOpen(true)}
        stationCount={stations.length}
        isBackgroundLoading={isBackgroundLoading}
        currentStation={currentStation}
        isPlaying={isPlaying}
        favoriteCount={favoriteIds.size}
        favoriteStations={stations.filter(s => favoriteIds.has(s.id))}
        onStationSelect={handleStationSelect}
        isFavorite={isFavorite}
        onToggleFavorite={toggleFavorite}
      />

      <main className="h-[100dvh] pt-12 md:pt-14 pb-20 md:pb-24">
        {isLoadingStations ? (
          <SatelliteLoader />
        ) : (
          <Suspense fallback={<SatelliteLoader message="Initializing globe…" />}>
            <Globe
              stations={geoStations}
              focusedStation={focusedStation}
              isPlaying={isPlaying}
              onStationFocus={setFocusedStation}
              onGlobeClick={handleGlobeClick}
            />
          </Suspense>
        )}

        <FocusCircle station={focusedStation} isPlaying={isPlaying} />

        {!currentStation && !isLoadingStations && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="fixed bottom-28 md:bottom-32 left-0 right-0 flex justify-center pointer-events-none px-4 z-10"
          >
            <div className="text-center">
              <p className="text-muted-foreground text-sm md:text-base">
                {t('globe.rotateHint')} <span className="text-primary font-medium">{t('globe.station')}</span>
              </p>
              <p className="text-muted-foreground/60 text-xs mt-1">
                {t('globe.dragHint')}
              </p>
            </div>
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
        onPlay={() => currentStation && play(currentStation)}
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
