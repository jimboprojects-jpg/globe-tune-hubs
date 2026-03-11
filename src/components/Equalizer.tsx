import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

export interface EQBand {
  freq: string;
  gain: number;
}

export interface EQPreset {
  name: string;
  bands: number[];
}

export const EQ_PRESETS: EQPreset[] = [
  { name: 'Flat', bands: [0, 0, 0, 0, 0, 0, 0, 0] },
  { name: 'Rock', bands: [5, 4, -2, -3, 1, 3, 5, 4] },
  { name: 'Pop', bands: [-1, 2, 4, 5, 4, 1, -1, -2] },
  { name: 'Jazz', bands: [3, 1, -1, 2, -1, 1, 3, 4] },
  { name: 'Classical', bands: [4, 3, 1, -1, -1, 1, 3, 5] },
  { name: 'Bass Boost', bands: [6, 5, 3, 1, 0, 0, 0, 0] },
  { name: 'Treble', bands: [0, 0, 0, 0, 1, 3, 5, 6] },
  { name: 'Electronic', bands: [4, 3, 1, 0, -2, 1, 4, 5] },
];

const FREQ_LABELS = ['60', '170', '310', '600', '1K', '3K', '6K', '12K'];

interface EqualizerProps {
  bands: number[];
  onBandsChange: (bands: number[]) => void;
  activePreset: string;
  onPresetChange: (preset: EQPreset) => void;
}

export const Equalizer = ({ bands, onBandsChange, activePreset, onPresetChange }: EqualizerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleBandChange = useCallback((index: number, value: number) => {
    const newBands = [...bands];
    newBands[index] = value;
    onBandsChange(newBands);
  }, [bands, onBandsChange]);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className={`text-muted-foreground hover:text-foreground ${isOpen ? 'text-primary' : ''}`}
        title="Equalizer"
      >
        <SlidersHorizontal className="w-5 h-5" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="fixed bottom-16 left-2 right-2 md:absolute md:bottom-full md:left-1/2 md:right-auto md:-translate-x-1/2 mb-3 glass-strong rounded-2xl p-3 md:p-4 z-[60] md:w-[500px]"
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-primary" />
                Equalizer
              </h4>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="w-6 h-6">
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Presets */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {EQ_PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => onPresetChange(preset)}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                    activePreset === preset.name
                      ? 'bg-primary text-primary-foreground glow-primary'
                      : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
                  }`}
                >
                  {preset.name}
                </button>
              ))}
            </div>

            {/* Bands */}
            <div className="flex items-end gap-2 justify-between">
              {bands.map((gain, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5">
                  <span className="text-[10px] text-primary font-mono">
                    {gain > 0 ? `+${gain}` : gain}
                  </span>
                  <div className="h-24 flex items-center">
                    <Slider
                      orientation="vertical"
                      value={[gain]}
                      min={-8}
                      max={8}
                      step={1}
                      onValueChange={([v]) => handleBandChange(i, v)}
                      className="h-full"
                    />
                  </div>
                  <span className="text-[9px] text-muted-foreground font-mono">{FREQ_LABELS[i]}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
