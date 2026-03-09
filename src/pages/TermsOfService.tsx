import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TermsOfService = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="glass border-b border-border/30 sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <FileText className="w-5 h-5 text-primary" />
          <h1 className="text-lg font-bold text-foreground">Terms of Service</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-xl p-6 space-y-6 text-sm text-muted-foreground leading-relaxed">
          <div>
            <h2 className="text-base font-semibold text-foreground mb-2">1. Acceptance of Terms</h2>
            <p>By accessing and using CartoFMee to be bound by these Terms of Service. If you do not agree, please discontinue use of the service.</p>
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground mb-2">2. Description of Service</h2>
            <p>RadCarCarCartoFMo aggregation platform that provides access to publicly available internet radio streams from around the world. We do not host or produce any radio content.</p>
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground mb-2">3. Content Disclaimer</h2>
            <p>All radio streams are provided by third-party broadcasters. RadioVCartoFCartoFMible for the content, availability, or quality of any radio stream. Content may vary and is subject to the policies of the respective broadcasters.</p>
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground mb-2">4. User Conduct</h2>
            <p>You agree to use the service for lawful purposes only. You may not attempt to disrupt, overload, or interfere with the operation of RadioVersCartoFMonnected services.</p>
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground mb-2">5. Intellectual Property</h2>
            <p>The RadioVerse name, logo, and user interface design are the property of RadioVerse. Radio station names, logos, and stream content belong to their respective owners.</p>
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground mb-2">6. Limitation of Liability</h2>
            <p>RadioVerse is provided "as is" without warranties of any kind. We shall not be liable for any damages arising from the use or inability to use the service.</p>
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground mb-2">7. Changes to Terms</h2>
            <p>We reserve the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of the revised terms.</p>
          </div>
          <p className="text-xs text-muted-foreground/60 pt-4 border-t border-border/30">Last updated: March 2026</p>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfService;
