'use client';

import * as THREE from 'three';

// Three.js 성능 최적화 유틸리티
export class ThreeOptimizer {
  private static instance: ThreeOptimizer;
  private renderers: Map<string, THREE.WebGLRenderer> = new Map();
  private scenes: Map<string, THREE.Scene> = new Map();
  private isLowPowerMode: boolean = false;

  static getInstance(): ThreeOptimizer {
    if (!ThreeOptimizer.instance) {
      ThreeOptimizer.instance = new ThreeOptimizer();
    }
    return ThreeOptimizer.instance;
  }

  constructor() {
    this.detectDeviceCapabilities();
    this.setupVisibilityHandlers();
  }

  // 디바이스 성능 감지
  private detectDeviceCapabilities() {
    if (typeof window === 'undefined') return;

    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    
    if (!gl) {
      this.isLowPowerMode = true;
      return;
    }

    // GPU 성능 체크
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    const renderer = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : '';
    
    // 모바일 디바이스나 저성능 GPU 감지
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isLowEndGPU = /Intel.*HD|Mali|Adreno [1-5]00/i.test(renderer);
    
    this.isLowPowerMode = isMobile || isLowEndGPU;

    // 네트워크 연결 상태 확인
    const connection = (navigator as any).connection;
    if (connection && (connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g')) {
      this.isLowPowerMode = true;
    }
  }

  // 최적화된 렌더러 생성
  createOptimizedRenderer(containerId: string, width: number, height: number): THREE.WebGLRenderer {
    if (this.renderers.has(containerId)) {
      return this.renderers.get(containerId)!;
    }

    const renderer = new THREE.WebGLRenderer({
      antialias: !this.isLowPowerMode, // 모바일에서 안티앨리어싱 비활성화
      powerPreference: this.isLowPowerMode ? 'low-power' : 'high-performance',
      alpha: true,
      stencil: false,
      depth: true,
      premultipliedAlpha: false,
      preserveDrawingBuffer: false,
      failIfMajorPerformanceCaveat: false
    });

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, this.isLowPowerMode ? 1.5 : 2));
    renderer.setClearColor(0x000000, 0);

    // 성능 최적화 설정
    renderer.shadowMap.enabled = !this.isLowPowerMode;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    this.renderers.set(containerId, renderer);
    return renderer;
  }

  // LOD (Level of Detail) 메시 생성
  createLODMesh(
    highDetailGeometry: THREE.BufferGeometry,
    material: THREE.Material,
    distances: number[] = [0, 50, 100]
  ): THREE.LOD {
    const lod = new THREE.LOD();

    // 고품질 메시
    const highMesh = new THREE.Mesh(highDetailGeometry, material);
    lod.addLevel(highMesh, distances[0]);

    if (!this.isLowPowerMode) {
      // 중간 품질 메시
      const mediumGeometry = highDetailGeometry.clone();
      mediumGeometry.scale(0.8, 0.8, 0.8);
      const mediumMesh = new THREE.Mesh(mediumGeometry, material);
      lod.addLevel(mediumMesh, distances[1]);

      // 저품질 메시
      const lowGeometry = highDetailGeometry.clone();
      lowGeometry.scale(0.6, 0.6, 0.6);
      const lowMesh = new THREE.Mesh(lowGeometry, material);
      lod.addLevel(lowMesh, distances[2]);
    }

    return lod;
  }

  // 최적화된 재질 생성
  createOptimizedMaterial(options: {
    color?: number;
    map?: THREE.Texture;
    transparent?: boolean;
  }): THREE.Material {
    if (this.isLowPowerMode) {
      // 저성능 모드: 기본 재질 사용
      return new THREE.MeshBasicMaterial({
        color: options.color || 0xffffff,
        map: options.map,
        transparent: options.transparent || false,
        alphaTest: options.transparent ? 0.1 : 0,
      });
    } else {
      // 고성능 모드: 고급 재질 사용
      return new THREE.MeshLambertMaterial({
        color: options.color || 0xffffff,
        map: options.map,
        transparent: options.transparent || false,
        alphaTest: options.transparent ? 0.1 : 0,
      });
    }
  }

  // 텍스처 최적화
  optimizeTexture(texture: THREE.Texture): THREE.Texture {
    // 모바일에서 텍스처 크기 제한
    if (this.isLowPowerMode) {
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = false;
    } else {
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = true;
    }

    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.flipY = false;

    return texture;
  }

  // 애니메이션 최적화 클래스
  createOptimizedAnimationLoop(
    renderer: THREE.WebGLRenderer,
    scene: THREE.Scene,
    camera: THREE.Camera,
    updateCallback?: () => void
  ) {
    let isVisible = true;
    let needsRender = true;
    let lastTime = 0;
    const targetFPS = this.isLowPowerMode ? 30 : 60;
    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      if (!isVisible) {
        requestAnimationFrame(animate);
        return;
      }

      if (currentTime - lastTime < frameInterval) {
        requestAnimationFrame(animate);
        return;
      }

      if (needsRender) {
        if (updateCallback) updateCallback();
        renderer.render(scene, camera);
        needsRender = false;
      }

      lastTime = currentTime;
      requestAnimationFrame(animate);
    };

    // 가시성 변경 감지
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      needsRender = isVisible;
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 렌더링 요청 트리거
    const requestRender = () => {
      needsRender = true;
    };

    animate(0);

    return {
      requestRender,
      destroy: () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      }
    };
  }

  // 메모리 정리
  disposeRenderer(containerId: string) {
    const renderer = this.renderers.get(containerId);
    if (renderer) {
      renderer.dispose();
      this.renderers.delete(containerId);
    }

    const scene = this.scenes.get(containerId);
    if (scene) {
      this.disposeScene(scene);
      this.scenes.delete(containerId);
    }
  }

  private disposeScene(scene: THREE.Scene) {
    scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.geometry?.dispose();
        if (Array.isArray(object.material)) {
          object.material.forEach(material => material.dispose());
        } else {
          object.material?.dispose();
        }
      }
    });
  }

  // 전역 설정
  private setupVisibilityHandlers() {
    if (typeof document === 'undefined') return;

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        // 모든 렌더러 일시정지
        this.renderers.forEach(renderer => {
          renderer.setAnimationLoop(null);
        });
      }
    });
  }

  // 성능 모드 확인
  isLowPower(): boolean {
    return this.isLowPowerMode;
  }

  // 디버그 정보
  getDebugInfo(): {
    renderersCount: number;
    isLowPowerMode: boolean;
    devicePixelRatio: number;
  } {
    return {
      renderersCount: this.renderers.size,
      isLowPowerMode: this.isLowPowerMode,
      devicePixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio : 1
    };
  }
}

// 싱글톤 인스턴스 내보내기
export const threeOptimizer = ThreeOptimizer.getInstance();