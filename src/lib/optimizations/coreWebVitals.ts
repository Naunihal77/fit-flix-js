// Core Web Vitals Optimization Utility
// This utility helps monitor and optimize LCP, CLS, and TBT metrics

export interface CoreWebVitals {
  lcp: number;
  cls: number;
  fid: number;
  fcp: number;
  ttfb: number;
}

export interface PerformanceMetrics {
  navigationStart: number;
  domContentLoaded: number;
  loadComplete: number;
  firstPaint: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
}

// Monitor Core Web Vitals
export const monitorCoreWebVitals = (): void => {
  if ('web-vitals' in window) {
    // @ts-ignore
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // Largest Contentful Paint (LCP) - Target: < 2.5s
      getLCP((metric) => {
        console.log('LCP:', metric.value, 'Target: < 2500ms');
        if (metric.value > 2500) {
          console.warn('LCP is above target. Consider optimizing images and critical resources.');
        }
      });

      // Cumulative Layout Shift (CLS) - Target: < 0.1
      getCLS((metric) => {
        console.log('CLS:', metric.value, 'Target: < 0.1');
        if (metric.value > 0.1) {
          console.warn('CLS is above target. Consider fixing layout shifts.');
        }
      });

      // First Input Delay (FID) - Target: < 100ms
      getFID((metric) => {
        console.log('FID:', metric.value, 'Target: < 100ms');
        if (metric.value > 100) {
          console.warn('FID is above target. Consider reducing JavaScript execution time.');
        }
      });

      // First Contentful Paint (FCP) - Target: < 1.8s
      getFCP((metric) => {
        console.log('FCP:', metric.value, 'Target: < 1800ms');
        if (metric.value > 1800) {
          console.warn('FCP is above target. Consider optimizing critical rendering path.');
        }
      });

      // Time to First Byte (TTFB) - Target: < 800ms
      getTTFB((metric) => {
        console.log('TTFB:', metric.value, 'Target: < 800ms');
        if (metric.value > 800) {
          console.warn('TTFB is above target. Consider optimizing server response time.');
        }
      });
    });
  }
};

// Optimize LCP (Largest Contentful Paint)
export const optimizeLCP = (): void => {
  // Preload critical images
  const criticalImages = document.querySelectorAll('img[data-critical="true"]');
  criticalImages.forEach((img) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = (img as HTMLImageElement).src;
    document.head.appendChild(link);
  });

  // Preload critical fonts
  const criticalFonts = document.querySelectorAll('link[rel="preload"][as="font"]');
  criticalFonts.forEach((font) => {
    font.setAttribute('crossorigin', 'anonymous');
  });

  // Optimize hero images
  const heroImages = document.querySelectorAll('.hero img, .banner img');
  heroImages.forEach((img) => {
    (img as HTMLImageElement).loading = 'eager';
    (img as HTMLImageElement).decoding = 'sync';
  });
};

// Optimize CLS (Cumulative Layout Shift)
export const optimizeCLS = (): void => {
  // Set explicit dimensions for images
  const images = document.querySelectorAll('img:not([width]):not([height])');
  images.forEach((img) => {
    const rect = img.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      (img as HTMLImageElement).width = rect.width;
      (img as HTMLImageElement).height = rect.height;
    }
  });

  // Reserve space for dynamic content
  const dynamicContainers = document.querySelectorAll('[data-cls-reserve]');
  dynamicContainers.forEach((container) => {
    const height = container.getAttribute('data-cls-reserve');
    if (height) {
      (container as HTMLElement).style.minHeight = height;
    }
  });

  // Prevent layout shifts from fonts
  const style = document.createElement('style');
  style.textContent = `
    .font-loading {
      font-display: swap;
    }
    .prevent-cls {
      contain: layout;
    }
  `;
  document.head.appendChild(style);
};

// Optimize TBT (Total Blocking Time)
export const optimizeTBT = (): void => {
  // Defer non-critical JavaScript
  const nonCriticalScripts = document.querySelectorAll('script[data-defer="true"]');
  nonCriticalScripts.forEach((script) => {
    script.setAttribute('defer', 'true');
  });

  // Use requestIdleCallback for non-critical tasks
  if ('requestIdleCallback' in window) {
    // @ts-ignore
    requestIdleCallback(() => {
      // Load non-critical resources
      loadNonCriticalResources();
    });
  } else {
    // Fallback for older browsers
    setTimeout(loadNonCriticalResources, 1000);
  }

  // Optimize event listeners
  optimizeEventListeners();
};

// Load non-critical resources
const loadNonCriticalResources = (): void => {
  // Lazy load images below the fold
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src || img.src;
          imageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach((img) => imageObserver.observe(img));
  }

  // Load non-critical CSS
  const nonCriticalCSS = document.querySelectorAll('link[data-critical="false"]');
  nonCriticalCSS.forEach((link) => {
    link.setAttribute('media', 'all');
  });
};

// Optimize event listeners to reduce TBT
const optimizeEventListeners = (): void => {
  // Use passive event listeners for scroll events
  const scrollElements = document.querySelectorAll('.scrollable, .scroll-container');
  scrollElements.forEach((element) => {
    element.addEventListener('scroll', () => {}, { passive: true });
  });

  // Debounce resize events
  let resizeTimeout: number;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = window.setTimeout(() => {
      // Handle resize logic here
    }, 100);
  }, { passive: true });
};

// Generate performance report
export const generatePerformanceReport = (): string => {
  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  const resources = performance.getEntriesByType('resource');
  
  const totalSize = resources.reduce((acc, resource) => {
    if (resource.transferSize) {
      return acc + resource.transferSize;
    }
    return acc;
  }, 0);

  const report = `
Core Web Vitals Performance Report:
==================================
Page Load Time: ${navigation.loadEventEnd - navigation.navigationStart}ms
DOM Content Loaded: ${navigation.domContentLoadedEventEnd - navigation.navigationStart}ms
First Byte: ${navigation.responseStart - navigation.navigationStart}ms
Total Resource Size: ${(totalSize / 1024 / 1024).toFixed(2)} MB
Resource Count: ${resources.length}

Recommendations:
- Optimize images for LCP improvement
- Fix layout shifts for CLS reduction
- Minimize JavaScript execution for TBT improvement
- Implement resource hints for faster loading
  `.trim();

  return report;
};

// Performance budget monitoring
export const checkPerformanceBudget = (): void => {
  const budget = {
    lcp: 2500, // 2.5 seconds
    cls: 0.1,  // 0.1
    fid: 100,  // 100ms
    fcp: 1800, // 1.8 seconds
    ttfb: 800  // 800ms
  };

  // Monitor and alert if budget is exceeded
  if ('web-vitals' in window) {
    // @ts-ignore
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getLCP((metric) => {
        if (metric.value > budget.lcp) {
          console.error(`LCP budget exceeded: ${metric.value}ms > ${budget.lcp}ms`);
        }
      });

      getCLS((metric) => {
        if (metric.value > budget.cls) {
          console.error(`CLS budget exceeded: ${metric.value} > ${budget.cls}`);
        }
      });

      getFID((metric) => {
        if (metric.value > budget.fid) {
          console.error(`FID budget exceeded: ${metric.value}ms > ${budget.fid}ms`);
        }
      });
    });
  }
};

export default {
  monitorCoreWebVitals,
  optimizeLCP,
  optimizeCLS,
  optimizeTBT,
  generatePerformanceReport,
  checkPerformanceBudget
};
