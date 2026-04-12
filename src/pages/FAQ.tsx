import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, HelpCircle, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SEOHead } from '@/components/SEOHead';
import { useState } from 'react';

const faqs = [
  { q: 'What is CartoFM?', a: 'CartoFM is a free interactive world radio platform that lets you listen to thousands of live radio stations from every country on an interactive 3D globe. No sign-up or subscription required.' },
  { q: 'Is CartoFM free to use?', a: 'Yes, CartoFM is completely free. You can listen to any radio station without creating an account, paying fees, or dealing with paywalls.' },
  { q: 'How many radio stations does CartoFM have?', a: 'CartoFM aggregates over 30,000 live radio stations from around the world, covering every continent and nearly every country. New stations are added regularly.' },
  { q: 'What types of radio stations can I listen to?', a: 'You can listen to stations playing pop, rock, jazz, classical, electronic, hip hop, country, R&B, reggae, Latin, ambient music, and more. We also have news, talk, sports, and cultural programming stations.' },
  { q: 'How do I find radio stations from a specific country?', a: 'Click the "Listen by Country" button in the menu to browse stations organized by country. You can also spin the interactive 3D globe and click on any country to discover its local stations.' },
  { q: 'Can I search for specific radio stations?', a: 'Yes! Use the search feature in the station list to find stations by name, country, city, or genre. The search works across all available stations.' },
  { q: 'Does CartoFM work on mobile devices?', a: 'Yes, CartoFM is fully responsive and works on smartphones, tablets, and desktop computers. The 3D globe and all features are optimized for touch screens.' },
  { q: 'Can I save my favorite stations?', a: 'Yes, you can mark any station as a favorite by clicking the heart icon. Your favorites are saved locally and accessible from the favorites menu in the top right corner.' },
  { q: 'What is the equalizer feature?', a: 'CartoFM includes a built-in audio equalizer that lets you customize your listening experience. Choose from presets like Rock, Jazz, Pop, or create your own custom EQ settings.' },
  { q: 'In which languages is CartoFM available?', a: 'CartoFM is available in 11 languages: English, French, Spanish, German, Swahili, Chinese, Russian, Hindi, Arabic, Portuguese, and Indonesian (Bahasa). The app auto-detects your browser language.' },
  { q: 'Do I need to install anything?', a: 'No installation required. CartoFM runs entirely in your web browser. Just visit cartofm.com and start listening immediately.' },
  { q: 'Why is a station not playing?', a: 'Some stations may temporarily go offline or have regional restrictions. Try another station or check back later. You can also try adjusting your network settings or using a different browser.' },
  { q: 'How does the 3D globe work?', a: 'The interactive 3D globe shows radio stations as points of light around the world. Spin the globe by dragging, zoom in to see individual stations, and click on any station dot to start listening.' },
  { q: 'Can I listen to CartoFM while browsing other websites?', a: 'Yes! Audio playback continues even if you switch to another browser tab. The player controls remain accessible when you return to CartoFM.' },
  { q: 'Is my data collected when using CartoFM?', a: 'CartoFM respects your privacy. We use minimal analytics (Google Analytics) to improve the service. No personal data is collected, and no tracking cookies are used for advertising. See our Privacy Policy for details.' },
];

const FAQ = () => {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="FAQ – Frequently Asked Questions | CartoFM"
        description="Find answers to common questions about CartoFM. Learn how to listen to live radio stations worldwide, use the 3D globe, save favorites, and more."
        jsonLd={jsonLd}
      />

      <div className="glass border-b border-border/30 sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <HelpCircle className="w-5 h-5 text-primary" />
          <h1 className="text-lg font-bold text-foreground">Frequently Asked Questions</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-3 md:px-4 py-5 md:py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
          {faqs.map((faq, i) => (
            <div key={i} className="glass rounded-xl border border-border/20 overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-4 text-left"
              >
                <h2 className="text-sm font-medium text-foreground pr-4">{faq.q}</h2>
                <ChevronDown className={`w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
              </button>
              {openIndex === i && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="px-4 pb-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                </motion.div>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;
