import { useNavigate } from '@/lib/router-compat';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SEOHead } from '@/components/SEOHead';
import SEOFooter from '@/components/SEOFooter';
import { useTranslation } from 'react-i18next';

const TermsOfService = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const sections = [
    { title: 'Acceptance of Terms', text: 'By accessing or using CartoFM, you agree to these Terms of Service. If you do not agree with them, please do not use the service. You must be legally able to enter into this agreement in your jurisdiction.' },
    { title: 'The CartoFM Service', text: 'CartoFM is a free platform that helps users discover and listen to publicly available internet radio streams from around the world. CartoFM does not host, broadcast, edit, or control the third-party streams linked through the service.' },
    { title: 'Third-Party Content and Availability', text: 'Stations, broadcasts, artwork, trademarks, and other materials are supplied by third parties and remain their property. Streams may be unavailable, interrupted, changed, geo-restricted, or removed without notice. CartoFM does not guarantee the accuracy, legality, quality, suitability, or availability of third-party content.' },
    { title: 'Acceptable Use', text: 'You may use CartoFM only for lawful, personal purposes and in accordance with these terms. You must not misuse the service, interfere with its operation, attempt unauthorized access, introduce malicious code, scrape or overload infrastructure, infringe rights, or use the service to violate any applicable law.' },
    { title: 'Intellectual Property', text: 'The CartoFM name, branding, software, interface, and original materials are owned by or licensed to CartoFM and may not be copied, modified, distributed, or commercially exploited without permission. Third-party names, logos, and broadcasts belong to their respective owners.' },
    { title: 'Disclaimers', text: 'CartoFM is provided on an “as is” and “as available” basis to the fullest extent permitted by law. We disclaim all warranties, express or implied, including warranties of merchantability, fitness for a particular purpose, non-infringement, accuracy, and uninterrupted or error-free operation.' },
    { title: 'Limitation of Liability', text: 'To the fullest extent permitted by law, CartoFM and its contributors will not be liable for indirect, incidental, special, consequential, exemplary, or punitive damages, or for loss of data, revenue, profits, or access arising from or related to your use of the service or third-party content.' },
    { title: 'Changes and Termination', text: 'We may update these terms or modify, suspend, or discontinue any part of CartoFM at any time. Updated terms become effective when posted. Your continued use of the service after an update means you accept the revised terms.' },
    { title: 'Contact', text: 'Questions about these Terms of Service may be sent to hello@cartofm.com.' },
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
          "url": "https://cartofm.com/terms",
          "isPartOf": { "@type": "WebSite", "name": "CartoFM", "url": "https://cartofm.com" }
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
      <SEOFooter />
    </div>
  );
};

export default TermsOfService;
