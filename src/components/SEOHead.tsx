import { useEffect } from 'react';

const BASE_URL = 'https://cartofm.com';
const OG_IMAGE = 'https://cartofm.com/og-image.png';

interface SEOHeadProps {
  title: string;
  description: string;
  jsonLd?: Record<string, unknown>;
  ogType?: string;
  ogImage?: string;
  /**
   * Routes own title/description/OG tags (localized, server-rendered).
   * Set this only where the real values are known just on the client —
   * e.g. a station page whose name is fetched at runtime.
   */
  overrideTitle?: boolean;
}

export const SEOHead = ({
  title,
  description,
  jsonLd,
  ogType = 'website',
  ogImage = OG_IMAGE,
  overrideTitle = false,
}: SEOHeadProps) => {
  useEffect(() => {
    const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (el) {
        el.setAttribute('content', content);
      } else {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        el.setAttribute('content', content);
        document.head.appendChild(el);
      }
    };

    if (overrideTitle) {
      const canonicalUrl =
        document.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? BASE_URL;

      document.title = title;
      setMeta('name', 'description', description);
      setMeta('property', 'og:title', title);
      setMeta('property', 'og:description', description);
      setMeta('property', 'og:url', canonicalUrl);
      setMeta('property', 'og:type', ogType);
      setMeta('property', 'og:image', ogImage);
      setMeta('property', 'og:image:alt', title);
      setMeta('name', 'twitter:card', 'summary_large_image');
      setMeta('name', 'twitter:title', title);
      setMeta('name', 'twitter:description', description);
      setMeta('name', 'twitter:image', ogImage);
      setMeta('name', 'twitter:image:alt', title);
    }

    // Sitewide extras the route head does not emit.
    setMeta('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1');
    setMeta('property', 'og:site_name', 'CartoFM');
    setMeta('name', 'twitter:site', '@CartoFM');

    if (jsonLd) {
      const existing = document.getElementById('page-jsonld');
      if (existing) existing.remove();
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'page-jsonld';
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      document.getElementById('page-jsonld')?.remove();
    };
  }, [title, description, jsonLd, ogType, ogImage, overrideTitle]);

  return null;
};
