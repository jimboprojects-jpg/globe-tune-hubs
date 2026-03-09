import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio, Menu, Info, Loader2, Signal, MapPin, Music, Globe, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioStation } from '@/data/radioStations';
import { AudioVisualizer } from './AudioVisualizer';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onMenuClick: () => void;
  onInfoClick: () => void;
  stationCount: number;
  isBackgroundLoading?: boolean;
  currentStation?: RadioStation | null;
  isPlaying?: boolean;
}

export const Header = ({ onMenuClick, onInfoClick, stationCount, isBackgroundLoading, currentStation, isPlaying }: HeaderProps) => {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to countries page could be extended; for now just close
      setShowSearch(false);
    }
  };

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
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center"
            >
              <Radio className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary-foreground" />
            </motion.div>
            <h1 className="text-base md:text-lg font-bold tracking-tight hidden sm:block">
              <span className="text-gradient-primary">Carto</span>
              <span className="text-gradient-accent">FM</span>
            </h1>
          </div>
        </div>

        {/* Center: Now Playing station info */}
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
                  <img 
                    src={currentStation.favicon} 
                    alt="" 
                    className="w-6 h-6 md:w-7 md:h-7 rounded-md object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                ) : (
                  <Radio className={`w-4 h-4 ${isPlaying ? 'text-accent' : 'text-primary'}`} />
                )}
              </div>
              
              <div className="min-w-0 flex-1 max-w-xs md:max-w-md">
                <div className="flex items-center gap-2">
                  {isPlaying && <AudioVisualizer isPlaying={true} className="flex-shrink-0" />}
                  <span className="font-semibold text-foreground truncate text-xs md:text-sm">
                    {currentStation.name}
                  </span>
                  {isPlaying && (
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <Signal className="w-3 h-3 text-accent" />
                      <span className="text-[9px] md:text-[10px] font-mono text-accent uppercase">LIVE</span>
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
            <motion.div
              key="status"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center flex-1 mx-2"
            >
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <AnimatePresence mode="wait">
                  {isBackgroundLoading ? (
                    <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      <Loader2 className="w-3 h-3 animate-spin text-accent" />
                      <span>
                        <motion.span key={stationCount} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="inline-block text-accent font-medium">
                          {stationCount.toLocaleString()}
                        </motion.span>
                        {' '}stations · loading more…
                      </span>
                    </motion.div>
                  ) : (
                    <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                      <span>{stationCount.toLocaleString()} live stations</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Right: Countries + Search + Info */}
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

          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/countries')}
            className="text-xs text-muted-foreground hover:text-foreground gap-1"
          >
            <Globe className="w-4 h-4" />
            <span className="hidden sm:inline">Countries</span>
          </Button>

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
