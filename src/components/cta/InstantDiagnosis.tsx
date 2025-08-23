'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DiagnosisResult {
  url: string;
  scores: {
    performance: number;
    seo: number;
    accessibility: number;
    bestPractices: number;
    mobile: number;
  };
  issues: {
    category: string;
    severity: 'critical' | 'warning' | 'info';
    message: string;
    impact: string;
  }[];
  recommendations: {
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
    estimatedImpact: string;
  }[];
  overallScore: number;
  potential: {
    trafficIncrease: number;
    conversionIncrease: number;
    revenueIncrease: number;
  };
}

interface InstantDiagnosisProps {
  onComplete: (result: DiagnosisResult) => void;
}

const InstantDiagnosis = ({ onComplete }: InstantDiagnosisProps) => {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [showResult, setShowResult] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  const analysisSteps = [
    '웹사이트 접속 중...',
    '성능 지표 측정 중...',
    'SEO 요소 분석 중...',
    '접근성 검사 중...',
    '모바일 최적화 확인 중...',
    '보안 및 베스트 프랙티스 검증 중...',
    'AI 분석 결과 생성 중...'
  ];

  // AI Brain Animation
  useEffect(() => {
    if (!canvasRef.current || !isAnalyzing) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };

    resize();
    window.addEventListener('resize', resize);

    const neurons: any[] = [];
    const connections: any[] = [];

    // Create neural network
    for (let layer = 0; layer < 5; layer++) {
      const nodesInLayer = 3 + Math.floor(Math.random() * 3);
      for (let i = 0; i < nodesInLayer; i++) {
        neurons.push({
          x: 30 + (layer * 80),
          y: 30 + (i * 25) + Math.random() * 20,
          layer,
          activation: Math.random(),
          targetActivation: Math.random(),
          pulseTime: Math.random() * 1000
        });
      }
    }

    // Create connections
    neurons.forEach((neuron, i) => {
      neurons.forEach((otherNeuron, j) => {
        if (otherNeuron.layer === neuron.layer + 1 && Math.random() > 0.3) {
          connections.push({
            from: i,
            to: j,
            weight: Math.random() * 2 - 1,
            activity: 0
          });
        }
      });
    });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      const time = Date.now();

      // Update neurons
      neurons.forEach((neuron, i) => {
        neuron.activation += (neuron.targetActivation - neuron.activation) * 0.1;
        
        if (time - neuron.pulseTime > 2000) {
          neuron.targetActivation = Math.random();
          neuron.pulseTime = time;
        }
      });

      // Draw connections
      connections.forEach(connection => {
        const fromNeuron = neurons[connection.from];
        const toNeuron = neurons[connection.to];
        
        connection.activity = fromNeuron.activation * Math.abs(connection.weight);
        
        ctx.beginPath();
        ctx.moveTo(fromNeuron.x, fromNeuron.y);
        ctx.lineTo(toNeuron.x, toNeuron.y);
        ctx.strokeStyle = `rgba(76, 175, 80, ${connection.activity * 0.8})`;
        ctx.lineWidth = Math.abs(connection.weight) * 2;
        ctx.stroke();
      });

      // Draw neurons
      neurons.forEach(neuron => {
        const pulseIntensity = 0.5 + Math.sin(time * 0.01 + neuron.pulseTime) * 0.3;
        
        ctx.beginPath();
        ctx.arc(neuron.x, neuron.y, 4 + neuron.activation * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(76, 175, 80, ${0.4 + neuron.activation * 0.6})`;
        ctx.fill();
        
        // Glow effect
        ctx.shadowBlur = 10 * pulseIntensity;
        ctx.shadowColor = '#4CAF50';
        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isAnalyzing]);

  const mockAnalysis = (): DiagnosisResult => {
    const baseScore = 40 + Math.random() * 30; // Random score between 40-70
    
    return {
      url,
      scores: {
        performance: Math.round(baseScore + Math.random() * 20),
        seo: Math.round(baseScore + Math.random() * 25),
        accessibility: Math.round(baseScore + Math.random() * 15),
        bestPractices: Math.round(baseScore + Math.random() * 20),
        mobile: Math.round(baseScore + Math.random() * 30)
      },
      issues: [
        {
          category: '성능',
          severity: 'critical',
          message: 'First Contentful Paint 시간이 3.2초로 너무 깁니다',
          impact: '사용자 이탈률 35% 증가 요인'
        },
        {
          category: 'SEO',
          severity: 'warning',
          message: '메타 디스크립션이 누락된 페이지가 12개 발견되었습니다',
          impact: '검색 노출 기회 손실'
        },
        {
          category: '접근성',
          severity: 'warning',
          message: '이미지 alt 태그가 누락된 요소 8개',
          impact: '장애인 접근성 저하'
        },
        {
          category: '모바일',
          severity: 'critical',
          message: '터치 요소 간격이 권장 기준(44px) 미달',
          impact: '모바일 사용성 저해'
        }
      ],
      recommendations: [
        {
          title: '이미지 최적화 및 WebP 변환',
          description: '현재 이미지 크기를 60% 줄이고 차세대 포맷으로 변환',
          priority: 'high',
          estimatedImpact: '페이지 속도 40% 개선'
        },
        {
          title: '코드 분할 및 지연 로딩',
          description: 'JavaScript 번들을 분할하고 필요시에만 로드',
          priority: 'high',
          estimatedImpact: '초기 로딩 시간 2.1초 단축'
        },
        {
          title: 'CDN 적용 및 캐싱 전략',
          description: '전역 CDN 적용으로 전 세계 어디서나 빠른 로딩',
          priority: 'medium',
          estimatedImpact: '로딩 속도 25% 개선'
        },
        {
          title: 'SEO 메타데이터 최적화',
          description: '누락된 메타 태그 보완 및 구조화 데이터 추가',
          priority: 'medium',
          estimatedImpact: '검색 트래픽 45% 증가 예상'
        }
      ],
      overallScore: Math.round((
        Math.round(baseScore + Math.random() * 20) +
        Math.round(baseScore + Math.random() * 25) +
        Math.round(baseScore + Math.random() * 15) +
        Math.round(baseScore + Math.random() * 20) +
        Math.round(baseScore + Math.random() * 30)
      ) / 5),
      potential: {
        trafficIncrease: 45 + Math.floor(Math.random() * 30),
        conversionIncrease: 25 + Math.floor(Math.random() * 40),
        revenueIncrease: 35 + Math.floor(Math.random() * 50)
      }
    };
  };

  const startAnalysis = () => {
    if (!url.trim()) return;

    setIsAnalyzing(true);
    setAnalysisStep(0);
    setShowResult(false);

    // Simulate progressive analysis
    let currentStep = 0;
    const stepInterval = setInterval(() => {
      currentStep++;
      setAnalysisStep(currentStep);
      
      if (currentStep >= analysisSteps.length) {
        clearInterval(stepInterval);
        
        setTimeout(() => {
          const analysisResult = mockAnalysis();
          setResult(analysisResult);
          setIsAnalyzing(false);
          setShowResult(true);
          onComplete(analysisResult);
        }, 1000);
      }
    }, 800);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-400';
      case 'warning': return 'text-orange-400';
      case 'info': return 'text-blue-400';
      default: return 'text-white/70';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500/50 bg-red-500/10';
      case 'medium': return 'border-orange-500/50 bg-orange-500/10';
      case 'low': return 'border-green-500/50 bg-green-500/10';
      default: return 'border-white/20 bg-white/5';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-lg rounded-3xl border border-white/10 p-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">AI 즉석 웹사이트 진단</h3>
        <p className="text-white/70">URL만 입력하면 30초 만에 완료되는 무료 성능 분석</p>
      </div>

      {/* URL Input */}
      {!isAnalyzing && !showResult && (
        <motion.div
          initial={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="flex gap-4">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="flex-1 bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-green-500 focus:outline-none transition-colors"
            />
            <motion.button
              onClick={startAnalysis}
              disabled={!url.trim()}
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold rounded-xl hover:from-green-500 hover:to-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              무료 분석 시작
            </motion.button>
          </div>

          <div className="text-center text-white/60 text-sm">
            <p>✓ 완전 무료 ✓ 30초 완성 ✓ 전문가급 분석</p>
          </div>
        </motion.div>
      )}

      {/* Analysis Progress */}
      <AnimatePresence>
        {isAnalyzing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center"
          >
            {/* AI Brain Animation */}
            <div className="mb-8">
              <canvas
                ref={canvasRef}
                className="mx-auto rounded-lg bg-black/20"
                style={{ width: '300px', height: '150px' }}
              />
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-center gap-3">
                <div className="w-6 h-6 border-2 border-green-400 border-t-transparent rounded-full animate-spin"></div>
                <div className="text-white font-semibold">AI가 웹사이트를 분석하고 있습니다</div>
              </div>

              <div className="space-y-3">
                {analysisSteps.map((step, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                      index < analysisStep 
                        ? 'bg-green-500/20 border border-green-500/30' 
                        : index === analysisStep
                        ? 'bg-blue-500/20 border border-blue-500/30'
                        : 'bg-white/5 border border-white/10'
                    }`}
                  >
                    <span className={`text-sm ${
                      index < analysisStep ? 'text-green-400' : 
                      index === analysisStep ? 'text-blue-400' : 'text-white/50'
                    }`}>
                      {step}
                    </span>
                    <div className="flex items-center">
                      {index < analysisStep && (
                        <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                      {index === analysisStep && (
                        <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <AnimatePresence>
        {showResult && result && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Overall Score */}
            <div className="text-center">
              <div className="mb-4">
                <div className={`text-6xl font-bold mb-2 ${getScoreColor(result.overallScore)}`}>
                  {result.overallScore}
                </div>
                <div className="text-white/70">종합 점수 (100점 만점)</div>
              </div>
              
              <div className="inline-flex items-center gap-2 bg-black/40 rounded-full px-4 py-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 font-semibold text-sm">분석 완료</span>
              </div>
            </div>

            {/* Detailed Scores */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {Object.entries(result.scores).map(([key, score]) => (
                <div key={key} className="bg-black/40 rounded-2xl p-4 text-center border border-white/10">
                  <div className={`text-2xl font-bold mb-1 ${getScoreColor(score)}`}>{score}</div>
                  <div className="text-white/70 text-sm">
                    {key === 'performance' ? '성능' : 
                     key === 'seo' ? 'SEO' :
                     key === 'accessibility' ? '접근성' :
                     key === 'bestPractices' ? '베스트 프랙티스' :
                     '모바일'}
                  </div>
                </div>
              ))}
            </div>

            {/* Issues Found */}
            <div>
              <h4 className="text-white font-bold text-lg mb-4">발견된 문제점</h4>
              <div className="space-y-3">
                {result.issues.map((issue, index) => (
                  <div key={index} className="bg-black/40 rounded-2xl p-4 border border-white/10">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-white/70 text-sm font-medium">{issue.category}</span>
                          <span className={`text-xs px-2 py-1 rounded-full bg-black/40 ${getSeverityColor(issue.severity)}`}>
                            {issue.severity}
                          </span>
                        </div>
                        <div className="text-white font-medium mb-1">{issue.message}</div>
                        <div className="text-white/60 text-sm">{issue.impact}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div>
              <h4 className="text-white font-bold text-lg mb-4">개선 권장사항</h4>
              <div className="space-y-4">
                {result.recommendations.map((rec, index) => (
                  <div key={index} className={`rounded-2xl p-4 border ${getPriorityColor(rec.priority)}`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="text-white font-semibold">{rec.title}</div>
                      <span className="text-xs px-2 py-1 rounded-full bg-black/40 text-white/70">
                        {rec.priority === 'high' ? '높음' : rec.priority === 'medium' ? '중간' : '낮음'}
                      </span>
                    </div>
                    <div className="text-white/70 text-sm mb-2">{rec.description}</div>
                    <div className="text-green-400 text-sm font-medium">{rec.estimatedImpact}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Potential Improvements */}
            <div className="bg-gradient-to-r from-green-900/40 to-blue-900/40 rounded-2xl p-6 border border-green-500/20">
              <h4 className="text-white font-bold text-xl mb-4 text-center">CHIRO와 함께할 때 예상 개선 효과</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">+{result.potential.trafficIncrease}%</div>
                  <div className="text-white/70">트래픽 증가</div>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">+{result.potential.conversionIncrease}%</div>
                  <div className="text-white/70">전환율 개선</div>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">+{result.potential.revenueIncrease}%</div>
                  <div className="text-white/70">매출 증가</div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold rounded-2xl hover:from-green-500 hover:to-blue-500 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                무료 상세 분석 리포트 받기
              </motion.button>
              <p className="text-white/60 text-sm mt-2">
                더 자세한 분석과 개선 로드맵을 제공합니다
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InstantDiagnosis;