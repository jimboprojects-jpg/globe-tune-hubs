import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Tag, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SEOHead } from '@/components/SEOHead';
import SEOFooter from '@/components/SEOFooter';
import { getBlogPost, blogPosts } from '@/data/blogPosts';

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = slug ? getBlogPost(slug) : undefined;

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <Button onClick={() => navigate('/blog')}>Back to Blog</Button>
        </div>
      </div>
    );
  }

  const related = blogPosts.filter(p => p.slug !== post.slug && p.category === post.category).slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.date,
    author: { '@type': 'Organization', name: 'CartoFM', url: 'https://cartofm.com' },
    publisher: { '@type': 'Organization', name: 'CartoFM', url: 'https://cartofm.com', logo: { '@type': 'ImageObject', url: 'https://cartofm.com/favicon.png' } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://cartofm.com/blog/${post.slug}` },
    keywords: post.tags.join(', '),
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cartofm.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://cartofm.com/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://cartofm.com/blog/${post.slug}` },
    ],
  };

  const combinedLd = [jsonLd, breadcrumbLd];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SEOHead title={post.metaTitle} description={post.metaDescription} jsonLd={combinedLd as any} ogType="article" />

      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b border-border/30">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate('/blog')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <nav className="flex items-center gap-1 text-xs text-muted-foreground overflow-hidden">
            <Link to="/" className="hover:text-foreground shrink-0">Home</Link>
            <ChevronRight className="w-3 h-3 shrink-0" />
            <Link to="/blog" className="hover:text-foreground shrink-0">Blog</Link>
            <ChevronRight className="w-3 h-3 shrink-0" />
            <span className="truncate text-foreground">{post.title}</span>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto px-4 py-8 w-full">
        <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{post.date}</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
            <span className="flex items-center gap-1"><Tag className="w-3 h-3" />{post.category}</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">{post.title}</h1>
          <p className="text-lg text-muted-foreground mb-8 italic">{post.excerpt}</p>

          <div className="prose prose-invert max-w-none">
            {post.content.map((para, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed mb-5">{para}</p>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-border/30">
            {post.tags.map(tag => (
              <span key={tag} className="px-3 py-1 rounded-full bg-muted text-xs text-muted-foreground">{tag}</span>
            ))}
          </div>
        </motion.article>

        {related.length > 0 && (
          <section className="mt-12 pt-8 border-t border-border/30">
            <h2 className="text-xl font-semibold mb-4">Related Articles</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {related.map(r => (
                <Link
                  key={r.slug}
                  to={`/blog/${r.slug}`}
                  className="p-4 rounded-lg border border-border/40 hover:border-primary/40 bg-card/50 hover:bg-card transition-all"
                >
                  <h3 className="text-sm font-semibold mb-1 line-clamp-2">{r.title}</h3>
                  <p className="text-xs text-muted-foreground">{r.readTime}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="mt-8 p-6 rounded-lg bg-muted/30 border border-border/30 text-center">
          <h2 className="text-lg font-semibold mb-2">Ready to Explore?</h2>
          <p className="text-sm text-muted-foreground mb-4">Spin the globe and discover radio stations from around the world.</p>
          <Button onClick={() => navigate('/')}>Open CartoFM Globe</Button>
        </div>
      </main>

      <SEOFooter />
    </div>
  );
};

export default BlogPostPage;
