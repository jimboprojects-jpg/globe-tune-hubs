import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Music, Globe, Radio, Signal } from 'lucide-react';
import { RadioStation } from '@/data/radioStations';
import { AudioVisualizer } from './AudioVisualizer';

interface FocusCircleProps {
  station: RadioStation | null;
  isPlaying: boolean;
}

export const FocusCircle = ({ station, isPlaying }: FocusCircleProps) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-10 flex items-center justify-center">
      <div className="relative">
        {/* Outer circle reticle */}
        <div
          className={`w-14 h-14 md:w-20 md:h-20 rounded-full border-2 transition-all duration-500 ${
            station
              ? isPlaying
                ? 'border-accent/70 shadow-[0_0_30px_hsl(var(--accent)/0.3)]'
                : 'border-primary/60 shadow-[0_0_30px_hsl(var(--primary)/0.3)]'
              : 'border-muted-foreground/15'
          }`}
        />

        {/* Inner ring */}
        {station && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`absolute inset-2 rounded-full border transition-all duration-500 ${
              isPlaying ? 'border-accent/30' : 'border-primary/20'
            }`}
          />
        )}

        {/* Center dot */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
            station
              ? isPlaying
                ? 'bg-accent'
                : 'bg-primary'
              : 'bg-muted-foreground/20'
          }`}
        />

        {/* Scanning pulse when no station */}
        {!station && (
          <motion.div
            className="absolute inset-0 rounded-full border border-muted-foreground/10"
            animate={{ scale: [1, 1.5], opacity: [0.3, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}

        {/* Station info card */}
        <AnimatePresence>
          {station && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-1/2 -translate-x-1/2 mt-3 whitespace-nowrap text-center"
            >
              <div className="glass-strong px-3 py-2 md:px-4 md:py-3 rounded-xl min-w-[160px] md:min-w-[200px]">
                {/* Station name with visualizer */}
                <div className="flex items-center justify-center gap-2 mb-1.5">
                  {isPlaying && <AudioVisualizer isPlaying={isPlaying} variant="mini" />}
                  <h3 className="text-xs md:text-sm font-bold text-foreground truncate max-w-[140px] md:max-w-[180px]">
                    {station.name}
                  </h3>
                  {isPlaying && <AudioVisualizer isPlaying={isPlaying} variant="mini" />}
                </div>

                {/* Location */}
                <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground mb-1">
                  <MapPin className="w-3 h-3 text-primary flex-shrink-0" />
                  <span>{station.city}, {station.country}</span>
                </div>

                {/* Genre */}
                <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground/70 mb-1">
                  <Music className="w-3 h-3 text-accent flex-shrink-0" />
                  <span className="capitalize">{station.genre}</span>
                </div>

                {/* Language */}
                {station.language && (
                  <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground/50">
                    <Globe className="w-3 h-3 flex-shrink-0" />
                    <span className="capitalize">{station.language.split(',')[0]}</span>
                  </div>
                )}

                {/* Live indicator */}
                {isPlaying && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-center gap-1.5 mt-2 pt-2 border-t border-border/30"
                  >
                    <Signal className="w-3 h-3 text-accent" />
                    <span className="text-[10px] font-mono text-accent uppercase tracking-wider">Live FM Signal</span>
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full bg-accent"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
