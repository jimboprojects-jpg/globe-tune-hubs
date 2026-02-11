import { useState, useRef, useCallback, useEffect } from 'react';
import { RadioStation } from '@/data/radioStations';
import { EQ_BANDS, EQ_PRESETS, EQPreset } from '@/components/Equalizer';

interface UseRadioPlayerReturn {
  currentStation: RadioStation | null;
  isPlaying: boolean;
  isLoading: boolean;
  volume: number;
  error: string | null;
  eqGains: number[];
  activePreset: string | null;
  play: (station: RadioStation) => void;
  pause: () => void;
  toggle: () => void;
  setVolume: (volume: number) => void;
  stop: () => void;
  setEqGain: (bandIndex: number, gain: number) => void;
  setEqPreset: (preset: EQPreset) => void;
}

export const useRadioPlayer = (): UseRadioPlayerReturn => {
  const [currentStation, setCurrentStation] = useState<RadioStation | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolumeState] = useState(0.7);
  const [error, setError] = useState<string | null>(null);
  const [eqGains, setEqGains] = useState<number[]>(EQ_PRESETS[0].gains);
  const [activePreset, setActivePreset] = useState<string | null>('Flat');

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const filtersRef = useRef<BiquadFilterNode[]>([]);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.crossOrigin = 'anonymous';
    audioRef.current.volume = volume;

    const audio = audioRef.current;

    const handlePlay = () => { setIsPlaying(true); setIsLoading(false); };
    const handlePause = () => { setIsPlaying(false); };
    const handleError = () => {
      setError('Unable to play this station. Stream may be unavailable.');
      setIsLoading(false);
      setIsPlaying(false);
    };
    const handleWaiting = () => { setIsLoading(true); };
    const handleCanPlay = () => { setIsLoading(false); };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('error', handleError);
    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('canplay', handleCanPlay);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.pause();
      audio.src = '';
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  // Initialize Web Audio API EQ
  const ensureAudioContext = useCallback(() => {
    if (audioCtxRef.current || !audioRef.current) return;
    try {
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;
      const source = ctx.createMediaElementSource(audioRef.current);
      sourceRef.current = source;

      const filters = EQ_BANDS.map((band, i) => {
        const filter = ctx.createBiquadFilter();
        filter.type = i === 0 ? 'lowshelf' : i === EQ_BANDS.length - 1 ? 'highshelf' : 'peaking';
        filter.frequency.value = band.frequency;
        filter.Q.value = 1.4;
        filter.gain.value = eqGains[i];
        return filter;
      });

      // Chain: source -> filter0 -> filter1 -> ... -> destination
      source.connect(filters[0]);
      for (let i = 0; i < filters.length - 1; i++) {
        filters[i].connect(filters[i + 1]);
      }
      filters[filters.length - 1].connect(ctx.destination);
      filtersRef.current = filters;
    } catch {
      // CORS or browser restriction — audio still plays, just no EQ
    }
  }, []);

  const play = useCallback((station: RadioStation) => {
    if (!audioRef.current) return;
    setError(null);
    setIsLoading(true);

    if (currentStation?.id === station.id && audioRef.current.src) {
      ensureAudioContext();
      audioRef.current.play().catch(() => {
        setError('Playback failed. Please try again.');
        setIsLoading(false);
      });
      return;
    }

    setCurrentStation(station);
    audioRef.current.src = station.streamUrl;
    audioRef.current.load();
    ensureAudioContext();
    audioRef.current.play().catch(() => {
      setError('Unable to connect to station. Please try another.');
      setIsLoading(false);
    });
  }, [currentStation, ensureAudioContext]);

  const pause = useCallback(() => {
    if (audioRef.current) audioRef.current.pause();
  }, []);

  const toggle = useCallback(() => {
    if (!currentStation) return;
    if (isPlaying) pause();
    else play(currentStation);
  }, [currentStation, isPlaying, pause, play]);

  const setVolume = useCallback((newVolume: number) => {
    setVolumeState(newVolume);
    if (audioRef.current) audioRef.current.volume = newVolume;
  }, []);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
    }
    setCurrentStation(null);
    setIsPlaying(false);
    setError(null);
  }, []);

  const setEqGain = useCallback((bandIndex: number, gain: number) => {
    setEqGains(prev => {
      const next = [...prev];
      next[bandIndex] = gain;
      return next;
    });
    setActivePreset(null);
    if (filtersRef.current[bandIndex]) {
      filtersRef.current[bandIndex].gain.value = gain;
    }
  }, []);

  const setEqPreset = useCallback((preset: EQPreset) => {
    setEqGains(preset.gains);
    setActivePreset(preset.name);
    preset.gains.forEach((gain, i) => {
      if (filtersRef.current[i]) {
        filtersRef.current[i].gain.value = gain;
      }
    });
  }, []);

  return {
    currentStation,
    isPlaying,
    isLoading,
    volume,
    error,
    eqGains,
    activePreset,
    play,
    pause,
    toggle,
    setVolume,
    stop,
    setEqGain,
    setEqPreset,
  };
};
