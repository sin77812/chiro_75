'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CustomIcon } from '../ui/CustomIcons';

interface LiveCodeEditorProps {
  isActive: boolean;
  mode: 'business' | 'developer';
}

const LiveCodeEditor = ({ isActive, mode }: LiveCodeEditorProps) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [typedCode, setTypedCode] = useState('');
  const [isBuilding, setIsBuilding] = useState(false);
  const [buildComplete, setBuildComplete] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const codeLines = [
    "// CHIRO가 실제로 작성하는 코드",
    "import { useState, useEffect } from 'react'",
    "import { motion } from 'framer-motion'",
    "",
    "export default function Growth() {",
    "  const [conversion, setConversion] = useState(0)",
    "  const [loading, setLoading] = useState(true)",
    "",
    "  useEffect(() => {",
    "    // 실시간 성과 데이터 가져오기",
    "    fetchPerformanceData()",
    "      .then(data => {",
    "        setConversion(data.conversion)",
    "        setLoading(false)",
    "      })",
    "  }, [])",
    "",
    "  return (",
    "    <motion.div",
    "      initial={{ opacity: 0 }}",
    "      animate={{ opacity: 1 }}",
    "      transition={{ duration: 0.5 }}",
    "    >",
    "      <h1>전환율: +{conversion}%</h1>",
    "    </motion.div>",
    "  )",
    "}"
  ];

  const businessContent = {
    title: "비즈니스 관점",
    features: [
      { icon: "📈", title: "성과 중심 개발", desc: "매출 증대에 직결되는 기능 우선" },
      { icon: "⚡", title: "빠른 반복", desc: "2주 스프린트로 즉시 피드백" },
      { icon: "🎯", title: "목표 지향", desc: "KPI 달성을 위한 최적화" },
      { icon: "💰", title: "ROI 최대화", desc: "투자 대비 최고의 수익률" }
    ]
  };

  const developerContent = {
    title: "개발자 관점",
    techStack: [
      { name: "Next.js 15", version: "15.0.0", status: "latest" },
      { name: "TypeScript", version: "5.0+", status: "stable" },
      { name: "Tailwind CSS", version: "3.4+", status: "optimized" },
      { name: "Framer Motion", version: "11.0+", status: "performance" }
    ],
    metrics: [
      { name: "Core Web Vitals", value: "100/100", color: "#4CAF50" },
      { name: "Performance Score", value: "98/100", color: "#2196F3" },
      { name: "Build Time", value: "< 30s", color: "#FF9800" },
      { name: "Bundle Size", value: "< 200KB", color: "#9C27B0" }
    ]
  };

  const terminalOutput = [
    "$ npm run build",
    "✓ Creating an optimized production build",
    "✓ Compiled successfully",
    "✓ Linting and checking validity of types",
    "✓ Collecting page data",
    "✓ Generating static pages (18/18)",
    "✓ Finalizing page optimization",
    "",
    "Route                    Size     First Load JS",
    "┌ ○ /                   11.2 kB    264 kB",
    "┌ ○ /dashboard          8.4 kB     261 kB", 
    "└ ○ /analytics         6.8 kB     259 kB",
    "",
    "○  (Static)  prerendered as static content",
    "✨ Build completed in 28.3s"
  ];

  useEffect(() => {
    if (!isActive) return;

    let timeoutId: NodeJS.Timeout;
    
    const typeCode = () => {
      if (currentLine < codeLines.length) {
        const line = codeLines[currentLine];
        let charIndex = 0;
        
        const typeLine = () => {
          if (charIndex < line.length) {
            setTypedCode(prev => prev + line[charIndex]);
            charIndex++;
            timeoutId = setTimeout(typeLine, Math.random() * 50 + 30);
          } else {
            setTypedCode(prev => prev + '\n');
            setCurrentLine(prev => {
              const newLine = prev + 1;
              // 15줄이 넘으면 스크롤을 맨 아래로
              if (newLine > 15 && scrollContainerRef.current) {
                setTimeout(() => {
                  scrollContainerRef.current?.scrollTo({
                    top: scrollContainerRef.current.scrollHeight,
                    behavior: 'smooth'
                  });
                }, 100);
              }
              return newLine;
            });
            timeoutId = setTimeout(typeCode, 200);
          }
        };
        
        typeLine();
      } else if (!isBuilding) {
        setIsBuilding(true);
        setTimeout(() => {
          setBuildComplete(true);
        }, 3000);
      }
    };

    typeCode();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isActive, currentLine]);

  return (
    <div className="bg-gray-900 rounded-2xl border border-gray-700 overflow-hidden shadow-2xl">
      {/* VS Code 스타일 헤더 */}
      <div className="bg-gray-800 px-4 py-3 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-gray-300 text-sm font-mono">
              growth-component.tsx
            </span>
          </div>
          
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span>TypeScript</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* 코드 에디터 영역 */}
        <div className="bg-gray-900 p-4 font-mono text-sm overflow-hidden">
          <div 
            ref={scrollContainerRef}
            className="h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
          >
            <pre className="text-gray-300 whitespace-pre-wrap">
            {typedCode.split('\n').map((line, index) => (
              <div key={index} className="flex">
                <span className="text-gray-600 select-none w-8 text-right mr-4">
                  {index + 1}
                </span>
                <span className={`${
                  line.includes('//') ? 'text-green-400' :
                  line.includes('import') || line.includes('export') ? 'text-purple-400' :
                  line.includes('useState') || line.includes('useEffect') ? 'text-blue-400' :
                  line.includes('motion') ? 'text-yellow-400' :
                  line.includes('return') ? 'text-pink-400' :
                  'text-gray-300'
                }`}>
                  {line}
                </span>
                {index === currentLine - 1 && (
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="text-white bg-white"
                  >
                    |
                  </motion.span>
                )}
              </div>
            ))}
            </pre>
          </div>
        </div>

        {/* 모드별 콘텐츠 */}
        <div className="bg-gray-800 p-4">
          <AnimatePresence mode="wait">
            {mode === 'business' ? (
              <motion.div
                key="business"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h3 className="text-white font-bold text-lg mb-4">
                  {businessContent.title}
                </h3>
                
                {businessContent.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg"
                  >
                    <CustomIcon name={feature.icon} size={24} />
                    <div>
                      <div className="text-white font-semibold">{feature.title}</div>
                      <div className="text-gray-400 text-sm">{feature.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="developer"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-white font-bold text-lg mb-4">
                  {developerContent.title}
                </h3>
                
                {/* 기술 스택 */}
                <div>
                  <h4 className="text-gray-300 font-semibold mb-3">기술 스택</h4>
                  <div className="space-y-2">
                    {developerContent.techStack.map((tech, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-700/30 rounded">
                        <div>
                          <span className="text-white font-medium">{tech.name}</span>
                          <span className="text-gray-400 text-sm ml-2">{tech.version}</span>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded ${
                          tech.status === 'latest' ? 'bg-green-500/20 text-green-400' :
                          tech.status === 'stable' ? 'bg-blue-500/20 text-blue-400' :
                          tech.status === 'optimized' ? 'bg-purple-500/20 text-purple-400' :
                          'bg-orange-500/20 text-orange-400'
                        }`}>
                          {tech.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 성능 메트릭 */}
                <div>
                  <h4 className="text-gray-300 font-semibold mb-3">성능 지표</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {developerContent.metrics.map((metric, index) => (
                      <div key={index} className="p-3 bg-gray-700/30 rounded text-center">
                        <div className="text-lg font-bold" style={{ color: metric.color }}>
                          {metric.value}
                        </div>
                        <div className="text-xs text-gray-400">{metric.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 터미널 영역 */}
      <div className="bg-black border-t border-gray-700">
        <div className="p-2 bg-gray-800 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <div className="text-green-400 text-sm">●</div>
            <span className="text-gray-300 text-xs">TERMINAL</span>
          </div>
        </div>
        
        <div className="p-4 font-mono text-sm h-40 overflow-y-auto">
          {isBuilding && (
            <div className="space-y-1">
              {terminalOutput.map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`${
                    line.startsWith('✓') ? 'text-green-400' :
                    line.startsWith('$') ? 'text-blue-400' :
                    line.includes('○') ? 'text-yellow-400' :
                    line.includes('✨') ? 'text-purple-400' :
                    'text-gray-300'
                  }`}
                >
                  {line}
                </motion.div>
              ))}
              
              {buildComplete && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-green-400 font-bold mt-4"
                >
                  🎉 빌드 성공! 프로덕션 준비 완료
                </motion.div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveCodeEditor;