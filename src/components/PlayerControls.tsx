import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Loader2, X, Heart } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { RadioStation } from '@/data/radioStations';
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
          <div className="glass-strong border-t border-border/50 px-3 py-2 md:px-8 md:py-3">
            <div className="max-w-7xl mx-auto flex items-center gap-2 md:gap-4">
              {/* Left: Equalizer */}
              <div className="relative flex-shrink-0">
                <Equalizer
                  bands={eqBands}
                  onBandsChange={onEqBandsChange}
                  activePreset={eqActivePreset}
                  onPresetChange={onEqPresetChange}
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="hidden md:block text-destructive text-xs max-w-48 text-center truncate">
                  {error}
                </div>
              )}

              {/* Spacer */}
              <div className="flex-1" />

              {/* Center: Playback Controls */}
              <div className="flex items-center gap-1.5 md:gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={isPlaying ? onPause : onPlay}
                  disabled={isLoading}
                  className={`w-10 h-10 md:w-12 md:h-12 rounded-full ${
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
              </div>

              {/* Spacer */}
              <div className="flex-1" />

              {/* Right: Volume + Favorite + Close */}
              <div className="flex items-center gap-1.5 md:gap-2 flex-shrink-0">
                {/* Volume - Mobile toggle */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onVolumeChange(isMuted ? 0.7 : 0)}
                  className="md:hidden text-muted-foreground hover:text-foreground"
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </Button>

                {/* Volume - Desktop */}
                <div className="hidden md:flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onVolumeChange(isMuted ? 0.7 : 0)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </Button>
                  <Slider
                    value={[volume * 100]}
                    onValueChange={([value]) => onVolumeChange(value / 100)}
                    max={100}
                    step={1}
                    className="w-24"
                  />
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onToggleFavorite}
                  className={isFavorite ? 'text-red-500 hover:text-red-400' : 'text-muted-foreground hover:text-foreground'}
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                </Button>

                <Button variant="ghost" size="icon" onClick={onStop} className="text-muted-foreground hover:text-foreground">
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
