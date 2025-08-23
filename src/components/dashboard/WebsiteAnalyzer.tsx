'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnalysisResult {
  url: string;
  scores: {
    performance: number;
    accessibility: number;
    seo: number;
    design: number;
    mobile: number;
    speed: number;
  };
  overallScore: number;
  recommendations: string[];
  estimatedImprovements: {
    traffic: string;
    conversion: string;
    revenue: string;
  };
}

interface WebsiteAnalyzerProps {
  isActive: boolean;
}

const WebsiteAnalyzer = ({ isActive }: WebsiteAnalyzerProps) => {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [showResults, setShowResults] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  // 신경망 애니메이션
  useEffect(() => {
    if (!isActive || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;
    canvas.width = 400;
    canvas.height = 300;

    const neurons: any[] = [];
    const connections: any[] = [];

    // 뉴런 생성
    for (let i = 0; i < 20; i++) {
      neurons.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        pulse: Math.random() * Math.PI * 2
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      neurons.forEach((neuron, index) => {
        neuron.pulse += 0.05;
        const intensity = isAnalyzing ? 0.8 : 0.3;
        const radius = 3 + Math.sin(neuron.pulse) * 2 * intensity;
        
        ctx.beginPath();
        ctx.arc(neuron.x, neuron.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(46, 125, 50, ${0.6 + Math.sin(neuron.pulse) * 0.4 * intensity})`;
        ctx.fill();

        // 연결선 그리기
        if (index < neurons.length - 1) {
          const nextNeuron = neurons[index + 1];
          ctx.beginPath();
          ctx.moveTo(neuron.x, neuron.y);
          ctx.lineTo(nextNeuron.x, nextNeuron.y);
          ctx.strokeStyle = `rgba(46, 125, 50, ${0.2 * intensity})`;
          ctx.stroke();
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, isAnalyzing]);

  const handleAnalyze = async () => {
    if (!url || !isValidUrl(url)) {
      alert('올바른 웹사이트 URL을 입력해주세요.');
      return;
    }

    setIsAnalyzing(true);
    setShowResults(false);

    // 실제 분석 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 3000));

    // 모의 분석 결과 생성
    const mockResult: AnalysisResult = {
      url,
      scores: {
        performance: Math.floor(Math.random() * 30) + 70,
        accessibility: Math.floor(Math.random() * 25) + 75,
        seo: Math.floor(Math.random() * 35) + 65,
        design: Math.floor(Math.random() * 20) + 80,
        mobile: Math.floor(Math.random() * 30) + 70,
        speed: Math.floor(Math.random() * 40) + 60,
      },
      overallScore: 0,
      recommendations: [
        '이미지 최적화로 로딩 속도 35% 개선',
        'SEO 메타태그 보완으로 검색 순위 상승',
        '모바일 반응형 디자인 개선',
        '접근성 개선으로 사용자 경험 향상',
        'Core Web Vitals 최적화 필요'
      ],
      estimatedImprovements: {
        traffic: '+280%',
        conversion: '+165%',
        revenue: '+340%'
      }
    };

    // 전체 점수 계산
    const scoreValues = Object.values(mockResult.scores);
    mockResult.overallScore = Math.floor(scoreValues.reduce((a, b) => a + b, 0) / scoreValues.length);

    setAnalysisResult(mockResult);
    setIsAnalyzing(false);
    setShowResults(true);
  };

  const isValidUrl = (string: string) => {
    try {
      new URL(string.startsWith('http') ? string : `https://${string}`);
      return true;
    } catch (_) {
      return false;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return '#4CAF50';
    if (score >= 80) return '#8BC34A';
    if (score >= 70) return '#FFC107';
    if (score >= 60) return '#FF9800';
    return '#F44336';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return '우수';
    if (score >= 80) return '양호';
    if (score >= 70) return '보통';
    if (score >= 60) return '개선필요';
    return '심각';
  };

  return (
    <div className="bg-black/40 backdrop-blur-lg rounded-3xl border border-white/10 p-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">웹사이트 성능 분석기</h3>
        <p className="text-white/70">
          웹사이트 URL을 입력하고 30초 만에 종합적인 성능 분석을 받아보세요
        </p>
      </div>

      {/* URL 입력 폼 */}
      <div className="mb-8">
        <div className="flex gap-4">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="flex-1 bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-green-500 transition-colors"
            disabled={isAnalyzing}
          />
          <motion.button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !url}
            className="px-8 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-xl hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100"
            whileTap={{ scale: 0.95 }}
          >
            {isAnalyzing ? '분석중...' : 'AI 분석 시작'}
          </motion.button>
        </div>
      </div>

      {/* 신경망 애니메이션 */}
      <div className="mb-8">
        <canvas
          ref={canvasRef}
          className="w-full h-48 bg-black/20 rounded-2xl border border-white/10"
          style={{ maxWidth: '400px', height: '200px', margin: '0 auto', display: 'block' }}
        />
      </div>

      {/* 분석 진행 상태 */}
      <AnimatePresence>
        {isAnalyzing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-8 h-8 border-2 border-green-400 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-white font-medium">AI가 웹사이트를 분석하고 있습니다...</span>
            </div>
            <div className="space-y-2 text-sm text-white/60">
              <div>🔍 페이지 속도 측정 중...</div>
              <div>📱 모바일 최적화 확인 중...</div>
              <div>🎨 UI/UX 디자인 평가 중...</div>
              <div>📈 SEO 최적화 분석 중...</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 분석 결과 */}
      <AnimatePresence>
        {showResults && analysisResult && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* 전체 점수 */}
            <div className="text-center">
              <div className="inline-flex items-center gap-4 bg-black/40 rounded-2xl p-6 border border-white/10">
                <div className="text-center">
                  <div 
                    className="text-4xl font-bold mb-2"
                    style={{ color: getScoreColor(analysisResult.overallScore) }}
                  >
                    {analysisResult.overallScore}점
                  </div>
                  <div className="text-white/60 text-sm">전체 점수</div>
                </div>
                <div className="w-px h-16 bg-white/20"></div>
                <div className="text-center">
                  <div 
                    className="text-xl font-bold mb-2"
                    style={{ color: getScoreColor(analysisResult.overallScore) }}
                  >
                    {getScoreLabel(analysisResult.overallScore)}
                  </div>
                  <div className="text-white/60 text-sm">종합 평가</div>
                </div>
              </div>
            </div>

            {/* 개별 점수들 */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(analysisResult.scores).map(([category, score]) => {
                const categoryNames: { [key: string]: string } = {
                  performance: '성능',
                  accessibility: '접근성',
                  seo: 'SEO',
                  design: '디자인',
                  mobile: '모바일',
                  speed: '속도'
                };

                return (
                  <div key={category} className="bg-black/40 rounded-xl p-4 border border-white/10">
                    <div className="text-center">
                      <div 
                        className="text-2xl font-bold mb-1"
                        style={{ color: getScoreColor(score) }}
                      >
                        {score}
                      </div>
                      <div className="text-white/70 text-sm">{categoryNames[category]}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 예상 개선 효과 */}
            <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-2xl p-6 border border-white/10">
              <h4 className="text-white font-bold text-lg mb-4 text-center">CHIRO와 함께할 때 예상 개선 효과</h4>
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-400 mb-1">
                    {analysisResult.estimatedImprovements.traffic}
                  </div>
                  <div className="text-white/60 text-sm">트래픽 증가</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-400 mb-1">
                    {analysisResult.estimatedImprovements.conversion}
                  </div>
                  <div className="text-white/60 text-sm">전환율 향상</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-400 mb-1">
                    {analysisResult.estimatedImprovements.revenue}
                  </div>
                  <div className="text-white/60 text-sm">매출 증대</div>
                </div>
              </div>
            </div>

            {/* 개선 권장사항 */}
            <div className="bg-black/40 rounded-2xl p-6 border border-white/10">
              <h4 className="text-white font-bold text-lg mb-4">AI 추천 개선사항</h4>
              <div className="space-y-3">
                {analysisResult.recommendations.map((rec, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-3 bg-white/5 rounded-lg"
                  >
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    <div className="text-white/80">{rec}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <button className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-transform">
                무료 개선 컨설팅 받기
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WebsiteAnalyzer;