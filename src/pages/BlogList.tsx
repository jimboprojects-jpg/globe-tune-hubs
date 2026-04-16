import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SEOHead } from '@/components/SEOHead';
import SEOFooter from '@/components/SEOFooter';
import { blogPosts, getBlogListSEO, BLOG_CATEGORIES } from '@/data/blogPosts';
import { useState } from 'react';

const BlogList = () => {
  const navigate = useNavigate();
  const seo = getBlogListSEO();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = activeCategory
    ? blogPosts.filter(p => p.category === activeCategory)
    : blogPosts;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'CartoFM Blog',
    description: seo.description,
    url: 'https://cartofm.com/blog',
    publisher: { '@type': 'Organization', name: 'CartoFM', url: 'https://cartofm.com' },
    blogPost: blogPosts.map(p => ({
      '@type': 'BlogPosting',
      headline: p.title,
      description: p.excerpt,
      datePublished: p.date,
      author: { '@type': 'Organization', name: 'CartoFM' },
      url: `https://cartofm.com/blog/${p.slug}`,
    })),
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SEOHead title={seo.title} description={seo.description} jsonLd={jsonLd} />

      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b border-border/30">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-bold">CartoFM Blog</h1>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto px-4 py-8 w-full">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">World Radio Culture & Music Discovery</h2>
          <p className="text-muted-foreground">Guides, stories, and tips for exploring the world through radio.</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${!activeCategory ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'}`}
          >
            All
          </button>
          {BLOG_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${activeCategory === cat ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="space-y-6">
          {filtered.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to={`/blog/${post.slug}`}
                className="block p-5 rounded-lg border border-border/40 hover:border-primary/40 bg-card/50 hover:bg-card transition-all group"
              >
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{post.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                  <span className="flex items-center gap-1"><Tag className="w-3 h-3" />{post.category}</span>
                </div>
                <h3 className="text-lg font-semibold group-hover:text-primary transition-colors mb-2">{post.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
              </Link>
            </motion.article>
          ))}
        </div>
      </main>

      <SEOFooter />
    </div>
  );
};

export default BlogList;
