import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const BASE_URL = 'https://globe-tune-hubs.lovable.app';

interface SEOHeadProps {
  title: string;
  description: string;
  jsonLd?: Record<string, unknown>;
}

export const SEOHead = ({ title, description, jsonLd }: SEOHeadProps) => {
  const location = useLocation();
  const canonicalUrl = `${BASE_URL}${location.pathname}`;

  useEffect(() => {
    document.title = title;

    // Meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', description);
    else {
      metaDesc = document.createElement('meta');
      (metaDesc as HTMLMetaElement).name = 'description';
      (metaDesc as HTMLMetaElement).content = description;
      document.head.appendChild(metaDesc);
    }

    // OG tags
    const setMeta = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`) || document.querySelector(`meta[name="${property}"]`);
      if (el) {
        el.setAttribute('content', content);
      } else {
        el = document.createElement('meta');
        el.setAttribute(property.startsWith('og:') ? 'property' : 'name', property);
        el.setAttribute('content', content);
        document.head.appendChild(el);
      }
    };

    setMeta('og:title', title);
    setMeta('og:description', description);
    setMeta('og:url', canonicalUrl);
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    // JSON-LD
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
      document.title = 'CartoFM – Stream Live Radio Stations Worldwide';
      const jsonLdScript = document.getElementById('page-jsonld');
      if (jsonLdScript) jsonLdScript.remove();
    };
  }, [title, description, canonicalUrl, jsonLd]);

  return null;
};
