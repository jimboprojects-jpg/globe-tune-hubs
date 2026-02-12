import { motion } from 'framer-motion';

interface AudioVisualizerProps {
  isPlaying: boolean;
  className?: string;
}

export const AudioVisualizer = ({ isPlaying, className = '' }: AudioVisualizerProps) => {
  const bars = [1, 2, 3, 4, 5];

  return (
    <div className={`flex items-end gap-0.5 h-4 ${className}`}>
      {bars.map((bar) => (
        <motion.div
          key={bar}
          className="w-0.5 bg-accent rounded-full"
          animate={isPlaying ? {
            height: ['4px', '16px', '8px', '14px', '4px'],
          } : {
            height: '4px',
          }}
          transition={isPlaying ? {
            duration: 0.8,
            repeat: Infinity,
            delay: bar * 0.1,
            ease: 'easeInOut',
          } : {
            duration: 0.3,
          }}
        />
      ))}
    </div>
  );
};
