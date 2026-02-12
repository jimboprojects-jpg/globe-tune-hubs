import { useState, useRef, useCallback, useEffect } from 'react';
import { RadioStation } from '@/data/radioStations';

interface UseRadioPlayerReturn {
  currentStation: RadioStation | null;
  isPlaying: boolean;
  isLoading: boolean;
  volume: number;
  error: string | null;
  play: (station: RadioStation) => void;
  pause: () => void;
  toggle: () => void;
  setVolume: (volume: number) => void;
  stop: () => void;
  audioElement: HTMLAudioElement | null;
}

export const useRadioPlayer = (): UseRadioPlayerReturn => {
  const [currentStation, setCurrentStation] = useState<RadioStation | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolumeState] = useState(0.7);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = volume;
    
    const audio = audioRef.current;
    
    const handlePlay = () => {
      setIsPlaying(true);
      setIsLoading(false);
    };
    
    const handlePause = () => {
      setIsPlaying(false);
    };
    
    const handleError = () => {
      setError('Unable to play this station. Stream may be unavailable.');
      setIsLoading(false);
      setIsPlaying(false);
    };
    
    const handleWaiting = () => {
      setIsLoading(true);
    };
    
    const handleCanPlay = () => {
      setIsLoading(false);
    };
    
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
    };
  }, []);

  const play = useCallback((station: RadioStation) => {
    if (!audioRef.current) return;
    
    setError(null);
    setIsLoading(true);
    
    // If same station, just play
    if (currentStation?.id === station.id && audioRef.current.src) {
      audioRef.current.play().catch(() => {
        setError('Playback failed. Please try again.');
        setIsLoading(false);
      });
      return;
    }
    
    // New station
    setCurrentStation(station);
    audioRef.current.src = station.streamUrl;
    audioRef.current.load();
    audioRef.current.play().catch(() => {
      setError('Unable to connect to station. Please try another.');
      setIsLoading(false);
    });
  }, [currentStation]);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }, []);

  const toggle = useCallback(() => {
    if (!currentStation) return;
    
    if (isPlaying) {
      pause();
    } else {
      play(currentStation);
    }
  }, [currentStation, isPlaying, pause, play]);

  const setVolume = useCallback((newVolume: number) => {
    setVolumeState(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
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

  return {
    currentStation,
    isPlaying,
    isLoading,
    volume,
    error,
    play,
    pause,
    toggle,
    setVolume,
    stop,
    audioElement: audioRef.current,
  };
};
