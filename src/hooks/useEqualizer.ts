import { useState, useCallback, useRef, useEffect } from 'react';
import { EQ_PRESETS, EQPreset } from '@/components/Equalizer';

const FREQ_VALUES = [60, 170, 310, 600, 1000, 3000, 6000, 12000];

export const useEqualizer = () => {
  const [bands, setBands] = useState<number[]>(EQ_PRESETS[0].bands);
  const [activePreset, setActivePreset] = useState('Flat');
  const contextRef = useRef<AudioContext | null>(null);
  const filtersRef = useRef<BiquadFilterNode[]>([]);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const connectedAudioRef = useRef<HTMLAudioElement | null>(null);

  const initEQ = useCallback((audioElement: HTMLAudioElement) => {
    // Don't re-init for the same element
    if (connectedAudioRef.current === audioElement && contextRef.current) {
      // Resume if suspended (browser autoplay policy)
      if (contextRef.current.state === 'suspended') {
        contextRef.current.resume();
      }
      return;
    }

    // Clean up previous
    if (contextRef.current) {
      try { contextRef.current.close(); } catch {}
    }

    const ctx = new AudioContext();
    contextRef.current = ctx;

    const source = ctx.createMediaElementSource(audioElement);
    sourceRef.current = source;
    connectedAudioRef.current = audioElement;

    const filters = FREQ_VALUES.map((freq, i) => {
      const filter = ctx.createBiquadFilter();
      filter.type = i === 0 ? 'lowshelf' : i === FREQ_VALUES.length - 1 ? 'highshelf' : 'peaking';
      filter.frequency.value = freq;
      filter.Q.value = 1.4;
      filter.gain.value = bands[i];
      return filter;
    });

    // Chain: source -> f0 -> f1 -> ... -> fn -> destination
    source.connect(filters[0]);
    for (let i = 0; i < filters.length - 1; i++) {
      filters[i].connect(filters[i + 1]);
    }
    filters[filters.length - 1].connect(ctx.destination);

    filtersRef.current = filters;
  }, []);

  const updateBands = useCallback((newBands: number[]) => {
    setBands(newBands);
    setActivePreset('Custom');
    filtersRef.current.forEach((filter, i) => {
      if (newBands[i] !== undefined) {
        filter.gain.value = newBands[i];
      }
    });
  }, []);

  const applyPreset = useCallback((preset: EQPreset) => {
    setBands(preset.bands);
    setActivePreset(preset.name);
    filtersRef.current.forEach((filter, i) => {
      if (preset.bands[i] !== undefined) {
        filter.gain.value = preset.bands[i];
      }
    });
  }, []);

  useEffect(() => {
    return () => {
      if (contextRef.current) {
        try { contextRef.current.close(); } catch {}
      }
    };
  }, []);

  return {
    bands,
    activePreset,
    updateBands,
    applyPreset,
    initEQ,
    audioContext: contextRef,
  };
};
