import { motion } from 'framer-motion';

export const SatelliteLoader = ({ message = 'Loading radio stations worldwide…' }: { message?: string }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-6 pt-8">
      {/* Earth */}
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 via-accent/10 to-secondary/30 shadow-[0_0_40px_hsl(var(--primary)/0.2)]" />
        <div className="absolute inset-1 rounded-full bg-gradient-to-br from-[#1a6b5a] via-[#1a4a7a] to-[#2a3a6a] overflow-hidden">
          {/* Continent shapes */}
          <div className="absolute top-3 left-4 w-6 h-4 bg-[#3a8a5a]/60 rounded-full rotate-12" />
          <div className="absolute top-6 right-3 w-8 h-5 bg-[#3a8a5a]/50 rounded-full -rotate-6" />
          <div className="absolute bottom-4 left-6 w-5 h-3 bg-[#3a8a5a]/40 rounded-full rotate-45" />
          <div className="absolute top-8 left-8 w-4 h-6 bg-[#3a8a5a]/50 rounded-full -rotate-12" />
        </div>
        {/* Atmosphere glow */}
        <div className="absolute -inset-1 rounded-full border border-primary/20" />

        {/* Orbiting satellite */}
        <motion.div
          className="absolute w-full h-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: 'center center' }}
        >
          <div className="absolute -top-2 left-1/2 -translate-x-1/2">
            {/* Satellite body */}
            <div className="relative">
              <div className="w-2 h-2 bg-foreground rounded-sm shadow-[0_0_8px_hsl(var(--primary))]" />
              {/* Solar panels */}
              <div className="absolute top-0.5 -left-2 w-2 h-1 bg-primary/80 rounded-sm" />
              <div className="absolute top-0.5 left-2 w-2 h-1 bg-primary/80 rounded-sm" />
            </div>
          </div>
        </motion.div>

        {/* Orbit path */}
        <div className="absolute -inset-2 rounded-full border border-dashed border-muted-foreground/15" />
      </div>

      <div className="text-center">
        <p className="text-muted-foreground text-sm">{message}</p>
        <motion.div
          className="flex justify-center gap-1 mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-primary/60"
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};
