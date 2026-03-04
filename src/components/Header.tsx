import { motion, AnimatePresence } from 'framer-motion';
import { Radio, Menu, Info, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onMenuClick: () => void;
  onInfoClick: () => void;
  stationCount: number;
  isBackgroundLoading?: boolean;
}

export const Header = ({ onMenuClick, onInfoClick, stationCount, isBackgroundLoading }: HeaderProps) => {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-40 glass border-b border-border/30"
    >
      <div className="max-w-7xl mx-auto px-3 py-2 md:px-4 md:py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="md:hidden"
          >
            <Menu className="w-5 h-5" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="hidden md:flex"
          >
            <Menu className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center"
            >
              <Radio className="w-4 h-4 text-primary-foreground" />
            </motion.div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">
                <span className="text-gradient-primary">Radio</span>
                <span className="text-gradient-accent">Verse</span>
              </h1>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
            <AnimatePresence mode="wait">
              {isBackgroundLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-2"
                >
                  <Loader2 className="w-3 h-3 animate-spin text-accent" />
                  <span>
                    <motion.span
                      key={stationCount}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="inline-block text-accent font-medium"
                    >
                      {stationCount.toLocaleString()}
                    </motion.span>
                    {' '}stations · loading more…
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <span>{stationCount.toLocaleString()} live stations</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile: compact indicator */}
          <div className="flex sm:hidden items-center gap-1.5 text-xs text-muted-foreground">
            {isBackgroundLoading ? (
              <Loader2 className="w-3 h-3 animate-spin text-accent" />
            ) : (
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
            )}
            <span>{stationCount.toLocaleString()}</span>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onInfoClick}
            className="text-muted-foreground hover:text-foreground"
          >
            <Info className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Thin progress bar at bottom of header */}
      <AnimatePresence>
        {isBackgroundLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden"
          >
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
