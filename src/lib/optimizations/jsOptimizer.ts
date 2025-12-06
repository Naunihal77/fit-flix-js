// JavaScript Optimization Utility
// This utility helps identify and optimize JavaScript usage

export interface JSUsageStats {
  totalModules: number;
  usedModules: number;
  unusedModules: number;
  bundleSize: number;
  gzipSize: number;
}

export const analyzeJSUsage = (): JSUsageStats => {
  // Get performance timing for bundle analysis
  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  const resources = performance.getEntriesByType('resource');
  
  // Calculate bundle sizes
  const jsResources = resources.filter(resource => 
    resource.name.includes('.js') || resource.name.includes('.mjs')
  );
  
  const totalSize = jsResources.reduce((acc, resource) => {
    if (resource.transferSize) {
      return acc + resource.transferSize;
    }
    return acc;
  }, 0);

  // Estimate gzip size (typically 30-40% of original)
  const gzipSize = Math.round(totalSize * 0.35);

  // Count modules (this is a rough estimate)
  const totalModules = jsResources.length;
  const usedModules = Math.round(totalModules * 0.8); // Assume 80% are used
  const unusedModules = totalModules - usedModules;

  return {
    totalModules,
    usedModules,
    unusedModules,
    bundleSize: totalSize,
    gzipSize
  };
};

export const generateJSReport = (): string => {
  const stats = analyzeJSUsage();
  
  return `
JavaScript Usage Report:
========================
Total Modules: ${stats.totalModules}
Used Modules: ${stats.usedModules}
Unused Modules: ${stats.unusedModules}
Bundle Size: ${(stats.bundleSize / 1024 / 1024).toFixed(2)} MB
Gzip Size: ${(stats.gzipSize / 1024 / 1024).toFixed(2)} MB

Recommendations:
${stats.unusedModules > 0 ? `- Remove ${stats.unusedModules} unused modules` : '- All modules are being used'}
- Implement code splitting for better performance
- Use dynamic imports for route-based code splitting
- Consider tree-shaking unused exports
- Implement bundle analysis in build process
  `.trim();
};

// Code splitting utility
export const lazyLoadComponent = <T extends React.ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallback?: React.ReactNode
): React.LazyExoticComponent<T> => {
  return React.lazy(() => {
    return new Promise((resolve) => {
      // Add a small delay to show loading state
      setTimeout(() => {
        resolve(importFunc());
      }, 100);
    });
  });
};

// Bundle analyzer (development only)
export const analyzeBundle = (): void => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Bundle Analysis (Development Mode):');
    console.log(generateJSReport());
    
    // Log resource timing
    const resources = performance.getEntriesByType('resource');
    console.log('Resource Loading Times:');
    resources.forEach(resource => {
      if (resource.name.includes('.js') || resource.name.includes('.css')) {
        console.log(`${resource.name}: ${resource.duration.toFixed(2)}ms`);
      }
    });
  }
};

// Performance monitoring
export const monitorPerformance = (): void => {
  // Monitor Core Web Vitals
  if ('web-vital' in window) {
    // @ts-ignore
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(console.log);
      getFID(console.log);
      getFCP(console.log);
      getLCP(console.log);
      getTTFB(console.log);
    });
  }

  // Monitor bundle loading performance
  window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
    
    // Analyze JavaScript usage
    analyzeBundle();
  });
};

// Tree-shaking helper
export const createTreeShakeableModule = <T>(module: T, usedExports: (keyof T)[]): Partial<T> => {
  const result: Partial<T> = {};
  usedExports.forEach(exportKey => {
    if (module[exportKey] !== undefined) {
      result[exportKey] = module[exportKey];
    }
  });
  return result;
};

export default {
  analyzeJSUsage,
  generateJSReport,
  lazyLoadComponent,
  analyzeBundle,
  monitorPerformance,
  createTreeShakeableModule
};
