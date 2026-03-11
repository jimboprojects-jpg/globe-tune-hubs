import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="glass border-b border-border/30 sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <Shield className="w-5 h-5 text-primary" />
          <h1 className="text-lg font-bold text-foreground">Privacy Policy</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-3 md:px-4 py-5 md:py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-xl p-4 md:p-6 space-y-5 md:space-y-6 text-sm text-muted-foreground leading-relaxed">
          <div>
            <h2 className="text-base font-semibold text-foreground mb-2">Information We Collect</h2>
            <p>CartoFMnot collect personal information. Your favourite stations are stored locally in your browser using localStorage and are never transmitted to our servers.</p>
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground mb-2">How We Use Data</h2>
            <p>We may collect anonymous usage analytics (e.g., page views, station plays) to improve the service. This data is aggregated and cannot identify individual users.</p>
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground mb-2">Third-Party Services</h2>
            <p>RadCarCartoFM to third-party radio stream providers and APIs. These services have their own privacy policies. We encourage you to review the privacy practices of each broadcaster.</p>
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground mb-2">Cookies</h2>
            <p>We may use essential cookies to ensure the proper functioning of the service. No tracking or advertising cookies are used.</p>
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground mb-2">Data Security</h2>
            <p>We take reasonable measures to protect the integrity of RadioVCartoFMver, no internet transmission is completely secure, and we cannot guarantee absolute security.</p>
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground mb-2">Contact</h2>
            <p>If you have questions about this privacy policy, please reach out to us through our social media channels.</p>
          </div>
          <p className="text-xs text-muted-foreground/60 pt-4 border-t border-border/30">Last updated: March 2026</p>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
