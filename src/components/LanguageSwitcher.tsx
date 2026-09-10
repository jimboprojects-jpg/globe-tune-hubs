import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLocation } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { languageNames } from '@/i18n/translations';
import { useSwitchLanguage } from '@/lib/locale';

/** Compact language menu usable on any page (station pages, etc.). */
export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const switchLanguage = useSwitchLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const currentLang = i18n.language?.split('-')[0] || 'en';

  return (
    <div className="relative" ref={ref}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setOpen(!open)}
        aria-label="Change language"
        className="text-xs text-muted-foreground hover:text-foreground gap-1 px-2"
      >
        <Languages className="w-4 h-4" />
        <span className="text-[10px] uppercase font-medium">{currentLang}</span>
      </Button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            className="absolute right-0 top-full mt-1 w-48 glass-strong border border-border/50 rounded-xl shadow-xl z-50 overflow-hidden"
          >
            <div className="p-2 grid grid-cols-2 gap-1 max-h-64 overflow-y-auto">
              {Object.entries(languageNames).map(([code, name]) => (
                <button
                  key={code}
                  onClick={() => {
                    i18n.changeLanguage(code);
                    switchLanguage(code, location.pathname);
                    setOpen(false);
                  }}
                  className={`p-2 rounded-lg text-xs text-left transition-colors ${
                    currentLang === code
                      ? 'bg-primary/20 text-primary border border-primary/30'
                      : 'hover:bg-muted/50 text-muted-foreground'
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
