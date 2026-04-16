import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, FileText, Shield, Globe, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { RadioStation } from '@/data/radioStations';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface StationListProps {
  stations: RadioStation[];
  currentStation: RadioStation | null;
  isPlaying: boolean;
  onStationSelect: (station: RadioStation) => void;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: (stationId: string) => boolean;
  onToggleFavorite: (stationId: string) => void;
  favoriteIds: Set<string>;
}

export const StationList = ({
  stations,
  currentStation,
  isPlaying,
  onStationSelect,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite,
  favoriteIds,
}: StationListProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleNavigate = (path: string) => {
    onClose();
    navigate(path);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          <motion.div
            initial={{ x: -400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -400, opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed left-0 top-0 bottom-0 w-full max-w-sm z-50 glass-strong border-r border-border/50"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="p-4 border-b border-border/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src="/favicon.png" alt="CartoFM" className="w-7 h-7 rounded-md" />
                    <h2 className="text-lg font-bold">
                      <span className="text-gradient-primary">Carto</span>
                      <span className="text-gradient-accent">FM</span>
                    </h2>
                  </div>
                  <Button variant="ghost" size="icon" onClick={onClose}>
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              <ScrollArea className="flex-1">
                <div className="p-4 space-y-6">
                  {/* Pages Section */}
                  <div>
                    <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
                      {t('menu.pages')}
                    </h3>
                    <div className="space-y-1">
                      <button
                        onClick={() => handleNavigate('/countries')}
                        className="w-full flex items-center gap-3 p-3 rounded-lg text-left hover:bg-muted/50 transition-colors"
                      >
                        <Globe className="w-4 h-4 text-accent" />
                        <span className="text-sm text-foreground font-medium">{t('menu.countries')}</span>
                      </button>
                      <button
                        onClick={() => handleNavigate('/blog')}
                        className="w-full flex items-center gap-3 p-3 rounded-lg text-left hover:bg-muted/50 transition-colors"
                      >
                        <BookOpen className="w-4 h-4 text-accent" />
                        <span className="text-sm text-foreground font-medium">{t('menu.blog')}</span>
                      </button>
                      <button
                        onClick={() => handleNavigate('/who-we-are')}
                        className="w-full flex items-center gap-3 p-3 rounded-lg text-left hover:bg-muted/50 transition-colors"
                      >
                        <Users className="w-4 h-4 text-primary" />
                        <span className="text-sm text-foreground">{t('menu.whoWeAre')}</span>
                      </button>
                      <button
                        onClick={() => handleNavigate('/terms')}
                        className="w-full flex items-center gap-3 p-3 rounded-lg text-left hover:bg-muted/50 transition-colors"
                      >
                        <FileText className="w-4 h-4 text-primary" />
                        <span className="text-sm text-foreground">{t('menu.terms')}</span>
                      </button>
                      <button
                        onClick={() => handleNavigate('/privacy')}
                        className="w-full flex items-center gap-3 p-3 rounded-lg text-left hover:bg-muted/50 transition-colors"
                      >
                        <Shield className="w-4 h-4 text-primary" />
                        <span className="text-sm text-foreground">{t('menu.privacy')}</span>
                      </button>
                    </div>
                  </div>

                  <div className="border-t border-border/30" />

                  {/* Social Links */}
                  <div>
                    <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
                      {t('menu.followUs')}
                    </h3>
                    <div className="flex items-center gap-3">
                      <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-muted/50 hover:bg-muted flex items-center justify-center transition-colors group" title="TikTok">
                        <svg viewBox="0 0 24 24" className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" fill="currentColor">
                          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.73a8.19 8.19 0 004.76 1.52V6.79a4.83 4.83 0 01-1-.1z"/>
                        </svg>
                      </a>
                      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-muted/50 hover:bg-muted flex items-center justify-center transition-colors group" title="Facebook">
                        <svg viewBox="0 0 24 24" className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" fill="currentColor">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </a>
                      <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-muted/50 hover:bg-muted flex items-center justify-center transition-colors group" title="X (Twitter)">
                        <svg viewBox="0 0 24 24" className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" fill="currentColor">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </ScrollArea>

              {/* Footer */}
              <div className="p-4 border-t border-border/50">
                <div className="text-[10px] text-muted-foreground/60 text-center">
                  {String(t('menu.stationsWorldwide', { count: stations.length } as Record<string, unknown>))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
