import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const BASE_URL = 'https://cartofm.com';
const OG_IMAGE = 'https://cartofm.com/og-image.png';

const SUPPORTED_LANGS = ['en', 'fr', 'es', 'de', 'sw', 'zh', 'ru', 'hi', 'ar', 'pt', 'id'] as const;
const LANG_HREFLANG_MAP: Record<string, string> = {
  en: 'en', fr: 'fr', es: 'es', de: 'de', sw: 'sw',
  zh: 'zh-Hans', ru: 'ru', hi: 'hi', ar: 'ar', pt: 'pt', id: 'id',
};

interface SEOHeadProps {
  title: string;
  description: string;
  jsonLd?: Record<string, unknown>;
  ogType?: string;
  ogImage?: string;
}

export const SEOHead = ({ title, description, jsonLd, ogType = 'website', ogImage = OG_IMAGE }: SEOHeadProps) => {
  const location = useLocation();
  const canonicalUrl = `${BASE_URL}${location.pathname}`;

  useEffect(() => {
    document.title = title;

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

    // Core meta
    setMeta('name', 'description', description);
    setMeta('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1');

    // Open Graph
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:type', ogType);
    setMeta('property', 'og:image', ogImage);
    setMeta('property', 'og:image:width', '1200');
    setMeta('property', 'og:image:height', '630');
    setMeta('property', 'og:site_name', 'CartoFM');
    setMeta('property', 'og:locale', 'en_US');

    // Twitter
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', ogImage);
    setMeta('name', 'twitter:site', '@CartoFM');

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    // Hreflang alternate links
    // Remove old hreflang links
    document.querySelectorAll('link[data-hreflang]').forEach(el => el.remove());
    for (const lang of SUPPORTED_LANGS) {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = LANG_HREFLANG_MAP[lang];
      link.href = canonicalUrl; // same URL, language detected client-side
      link.setAttribute('data-hreflang', 'true');
      document.head.appendChild(link);
    }
    // x-default
    const xDefault = document.createElement('link');
    xDefault.rel = 'alternate';
    xDefault.hreflang = 'x-default';
    xDefault.href = canonicalUrl;
    xDefault.setAttribute('data-hreflang', 'true');
    document.head.appendChild(xDefault);

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
      document.querySelectorAll('link[data-hreflang]').forEach(el => el.remove());
    };
  }, [title, description, canonicalUrl, jsonLd, ogType, ogImage]);

  return null;
};
