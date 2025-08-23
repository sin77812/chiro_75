'use client';

export class AdaptiveLoader {
  private static instance: AdaptiveLoader;
  private connectionType: string = 'unknown';
  private deviceMemory: number = 4; // 기본값 4GB
  private hardwareConcurrency: number = 4; // 기본값 4코어
  private isMobile: boolean = false;
  private isLowPowerMode: boolean = false;

  static getInstance(): AdaptiveLoader {
    if (!AdaptiveLoader.instance) {
      AdaptiveLoader.instance = new AdaptiveLoader();
    }
    return AdaptiveLoader.instance;
  }

  constructor() {
    if (typeof window !== 'undefined') {
      this.detectCapabilities();
    }
  }

  private detectCapabilities() {
    // 네트워크 연결 상태 감지
    const connection = (navigator as any).connection;
    if (connection) {
      this.connectionType = connection.effectiveType || 'unknown';
      
      // 연결 상태 변경 감지
      connection.addEventListener('change', () => {
        this.connectionType = connection.effectiveType || 'unknown';
        this.updateLoadingStrategy();
      });
    }

    // 디바이스 메모리
    this.deviceMemory = (navigator as any).deviceMemory || 4;
    
    // CPU 코어 수
    this.hardwareConcurrency = navigator.hardwareConcurrency || 4;
    
    // 모바일 디바이스 감지
    this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // 저성능 모드 판정
    this.isLowPowerMode = 
      this.connectionType === '2g' || 
      this.connectionType === 'slow-2g' ||
      this.deviceMemory < 4 ||
      this.hardwareConcurrency < 4 ||
      (this.isMobile && window.devicePixelRatio < 2);

    // 배터리 API (실험적)
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        // 배터리 절약 모드 감지
        if (battery.charging === false && battery.level < 0.2) {
          this.isLowPowerMode = true;
          this.updateLoadingStrategy();
        }
      });
    }
  }

  private updateLoadingStrategy() {
    // 연결 상태 변경에 따른 로딩 전략 업데이트
    document.documentElement.setAttribute('data-connection', this.connectionType);
    document.documentElement.setAttribute('data-low-power', this.isLowPowerMode.toString());
  }

  // 이미지 로딩 전략
  getImageLoadingStrategy() {
    if (this.connectionType === '2g' || this.connectionType === 'slow-2g') {
      return {
        quality: 60,
        format: 'webp',
        sizes: 'small',
        lazy: true,
        placeholder: true
      };
    } else if (this.connectionType === '3g') {
      return {
        quality: 75,
        format: 'webp',
        sizes: 'medium', 
        lazy: true,
        placeholder: true
      };
    } else {
      return {
        quality: 85,
        format: 'avif',
        sizes: 'large',
        lazy: false,
        placeholder: false
      };
    }
  }

  // 비디오 로딩 전략  
  getVideoLoadingStrategy() {
    if (this.isLowPowerMode) {
      return {
        autoplay: false,
        preload: 'none',
        quality: '480p',
        poster: true
      };
    } else if (this.connectionType === '3g') {
      return {
        autoplay: false,
        preload: 'metadata',
        quality: '720p', 
        poster: true
      };
    } else {
      return {
        autoplay: true,
        preload: 'auto',
        quality: '1080p',
        poster: false
      };
    }
  }

  // 애니메이션 설정
  getAnimationSettings() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion || this.isLowPowerMode) {
      return {
        enabled: false,
        duration: 0,
        easing: 'linear'
      };
    } else if (this.isMobile) {
      return {
        enabled: true,
        duration: 300,
        easing: 'ease-out'
      };
    } else {
      return {
        enabled: true,
        duration: 500,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
      };
    }
  }

  // 폰트 로딩 전략
  getFontLoadingStrategy() {
    if (this.connectionType === '2g' || this.connectionType === 'slow-2g') {
      return {
        display: 'swap',
        weights: ['400'], // 필수 폰트만
        subset: 'korean'
      };
    } else {
      return {
        display: 'swap',
        weights: ['400', '500', '600', '700', '800'],
        subset: 'korean-ext'
      };
    }
  }

  // 스크립트 로딩 전략
  getScriptLoadingStrategy() {
    return {
      defer: this.isLowPowerMode,
      async: !this.isLowPowerMode,
      priority: this.connectionType === '4g' ? 'high' : 'low'
    };
  }

  // 청크 크기 최적화
  getChunkSize() {
    if (this.connectionType === '2g' || this.connectionType === 'slow-2g') {
      return 'small'; // 50KB 미만
    } else if (this.connectionType === '3g') {
      return 'medium'; // 100KB 미만
    } else {
      return 'large'; // 200KB 미만
    }
  }

  // 프리로딩 전략
  getPrefetchStrategy() {
    if (this.isLowPowerMode) {
      return {
        enabled: false,
        amount: 0
      };
    } else if (this.connectionType === '3g') {
      return {
        enabled: true,
        amount: 1 // 다음 페이지만
      };
    } else {
      return {
        enabled: true,
        amount: 3 // 다음 3페이지
      };
    }
  }

  // 캐시 전략
  async getCacheStrategy() {
    const storageQuota = (navigator as any).storage?.estimate ? 
      await (navigator as any).storage.estimate() : null;
    
    if (this.deviceMemory < 2 || (storageQuota && storageQuota.usage > storageQuota.quota * 0.8)) {
      return {
        maxAge: 300, // 5분
        strategy: 'minimal'
      };
    } else if (this.deviceMemory < 4) {
      return {
        maxAge: 1800, // 30분
        strategy: 'conservative'
      };
    } else {
      return {
        maxAge: 3600, // 1시간
        strategy: 'aggressive'
      };
    }
  }

  // 실시간 성능 조정
  adjustPerformance() {
    // 현재 성능 메트릭 기반 조정
    if ('performance' in window && 'memory' in performance) {
      const memory = (performance as any).memory;
      const memoryUsage = memory.usedJSHeapSize / memory.jsHeapSizeLimit;
      
      if (memoryUsage > 0.8) {
        this.isLowPowerMode = true;
        this.updateLoadingStrategy();
      }
    }

    // FPS 기반 조정
    let lastTime = performance.now();
    let frameCount = 0;
    
    const checkFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        const fps = frameCount;
        frameCount = 0;
        lastTime = currentTime;
        
        if (fps < 30) {
          this.isLowPowerMode = true;
          this.updateLoadingStrategy();
        }
      }
      
      requestAnimationFrame(checkFPS);
    };
    
    requestAnimationFrame(checkFPS);
  }

  // Getter 메소드들
  getConnectionType(): string {
    return this.connectionType;
  }

  getDeviceMemory(): number {
    return this.deviceMemory;
  }

  getHardwareConcurrency(): number {
    return this.hardwareConcurrency;
  }

  isMobileDevice(): boolean {
    return this.isMobile;
  }

  isLowPower(): boolean {
    return this.isLowPowerMode;
  }

  // 성능 보고서
  getCapabilityReport() {
    return {
      connection: this.connectionType,
      deviceMemory: this.deviceMemory,
      hardwareConcurrency: this.hardwareConcurrency,
      isMobile: this.isMobile,
      isLowPowerMode: this.isLowPowerMode,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      screen: {
        width: window.screen.width,
        height: window.screen.height,
        pixelRatio: window.devicePixelRatio
      }
    };
  }
}

export const adaptiveLoader = AdaptiveLoader.getInstance();