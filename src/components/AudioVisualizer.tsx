import { motion } from 'framer-motion';

interface AudioVisualizerProps {
  isPlaying: boolean;
  className?: string;
  variant?: 'mini' | 'full';
}

const BARS_MINI = 5;
const BARS_FULL = 16;

const barColors = [
  'hsl(var(--primary))',
  'hsl(var(--primary-glow))',
  'hsl(175 84% 55%)',
  'hsl(var(--accent))',
  'hsl(var(--accent-glow))',
  'hsl(35 100% 60%)',
  'hsl(0 84% 60%)',
  'hsl(var(--primary))',
];

export const AudioVisualizer = ({ isPlaying, className = '', variant = 'mini' }: AudioVisualizerProps) => {
  const count = variant === 'full' ? BARS_FULL : BARS_MINI;
  const height = variant === 'full' ? 'h-12' : 'h-4';

  return (
    <div className={`flex items-end gap-[2px] ${height} ${className}`}>
      {Array.from({ length: count }).map((_, i) => {
        const colorIdx = Math.floor((i / count) * barColors.length);
        const color = barColors[Math.min(colorIdx, barColors.length - 1)];
        const maxH = variant === 'full' ? 48 : 16;
        const minH = variant === 'full' ? 4 : 3;
        const midH1 = minH + (maxH - minH) * (0.4 + Math.random() * 0.3);
        const midH2 = minH + (maxH - minH) * (0.5 + Math.random() * 0.3);
        const midH3 = minH + (maxH - minH) * (0.3 + Math.random() * 0.2);

        return (
          <motion.div
            key={i}
            className="rounded-full"
            style={{
              width: variant === 'full' ? 3 : 2,
              background: isPlaying
                ? `linear-gradient(to top, ${color}, hsl(var(--foreground) / 0.7))`
                : 'hsl(var(--muted-foreground) / 0.3)',
              boxShadow: isPlaying ? `0 0 6px ${color}` : 'none',
            }}
            animate={isPlaying ? {
              height: [`${minH}px`, `${midH1}px`, `${midH2}px`, `${maxH}px`, `${midH3}px`, `${minH}px`],
            } : {
              height: `${minH}px`,
            }}
            transition={isPlaying ? {
              duration: 0.6 + Math.random() * 0.4,
              repeat: Infinity,
              delay: i * 0.05,
              ease: 'easeInOut',
            } : {
              duration: 0.3,
            }}
          />
        );
      })}
    </div>
  );
};
