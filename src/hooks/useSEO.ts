// src/hooks/useSEO.ts
import { useEffect } from 'react';

interface SEOOptions {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonical?: string;
}

export function useSEO(options: SEOOptions) {
  useEffect(() => {
    // Update page title
    if (options.title) {
      document.title = options.title;
    }

    // Update meta tags
    if (options.description) {
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', options.description);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = options.description;
        document.head.appendChild(meta);
      }
    }

    if (options.keywords) {
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', options.keywords);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'keywords';
        meta.content = options.keywords;
        document.head.appendChild(meta);
      }
    }

    // Open Graph tags
    if (options.ogTitle) {
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute('content', options.ogTitle);
      } else {
        const meta = document.createElement('meta');
        meta.setAttribute('property', 'og:title');
        meta.content = options.ogTitle;
        document.head.appendChild(meta);
      }
    }

    if (options.ogDescription) {
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) {
        ogDesc.setAttribute('content', options.ogDescription);
      } else {
        const meta = document.createElement('meta');
        meta.setAttribute('property', 'og:description');
        meta.content = options.ogDescription;
        document.head.appendChild(meta);
      }
    }

    if (options.ogImage) {
      const ogImage = document.querySelector('meta[property="og:image"]');
      if (ogImage) {
        ogImage.setAttribute('content', options.ogImage);
      } else {
        const meta = document.createElement('meta');
        meta.setAttribute('property', 'og:image');
        meta.content = options.ogImage;
        document.head.appendChild(meta);
      }
    }

    // Canonical URL
    if (options.canonical) {
      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) {
        canonical.setAttribute('href', options.canonical);
      } else {
        const link = document.createElement('link');
        link.rel = 'canonical';
        link.href = options.canonical;
        document.head.appendChild(link);
      }
    }
  }, [options]);
}
