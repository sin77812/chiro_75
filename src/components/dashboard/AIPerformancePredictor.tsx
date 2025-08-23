'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PredictionData {
  currentMetrics: {
    visitors: number;
    conversionRate: number;
    revenue: number;
  };
  predictions: {
    threeMonth: {
      visitors: number;
      conversionRate: number;
      revenue: number;
      improvement: number;
    };
    sixMonth: {
      visitors: number;
      conversionRate: number;
      revenue: number;
      improvement: number;
    };
  };
  roi: {
    investment: number;
    return: number;
    percentage: number;
  };
  confidence: number;
}

interface AIPerformancePredictorProps {
  isActive: boolean;
}

const AIPerformancePredictor = ({ isActive }: AIPerformancePredictorProps) => {
  const [currentVisitors, setCurrentVisitors] = useState(15000);
  const [currentConversion, setCurrentConversion] = useState(2.5);
  const [selectedIndustry, setSelectedIndustry] = useState('ecommerce');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [predictionData, setPredictionData] = useState<PredictionData | null>(null);
  const [showResults, setShowResults] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  const industries = [
    { id: 'ecommerce', name: '이커머스', multiplier: 1.2 },
    { id: 'saas', name: 'SaaS', multiplier: 1.4 },
    { id: 'manufacturing', name: '제조업', multiplier: 1.1 },
    { id: 'healthcare', name: '헬스케어', multiplier: 1.3 },
    { id: 'education', name: '교육', multiplier: 1.25 },
    { id: 'finance', name: '금융', multiplier: 1.5 }
  ];

  // Neural network visualization
  useEffect(() => {
    if (!canvasRef.current || !isActive) return;

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

    const nodes: any[] = [];
    const connections: any[] = [];

    // Create neural network nodes
    for (let layer = 0; layer < 4; layer++) {
      const nodesInLayer = layer === 0 || layer === 3 ? 3 : 6;
      for (let i = 0; i < nodesInLayer; i++) {
        nodes.push({
          x: 50 + (layer * 100),
          y: 50 + (i * 30) + (layer === 1 || layer === 2 ? -30 : 0),
          layer,
          activation: Math.random(),
          targetActivation: Math.random()
        });
      }
    }

    // Create connections between layers
    nodes.forEach((node, i) => {
      nodes.forEach((otherNode, j) => {
        if (otherNode.layer === node.layer + 1) {
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

      // Update node activations
      nodes.forEach(node => {
        node.activation += (node.targetActivation - node.activation) * 0.1;
        if (Math.random() < 0.01) {
          node.targetActivation = Math.random();
        }
      });

      // Draw connections
      connections.forEach(connection => {
        const fromNode = nodes[connection.from];
        const toNode = nodes[connection.to];
        
        connection.activity = fromNode.activation * Math.abs(connection.weight);
        
        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        ctx.strokeStyle = `rgba(46, 125, 50, ${connection.activity * 0.8})`;
        ctx.lineWidth = Math.abs(connection.weight) * 2;
        ctx.stroke();
      });

      // Draw nodes
      nodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 8 + node.activation * 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(76, 175, 80, ${0.3 + node.activation * 0.7})`;
        ctx.fill();
        ctx.strokeStyle = '#4CAF50';
        ctx.lineWidth = 2;
        ctx.stroke();
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
  }, [isActive]);

  const calculatePredictions = () => {
    const industry = industries.find(i => i.id === selectedIndustry);
    const multiplier = industry?.multiplier || 1.2;
    
    const currentRevenue = currentVisitors * (currentConversion / 100) * 50000; // Assume ₩50K per conversion

    const threeMonthVisitors = Math.round(currentVisitors * (1.3 + multiplier * 0.1));
    const sixMonthVisitors = Math.round(currentVisitors * (1.6 + multiplier * 0.2));
    
    const threeMonthConversion = Math.round((currentConversion * (1.8 + multiplier * 0.1)) * 10) / 10;
    const sixMonthConversion = Math.round((currentConversion * (2.2 + multiplier * 0.2)) * 10) / 10;
    
    const threeMonthRevenue = Math.round(threeMonthVisitors * (threeMonthConversion / 100) * 50000);
    const sixMonthRevenue = Math.round(sixMonthVisitors * (sixMonthConversion / 100) * 50000);

    const investment = 15000000; // ₩15M investment
    const sixMonthReturn = sixMonthRevenue * 6; // 6 months of revenue
    const roiPercentage = Math.round(((sixMonthReturn - investment) / investment) * 100);

    return {
      currentMetrics: {
        visitors: currentVisitors,
        conversionRate: currentConversion,
        revenue: Math.round(currentRevenue)
      },
      predictions: {
        threeMonth: {
          visitors: threeMonthVisitors,
          conversionRate: threeMonthConversion,
          revenue: threeMonthRevenue,
          improvement: Math.round(((threeMonthRevenue - currentRevenue) / currentRevenue) * 100)
        },
        sixMonth: {
          visitors: sixMonthVisitors,
          conversionRate: sixMonthConversion,
          revenue: sixMonthRevenue,
          improvement: Math.round(((sixMonthRevenue - currentRevenue) / currentRevenue) * 100)
        }
      },
      roi: {
        investment,
        return: sixMonthReturn,
        percentage: roiPercentage
      },
      confidence: 85 + Math.round(Math.random() * 10)
    };
  };

  const runAnalysis = () => {
    setIsAnalyzing(true);
    setShowResults(false);
    
    setTimeout(() => {
      const predictions = calculatePredictions();
      setPredictionData(predictions);
      setIsAnalyzing(false);
      setShowResults(true);
    }, 3000);
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-lg rounded-3xl border border-white/10 p-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">AI 성과 예측기</h3>
        <p className="text-white/70">머신러닝으로 분석하는 당신의 미래 성과</p>
      </div>

      {/* Neural Network Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
        style={{ width: '100%', height: '100%' }}
      />

      {/* Input Form */}
      <div className="relative z-10 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 현재 월 방문자 수 */}
          <div>
            <label className="block text-white/70 text-sm mb-2">현재 월 방문자 수</label>
            <div className="relative">
              <input
                type="number"
                value={currentVisitors}
                onChange={(e) => setCurrentVisitors(Number(e.target.value))}
                className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-green-500 focus:outline-none transition-colors"
                placeholder="15,000"
              />
              <div className="absolute right-3 top-3 text-white/50 text-sm">명</div>
            </div>
          </div>

          {/* 현재 전환율 */}
          <div>
            <label className="block text-white/70 text-sm mb-2">현재 전환율</label>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                value={currentConversion}
                onChange={(e) => setCurrentConversion(Number(e.target.value))}
                className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-green-500 focus:outline-none transition-colors"
                placeholder="2.5"
              />
              <div className="absolute right-3 top-3 text-white/50 text-sm">%</div>
            </div>
          </div>

          {/* 산업 분야 */}
          <div>
            <label className="block text-white/70 text-sm mb-2">산업 분야</label>
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white focus:border-green-500 focus:outline-none transition-colors"
            >
              {industries.map(industry => (
                <option key={industry.id} value={industry.id} className="bg-gray-800">
                  {industry.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Analyze Button */}
        <div className="text-center mt-6">
          <motion.button
            onClick={runAnalysis}
            disabled={isAnalyzing}
            className="px-8 py-4 bg-gradient-to-r from-green-600 to-green-500 text-white font-bold rounded-2xl hover:from-green-500 hover:to-green-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isAnalyzing ? (
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                AI 분석 중...
              </div>
            ) : (
              '성과 예측 시작'
            )}
          </motion.button>
        </div>
      </div>

      {/* Analysis Progress */}
      <AnimatePresence>
        {isAnalyzing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-black/40 rounded-2xl p-6 mb-8 border border-green-500/20"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">AI</span>
              </div>
              <div>
                <div className="text-green-400 font-semibold">머신러닝 분석 진행 중</div>
                <div className="text-white/60 text-sm">신경망이 데이터를 학습하고 있습니다...</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-white/70">데이터 수집</span>
                <span className="text-green-400">완료</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/70">패턴 인식</span>
                <span className="text-green-400">진행 중</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/70">예측 모델링</span>
                <span className="text-white/50">대기 중</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <AnimatePresence>
        {showResults && predictionData && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            {/* Confidence Score */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-full px-4 py-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 font-semibold">신뢰도 {predictionData.confidence}%</span>
              </div>
            </div>

            {/* Prediction Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 3개월 예측 */}
              <div className="bg-black/40 rounded-2xl p-6 border border-white/10">
                <h4 className="text-white font-bold text-lg mb-4 text-center">3개월 후 예상 지표</h4>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">월 방문자</span>
                    <div className="text-right">
                      <div className="text-blue-400 font-bold">{predictionData.predictions.threeMonth.visitors.toLocaleString()}명</div>
                      <div className="text-xs text-green-400">
                        +{Math.round(((predictionData.predictions.threeMonth.visitors - predictionData.currentMetrics.visitors) / predictionData.currentMetrics.visitors) * 100)}%
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-white/70">전환율</span>
                    <div className="text-right">
                      <div className="text-purple-400 font-bold">{predictionData.predictions.threeMonth.conversionRate}%</div>
                      <div className="text-xs text-green-400">
                        +{Math.round(((predictionData.predictions.threeMonth.conversionRate - predictionData.currentMetrics.conversionRate) / predictionData.currentMetrics.conversionRate) * 100)}%
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-white/70">월 매출</span>
                    <div className="text-right">
                      <div className="text-green-400 font-bold">₩{(predictionData.predictions.threeMonth.revenue / 1000000).toFixed(1)}M</div>
                      <div className="text-xs text-green-400">+{predictionData.predictions.threeMonth.improvement}%</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 6개월 예측 */}
              <div className="bg-black/40 rounded-2xl p-6 border border-white/10">
                <h4 className="text-white font-bold text-lg mb-4 text-center">6개월 후 예상 지표</h4>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">월 방문자</span>
                    <div className="text-right">
                      <div className="text-blue-400 font-bold">{predictionData.predictions.sixMonth.visitors.toLocaleString()}명</div>
                      <div className="text-xs text-green-400">
                        +{Math.round(((predictionData.predictions.sixMonth.visitors - predictionData.currentMetrics.visitors) / predictionData.currentMetrics.visitors) * 100)}%
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-white/70">전환율</span>
                    <div className="text-right">
                      <div className="text-purple-400 font-bold">{predictionData.predictions.sixMonth.conversionRate}%</div>
                      <div className="text-xs text-green-400">
                        +{Math.round(((predictionData.predictions.sixMonth.conversionRate - predictionData.currentMetrics.conversionRate) / predictionData.currentMetrics.conversionRate) * 100)}%
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-white/70">월 매출</span>
                    <div className="text-right">
                      <div className="text-green-400 font-bold">₩{(predictionData.predictions.sixMonth.revenue / 1000000).toFixed(1)}M</div>
                      <div className="text-xs text-green-400">+{predictionData.predictions.sixMonth.improvement}%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ROI Analysis */}
            <div className="bg-gradient-to-r from-green-900/40 to-blue-900/40 rounded-2xl p-6 border border-green-500/20">
              <h4 className="text-white font-bold text-xl mb-4 text-center">투자 대비 수익률 (ROI)</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-400 mb-2">₩{(predictionData.roi.investment / 1000000).toFixed(0)}M</div>
                  <div className="text-white/60 text-sm">초기 투자</div>
                </div>

                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400 mb-2">₩{(predictionData.roi.return / 1000000).toFixed(0)}M</div>
                  <div className="text-white/60 text-sm">6개월 수익</div>
                </div>

                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">{predictionData.roi.percentage}%</div>
                  <div className="text-white/60 text-sm">ROI</div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <div className="text-white font-semibold mb-2">
                  6개월 내 순수익: ₩{((predictionData.roi.return - predictionData.roi.investment) / 1000000).toFixed(0)}M
                </div>
                <div className="text-white/70 text-sm">
                  평균 투자 회수 기간: 2.3개월
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIPerformancePredictor;