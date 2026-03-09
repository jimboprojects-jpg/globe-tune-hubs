import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Radio, Users, Headphones, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WhoWeAre = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="glass border-b border-border/30 sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <Users className="w-5 h-5 text-primary" />
          <h1 className="text-lg font-bold">
            <span className="text-gradient-primary">Who</span>{' '}
            <span className="text-gradient-accent">We Are</span>
          </h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Radio className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                <span className="text-gradient-primary">Carto</span>
                <span className="text-gradient-accent">FM</span>
              </h2>
              <p className="text-muted-foreground text-sm">The world in your ears</p>
            </div>
          </div>

          <div className="glass rounded-xl p-6 space-y-4">
            <div className="flex items-start gap-3">
              <Globe className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Our Mission</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  RadioVerse brings together radio stations from every corner of the globe into one beautiful, interactive experience. We believe that radio connects cultures, shares stories, and brings people together — no matter the distance.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Headphones className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">What We Do</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We aggregate over 90,000 radio stations from multiple sources including the Radio Browser API, radio.net, and radio.garden — giving you the most comprehensive radio listening experience on the web. Spin the globe, discover new sounds, and tune in to live broadcasts from anywhere.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Community</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  RadioVerse is built for music lovers, culture enthusiasts, and curious listeners. Save your favourites, explore by country, and share your discoveries with friends.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WhoWeAre;
