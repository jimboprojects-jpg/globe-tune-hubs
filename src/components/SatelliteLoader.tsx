import { motion } from 'framer-motion';

export const SatelliteLoader = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-6">
      {/* Earth + orbiting satellite */}
      <div className="relative w-32 h-32">
        {/* Earth */}
        <div className="absolute inset-4 rounded-full bg-gradient-to-br from-primary/30 via-primary/20 to-accent/10 border border-primary/20 shadow-[0_0_40px_hsl(var(--primary)/0.2)]" />
        <div className="absolute inset-6 rounded-full bg-gradient-to-br from-primary/10 to-transparent" />

        {/* Orbit ring */}
        <div className="absolute inset-0 rounded-full border border-dashed border-primary/20" />

        {/* Satellite orbiting */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1">
            <div className="relative">
              <div className="w-3 h-3 bg-accent rounded-sm rotate-45 shadow-[0_0_10px_hsl(var(--accent)/0.8)]" />
              {/* Solar panels */}
              <div className="absolute top-1/2 -translate-y-1/2 -left-2 w-2 h-1 bg-primary/60 rounded-sm" />
              <div className="absolute top-1/2 -translate-y-1/2 -right-2 w-2 h-1 bg-primary/60 rounded-sm" />
            </div>
          </div>
        </motion.div>

        {/* Second orbit ring (tilted) */}
        <motion.div
          className="absolute inset-2 rounded-full border border-primary/10"
          style={{ transform: 'rotateX(60deg)' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="text-center space-y-2">
        <motion.p
          className="text-muted-foreground text-sm"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Scanning frequencies worldwide…
        </motion.p>
        <p className="text-muted-foreground/50 text-xs">Connecting to radio stations</p>
      </div>
    </div>
  );
};
