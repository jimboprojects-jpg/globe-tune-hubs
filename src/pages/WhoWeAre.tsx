import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Radio, Users, Headphones, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SEOHead } from '@/components/SEOHead';
import { useTranslation } from 'react-i18next';

const WhoWeAre = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Who We Are – CartoFM"
        description="Learn about CartoFM — the interactive world radio platform connecting listeners to thousands of live stations from every corner of the globe."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "About CartoFM",
          "url": "https://globe-tune-hubs.lovable.app/who-we-are",
          "isPartOf": { "@type": "WebSite", "name": "CartoFM", "url": "https://globe-tune-hubs.lovable.app" }
        }}
      />

      <div className="glass border-b border-border/30 sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <Users className="w-5 h-5 text-primary" />
          <h1 className="text-lg font-bold">
            <span className="text-gradient-primary">{t('whoWeAre.title').split(' ')[0]}</span>{' '}
            <span className="text-gradient-accent">{t('whoWeAre.title').split(' ').slice(1).join(' ')}</span>
          </h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-3 md:px-4 py-5 md:py-8 space-y-6 md:space-y-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex items-center gap-4">
            <img src="/favicon.png" alt="CartoFM" className="w-16 h-16 rounded-2xl" />
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                <span className="text-gradient-primary">Carto</span>
                <span className="text-gradient-accent">FM</span>
              </h2>
              <p className="text-muted-foreground text-sm">{t('whoWeAre.tagline')}</p>
            </div>
          </div>

          <div className="glass rounded-xl p-4 md:p-6 space-y-4">
            <div className="flex items-start gap-3">
              <Globe className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">{t('whoWeAre.mission')}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t('whoWeAre.missionText')}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Headphones className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">{t('whoWeAre.whatWeDo')}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t('whoWeAre.whatWeDoText')}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">{t('whoWeAre.community')}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t('whoWeAre.communityText')}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WhoWeAre;
