import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio, Menu, Info, Loader2, Signal, MapPin, Music, Heart, Languages, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RadioStation } from '@/data/radioStations';
import { AudioVisualizer } from './AudioVisualizer';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { languageNames } from '@/i18n/translations';

interface HeaderProps {
  onMenuClick: () => void;
  onInfoClick: () => void;
  stationCount: number;
  isBackgroundLoading?: boolean;
  currentStation?: RadioStation | null;
  isPlaying?: boolean;
  favoriteCount?: number;
  favoriteStations?: RadioStation[];
  onStationSelect?: (station: RadioStation) => void;
  isFavorite?: (id: string) => boolean;
  onToggleFavorite?: (id: string) => void;
}

export const Header = ({
  onMenuClick, onInfoClick, stationCount, isBackgroundLoading,
  currentStation, isPlaying, favoriteCount = 0,
  favoriteStations = [], onStationSelect, isFavorite, onToggleFavorite,
}: HeaderProps) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [showFavDropdown, setShowFavDropdown] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const favRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setShowLangDropdown(false);
      if (favRef.current && !favRef.current.contains(e.target as Node)) setShowFavDropdown(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const currentLang = i18n.language?.split('-')[0] || 'en';

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-40 glass border-b border-border/30"
    >
      <div className="max-w-7xl mx-auto px-3 py-2 md:px-4 md:py-3 flex items-center justify-between">
        {/* Left: Menu + Branding */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button variant="ghost" size="icon" onClick={onMenuClick}>
            <Menu className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <img src="/favicon.png" alt="CartoFM" className="w-7 h-7 md:w-8 md:h-8 rounded-md" />
            <h1 className="text-base md:text-lg font-bold tracking-tight hidden sm:block">
              <span className="text-gradient-primary">Carto</span>
              <span className="text-gradient-accent">FM</span>
            </h1>
          </div>
        </div>

        {/* Center: Now Playing */}
        <AnimatePresence mode="wait">
          {currentStation ? (
            <motion.div
              key="playing"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-2 md:gap-3 flex-1 justify-center min-w-0 mx-2 md:mx-4"
            >
              <div className={`w-8 h-8 md:w-9 md:h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                isPlaying ? 'bg-accent/20' : 'bg-primary/20'
              }`}>
                {currentStation.favicon ? (
                  <img src={currentStation.favicon} alt="" className="w-6 h-6 md:w-7 md:h-7 rounded-md object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                ) : (
                  <Radio className={`w-4 h-4 ${isPlaying ? 'text-accent' : 'text-primary'}`} />
                )}
              </div>
              <div className="min-w-0 flex-1 max-w-xs md:max-w-md">
                <div className="flex items-center gap-2">
                  {isPlaying && <AudioVisualizer isPlaying={true} className="flex-shrink-0" />}
                  <span className="font-semibold text-foreground truncate text-xs md:text-sm">{currentStation.name}</span>
                  {isPlaying && (
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <Signal className="w-3 h-3 text-accent" />
                      <span className="text-[9px] md:text-[10px] font-mono text-accent uppercase">{t('header.live')}</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 text-[10px] md:text-xs text-muted-foreground">
                  <span className="flex items-center gap-0.5 truncate">
                    <MapPin className="w-2.5 h-2.5 flex-shrink-0" />
                    {currentStation.city}, {currentStation.country}
                  </span>
                  <span className="hidden md:flex items-center gap-0.5 truncate">
                    <Music className="w-2.5 h-2.5 flex-shrink-0" />
                    <span className="capitalize">{currentStation.genre}</span>
                  </span>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div key="status" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex items-center justify-center flex-1 mx-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <AnimatePresence mode="wait">
                  {isBackgroundLoading ? (
                    <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      <Loader2 className="w-3 h-3 animate-spin text-accent" />
                      <span>
                        <motion.span key={stationCount} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="inline-block text-accent font-medium">
                          {stationCount.toLocaleString()}
                        </motion.span>{' '}{t('header.loadingMore')}
                      </span>
                    </motion.div>
                  ) : (
                    <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                      <span>{t('header.liveStations', { count: stationCount })}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Right: Language + Favorites + Info */}
        <div className="flex items-center gap-1 flex-shrink-0">
          {currentStation && (
            <div className="hidden md:flex items-center gap-1.5 text-[10px] text-muted-foreground mr-2">
              {isBackgroundLoading ? (
                <Loader2 className="w-3 h-3 animate-spin text-accent" />
              ) : (
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
              )}
              <span>{stationCount.toLocaleString()}</span>
            </div>
          )}

          {/* Language Selector */}
          <div className="relative" ref={langRef}>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => { setShowLangDropdown(!showLangDropdown); setShowFavDropdown(false); }}
              className="text-xs text-muted-foreground hover:text-foreground gap-1 px-2"
            >
              <Languages className="w-4 h-4" />
              <span className="hidden sm:inline text-[10px] uppercase font-medium">{currentLang}</span>
            </Button>
            <AnimatePresence>
              {showLangDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  className="absolute right-0 top-full mt-1 w-48 glass-strong border border-border/50 rounded-xl shadow-xl z-50 overflow-hidden"
                >
                  <div className="p-2 grid grid-cols-2 gap-1 max-h-64 overflow-y-auto">
                    {Object.entries(languageNames).map(([code, name]) => (
                      <button
                        key={code}
                        onClick={() => { i18n.changeLanguage(code); setShowLangDropdown(false); }}
                        className={`p-2 rounded-lg text-xs text-left transition-colors ${
                          currentLang === code
                            ? 'bg-primary/20 text-primary border border-primary/30'
                            : 'hover:bg-muted/50 text-muted-foreground'
                        }`}
                      >
                        {name}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Favorites */}
          <div className="relative" ref={favRef}>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => { setShowFavDropdown(!showFavDropdown); setShowLangDropdown(false); }}
              className="text-xs text-muted-foreground hover:text-foreground gap-1 relative"
            >
              <Heart className="w-4 h-4" />
              {favoriteCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-destructive text-destructive-foreground text-[9px] flex items-center justify-center font-bold">
                  {favoriteCount > 9 ? '9+' : favoriteCount}
                </span>
              )}
            </Button>
            <AnimatePresence>
              {showFavDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  className="absolute right-0 top-full mt-1 w-72 glass-strong border border-border/50 rounded-xl shadow-xl z-50 overflow-hidden"
                >
                  <div className="p-3">
                    <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-2">
                      <Heart className="w-3.5 h-3.5" />
                      {t('menu.favourites')} ({favoriteCount})
                    </h3>
                    {favoriteStations.length === 0 ? (
                      <div className="text-center py-4 text-muted-foreground">
                        <Heart className="w-6 h-6 mx-auto mb-1.5 opacity-40" />
                        <p className="text-xs">{t('menu.noFavourites')}</p>
                        <p className="text-[10px] mt-0.5 text-muted-foreground/60">{t('menu.tapHeart')}</p>
                      </div>
                    ) : (
                      <div className="space-y-1 max-h-60 overflow-y-auto">
                        {favoriteStations.slice(0, 10).map(station => {
                          const isActive = currentStation?.id === station.id;
                          return (
                            <button
                              key={station.id}
                              onClick={() => { onStationSelect?.(station); setShowFavDropdown(false); }}
                              className={`w-full p-2 rounded-lg text-left transition-all flex items-center gap-2 ${
                                isActive
                                  ? isPlaying ? 'bg-accent/20 border border-accent/50' : 'bg-primary/20 border border-primary/50'
                                  : 'hover:bg-muted/50 border border-transparent'
                              }`}
                            >
                              <Radio className={`w-3.5 h-3.5 flex-shrink-0 ${isActive && isPlaying ? 'text-accent' : 'text-muted-foreground'}`} />
                              <span className="text-xs truncate flex-1">{station.name}</span>
                              {isActive && isPlaying && <span className="w-2 h-2 bg-accent rounded-full animate-pulse flex-shrink-0" />}
                              <button
                                onClick={(e) => { e.stopPropagation(); onToggleFavorite?.(station.id); }}
                                className="text-red-500 flex-shrink-0 p-0.5"
                              >
                                <Heart className="w-3 h-3 fill-current" />
                              </button>
                            </button>
                          );
                        })}
                        {favoriteStations.length > 10 && (
                          <p className="text-[10px] text-muted-foreground/60 text-center pt-1">
                            {t('menu.more', { count: favoriteStations.length - 10 })}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Button variant="ghost" size="icon" onClick={onInfoClick} className="text-muted-foreground hover:text-foreground">
            <Info className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Progress bar */}
      <AnimatePresence>
        {isBackgroundLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-transparent via-accent to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              style={{ width: '50%' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
