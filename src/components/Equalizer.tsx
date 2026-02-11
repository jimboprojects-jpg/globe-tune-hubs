import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

export interface EQBand {
  frequency: number;
  gain: number;
  label: string;
}

export interface EQPreset {
  name: string;
  gains: number[];
}

export const EQ_BANDS: EQBand[] = [
  { frequency: 60, gain: 0, label: '60' },
  { frequency: 170, gain: 0, label: '170' },
  { frequency: 310, gain: 0, label: '310' },
  { frequency: 600, gain: 0, label: '600' },
  { frequency: 1000, gain: 0, label: '1K' },
  { frequency: 3000, gain: 0, label: '3K' },
  { frequency: 6000, gain: 0, label: '6K' },
  { frequency: 12000, gain: 0, label: '12K' },
];

export const EQ_PRESETS: EQPreset[] = [
  { name: 'Flat', gains: [0, 0, 0, 0, 0, 0, 0, 0] },
  { name: 'Rock', gains: [5, 4, -2, -1, 2, 4, 5, 4] },
  { name: 'Pop', gains: [-1, 2, 4, 5, 4, 2, -1, -2] },
  { name: 'Jazz', gains: [3, 1, -2, -1, 1, 3, 4, 3] },
  { name: 'Classical', gains: [4, 3, 1, -1, -1, 1, 3, 4] },
  { name: 'Bass Boost', gains: [6, 5, 3, 1, 0, 0, 0, 0] },
  { name: 'Treble Boost', gains: [0, 0, 0, 0, 1, 3, 5, 6] },
  { name: 'Vocal', gains: [-2, -1, 2, 5, 5, 3, 1, -1] },
];

interface EqualizerProps {
  isOpen: boolean;
  onClose: () => void;
  gains: number[];
  onGainChange: (bandIndex: number, gain: number) => void;
  onPresetSelect: (preset: EQPreset) => void;
  activePreset: string | null;
}

export const Equalizer = ({
  isOpen,
  onClose,
  gains,
  onGainChange,
  onPresetSelect,
  activePreset,
}: EqualizerProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-28 left-1/2 -translate-x-1/2 z-50 glass-strong rounded-2xl border border-border/50 p-5 w-[90vw] max-w-lg"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">Equalizer</h3>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="w-7 h-7">
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Presets */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {EQ_PRESETS.map((preset) => (
              <button
                key={preset.name}
                onClick={() => onPresetSelect(preset)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  activePreset === preset.name
                    ? 'bg-primary text-primary-foreground shadow-[0_0_12px_hsl(var(--primary)/0.4)]'
                    : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                {preset.name}
              </button>
            ))}
          </div>

          {/* Band sliders (vertical) */}
          <div className="flex items-end justify-between gap-1 h-36">
            {EQ_BANDS.map((band, i) => (
              <div key={band.frequency} className="flex flex-col items-center gap-1 flex-1">
                <span className="text-[10px] text-primary font-mono">
                  {gains[i] > 0 ? '+' : ''}{gains[i]}
                </span>
                <div className="h-24 flex items-center">
                  <input
                    type="range"
                    min={-12}
                    max={12}
                    step={1}
                    value={gains[i]}
                    onChange={(e) => onGainChange(i, Number(e.target.value))}
                    className="eq-slider"
                    style={{
                      writingMode: 'vertical-lr' as any,
                      direction: 'rtl',
                      width: '24px',
                      height: '96px',
                      appearance: 'none',
                      background: 'transparent',
                    }}
                  />
                </div>
                <span className="text-[10px] text-muted-foreground font-mono">{band.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
