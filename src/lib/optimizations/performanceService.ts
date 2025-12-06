// Performance Monitoring Service
// Tracks Core Web Vitals and provides real-time performance insights

export interface PerformanceMetrics {
  lcp: number;
  cls: number;
  fid: number;
  fcp: number;
  ttfb: number;
  pageLoadTime: number;
  domContentLoaded: number;
  firstPaint: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
}

export interface PerformanceBudget {
  lcp: number;
  cls: number;
  fid: number;
  fcp: number;
  ttfb: number;
}

export interface PerformanceAlert {
  metric: keyof PerformanceMetrics;
  value: number;
  threshold: number;
  severity: 'warning' | 'error' | 'critical';
  message: string;
  timestamp: number;
}

class PerformanceService {
  private metrics: Partial<PerformanceMetrics> = {};
  private alerts: PerformanceAlert[] = [];
  private observers: Map<string, PerformanceObserver> = new Map();
  private budget: PerformanceBudget = {
    lcp: 2500,    // 2.5 seconds
    cls: 0.1,     // 0.1
    fid: 100,     // 100ms
    fcp: 1800,    // 1.8 seconds
    ttfb: 800     // 800ms
  };

  constructor() {
    try {
      this.initializeMonitoring();
    } catch (error) {
      console.warn('Performance monitoring initialization failed:', error);
    }
  }

  private initializeMonitoring(): void {
    try {
      // Only initialize if PerformanceObserver is supported
      if (!('PerformanceObserver' in window)) {
        console.warn('PerformanceObserver not supported, skipping performance monitoring');
        return;
      }

      this.observeLCP();
      this.observeCLS();
      this.observeFID();
      this.observeFCP();
      this.observeTTFB();
      this.observePageLoad();
    } catch (error) {
      console.warn('Failed to initialize performance monitoring:', error);
    }
  }

