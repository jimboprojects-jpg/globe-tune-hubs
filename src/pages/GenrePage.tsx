import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Music, Radio, Search, Play, MapPin, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PlayerControls } from '@/components/PlayerControls';
import { SEOHead } from '@/components/SEOHead';
import { useGlobalPlayer } from '@/contexts/RadioPlayerContext';
import { GENRES, getGenreBySlug, getGenreListSEO, matchStationToGenre } from '@/data/genreContent';
import { useTranslation } from 'react-i18next';

const GenreListPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { stations, isLoadingStations, currentStation, isPlaying, isLoading: playerLoading, volume, error, play, pause, setVolume, stop, bands, activePreset, updateBands, applyPreset, isFavorite, toggleFavorite } = useGlobalPlayer();
  const seo = getGenreListSEO();

  const genresWithCounts = useMemo(() => {
    return GENRES.map(genre => ({
      ...genre,
      count: stations.filter(s => matchStationToGenre(s.genre, genre.slug)).length,
    }));
  }, [stations]);

  return (
    <div className="min-h-screen bg-background pb-24">
      <SEOHead
        title={seo.title}
        description={seo.description}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Radio by Genre – CartoFM",
          "description": seo.description,
          "url": "https://cartofm.com/genres",
          "isPartOf": { "@type": "WebSite", "name": "CartoFM", "url": "https://cartofm.com" },
        }}
      />

      <div className="glass border-b border-border/30 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <Music className="w-5 h-5 text-primary" />
          <h1 className="text-lg font-bold text-foreground">Radio by Genre</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-3 md:px-4 py-3 md:py-4">
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 md:mb-6">
          Explore thousands of radio stations organized by music genre. Whether you're into jazz, rock, pop, or electronic music — find your perfect station and start listening instantly.
        </p>

        {isLoadingStations ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
            {genresWithCounts.map((genre, i) => (
              <motion.button
                key={genre.slug}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.03, 0.4) }}
                onClick={() => navigate(`/genres/${genre.slug}`)}
                className="glass hover:bg-muted/50 rounded-xl p-4 flex items-center gap-3 text-left transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Music className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground text-sm">{genre.name}</p>
                  <p className="text-xs text-muted-foreground">{genre.count.toLocaleString()} stations</p>
                </div>
                <Radio className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              </motion.button>
            ))}
          </div>
        )}
      </div>

      <PlayerControls station={currentStation} isPlaying={isPlaying} isLoading={playerLoading} volume={volume} error={error} onPlay={() => currentStation && play(currentStation)} onPause={pause} onVolumeChange={setVolume} onStop={stop} eqBands={bands} eqActivePreset={activePreset} onEqBandsChange={updateBands} onEqPresetChange={applyPreset} isFavorite={currentStation ? isFavorite(currentStation.id) : false} onToggleFavorite={() => currentStation && toggleFavorite(currentStation.id)} />
    </div>
  );
};

const GenreDetailPage = () => {
  const { genreSlug } = useParams<{ genreSlug: string }>();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const { t } = useTranslation();
  const { stations, isLoadingStations, currentStation, isPlaying, isLoading: playerLoading, volume, error, play, pause, setVolume, stop, bands, activePreset, updateBands, applyPreset, isFavorite, toggleFavorite } = useGlobalPlayer();

  const genre = getGenreBySlug(genreSlug || '');

  const genreStations = useMemo(() => {
    if (!genreSlug) return [];
    const filtered = stations.filter(s => matchStationToGenre(s.genre, genreSlug));
    if (!searchQuery) return filtered;
    const q = searchQuery.toLowerCase();
    return filtered.filter(s => s.name.toLowerCase().includes(q) || s.country.toLowerCase().includes(q) || s.city.toLowerCase().includes(q));
  }, [stations, genreSlug, searchQuery]);

  if (!genre) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Genre not found</p>
          <Button onClick={() => navigate('/genres')}>Browse Genres</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <SEOHead
        title={genre.metaTitle}
        description={genre.metaDescription}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": genre.headline,
          "description": genre.metaDescription,
          "url": `https://cartofm.com/genres/${genreSlug}`,
          "isPartOf": { "@type": "WebSite", "name": "CartoFM", "url": "https://cartofm.com" },
          "about": { "@type": "MusicGenre", "name": genre.name },
          "numberOfItems": genreStations.length,
        }}
      />

      <div className="glass border-b border-border/30 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate('/genres')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <Music className="w-5 h-5 text-primary" />
          <div>
            <h1 className="text-base font-bold text-foreground">{genre.headline}</h1>
            <p className="text-xs text-muted-foreground">{genreStations.length.toLocaleString()} stations</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-3 md:px-4 py-3 md:py-4">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-4 md:mb-6 glass rounded-xl p-3.5 md:p-5 border border-border/20">
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">{genre.intro}</p>
          <h2 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
            <Music className="w-4 h-4 text-primary" />
            About {genre.name} Radio
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">{genre.description}</p>
        </motion.div>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder={`Search ${genre.name} stations...`} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 bg-muted/50 border-border/50" />
        </div>

        {isLoadingStations ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : genreStations.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <Radio className="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p>No {genre.name} stations found</p>
          </div>
        ) : (
          <ScrollArea className="h-[calc(100dvh-380px)] md:h-[calc(100dvh-420px)]">
            <div className="space-y-1">
              {genreStations.map((station) => {
                const isActive = currentStation?.id === station.id;
                return (
                  <button key={station.id} onClick={() => play(station)} className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all ${isActive ? 'bg-accent/10 border border-accent/30' : 'hover:bg-muted/50'}`}>
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${isActive ? 'bg-accent/20' : 'bg-muted/50'}`}>
                      {station.favicon ? (
                        <img src={station.favicon} alt="" className="w-7 h-7 rounded-md object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                      ) : (
                        <Radio className={`w-4 h-4 ${isActive ? 'text-accent' : 'text-muted-foreground'}`} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium truncate ${isActive ? 'text-accent' : 'text-foreground'}`}>{station.name}</p>
                      <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                        <span className="flex items-center gap-0.5 truncate"><MapPin className="w-2.5 h-2.5" />{station.country}</span>
                        <span className="truncate capitalize">{station.genre}</span>
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
                  </button>
                );
              })}
            </div>
          </ScrollArea>
        )}
      </div>

      <PlayerControls station={currentStation} isPlaying={isPlaying} isLoading={playerLoading} volume={volume} error={error} onPlay={() => currentStation && play(currentStation)} onPause={pause} onVolumeChange={setVolume} onStop={stop} eqBands={bands} eqActivePreset={activePreset} onEqBandsChange={updateBands} onEqPresetChange={applyPreset} isFavorite={currentStation ? isFavorite(currentStation.id) : false} onToggleFavorite={() => currentStation && toggleFavorite(currentStation.id)} />
    </div>
  );
};

const GenrePage = () => {
  const { genreSlug } = useParams<{ genreSlug: string }>();
  if (genreSlug) return <GenreDetailPage />;
  return <GenreListPage />;
};

export default GenrePage;
