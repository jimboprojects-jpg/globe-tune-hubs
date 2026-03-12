import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SEOHead } from '@/components/SEOHead';
import { useTranslation } from 'react-i18next';

const TermsOfService = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const sections = [
    { title: t('terms.acceptance'), text: t('terms.acceptanceText') },
    { title: t('terms.description'), text: t('terms.descriptionText') },
    { title: t('terms.content'), text: t('terms.contentText') },
    { title: t('terms.conduct'), text: t('terms.conductText') },
    { title: t('terms.ip'), text: t('terms.ipText') },
    { title: t('terms.liability'), text: t('terms.liabilityText') },
    { title: t('terms.changes'), text: t('terms.changesText') },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Terms of Service – CartoFM"
        description="Read CartoFM's Terms of Service. Understand the rules and guidelines for using our free world radio streaming platform."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Terms of Service – CartoFM",
          "url": "https://globe-tune-hubs.lovable.app/terms",
          "isPartOf": { "@type": "WebSite", "name": "CartoFM", "url": "https://globe-tune-hubs.lovable.app" }
        }}
      />

      <div className="glass border-b border-border/30 sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <FileText className="w-5 h-5 text-primary" />
          <h1 className="text-lg font-bold text-foreground">{t('terms.title')}</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-3 md:px-4 py-5 md:py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-xl p-4 md:p-6 space-y-5 md:space-y-6 text-sm text-muted-foreground leading-relaxed">
          {sections.map((section, i) => (
            <div key={i}>
              <h2 className="text-base font-semibold text-foreground mb-2">{i + 1}. {section.title}</h2>
              <p>{section.text}</p>
            </div>
          ))}
          <p className="text-xs text-muted-foreground/60 pt-4 border-t border-border/30">{t('terms.lastUpdated')}</p>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfService;
