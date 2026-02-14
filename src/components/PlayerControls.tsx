import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Radio, MapPin, Music, Loader2, X, Globe, Signal, Heart } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { RadioStation } from '@/data/radioStations';
import { AudioVisualizer } from './AudioVisualizer';
import { Equalizer, EQPreset } from './Equalizer';

interface PlayerControlsProps {
  station: RadioStation | null;
  isPlaying: boolean;
  isLoading: boolean;
  volume: number;
  error: string | null;
  onPlay: () => void;
  onPause: () => void;
  onVolumeChange: (value: number) => void;
  onStop: () => void;
  eqBands: number[];
  eqActivePreset: string;
  onEqBandsChange: (bands: number[]) => void;
  onEqPresetChange: (preset: EQPreset) => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export const PlayerControls = ({
  station,
  isPlaying,
  isLoading,
  volume,
  error,
  onPlay,
  onPause,
  onVolumeChange,
  onStop,
  eqBands,
  eqActivePreset,
  onEqBandsChange,
  onEqPresetChange,
  isFavorite,
  onToggleFavorite,
}: PlayerControlsProps) => {
  const isMuted = volume === 0;

  return (
    <AnimatePresence>
      {station && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50"
        >
          <div className="glass-strong border-t border-border/50 px-4 py-3 md:px-8">
            <div className="max-w-7xl mx-auto flex items-center gap-4 md:gap-6">
              {/* Station Info */}
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="relative">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    isPlaying ? 'bg-accent/20 glow-accent' : 'bg-primary/20 glow-primary'
                  } transition-all duration-500`}>
                    {station.favicon ? (
                      <img 
                        src={station.favicon} 
                        alt="" 
                        className="w-8 h-8 rounded-lg object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                    ) : (
                      <Radio className={`w-6 h-6 ${isPlaying ? 'text-accent' : 'text-primary'}`} />
                    )}
                  </div>
                  {isPlaying && (
                    <motion.div
                      className="absolute -top-1 -right-1"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <div className="w-2.5 h-2.5 bg-accent rounded-full glow-accent" />
                    </motion.div>
                  )}
                </div>
                
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground truncate text-sm">
                      {station.name}
                    </h3>
                    {isPlaying && (
                      <div className="flex items-center gap-1">
                        <Signal className="w-3 h-3 text-accent" />
                        <span className="text-[10px] font-mono text-accent uppercase">LIVE</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">{station.city}, {station.country}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Music className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate capitalize">{station.genre}</span>
                    </span>
                    {station.language && (
                      <span className="hidden md:flex items-center gap-1">
                        <Globe className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate capitalize">{station.language.split(',')[0]}</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Full visualizer */}
                {isPlaying && (
                  <div className="hidden lg:block">
                    <AudioVisualizer isPlaying={isPlaying} variant="full" />
                  </div>
                )}
              </div>

              {/* Error Message */}
              {error && (
                <div className="hidden md:block text-destructive text-xs max-w-48 text-center">
                  {error}
                </div>
              )}

              {/* Playback Controls */}
              <div className="flex items-center gap-2 md:gap-3 relative">
                {/* Equalizer */}
                <div className="hidden md:block relative">
                  <Equalizer
                    bands={eqBands}
                    onBandsChange={onEqBandsChange}
                    activePreset={eqActivePreset}
                    onPresetChange={onEqPresetChange}
                  />
                </div>

                {/* Play/Pause Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={isPlaying ? onPause : onPlay}
                  disabled={isLoading}
                  className={`w-12 h-12 rounded-full ${
                    isPlaying 
                      ? 'bg-accent text-accent-foreground hover:bg-accent/90 glow-accent' 
                      : 'bg-primary text-primary-foreground hover:bg-primary/90 glow-primary'
                  } transition-all duration-300`}
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : isPlaying ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5 ml-0.5" />
                  )}
                </Button>

                {/* Volume Control */}
                <div className="hidden md:flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onVolumeChange(isMuted ? 0.7 : 0)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {isMuted ? (
                      <VolumeX className="w-5 h-5" />
                    ) : (
                      <Volume2 className="w-5 h-5" />
                    )}
                  </Button>
                  <Slider
                    value={[volume * 100]}
                    onValueChange={([value]) => onVolumeChange(value / 100)}
                    max={100}
                    step={1}
                    className="w-24"
                  />
                </div>

                {/* Favorite Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onToggleFavorite}
                  className={isFavorite ? 'text-red-500 hover:text-red-400' : 'text-muted-foreground hover:text-foreground'}
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                </Button>

                {/* Close Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onStop}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
