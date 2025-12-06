// Runtime Performance Optimizer
// Applies performance improvements during page execution

export interface OptimizationConfig {
  enableImageOptimization: boolean;
  enableLayoutOptimization: boolean;
  enableEventOptimization: boolean;
  enableFontOptimization: boolean;
  enableResourceOptimization: boolean;
}

class RuntimeOptimizer {
  private config: OptimizationConfig = {
    enableImageOptimization: true,
    enableLayoutOptimization: true,
    enableEventOptimization: true,
    enableFontOptimization: true,
    enableResourceOptimization: true
  };

  private isInitialized = false;

  constructor(config?: Partial<OptimizationConfig>) {
    if (config) {
      this.config = { ...this.config, ...config };
    }
  }

  public initialize(): void {
    if (this.isInitialized) return;

    if (this.config.enableImageOptimization) {
      this.optimizeImages();
    }

    if (this.config.enableLayoutOptimization) {
      this.optimizeLayout();
    }

    if (this.config.enableEventOptimization) {
      this.optimizeEvents();
    }

    if (this.config.enableFontOptimization) {
      this.optimizeFonts();
    }

    if (this.config.enableResourceOptimization) {
      this.optimizeResources();
    }

    this.isInitialized = true;
    console.log('🚀 Runtime Performance Optimizer initialized');
  }

  private optimizeImages(): void {
    // Optimize all images for LCP and CLS
    const images = document.querySelectorAll('img');
    
    images.forEach((img) => {
      // Set explicit dimensions to prevent layout shifts
      if (!img.width || !img.height) {
        const rect = img.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          img.width = rect.width;
          img.height = rect.height;
        }
      }

      // Optimize loading for above-the-fold images
      const rect = img.getBoundingClientRect();
      const isAboveFold = rect.top < window.innerHeight;
      
      if (isAboveFold) {
        img.loading = 'eager';
        img.decoding = 'sync';
        
        // Add critical image class for CSS optimization
        img.classList.add('lcp-optimized');
      } else {
        img.loading = 'lazy';
        img.decoding = 'async';
      }

      // Add error handling
      if (!img.hasAttribute('onerror')) {
        img.onerror = () => {
          img.style.display = 'none';
          console.warn(`Failed to load image: ${img.src}`);
        };
      }
    });

    console.log(`📸 Optimized ${images.length} images`);
  }

  private optimizeLayout(): void {
    // Prevent layout shifts with CSS containment
    const dynamicContainers = document.querySelectorAll('[data-cls-reserve]');
    
    dynamicContainers.forEach((container) => {
      const height = container.getAttribute('data-cls-reserve');
      if (height) {
        (container as HTMLElement).style.minHeight = height;
        container.classList.add('prevent-cls');
      }
    });

    // Add layout containment to key elements
    const keyElements = document.querySelectorAll('.hero, .nav, .container');
    keyElements.forEach((element) => {
      element.classList.add('prevent-cls');
    });

    // Reserve space for dynamic content
    this.reserveSpaceForDynamicContent();

    console.log('🏗️ Layout optimization applied');
  }

  private reserveSpaceForDynamicContent(): void {
    // Find elements that might cause layout shifts
    const potentialShiftElements = document.querySelectorAll(
      'img:not([width]):not([height]), .dynamic-content, [data-loading]'
    );

    potentialShiftElements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        (element as HTMLElement).style.minWidth = `${rect.width}px`;
        (element as HTMLElement).style.minHeight = `${rect.height}px`;
      }
    });
  }

  private optimizeEvents(): void {
    // Use passive event listeners for scroll events
    const scrollElements = document.querySelectorAll('.scrollable, .scroll-container, .scroll-area');
    
    scrollElements.forEach((element) => {
      element.addEventListener('scroll', () => {}, { passive: true });
    });

    // Debounce resize events
    let resizeTimeout: number;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => {
        // Handle resize logic here
        this.handleResize();
      }, 100);
    };

    window.addEventListener('resize', debouncedResize, { passive: true });

    // Optimize touch events
    const touchElements = document.querySelectorAll('.touch-target, button, a');
    touchElements.forEach((element) => {
      element.addEventListener('touchstart', () => {}, { passive: true });
    });

    console.log('🎯 Event optimization applied');
  }

  private handleResize(): void {
    // Re-optimize images after resize
    if (this.config.enableImageOptimization) {
      this.optimizeImages();
    }

    // Re-optimize layout after resize
    if (this.config.enableLayoutOptimization) {
      this.optimizeLayout();
    }
  }

  private optimizeFonts(): void {
    // Preload critical fonts
    const fontLinks = document.querySelectorAll('link[rel="preload"][as="font"]');
    fontLinks.forEach((link) => {
      link.setAttribute('crossorigin', 'anonymous');
    });

    // Add font-display: swap for better performance
    const style = document.createElement('style');
    style.textContent = `
      @font-face {
        font-family: 'Inter';
        font-display: swap;
      }
      @font-face {
        font-family: 'Poppins';
        font-display: swap;
      }
      .font-loading {
        font-display: swap;
      }
    `;
    document.head.appendChild(style);

    // Monitor font loading
    if ('fonts' in document) {
      (document as any).fonts.ready.then(() => {
        console.log('📝 Fonts loaded and optimized');
      });
    }

    console.log('🔤 Font optimization applied');
  }

  private optimizeResources(): void {
    // Preload critical resources
    this.preloadCriticalResources();

    // Optimize resource loading
    this.optimizeResourceLoading();

    console.log('📦 Resource optimization applied');
  }

  private preloadCriticalResources(): void {
    // Preload critical images
    const criticalImages = document.querySelectorAll('img[data-critical="true"]');
    criticalImages.forEach((img) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = (img as HTMLImageElement).src;
      document.head.appendChild(link);
    });

    // Preload critical CSS
    const criticalCSS = document.querySelectorAll('link[data-critical="true"]');
    criticalCSS.forEach((link) => {
      link.setAttribute('media', 'all');
    });
  }

  private optimizeResourceLoading(): void {
    // Use requestIdleCallback for non-critical tasks
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => {
        this.loadNonCriticalResources();
      });
    } else {
      // Fallback for older browsers
      setTimeout(() => {
        this.loadNonCriticalResources();
      }, 1000);
    }
  }

  private loadNonCriticalResources(): void {
    // Load non-critical images
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              imageObserver.unobserve(img);
            }
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
  }

  // Public methods for manual optimization
  public reoptimize(): void {
    this.isInitialized = false;
    this.initialize();
  }

  public getConfig(): OptimizationConfig {
    return { ...this.config };
  }

  public updateConfig(newConfig: Partial<OptimizationConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  public getOptimizationStatus(): Record<string, boolean> {
    return {
      images: this.config.enableImageOptimization,
      layout: this.config.enableLayoutOptimization,
      events: this.config.enableEventOptimization,
      fonts: this.config.enableFontOptimization,
      resources: this.config.enableResourceOptimization,
      initialized: this.isInitialized
    };
  }
}

// Export singleton instance
export const runtimeOptimizer = new RuntimeOptimizer();

// Export for testing
export { RuntimeOptimizer };
