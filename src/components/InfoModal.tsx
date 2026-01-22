import { motion, AnimatePresence } from 'framer-motion';
import { X, Globe2, Radio, Headphones, MousePointer, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InfoModal = ({ isOpen, onClose }: InfoModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-lg md:w-full glass-strong rounded-2xl z-50 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <Radio className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">
                      <span className="text-gradient-primary">Radio</span>
                      <span className="text-gradient-accent">Verse</span>
                    </h2>
                    <p className="text-xs text-muted-foreground">Explore the world through radio</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                  <Globe2 className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium text-sm">Explore the Globe</h3>
                    <p className="text-xs text-muted-foreground">
                      Click and drag to rotate the 3D globe. Zoom in and out with scroll or pinch gestures.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                  <MousePointer className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium text-sm">Select Stations</h3>
                    <p className="text-xs text-muted-foreground">
                      Click on any glowing marker to tune into that radio station. Hover to see station details.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                  <Headphones className="w-5 h-5 text-accent mt-0.5" />
                  <div>
                    <h3 className="font-medium text-sm">Listen Live</h3>
                    <p className="text-xs text-muted-foreground">
                      All stations stream live radio from around the world. Audio quality depends on the station.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                  <Volume2 className="w-5 h-5 text-accent mt-0.5" />
                  <div>
                    <h3 className="font-medium text-sm">Playback Controls</h3>
                    <p className="text-xs text-muted-foreground">
                      Use the player bar at the bottom to control playback and volume.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-border/50 text-center">
                <p className="text-xs text-muted-foreground">
                  Made with ❤️ • Inspired by Radio Garden
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
