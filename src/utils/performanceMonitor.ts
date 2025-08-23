'use client';

export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, PerformanceEntry[]> = new Map();
  private observers: Map<string, PerformanceObserver> = new Map();
  private vitalsCallback?: (metric: any) => void;
  
  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  constructor() {
    if (typeof window !== 'undefined') {
      this.initializeObservers();
      this.initializeWebVitals();
    }
  }

  private initializeObservers() {
    // Navigation 타이밍
    if ('PerformanceObserver' in window) {
      const navObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        this.metrics.set('navigation', entries);
      });
      
      try {
        navObserver.observe({ type: 'navigation', buffered: true });
        this.observers.set('navigation', navObserver);
      } catch (e) {
        console.warn('Navigation timing not supported');
      }

      // 리소스 로딩
      const resourceObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const existingEntries = this.metrics.get('resource') || [];
        this.metrics.set('resource', [...existingEntries, ...entries]);
      });
      
      try {
        resourceObserver.observe({ type: 'resource', buffered: true });
        this.observers.set('resource', resourceObserver);
      } catch (e) {
        console.warn('Resource timing not supported');
      }

      // Long Tasks
      const longTaskObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const existingEntries = this.metrics.get('longtask') || [];
        this.metrics.set('longtask', [...existingEntries, ...entries]);
      });
      
      try {
        longTaskObserver.observe({ type: 'longtask', buffered: true });
        this.observers.set('longtask', longTaskObserver);
      } catch (e) {
        console.warn('Long task timing not supported');
      }

      // Layout Shift
      const layoutShiftObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const existingEntries = this.metrics.get('layout-shift') || [];
        this.metrics.set('layout-shift', [...existingEntries, ...entries]);
      });
      
      try {
        layoutShiftObserver.observe({ type: 'layout-shift', buffered: true });
        this.observers.set('layout-shift', layoutShiftObserver);
      } catch (e) {
        console.warn('Layout shift timing not supported');
      }
    }
  }

  private initializeWebVitals() {
    // FCP (First Contentful Paint)
    this.measureFCP();
    
    // LCP (Largest Contentful Paint)  
    this.measureLCP();
    
    // FID (First Input Delay)
    this.measureFID();
    
    // CLS (Cumulative Layout Shift)
    this.measureCLS();
    
    // TTFB (Time to First Byte)
    this.measureTTFB();
  }

  private measureFCP() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const fcp = entries.find(entry => entry.name === 'first-contentful-paint');
        if (fcp && this.vitalsCallback) {
          this.vitalsCallback({
            name: 'FCP',
            value: fcp.startTime,
            rating: fcp.startTime < 1800 ? 'good' : fcp.startTime < 3000 ? 'needs-improvement' : 'poor'
          });
        }
      });
      
      try {
        observer.observe({ type: 'paint', buffered: true });
      } catch (e) {
        console.warn('FCP measurement not supported');
      }
    }
  }

  private measureLCP() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (lastEntry && this.vitalsCallback) {
          this.vitalsCallback({
            name: 'LCP',
            value: lastEntry.startTime,
            rating: lastEntry.startTime < 2500 ? 'good' : lastEntry.startTime < 4000 ? 'needs-improvement' : 'poor'
          });
        }
      });
      
      try {
        observer.observe({ type: 'largest-contentful-paint', buffered: true });
      } catch (e) {
        console.warn('LCP measurement not supported');
      }
    }
  }

  private measureFID() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          const firstInputEntry = entry as any;
          if (firstInputEntry.processingStart && this.vitalsCallback) {
            const fid = firstInputEntry.processingStart - entry.startTime;
            this.vitalsCallback({
              name: 'FID',
              value: fid,
              rating: fid < 100 ? 'good' : fid < 300 ? 'needs-improvement' : 'poor'
            });
          }
        });
      });
      
      try {
        observer.observe({ type: 'first-input', buffered: true });
      } catch (e) {
        console.warn('FID measurement not supported');
      }
    }
  }

  private measureCLS() {
    if ('PerformanceObserver' in window) {
      let clsValue = 0;
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        });
        
        if (this.vitalsCallback) {
          this.vitalsCallback({
            name: 'CLS',
            value: clsValue,
            rating: clsValue < 0.1 ? 'good' : clsValue < 0.25 ? 'needs-improvement' : 'poor'
          });
        }
      });
      
      try {
        observer.observe({ type: 'layout-shift', buffered: true });
      } catch (e) {
        console.warn('CLS measurement not supported');
      }
    }
  }

  private measureTTFB() {
    if ('performance' in window && 'getEntriesByType' in performance) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation && this.vitalsCallback) {
        const ttfb = navigation.responseStart - navigation.requestStart;
        this.vitalsCallback({
          name: 'TTFB',
          value: ttfb,
          rating: ttfb < 800 ? 'good' : ttfb < 1800 ? 'needs-improvement' : 'poor'
        });
      }
    }
  }

  // 웹 바이탈 콜백 설정
  onVital(callback: (metric: any) => void) {
    this.vitalsCallback = callback;
  }

  // 사용자 정의 메트릭 기록
  mark(name: string) {
    if ('performance' in window && 'mark' in performance) {
      performance.mark(name);
    }
  }

  measure(name: string, startMark: string, endMark?: string) {
    if ('performance' in window && 'measure' in performance) {
      try {
        performance.measure(name, startMark, endMark);
        const measures = performance.getEntriesByName(name, 'measure');
        const latestMeasure = measures[measures.length - 1];
        
        if (latestMeasure && this.vitalsCallback) {
          this.vitalsCallback({
            name: name,
            value: latestMeasure.duration,
            type: 'custom'
          });
        }
      } catch (e) {
        console.warn(`Failed to measure ${name}:`, e);
      }
    }
  }

  // 메모리 사용량 모니터링
  getMemoryInfo(): any {
    if ('memory' in performance) {
      return {
        usedJSHeapSize: (performance as any).memory.usedJSHeapSize,
        totalJSHeapSize: (performance as any).memory.totalJSHeapSize,
        jsHeapSizeLimit: (performance as any).memory.jsHeapSizeLimit
      };
    }
    return null;
  }

  // 네트워크 정보
  getNetworkInfo(): any {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      return {
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt,
        saveData: connection.saveData
      };
    }
    return null;
  }

  // 디바이스 정보
  getDeviceInfo(): any {
    return {
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      hardwareConcurrency: navigator.hardwareConcurrency,
      deviceMemory: (navigator as any).deviceMemory,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      pixelRatio: window.devicePixelRatio
    };
  }

  // 성능 보고서 생성
  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      url: window.location.href,
      device: this.getDeviceInfo(),
      network: this.getNetworkInfo(),
      memory: this.getMemoryInfo(),
      metrics: Object.fromEntries(this.metrics),
      navigation: this.getNavigationTiming(),
      resources: this.getResourceTiming()
    };
    
    return report;
  }

  private getNavigationTiming() {
    if ('performance' in window && 'getEntriesByType' in performance) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        return {
          dns: navigation.domainLookupEnd - navigation.domainLookupStart,
          tcp: navigation.connectEnd - navigation.connectStart,
          ssl: navigation.connectEnd - navigation.secureConnectionStart,
          ttfb: navigation.responseStart - navigation.requestStart,
          download: navigation.responseEnd - navigation.responseStart,
          domLoad: navigation.domContentLoadedEventStart - navigation.fetchStart,
          windowLoad: navigation.loadEventStart - navigation.fetchStart
        };
      }
    }
    return null;
  }

  private getResourceTiming() {
    const resources = this.metrics.get('resource') || [];
    return resources.map(resource => ({
      name: resource.name,
      duration: resource.duration,
      size: (resource as any).transferSize,
      type: this.getResourceType(resource.name)
    }));
  }

  private getResourceType(url: string): string {
    if (url.includes('.js')) return 'script';
    if (url.includes('.css')) return 'style';
    if (url.match(/\.(png|jpg|jpeg|gif|webp|svg)/)) return 'image';
    if (url.match(/\.(woff|woff2|ttf|otf)/)) return 'font';
    return 'other';
  }

  // 성능 경고 시스템
  startAlerts() {
    this.onVital((metric) => {
      if (metric.rating === 'poor') {
        console.warn(`Performance Alert: ${metric.name} is ${metric.rating} (${metric.value})`);
        
        // 개발 환경에서만 알림 표시
        if (process.env.NODE_ENV === 'development') {
          this.showPerformanceAlert(metric);
        }
      }
    });

    // Long Task 경고
    const longTasks = this.metrics.get('longtask') || [];
    if (longTasks.length > 0) {
      console.warn(`Found ${longTasks.length} long tasks that may affect performance`);
    }

    // 메모리 사용량 경고
    const memory = this.getMemoryInfo();
    if (memory && memory.usedJSHeapSize > memory.jsHeapSizeLimit * 0.9) {
      console.warn('High memory usage detected');
    }
  }

  private showPerformanceAlert(metric: any) {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification(`Performance Issue: ${metric.name}`, {
          body: `${metric.name} is ${metric.rating} (${metric.value.toFixed(2)}ms)`,
          icon: '/favicon.ico'
        });
      }
    }
  }

  // 정리
  destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
    this.metrics.clear();
  }
}

export const performanceMonitor = PerformanceMonitor.getInstance();