  private observeLCP(): void {
    if (!('PerformanceObserver' in window)) return;

    try {
      const lcpObserver = new PerformanceObserver((list) => {
        try {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1] as PerformanceEntry;
          
          if (lastEntry && lastEntry.startTime > 0 && !isNaN(lastEntry.startTime)) {
            this.metrics.lcp = lastEntry.startTime;
            this.checkBudget('lcp', lastEntry.startTime);
            this.logMetric('LCP', lastEntry.startTime, 'ms');
          }
        } catch (error) {
          console.warn('Error processing LCP entry:', error);
        }
      });

      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      this.observers.set('lcp', lcpObserver);
    } catch (error) {
      console.warn('LCP monitoring not supported:', error);
    }
  }

  private observeCLS(): void {
    if (!('PerformanceObserver' in window)) return;

    try {
      const clsObserver = new PerformanceObserver((list) => {
        try {
          const entries = list.getEntries();
          let clsValue = 0;
          
          entries.forEach((entry) => {
            if (entry.entryType === 'layout-shift' && !(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          });
          
          if (clsValue > 0 && !isNaN(clsValue)) {
            this.metrics.cls = clsValue;
            this.checkBudget('cls', clsValue);
            this.logMetric('CLS', clsValue, '');
          }
        } catch (error) {
          console.warn('Error processing CLS entry:', error);
        }
      });

      clsObserver.observe({ entryTypes: ['layout-shift'] });
      this.observers.set('cls', clsObserver);
    } catch (error) {
      console.warn('CLS monitoring not supported:', error);
    }
  }

  private observeFCP(): void {
    if (!('PerformanceObserver' in window)) return;

    try {
      const fcpObserver = new PerformanceObserver((list) => {
        try {
          const entries = list.getEntries();
          // Filter for first-contentful-paint entry
          const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');
          
          if (fcpEntry && fcpEntry.startTime > 0 && !isNaN(fcpEntry.startTime)) {
            this.metrics.fcp = fcpEntry.startTime;
            this.checkBudget('fcp', fcpEntry.startTime);
            this.logMetric('FCP', fcpEntry.startTime, 'ms');
          }
        } catch (error) {
          console.warn('Error processing FCP entry:', error);
        }
      });

      // Use 'paint' entry type and filter for first-contentful-paint
      fcpObserver.observe({ entryTypes: ['paint'] });
      this.observers.set('fcp', fcpObserver);
    } catch (error) {
      console.warn('FCP monitoring not supported:', error);
    }
  }

  private observeFID(): void {
    if (!('PerformanceObserver' in window)) return;

    try {
      const fidObserver = new PerformanceObserver((list) => {
        try {
          const entries = list.getEntries();
          const firstEntry = entries[0] as PerformanceEntry;
          
          if (firstEntry && firstEntry.processingStart > 0 && firstEntry.startTime > 0) {
            const fid = firstEntry.processingStart - firstEntry.startTime;
            if (fid > 0 && !isNaN(fid)) {
              this.metrics.fid = fid;
              this.checkBudget('fid', fid);
              this.logMetric('FID', fid, 'ms');
            }
          }
        } catch (error) {
          console.warn('Error processing FID entry:', error);
        }
      });

      fidObserver.observe({ entryTypes: ['first-input'] });
      this.observers.set('fid', fidObserver);
    } catch (error) {
      console.warn('FID monitoring not supported:', error);
    }
  }

  private observeTTFB(): void {
    if (!('PerformanceObserver' in window)) return;

    try {
      const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigationEntry && navigationEntry.responseStart > 0 && navigationEntry.requestStart > 0) {
        const ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
        if (ttfb > 0 && !isNaN(ttfb)) {
          this.metrics.ttfb = ttfb;
          this.checkBudget('ttfb', ttfb);
          this.logMetric('TTFB', ttfb, 'ms');
        }
      }
    } catch (error) {
      console.warn('TTFB monitoring not supported:', error);
    }
  }

  private observePageLoad(): void {
    if (!('PerformanceObserver' in window)) return;

    try {
      const navigationObserver = new PerformanceObserver((list) => {
        try {
          const entries = list.getEntries();
          const navigationEntry = entries[0] as PerformanceNavigationTiming;
          
          if (navigationEntry && navigationEntry.loadEventEnd > 0) {
            const pageLoadTime = navigationEntry.loadEventEnd - navigationEntry.navigationStart;
            const domContentLoaded = navigationEntry.domContentLoadedEventEnd - navigationEntry.navigationStart;
            const firstPaint = navigationEntry.responseStart - navigationEntry.navigationStart;
            
            // Only set metrics if they are valid numbers
            if (pageLoadTime > 0 && !isNaN(pageLoadTime)) {
              this.metrics.pageLoadTime = pageLoadTime;
              this.logMetric('Page Load Time', pageLoadTime, 'ms');
            }
            
            if (domContentLoaded > 0 && !isNaN(domContentLoaded)) {
              this.metrics.domContentLoaded = domContentLoaded;
              this.logMetric('DOM Content Loaded', domContentLoaded, 'ms');
            }
            
            if (firstPaint > 0 && !isNaN(firstPaint)) {
              this.metrics.firstPaint = firstPaint;
              this.logMetric('First Paint', firstPaint, 'ms');
            }
          }
        } catch (error) {
          console.warn('Error processing navigation entry:', error);
        }
      });

      navigationObserver.observe({ entryTypes: ['navigation'] });
      this.observers.set('navigation', navigationObserver);
    } catch (error) {
      console.warn('Navigation monitoring not supported:', error);
    }
  }

  private checkBudget(metric: keyof PerformanceBudget, value: number): void {
    const threshold = this.budget[metric];
    let severity: 'warning' | 'error' | 'critical' = 'warning';
    let message = '';

    if (metric === 'cls') {
      // CLS is lower = better
      if (value > threshold * 1.5) {
        severity = 'critical';
        message = `CLS is critically high: ${value.toFixed(3)} > ${threshold}`;
      } else if (value > threshold) {
        severity = 'error';
        message = `CLS is above target: ${value.toFixed(3)} > ${threshold}`;
      } else if (value > threshold * 0.8) {
        severity = 'warning';
        message = `CLS is approaching limit: ${value.toFixed(3)} > ${threshold * 0.8}`;
      }
    } else {
      // Other metrics are lower = better
      if (value > threshold * 1.5) {
        severity = 'critical';
        message = `${metric.toUpperCase()} is critically high: ${value}ms > ${threshold * 1.5}ms`;
      } else if (value > threshold) {
        severity = 'error';
        message = `${metric.toUpperCase()} is above target: ${value}ms > ${threshold}ms`;
      } else if (value > threshold * 0.8) {
        severity = 'warning';
        message = `${metric.toUpperCase()} is approaching limit: ${value}ms > ${threshold * 0.8}ms`;
      }
    }

    if (message) {
      const alert: PerformanceAlert = {
        metric,
        value,
        threshold,
        severity,
        message,
        timestamp: Date.now()
      };

      this.alerts.push(alert);
      this.logAlert(alert);
    }
  }

  private logMetric(name: string, value: number, unit: string): void {
    const color = this.getMetricColor(name, value);
    console.log(`%c${name}: ${value}${unit}`, `color: ${color}; font-weight: bold;`);
  }

  private logAlert(alert: PerformanceAlert): void {
    const colors = {
      warning: '#f59e0b',
      error: '#dc2626',
      critical: '#7c2d12'
    };

    console.warn(
      `%c🚨 Performance Alert: ${alert.message}`,
      `color: ${colors[alert.severity]}; font-weight: bold; font-size: 14px;`
    );
  }

  private getMetricColor(name: string, value: number): string {
    const thresholds: Record<string, { warning: number; error: number }> = {
      'LCP': { warning: 1800, error: 2500 },
      'CLS': { warning: 0.08, error: 0.1 },
      'FCP': { warning: 1400, error: 1800 },
      'FID': { warning: 80, error: 100 },
      'TTFB': { warning: 600, error: 800 }
    };

    const threshold = thresholds[name];
    if (!threshold) return '#64748B'; // Using blog secondary color token

    if (name === 'CLS') {
      // CLS is lower = better
      if (value <= threshold.warning) return '#10b981';
      if (value <= threshold.error) return '#f59e0b';
      return '#dc2626';
    } else {
      // Other metrics are lower = better
      if (value <= threshold.warning) return '#10b981';
      if (value <= threshold.error) return '#f59e0b';
      return '#dc2626';
    }
  }

  // Public methods
  public getMetrics(): Partial<PerformanceMetrics> {
    return { ...this.metrics };
  }

  public getAlerts(): PerformanceAlert[] {
    return [...this.alerts];
  }

  public getBudget(): PerformanceBudget {
    return { ...this.budget };
  }

  public setBudget(newBudget: Partial<PerformanceBudget>): void {
    this.budget = { ...this.budget, ...newBudget };
  }

  public cleanup(): void {
    try {
      this.observers.forEach((observer, key) => {
        try {
          observer.disconnect();
        } catch (error) {
          console.warn(`Error disconnecting ${key} observer:`, error);
        }
      });
      this.observers.clear();
    } catch (error) {
      console.warn('Error during cleanup:', error);
    }
  }

  public generateReport(): string {
    const report = `
🚀 Performance Report
====================
${Object.entries(this.metrics)
  .filter(([_, value]) => value !== undefined)
  .map(([key, value]) => {
    const unit = key === 'cls' ? '' : 'ms';
    const color = this.getMetricColor(key.toUpperCase(), value);
    return `${key}: ${value}${unit}`;
  })
  .join('\n')}

📊 Budget Status
================
${Object.entries(this.budget)
  .map(([metric, threshold]) => {
    const value = this.metrics[metric as keyof PerformanceMetrics];
    const status = value !== undefined ? 
      (metric === 'cls' ? 
        (value <= threshold ? '✅' : '❌') :
        (value <= threshold ? '✅' : '❌')
      ) : '❓';
    return `${metric.toUpperCase()}: ${status} (${threshold}${metric === 'cls' ? '' : 'ms'})`;
  })
  .join('\n')}

🚨 Alerts (${this.alerts.length})
==================
${this.alerts.length > 0 ? 
  this.alerts
    .slice(-5) // Show last 5 alerts
    .map(alert => `${alert.severity.toUpperCase()}: ${alert.message}`)
    .join('\n') : 
  'No alerts'
}
    `.trim();

    return report;
  }

  public disconnect(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
  }
}

// Export singleton instance
export const performanceService = new PerformanceService();

// Export for testing
export { PerformanceService };
