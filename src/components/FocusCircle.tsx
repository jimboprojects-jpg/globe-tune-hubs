import { motion, AnimatePresence } from 'framer-motion';
import { RadioStation } from '@/data/radioStations';

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
          className={`w-20 h-20 rounded-full border-2 transition-all duration-300 ${
            station
              ? isPlaying
                ? 'border-accent/70 shadow-[0_0_25px_rgba(245,158,11,0.3)]'
                : 'border-primary/60 shadow-[0_0_25px_rgba(20,184,166,0.3)]'
              : 'border-muted-foreground/15'
          }`}
        />

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

        {/* Station label */}
        <AnimatePresence>
          {station && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full left-1/2 -translate-x-1/2 mt-3 whitespace-nowrap text-center"
            >
              <div className="glass px-3 py-2 rounded-lg">
                <div className="text-sm font-medium text-foreground">{station.name}</div>
                <div className="text-xs text-muted-foreground">
                  {station.city}, {station.country}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
