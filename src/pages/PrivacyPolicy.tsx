import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SEOHead } from '@/components/SEOHead';
import { useTranslation } from 'react-i18next';

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const sections = [
    { title: t('privacy.collect'), text: t('privacy.collectText') },
    { title: t('privacy.use'), text: t('privacy.useText') },
    { title: t('privacy.thirdParty'), text: t('privacy.thirdPartyText') },
    { title: t('privacy.cookies'), text: t('privacy.cookiesText') },
    { title: t('privacy.security'), text: t('privacy.securityText') },
    { title: t('privacy.contact'), text: t('privacy.contactText') },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Privacy Policy – CartoFM"
        description="CartoFM's Privacy Policy. Learn how we handle your data — no personal information collected, no tracking cookies."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Privacy Policy – CartoFM",
          "url": "https://globe-tune-hubs.lovable.app/privacy",
          "isPartOf": { "@type": "WebSite", "name": "CartoFM", "url": "https://globe-tune-hubs.lovable.app" }
        }}
      />

      <div className="glass border-b border-border/30 sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <Shield className="w-5 h-5 text-primary" />
          <h1 className="text-lg font-bold text-foreground">{t('privacy.title')}</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-3 md:px-4 py-5 md:py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-xl p-4 md:p-6 space-y-5 md:space-y-6 text-sm text-muted-foreground leading-relaxed">
          {sections.map((section, i) => (
            <div key={i}>
              <h2 className="text-base font-semibold text-foreground mb-2">{section.title}</h2>
              <p>{section.text}</p>
            </div>
          ))}
          <p className="text-xs text-muted-foreground/60 pt-4 border-t border-border/30">{t('privacy.lastUpdated')}</p>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
