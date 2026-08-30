import { useNavigate } from '@/lib/router-compat';
import { motion } from 'framer-motion';
import { ArrowLeft, Radio, Users, Headphones, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SEOFooter from '@/components/SEOFooter';
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
          "url": "https://cartofm.com/who-we-are",
          "isPartOf": { "@type": "WebSite", "name": "CartoFM", "url": "https://cartofm.com" }
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

          <div className="glass rounded-xl p-4 md:p-6 space-y-5 text-sm text-muted-foreground leading-relaxed">
            <div className="flex items-start gap-3">
              <Globe className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">CartoFM and CartoTV</h3>
                <p>CartoFM is a spin of CartoTV, both proudly built by Geo-Appsmith, a location-services consulting company powered by a dedicated team of GIS Developers and Engineers passionate about creating tools, applications, and geospatial systems that truly delight.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Headphones className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Curiosity and innovation</h3>
                <p>We are driven by curiosity and innovation — constantly pushing boundaries and solving problems in creative, unconventional ways. We love understanding how things work, asking the tough questions, and designing smart solutions that make a real impact.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Geospatial solutions for everyone</h3>
                <p>At our core, we are especially committed to developing geospatial solutions that serve underserved communities around the world. We believe maps and location intelligence are powerful tools for inclusion, access, and opportunity.</p>
                <p className="mt-3">Whether you have a mapping task, a GIS project, or any idea involving maps — big or small — we&apos;d love to collaborate.</p>
                <p className="mt-3">Feel free to reach out to us at <a className="text-primary hover:underline" href="mailto:hello@cartofm.com">hello@cartofm.com</a> and let&apos;s explore how we can work together to bring your vision to life.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <SEOFooter />
    </div>
  );
};

export default WhoWeAre;
