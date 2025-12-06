// CSS Optimization Utility
// This utility helps identify and optimize CSS usage

export interface CSSUsageStats {
  totalClasses: number;
  usedClasses: number;
  unusedClasses: number;
  usagePercentage: number;
}

export const analyzeCSSUsage = (): CSSUsageStats => {
  // Get all CSS rules from stylesheets
  const styleSheets = Array.from(document.styleSheets);
  let totalClasses = 0;
  let usedClasses = 0;

  styleSheets.forEach(sheet => {
    try {
      const rules = Array.from(sheet.cssRules || sheet.rules || []);
      rules.forEach(rule => {
        if (rule instanceof CSSStyleRule) {
          const selector = rule.selectorText;
          if (selector.includes('.')) {
            totalClasses++;
            // Check if class is used in DOM
            const className = selector.replace(/[.#][\w-]+/g, '').trim();
            if (className && document.querySelector(`.${className}`)) {
              usedClasses++;
            }
          }
        }
      });
    } catch (e) {
      // Cross-origin stylesheets will throw errors
      console.warn('Could not analyze stylesheet:', e);
    }
  });

  const unusedClasses = totalClasses - usedClasses;
  const usagePercentage = totalClasses > 0 ? (usedClasses / totalClasses) * 100 : 0;

  return {
    totalClasses,
    usedClasses,
    unusedClasses,
    usagePercentage
  };
};

export const generateCSSReport = (): string => {
  const stats = analyzeCSSUsage();
  
  return `
CSS Usage Report:
================
Total CSS Classes: ${stats.totalClasses}
Used Classes: ${stats.usedClasses}
Unused Classes: ${stats.unusedClasses}
Usage Percentage: ${stats.usagePercentage.toFixed(2)}%

Recommendations:
${stats.unusedClasses > 0 ? `- Remove ${stats.unusedClasses} unused CSS classes` : '- All CSS classes are being used'}
- Consider using CSS-in-JS for better tree-shaking
- Implement CSS purging in build process
- Use CSS modules for component-scoped styles
  `.trim();
};

// Purge unused CSS classes (development only)
export const purgeUnusedCSS = (): void => {
  if (process.env.NODE_ENV === 'development') {
    console.log('CSS Purge (Development Mode):');
    console.log(generateCSSReport());
  }
};

// Optimize CSS loading
export const optimizeCSSLoading = (): void => {
  // Preload critical CSS
  const criticalCSS = document.createElement('link');
  criticalCSS.rel = 'preload';
  criticalCSS.as = 'style';
  criticalCSS.href = '/src/index.css';
  document.head.appendChild(criticalCSS);

  // Defer non-critical CSS
  const nonCriticalCSS = document.createElement('link');
  nonCriticalCSS.rel = 'stylesheet';
  nonCriticalCSS.href = '/src/index.css';
  nonCriticalCSS.media = 'print';
  nonCriticalCSS.onload = () => {
    nonCriticalCSS.media = 'all';
  };
  document.head.appendChild(nonCriticalCSS);
};

export default {
  analyzeCSSUsage,
  generateCSSReport,
  purgeUnusedCSS,
  optimizeCSSLoading
};
