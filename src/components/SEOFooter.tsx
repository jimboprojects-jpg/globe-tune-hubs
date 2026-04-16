import { Link } from 'react-router-dom';
import { GENRES } from '@/data/genreContent';
import { blogPosts } from '@/data/blogPosts';

const SEOFooter = () => {
  const topCountries = [
    { code: 'US', name: 'United States' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'DE', name: 'Germany' },
    { code: 'FR', name: 'France' },
    { code: 'BR', name: 'Brazil' },
    { code: 'JP', name: 'Japan' },
    { code: 'IN', name: 'India' },
    { code: 'MX', name: 'Mexico' },
    { code: 'NG', name: 'Nigeria' },
    { code: 'AU', name: 'Australia' },
    { code: 'CA', name: 'Canada' },
    { code: 'ES', name: 'Spain' },
    { code: 'IT', name: 'Italy' },
    { code: 'KE', name: 'Kenya' },
    { code: 'ZA', name: 'South Africa' },
  ];

  return (
    <footer className="border-t border-border/30 bg-muted/20 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">CartoFM</h3>
            <nav aria-label="CartoFM pages" className="space-y-2">
              <Link to="/" className="block text-xs text-muted-foreground hover:text-foreground transition-colors">Home</Link>
              <Link to="/countries" className="block text-xs text-muted-foreground hover:text-foreground transition-colors">Listen by Country</Link>
              <Link to="/genres" className="block text-xs text-muted-foreground hover:text-foreground transition-colors">Listen by Genre</Link>
              <Link to="/faq" className="block text-xs text-muted-foreground hover:text-foreground transition-colors">FAQ</Link>
              <Link to="/who-we-are" className="block text-xs text-muted-foreground hover:text-foreground transition-colors">Who We Are</Link>
            </nav>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Genres</h3>
            <nav aria-label="Radio genres" className="space-y-2">
              {GENRES.slice(0, 8).map(g => (
                <Link key={g.slug} to={`/genres/${g.slug}`} className="block text-xs text-muted-foreground hover:text-foreground transition-colors">{g.name} Radio</Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Popular Countries</h3>
            <nav aria-label="Popular countries" className="space-y-2">
              {topCountries.slice(0, 8).map(c => (
                <Link key={c.code} to={`/countries/${c.code}`} className="block text-xs text-muted-foreground hover:text-foreground transition-colors">{c.name} Radio</Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Blog</h3>
            <nav aria-label="Blog articles" className="space-y-2">
              <Link to="/blog" className="block text-xs text-muted-foreground hover:text-foreground transition-colors">All Articles</Link>
              {blogPosts.slice(0, 5).map(p => (
                <Link key={p.slug} to={`/blog/${p.slug}`} className="block text-xs text-muted-foreground hover:text-foreground transition-colors line-clamp-1">{p.title}</Link>
              ))}
            </nav>
            <div className="mt-4 space-y-2">
              <Link to="/terms" className="block text-xs text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link>
              <Link to="/privacy" className="block text-xs text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border/20 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} CartoFM — Stream live radio stations from around the world. Free, no sign-up required.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default SEOFooter;
