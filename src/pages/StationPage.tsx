import { useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Radio, Play, Pause, MapPin, Music, Globe, Loader2, Languages, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PlayerControls } from '@/components/PlayerControls';
import { SEOHead } from '@/components/SEOHead';
import { useGlobalPlayer } from '@/contexts/RadioPlayerContext';
import { buildStationPageJsonLd } from '@/lib/stationJsonLd';

const StationPage = () => {
  const { stationId } = useParams<{ stationId: string }>();
  const navigate = useNavigate();
  const {
    stations, isLoadingStations,
    currentStation, isPlaying, isLoading: playerLoading, volume, error,
    play, pause, setVolume, stop,
    bands, activePreset, updateBands, applyPreset,
    isFavorite, toggleFavorite,
  } = useGlobalPlayer();

  const station = useMemo(
    () => stations.find(s => s.id === stationId) || null,
    [stations, stationId]
  );

  // Note: title, canonical, og:url are all set by <SEOHead /> below.

  if (isLoadingStations && !station) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!station) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Radio className="w-12 h-12 mx-auto mb-3 opacity-40 text-muted-foreground" />
          <p className="text-muted-foreground mb-4">Station not found</p>
          <Button onClick={() => navigate('/countries')}>Browse Stations</Button>
        </div>
      </div>
    );
  }

  const pageUrl = `https://cartofm.com/stations/${station.id}`;
  const title = `${station.name} – Listen Live ${station.country ? `from ${station.country}` : ''} | CartoFM`;
  const description = `Stream ${station.name} live online for free. ${station.genre ? `${station.genre} radio` : 'Radio station'} broadcasting${station.city ? ` from ${station.city},` : ''}${station.country ? ` ${station.country}` : ''}. Listen in your browser, no signup required.`;
  const jsonLd = buildStationPageJsonLd(station, pageUrl);
  const isActive = currentStation?.id === station.id;
  const fav = isFavorite(station.id);

  return (
    <div className="min-h-screen bg-background pb-24">
      <SEOHead
        title={title}
        description={description}
        jsonLd={jsonLd}
        ogType="music.radio_station"
        ogImage={station.favicon || undefined}
      />

      <div className="glass border-b border-border/30 sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} aria-label="Back">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <Radio className="w-5 h-5 text-primary" />
          <h1 className="text-base font-bold text-foreground truncate">{station.name}</h1>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-3 md:px-4 py-4 md:py-6 space-y-4">
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-5 md:p-7 border border-border/20"
        >
          <div className="flex items-start gap-4 md:gap-5">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-muted/50 flex items-center justify-center flex-shrink-0 overflow-hidden">
              {station.favicon ? (
                <img
                  src={station.favicon}
                  alt={`${station.name} logo`}
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              ) : (
                <Radio className="w-10 h-10 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-1">{station.name}</h2>
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                {station.city && (
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{station.city}</span>
                )}
                {station.country && (
                  <Link to={`/countries/${station.countryCode?.toUpperCase()}`} className="flex items-center gap-1 hover:text-primary">
                    <Globe className="w-3 h-3" />{station.country}
                  </Link>
                )}
                {station.genre && (
                  <span className="flex items-center gap-1 capitalize"><Music className="w-3 h-3" />{station.genre}</span>
                )}
                {station.language && (
                  <span className="flex items-center gap-1 capitalize"><Languages className="w-3 h-3" />{station.language}</span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-4">
                <Button
                  onClick={() => (isActive && isPlaying ? pause() : play(station))}
                  className="rounded-full"
                  size="lg"
                >
                  {isActive && isPlaying ? <><Pause className="w-4 h-4 mr-2" />Pause</> : <><Play className="w-4 h-4 mr-2" />Listen Live</>}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleFavorite(station.id)}
                  aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <Heart className={`w-5 h-5 ${fav ? 'fill-accent text-accent' : ''}`} />
                </Button>
              </div>
            </div>
          </div>
        </motion.section>

        <section className="glass rounded-2xl p-5 md:p-6 border border-border/20">
          <h2 className="text-sm font-semibold text-foreground mb-2">About {station.name}</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {station.name} is a live{station.genre ? ` ${station.genre}` : ''} radio station
            {station.city ? ` broadcasting from ${station.city}` : ''}
            {station.country ? `${station.city ? ',' : ' broadcasting from'} ${station.country}` : ''}.
            Listen online for free directly in your browser on CartoFM — no app, no signup, no ads from us.
            Tune in to discover the sound of {station.country || 'the world'} and explore thousands of other
            free internet radio stations on our interactive globe.
          </p>
        </section>

        <nav aria-label="Related" className="grid grid-cols-2 gap-2 text-sm">
          {station.countryCode && (
            <Link
              to={`/countries/${station.countryCode.toUpperCase()}`}
              className="glass hover:bg-muted/50 rounded-xl p-3 transition-colors"
            >
              <div className="text-xs text-muted-foreground">More from</div>
              <div className="font-medium text-foreground truncate">{station.country}</div>
            </Link>
          )}
          {station.genre && (
            <Link
              to={`/genres/${encodeURIComponent(station.genre.toLowerCase().split(/[ ,]/)[0])}`}
              className="glass hover:bg-muted/50 rounded-xl p-3 transition-colors"
            >
              <div className="text-xs text-muted-foreground">Explore genre</div>
              <div className="font-medium text-foreground truncate capitalize">{station.genre}</div>
            </Link>
          )}
        </nav>
      </main>

      <PlayerControls
        station={currentStation}
        isPlaying={isPlaying}
        isLoading={playerLoading}
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
    </div>
  );
};

export default StationPage;
