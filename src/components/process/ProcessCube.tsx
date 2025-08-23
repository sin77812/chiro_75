'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

interface ProcessCubeProps {
  isActive: boolean;
  onFaceSelect: (faceIndex: number) => void;
  selectedFace: number;
}

const ProcessCube = ({ isActive, onFaceSelect, selectedFace }: ProcessCubeProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cubeRef = useRef<THREE.Mesh>();
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const faceData = [
    {
      title: 'Sprint System',
      subtitle: '2주 스프린트 완성',
      icon: '⚡',
      color: '#2E7D32',
      description: '빠른 반복으로 완벽한 결과'
    },
    {
      title: '실시간 대시보드',
      subtitle: '진행상황 투명공개',
      icon: '📊',
      color: '#388E3C',
      description: '언제든 프로젝트 현황 확인'
    },
    {
      title: 'AI 기반 최적화',
      subtitle: '머신러닝 성능향상',
      icon: '🤖',
      color: '#43A047',
      description: '데이터로 검증된 최적화'
    },
    {
      title: '투명한 가격',
      subtitle: '숨겨진 비용 제로',
      icon: '💎',
      color: '#4CAF50',
      description: '명확한 가격 정책'
    },
    {
      title: '글로벌 인프라',
      subtitle: '전세계 CDN 최적화',
      icon: '🌍',
      color: '#66BB6A',
      description: '어디서든 빠른 속도'
    },
    {
      title: '24/7 모니터링',
      subtitle: '무중단 서비스 보장',
      icon: '🛡️',
      color: '#81C784',
      description: '실시간 장애 대응'
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

    // 큐브 생성
    const geometry = new THREE.BoxGeometry(4, 4, 4);
    
    // 각 면에 다른 재질 적용
    const materials = faceData.map((face, index) => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const context = canvas.getContext('2d')!;
      
      // 배경 그라디언트
      const gradient = context.createLinearGradient(0, 0, 512, 512);
      gradient.addColorStop(0, face.color);
      gradient.addColorStop(1, `${face.color}80`);
      context.fillStyle = gradient;
      context.fillRect(0, 0, 512, 512);
      
      // 테두리
      context.strokeStyle = '#ffffff40';
      context.lineWidth = 8;
      context.strokeRect(20, 20, 472, 472);
      
      // 아이콘
      context.font = 'bold 120px Arial';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillStyle = '#ffffff';
      context.fillText(face.icon, 256, 180);
      
      // 제목
      context.font = 'bold 48px Arial';
      context.fillStyle = '#ffffff';
      context.fillText(face.title, 256, 280);
      
      // 부제목
      context.font = '32px Arial';
      context.fillStyle = '#ffffffcc';
      context.fillText(face.subtitle, 256, 340);
      
      // 글로우 효과
      context.shadowColor = face.color;
      context.shadowBlur = 20;
      context.shadowOffsetX = 0;
      context.shadowOffsetY = 0;
      
      const texture = new THREE.CanvasTexture(canvas);
      return new THREE.MeshBasicMaterial({ 
        map: texture,
        transparent: true,
        side: THREE.DoubleSide
      });
    });

    const cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);

    // 조명 추가
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    camera.position.z = 8;

    // 레퍼런스 저장
    sceneRef.current = scene;
    rendererRef.current = renderer;
    cubeRef.current = cube;

    // 마우스 이벤트 핸들러
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
      const intersects = raycaster.intersectObject(cube);
      
      if (intersects.length > 0) {
        const face = intersects[0].face;
        if (face) {
          const faceIndex = Math.floor(face.materialIndex);
          onFaceSelect(faceIndex);
        }
      }
    };

    mountRef.current.addEventListener('mousemove', handleMouseMove);
    mountRef.current.addEventListener('click', handleClick);
    mountRef.current.addEventListener('mouseenter', () => setIsHovered(true));
    mountRef.current.addEventListener('mouseleave', () => setIsHovered(false));

    // 애니메이션 루프
    const animate = () => {
      requestAnimationFrame(animate);
      
      if (cube) {
        // 자동 회전
        if (!isHovered) {
          cube.rotation.y += 0.005;
          cube.rotation.x += 0.003;
        } else {
          // 마우스 따라 회전
          const targetX = mouseRef.current.y * 0.5;
          const targetY = mouseRef.current.x * 0.5;
          cube.rotation.x += (targetX - cube.rotation.x) * 0.05;
          cube.rotation.y += (targetY - cube.rotation.y) * 0.05;
        }

        // 선택된 면으로 회전
        if (selectedFace >= 0) {
          const faceRotations = [
            { x: 0, y: 0 },           // 앞면
            { x: 0, y: Math.PI },     // 뒷면  
            { x: 0, y: Math.PI / 2 }, // 우면
            { x: 0, y: -Math.PI / 2 }, // 좌면
            { x: -Math.PI / 2, y: 0 }, // 윗면
            { x: Math.PI / 2, y: 0 }   // 아랫면
          ];
          
          const target = faceRotations[selectedFace];
          cube.rotation.x += (target.x - cube.rotation.x) * 0.1;
          cube.rotation.y += (target.y - cube.rotation.y) * 0.1;
        }
      }
      
      renderer.render(scene, camera);
    };

    animate();

    // 리사이즈 핸들러
    const handleResize = () => {
      if (!mountRef.current) return;
      const newWidth = mountRef.current.clientWidth;
      const newHeight = mountRef.current.clientHeight;
      
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      materials.forEach(material => material.dispose());
    };
  }, [isActive, selectedFace, onFaceSelect, isHovered]);

  return (
    <div className="relative w-full h-[500px]">
      {/* 3D 큐브 마운트 포인트 */}
      <div 
        ref={mountRef} 
        className="w-full h-full cursor-pointer"
        style={{ 
          background: 'radial-gradient(circle, rgba(46,125,50,0.1) 0%, transparent 70%)',
        }}
      />
      
      {/* 컨트롤 가이드 */}
      <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-lg rounded-lg p-3 border border-white/20">
        <div className="text-white/60 text-xs mb-2">인터랙션</div>
        <div className="space-y-1 text-xs text-white/80">
          <div>🖱️ 마우스로 회전</div>
          <div>👆 클릭으로 면 선택</div>
          <div>🔄 자동 회전</div>
        </div>
      </div>

      {/* 면 정보 표시 */}
      {selectedFace >= 0 && selectedFace < faceData.length && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-4 right-4 bg-black/90 backdrop-blur-xl rounded-2xl p-4 border border-white/20 min-w-[250px]"
        >
          <div className="flex items-center gap-3 mb-3">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: faceData[selectedFace].color }}
            />
            <div className="text-2xl">{faceData[selectedFace].icon}</div>
            <div className="text-white font-semibold">{faceData[selectedFace].title}</div>
          </div>
          <div className="text-white/60 text-sm mb-2">{faceData[selectedFace].subtitle}</div>
          <div className="text-white/80 text-sm">{faceData[selectedFace].description}</div>
        </motion.div>
      )}

      {/* 로딩 인디케이터 */}
      {!isActive && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-lg">
          <div className="text-white/60">3D 큐브 로딩중...</div>
        </div>
      )}
    </div>
  );
};

export default ProcessCube;