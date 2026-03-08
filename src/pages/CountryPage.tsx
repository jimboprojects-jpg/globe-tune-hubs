import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Radio, Play, Search, MapPin, Music, Globe, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PlayerControls } from '@/components/PlayerControls';
import { RadioStation, searchStations } from '@/data/radioStations';
import { fetchInitialStations, fetchRemainingStations } from '@/services/radioBrowserApi';
import { useGlobalPlayer } from '@/contexts/RadioPlayerContext';

const CountryFlag = ({ code, size = 'w-8 h-6' }: { code: string; size?: string }) => (
  <img
    src={`https://flagicons.lipis.dev/flags/4x3/${code.toLowerCase()}.svg`}
    alt={code}
    className={`${size} rounded-sm object-cover`}
    onError={(e) => {
      (e.target as HTMLImageElement).style.display = 'none';
    }}
  />
);

const CountryListPage = () => {
  const navigate = useNavigate();
  const [stations, setStations] = useState<RadioStation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const {
    currentStation, isPlaying, isLoading: playerLoading, volume, error,
    play, pause, setVolume, stop,
    bands, activePreset, updateBands, applyPreset,
    isFavorite, toggleFavorite,
  } = useGlobalPlayer();

  useEffect(() => {
    let cancelled = false;
    fetchInitialStations().then((initial) => {
      if (cancelled) return;
      setStations(initial);
      setIsLoading(false);
      fetchRemainingStations((batch) => {
        if (!cancelled) setStations(prev => [...prev, ...batch]);
      });
    });
    return () => { cancelled = true; };
  }, []);

  const countries = useMemo(() => {
    const map = new Map<string, { name: string; code: string; count: number }>();
    for (const s of stations) {
      if (!s.country || !s.countryCode) continue;
      const existing = map.get(s.countryCode);
      if (existing) {
        existing.count++;
      } else {
        map.set(s.countryCode, { name: s.country, code: s.countryCode, count: 1 });
      }
    }
    return Array.from(map.values())
      .filter(c => !searchQuery || c.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [stations, searchQuery]);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="glass border-b border-border/30 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <Globe className="w-5 h-5 text-primary" />
          <h1 className="text-lg font-bold">
            <span className="text-gradient-primary">Listen by</span>{' '}
            <span className="text-gradient-accent">Country</span>
          </h1>
          <span className="text-xs text-muted-foreground ml-auto">
            {countries.length} countries
          </span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-4">
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search countries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-muted/50 border-border/50"
          />
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {countries.map((country, i) => (
              <motion.button
                key={country.code}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.02, 0.5) }}
                onClick={() => navigate(`/countries/${country.code}`)}
                className="glass hover:bg-muted/50 rounded-xl p-4 flex items-center gap-3 text-left transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <CountryFlag code={country.code} size="w-10 h-7" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate text-sm">{country.name}</p>
                  <p className="text-xs text-muted-foreground">{country.count.toLocaleString()} stations</p>
                </div>
                <Radio className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              </motion.button>
            ))}
          </div>
        )}
      </div>

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

const CountryDetailPage = () => {
  const { countryCode } = useParams<{ countryCode: string }>();
  const navigate = useNavigate();
  const [stations, setStations] = useState<RadioStation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const {
    currentStation, isPlaying, isLoading: playerLoading, volume, error,
    play, pause, setVolume, stop,
    bands, activePreset, updateBands, applyPreset,
    isFavorite, toggleFavorite,
  } = useGlobalPlayer();

  useEffect(() => {
    let cancelled = false;
    fetchInitialStations().then((initial) => {
      if (cancelled) return;
      setStations(initial);
      setIsLoading(false);
      fetchRemainingStations((batch) => {
        if (!cancelled) setStations(prev => [...prev, ...batch]);
      });
    });
    return () => { cancelled = true; };
  }, []);

  const countryStations = useMemo(() => {
    const filtered = stations.filter(
      s => s.countryCode?.toUpperCase() === countryCode?.toUpperCase()
    );
    if (!searchQuery) return filtered;
    return searchStations(filtered, searchQuery);
  }, [stations, countryCode, searchQuery]);

  const countryName = countryStations[0]?.country || countryCode || '';

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="glass border-b border-border/30 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate('/countries')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <CountryFlag code={countryCode || ''} size="w-8 h-6" />
          <div>
            <h1 className="text-base font-bold text-foreground">{countryName}</h1>
            <p className="text-xs text-muted-foreground">{countryStations.length.toLocaleString()} stations</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-4">
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search stations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-muted/50 border-border/50"
          />
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : countryStations.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <Radio className="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p>No stations found</p>
          </div>
        ) : (
          <ScrollArea className="h-[calc(100vh-220px)]">
            <div className="space-y-1">
              {countryStations.map((station) => {
                const isActive = currentStation?.id === station.id;
                return (
                  <motion.button
                    key={station.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => play(station)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all ${
                      isActive
                        ? 'bg-accent/10 border border-accent/30'
                        : 'hover:bg-muted/50'
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      isActive ? 'bg-accent/20' : 'bg-muted/50'
                    }`}>
                      {station.favicon ? (
                        <img
                          src={station.favicon}
                          alt=""
                          className="w-7 h-7 rounded-md object-cover"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                      ) : (
                        <Radio className={`w-4 h-4 ${isActive ? 'text-accent' : 'text-muted-foreground'}`} />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium truncate ${isActive ? 'text-accent' : 'text-foreground'}`}>
                        {station.name}
                      </p>
                      <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                        <span className="flex items-center gap-0.5 truncate">
                          <MapPin className="w-2.5 h-2.5" />
                          {station.city}
                        </span>
                        <span className="flex items-center gap-0.5 truncate capitalize">
                          <Music className="w-2.5 h-2.5" />
                          {station.genre}
                        </span>
                      </div>
                    </div>

                    {isActive && isPlaying ? (
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                        <span className="text-[10px] font-mono text-accent">LIVE</span>
                      </div>
                    ) : (
                      <Play className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </ScrollArea>
        )}
      </div>

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

const CountryPage = () => {
  const { countryCode } = useParams<{ countryCode: string }>();
  if (countryCode) return <CountryDetailPage />;
  return <CountryListPage />;
};

export default CountryPage;
