import { motion } from 'framer-motion';

interface AudioVisualizerProps {
  isPlaying: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const AudioVisualizer = ({ isPlaying, className = '', size = 'sm' }: AudioVisualizerProps) => {
  const config = {
    sm: { bars: 5, gap: 'gap-0.5', h: 'h-4', w: 'w-0.5' },
    md: { bars: 7, gap: 'gap-0.5', h: 'h-6', w: 'w-1' },
    lg: { bars: 12, gap: 'gap-[2px]', h: 'h-8', w: 'w-1' },
  }[size];

  const heights = [
    ['4px', '18px', '8px', '14px', '4px'],
    ['6px', '14px', '20px', '10px', '6px'],
    ['4px', '10px', '16px', '22px', '8px'],
    ['8px', '20px', '12px', '6px', '16px'],
    ['4px', '16px', '22px', '8px', '4px'],
    ['10px', '6px', '18px', '14px', '10px'],
    ['4px', '12px', '8px', '20px', '4px'],
    ['6px', '18px', '10px', '16px', '6px'],
    ['4px', '14px', '22px', '8px', '12px'],
    ['8px', '10px', '18px', '4px', '16px'],
    ['4px', '22px', '12px', '18px', '4px'],
    ['6px', '16px', '8px', '14px', '6px'],
  ];

  const colors = [
    'bg-primary',
    'bg-primary',
    'bg-accent',
    'bg-primary',
    'bg-accent',
    'bg-primary',
    'bg-primary',
    'bg-accent',
    'bg-primary',
    'bg-primary',
    'bg-accent',
    'bg-primary',
  ];

  return (
    <div className={`flex items-end ${config.gap} ${config.h} ${className}`}>
      {Array.from({ length: config.bars }).map((_, i) => (
        <motion.div
          key={i}
          className={`${config.w} rounded-full ${colors[i % colors.length]}`}
          animate={
            isPlaying
              ? { height: heights[i % heights.length] }
              : { height: '3px' }
          }
          transition={
            isPlaying
              ? { duration: 0.6 + (i % 3) * 0.15, repeat: Infinity, delay: i * 0.05, ease: 'easeInOut' }
              : { duration: 0.3 }
          }
        />
      ))}
    </div>
  );
};
