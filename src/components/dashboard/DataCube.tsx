'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

interface MetricData {
  id: number;
  title: string;
  value: string;
  change: string;
  color: string;
  icon: string;
  charts: {
    front: ChartData;
    side: ChartData;
    top: ChartData;
    bottom: ChartData;
  };
}

interface ChartData {
  type: 'bar' | 'pie' | 'line' | 'heatmap';
  data: number[];
  labels: string[];
}

interface DataCubeProps {
  isActive: boolean;
  selectedCube: number | null;
  onCubeSelect: (cubeId: number) => void;
}

const DataCube = ({ isActive, selectedCube, onCubeSelect }: DataCubeProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cubesRef = useRef<THREE.Mesh[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [hoveredCube, setHoveredCube] = useState<number | null>(null);

  const metricsData: MetricData[] = [
    {
      id: 0,
      title: '문의 증가율',
      value: '+180%',
      change: '평균 성과',
      color: '#2196F3',
      icon: '📈',
      charts: {
        front: { type: 'bar', data: [50, 80, 120, 180], labels: ['Q1', 'Q2', 'Q3', 'Q4'] },
        side: { type: 'pie', data: [30, 25, 20, 25], labels: ['이커머스', 'SaaS', '제조업', '기타'] },
        top: { type: 'line', data: [100, 120, 150, 180], labels: ['Jan', 'Feb', 'Mar', 'Apr'] },
        bottom: { type: 'heatmap', data: [1, 2, 3, 4], labels: ['Mon', 'Tue', 'Wed', 'Thu'] }
      }
    },
    {
      id: 1,
      title: '체류 시간',
      value: '1:20 → 3:10',
      change: '148% 증가',
      color: '#4CAF50',
      icon: '⏱️',
      charts: {
        front: { type: 'bar', data: [80, 120, 160, 190], labels: ['Before', 'Month1', 'Month2', 'After'] },
        side: { type: 'heatmap', data: [1, 2, 3, 4], labels: ['9AM', '12PM', '3PM', '6PM'] },
        top: { type: 'pie', data: [40, 30, 20, 10], labels: ['Home', 'Product', 'About', 'Contact'] },
        bottom: { type: 'line', data: [60, 80, 120, 140], labels: ['Mobile', 'Tablet', 'Desktop', 'TV'] }
      }
    },
    {
      id: 2,
      title: '웹 접근성',
      value: '55 → 92점',
      change: 'Lighthouse',
      color: '#FF9800',
      icon: '🛡️',
      charts: {
        front: { type: 'bar', data: [55, 70, 82, 92], labels: ['Initial', 'Phase1', 'Phase2', 'Final'] },
        side: { type: 'pie', data: [92, 88, 95, 90], labels: ['Performance', 'Accessibility', 'Best Practices', 'SEO'] },
        top: { type: 'line', data: [20, 40, 60, 80], labels: ['Alt Text', 'Contrast', 'Focus', 'ARIA'] },
        bottom: { type: 'heatmap', data: [1, 2, 3, 4], labels: ['Global', 'Asia', 'US', 'EU'] }
      }
    },
    {
      id: 3,
      title: '전환율',
      value: '3.2% → 8.5%',
      change: '165% 상승',
      color: '#9C27B0',
      icon: '💎',
      charts: {
        front: { type: 'bar', data: [3.2, 5.1, 6.8, 8.5], labels: ['Start', 'Month1', 'Month2', 'Current'] },
        side: { type: 'line', data: [100, 80, 60, 40], labels: ['Awareness', 'Interest', 'Decision', 'Action'] },
        top: { type: 'pie', data: [60, 25, 15], labels: ['A/B Test A', 'A/B Test B', 'Control'] },
        bottom: { type: 'bar', data: [2.1, 4.3, 6.8, 8.5], labels: ['Industry Avg', 'Competitor', 'CHIRO Before', 'CHIRO After'] }
      }
    }
  ];

  useEffect(() => {
    if (!mountRef.current || !isActive) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // Scene 설정
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: 'high-performance'
    });

    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // 조명 설정
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // 큐브들 생성
    const cubes: THREE.Mesh[] = [];
    metricsData.forEach((metric, index) => {
      const geometry = new THREE.BoxGeometry(2, 2, 2);
      
      // 각 면에 다른 재질 적용
      const materials = Array.from({length: 6}, (_, faceIndex) => {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const context = canvas.getContext('2d')!;
        
        // 배경
        const gradient = context.createLinearGradient(0, 0, 256, 256);
        gradient.addColorStop(0, metric.color);
        gradient.addColorStop(1, `${metric.color}40`);
        context.fillStyle = gradient;
        context.fillRect(0, 0, 256, 256);
        
        // 테두리
        context.strokeStyle = '#ffffff60';
        context.lineWidth = 4;
        context.strokeRect(10, 10, 236, 236);
        
        // 메인 텍스트
        if (faceIndex === 0) { // 앞면
          context.fillStyle = '#ffffff';
          context.font = 'bold 24px Arial';
          context.textAlign = 'center';
          context.fillText(metric.title, 128, 80);
          context.font = 'bold 32px Arial';
          context.fillText(metric.value, 128, 128);
          context.font = '16px Arial';
          context.fillText(metric.change, 128, 160);
          context.font = '48px Arial';
          context.fillText(metric.icon, 128, 220);
        } else {
          // 다른 면들에는 간단한 차트 표현
          context.fillStyle = '#ffffff';
          context.font = '12px Arial';
          context.textAlign = 'center';
          context.fillText(`Chart ${faceIndex}`, 128, 128);
          
          // 간단한 차트 시뮬레이션
          for (let i = 0; i < 4; i++) {
            const height = Math.random() * 60 + 20;
            const x = 50 + i * 40;
            const y = 200 - height;
            context.fillStyle = `${metric.color}80`;
            context.fillRect(x, y, 30, height);
          }
        }
        
        const texture = new THREE.CanvasTexture(canvas);
        return new THREE.MeshLambertMaterial({ 
          map: texture,
          transparent: true
        });
      });

      const cube = new THREE.Mesh(geometry, materials);
      
      // 큐브 배치 (2x2 그리드로 배치하되 Z축으로도 분산)
      const gridX = index % 2;
      const gridY = Math.floor(index / 2);
      cube.position.set(
        (gridX - 0.5) * 5,
        (gridY - 0.5) * 5,
        Math.sin(index) * 2
      );

      // 초기 회전
      cube.rotation.x = Math.random() * 0.5;
      cube.rotation.y = Math.random() * 0.5;
      
      cube.userData = { id: index };
      scene.add(cube);
      cubes.push(cube);
    });

    camera.position.z = 12;

    // 레퍼런스 저장
    sceneRef.current = scene;
    rendererRef.current = renderer;
    cubesRef.current = cubes;

    // 마우스 이벤트
    const handleMouseMove = (event: MouseEvent) => {
      const rect = mountRef.current!.getBoundingClientRect();
      mouseRef.current = {
        x: ((event.clientX - rect.left) / width) * 2 - 1,
        y: -((event.clientY - rect.top) / height) * 2 + 1
      };
    };

    const handleClick = (event: MouseEvent) => {
      event.preventDefault();
      
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2(mouseRef.current.x, mouseRef.current.y);
      
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(cubes);
      
      if (intersects.length > 0) {
        const cubeId = intersects[0].object.userData.id;
        onCubeSelect(cubeId);
      }
    };

    mountRef.current.addEventListener('mousemove', handleMouseMove);
    mountRef.current.addEventListener('click', handleClick);

    // 애니메이션 루프
    const animate = () => {
      requestAnimationFrame(animate);
      
      cubes.forEach((cube, index) => {
        // 기본 회전
        cube.rotation.y += 0.005;
        cube.rotation.x += 0.003;
        
        // 플로팅 효과
        cube.position.y += Math.sin(Date.now() * 0.001 + index) * 0.002;
        
        // 선택된 큐브 효과
        if (selectedCube === index) {
          cube.scale.setScalar(1.2 + Math.sin(Date.now() * 0.005) * 0.1);
        } else {
          cube.scale.setScalar(1);
        }
        
        // 호버 효과는 이미 스케일링으로 처리됨
      });
      
      // 카메라 회전
      camera.position.x = Math.sin(Date.now() * 0.0005) * 2;
      camera.position.y = Math.cos(Date.now() * 0.0003) * 1;
      camera.lookAt(0, 0, 0);
      
      renderer.render(scene, camera);
    };

    animate();

    // 클린업
    return () => {
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      cubes.forEach(cube => {
        cube.geometry.dispose();
        if (Array.isArray(cube.material)) {
          cube.material.forEach(material => material.dispose());
        } else {
          cube.material.dispose();
        }
      });
    };
  }, [isActive, selectedCube, onCubeSelect, hoveredCube]);

  return (
    <div className="relative w-full h-[500px]">
      {/* 3D 큐브 마운트 */}
      <div 
        ref={mountRef} 
        className="w-full h-full cursor-pointer bg-gradient-to-br from-gray-900/30 to-black/50 rounded-2xl"
      />
      
      {/* 파티클 배경 효과 */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({length: 20}).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* 컨트롤 가이드 */}
      <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-lg rounded-lg p-3 border border-white/20">
        <div className="text-white/60 text-xs mb-2">인터랙션</div>
        <div className="space-y-1 text-xs text-white/80">
          <div>🖱️ 자동 회전</div>
          <div>👆 클릭으로 확대</div>
          <div>📊 실시간 데이터</div>
        </div>
      </div>

      {/* 선택된 큐브 상세 정보 */}
      <AnimatePresence>
        {selectedCube !== null && selectedCube < metricsData.length && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 50 }}
            className="absolute top-4 right-4 bg-black/90 backdrop-blur-xl rounded-2xl border border-white/20 p-6 min-w-[300px]"
          >
            <div className="flex items-center gap-3 mb-4">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                style={{ backgroundColor: `${metricsData[selectedCube].color}40` }}
              >
                {metricsData[selectedCube].icon}
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">
                  {metricsData[selectedCube].title}
                </h3>
                <p className="text-white/60 text-sm">
                  {metricsData[selectedCube].change}
                </p>
              </div>
            </div>

            <div 
              className="text-4xl font-bold mb-4"
              style={{ color: metricsData[selectedCube].color }}
            >
              {metricsData[selectedCube].value}
            </div>

            {/* 미니 차트들 */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              {['front', 'side', 'top', 'bottom'].map((face, index) => (
                <div key={face} className="bg-white/5 rounded-lg p-3">
                  <div className="text-white/60 text-xs mb-2">
                    {face === 'front' ? '전체 트렌드' : 
                     face === 'side' ? '카테고리별' :
                     face === 'top' ? '월별 분석' : '비교 분석'}
                  </div>
                  <div className="h-8 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded"></div>
                </div>
              ))}
            </div>

            <button
              onClick={() => onCubeSelect(-1)}
              className="text-white/60 hover:text-white text-sm transition-colors"
            >
              닫기 ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 로딩 상태 */}
      {!isActive && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-2xl">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-green-400 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <div className="text-white/60 text-sm">데이터 큐브 로딩중...</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataCube;