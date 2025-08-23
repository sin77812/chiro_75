'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SimulationData {
  timeline: {
    month: number;
    visitors: number;
    conversion: number;
    revenue: number;
    growth: number;
  }[];
  totalROI: number;
  breakEvenMonth: number;
  projectedAnnualRevenue: number;
}

interface GrowthSimulatorProps {
  isActive: boolean;
}

const GrowthSimulator = ({ isActive }: GrowthSimulatorProps) => {
  const [budget, setBudget] = useState(10000000); // ₩10M
  const [industry, setIndustry] = useState('ecommerce');
  const [targetGrowth, setTargetGrowth] = useState(200); // 200%
  const [simulationData, setSimulationData] = useState<SimulationData | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [playingMonth, setPlayingMonth] = useState(0);
  const chartRef = useRef<HTMLCanvasElement>(null);

  const industries = [
    { id: 'ecommerce', name: '이커머스', baseConversion: 2.5, growthMultiplier: 1.2 },
    { id: 'saas', name: 'SaaS', baseConversion: 3.1, growthMultiplier: 1.4 },
    { id: 'manufacturing', name: '제조업', baseConversion: 1.8, growthMultiplier: 1.1 },
    { id: 'healthcare', name: '헬스케어', baseConversion: 2.4, growthMultiplier: 1.3 },
    { id: 'finance', name: '금융', baseConversion: 0.8, growthMultiplier: 1.5 }
  ];

  // Chart Drawing
  useEffect(() => {
    if (!chartRef.current || !simulationData || !isActive) return;

    const canvas = chartRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    canvas.width = width * 2;
    canvas.height = height * 2;
    ctx.scale(2, 2);

    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    ctx.clearRect(0, 0, width, height);

    // Background gradient
    const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
    bgGradient.addColorStop(0, 'rgba(46, 125, 50, 0.1)');
    bgGradient.addColorStop(1, 'rgba(46, 125, 50, 0.05)');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    // Grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 12; i++) {
      const x = padding + (i / 12) * chartWidth;
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, height - padding);
      ctx.stroke();
    }

    for (let i = 0; i <= 5; i++) {
      const y = padding + (i / 5) * chartHeight;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    // Data lines
    const maxRevenue = Math.max(...simulationData.timeline.map(d => d.revenue));
    
    // Revenue line
    ctx.strokeStyle = '#4CAF50';
    ctx.lineWidth = 3;
    ctx.beginPath();
    simulationData.timeline.forEach((data, index) => {
      const x = padding + (index / 11) * chartWidth;
      const y = height - padding - (data.revenue / maxRevenue) * chartHeight;
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // Visitors line
    const maxVisitors = Math.max(...simulationData.timeline.map(d => d.visitors));
    ctx.strokeStyle = '#2196F3';
    ctx.lineWidth = 2;
    ctx.beginPath();
    simulationData.timeline.forEach((data, index) => {
      const x = padding + (index / 11) * chartWidth;
      const y = height - padding - (data.visitors / maxVisitors) * chartHeight * 0.6;
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // Animated progress indicator
    if (playingMonth > 0) {
      const currentX = padding + ((playingMonth - 1) / 11) * chartWidth;
      ctx.strokeStyle = '#FF9800';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(currentX, padding);
      ctx.lineTo(currentX, height - padding);
      ctx.stroke();

      // Glowing effect
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#FF9800';
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    // Labels
    ctx.fillStyle = '#ffffff';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    
    // X-axis labels
    for (let i = 0; i <= 12; i++) {
      const x = padding + (i / 12) * chartWidth;
      ctx.fillText(`${i}M`, x, height - 10);
    }

  }, [simulationData, playingMonth, isActive]);

  const runSimulation = () => {
    setIsSimulating(true);
    setPlayingMonth(0);

    setTimeout(() => {
      const selectedIndustry = industries.find(i => i.id === industry) || industries[0];
      const baseVisitors = Math.round(budget * 0.002); // Budget-based visitor calculation
      const timeline: {
        month: number;
        visitors: number;
        conversion: number;
        revenue: number;
        growth: number;
      }[] = [];

      for (let month = 1; month <= 12; month++) {
        const growthFactor = 1 + (targetGrowth / 100) * (month / 12);
        const visitors = Math.round(baseVisitors * growthFactor * selectedIndustry.growthMultiplier);
        const conversion = Math.min(selectedIndustry.baseConversion * growthFactor * 0.8, 10);
        const revenue = Math.round(visitors * (conversion / 100) * 50000); // ₩50K per conversion
        const growth = month === 1 ? 0 : Math.round(((revenue - timeline[timeline.length - 1]?.revenue) / timeline[timeline.length - 1]?.revenue) * 100);

        timeline.push({
          month,
          visitors,
          conversion: Math.round(conversion * 10) / 10,
          revenue,
          growth
        });
      }

      const totalRevenue = timeline.reduce((sum, month) => sum + month.revenue, 0);
      const totalROI = Math.round(((totalRevenue - budget) / budget) * 100);
      const breakEvenMonth = timeline.findIndex(month => {
        const cumulativeRevenue = timeline.slice(0, month.month).reduce((sum, m) => sum + m.revenue, 0);
        return cumulativeRevenue >= budget;
      }) + 1;

      setSimulationData({
        timeline,
        totalROI,
        breakEvenMonth: breakEvenMonth || 12,
        projectedAnnualRevenue: totalRevenue
      });

      setIsSimulating(false);
      
      // Auto-play timeline
      let currentMonth = 1;
      const playInterval = setInterval(() => {
        setPlayingMonth(currentMonth);
        currentMonth++;
        if (currentMonth > 12) {
          clearInterval(playInterval);
          setPlayingMonth(0);
        }
      }, 500);

    }, 2000);
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-lg rounded-3xl border border-white/10 p-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">성장 시뮬레이터</h3>
        <p className="text-white/70">12개월 성장 시나리오를 시각화로 확인하세요</p>
      </div>

      {/* Input Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Budget Slider */}
        <div>
          <label className="block text-white/70 text-sm mb-2">마케팅 예산</label>
          <div className="space-y-3">
            <input
              type="range"
              min="5000000"
              max="50000000"
              step="1000000"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="text-center">
              <span className="text-green-400 font-bold text-lg">
                ₩{(budget / 1000000).toFixed(0)}M
              </span>
            </div>
          </div>
        </div>

        {/* Industry Selection */}
        <div>
          <label className="block text-white/70 text-sm mb-2">업계 선택</label>
          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white focus:border-green-500 focus:outline-none transition-colors"
          >
            {industries.map(ind => (
              <option key={ind.id} value={ind.id} className="bg-gray-800">
                {ind.name}
              </option>
            ))}
          </select>
        </div>

        {/* Target Growth */}
        <div>
          <label className="block text-white/70 text-sm mb-2">목표 성장률</label>
          <div className="space-y-3">
            <input
              type="range"
              min="100"
              max="500"
              step="50"
              value={targetGrowth}
              onChange={(e) => setTargetGrowth(Number(e.target.value))}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="text-center">
              <span className="text-blue-400 font-bold text-lg">
                {targetGrowth}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Simulate Button */}
      <div className="text-center mb-8">
        <motion.button
          onClick={runSimulation}
          disabled={isSimulating}
          className="px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold rounded-2xl hover:from-green-500 hover:to-blue-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isSimulating ? (
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              시뮬레이션 실행 중...
            </div>
          ) : (
            '성장 시뮬레이션 시작'
          )}
        </motion.button>
      </div>

      {/* Results */}
      <AnimatePresence>
        {simulationData && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-black/40 rounded-2xl p-4 border border-white/10 text-center">
                <div className="text-2xl font-bold text-green-400 mb-1">
                  {simulationData.totalROI}%
                </div>
                <div className="text-white/70 text-sm">총 ROI</div>
              </div>
              
              <div className="bg-black/40 rounded-2xl p-4 border border-white/10 text-center">
                <div className="text-2xl font-bold text-blue-400 mb-1">
                  {simulationData.breakEvenMonth}개월
                </div>
                <div className="text-white/70 text-sm">손익분기점</div>
              </div>
              
              <div className="bg-black/40 rounded-2xl p-4 border border-white/10 text-center">
                <div className="text-2xl font-bold text-purple-400 mb-1">
                  ₩{(simulationData.projectedAnnualRevenue / 100000000).toFixed(1)}억
                </div>
                <div className="text-white/70 text-sm">연간 예상 매출</div>
              </div>

              <div className="bg-black/40 rounded-2xl p-4 border border-white/10 text-center">
                <div className="text-2xl font-bold text-orange-400 mb-1">
                  {simulationData.timeline[11].visitors.toLocaleString()}
                </div>
                <div className="text-white/70 text-sm">12개월 후 월 방문자</div>
              </div>
            </div>

            {/* Growth Chart */}
            <div className="bg-black/40 rounded-2xl p-6 border border-white/10">
              <h4 className="text-white font-bold text-lg mb-4">성장 차트</h4>
              <div className="relative">
                <canvas
                  ref={chartRef}
                  className="w-full h-64 rounded-lg"
                  style={{ width: '100%', height: '256px' }}
                />
                
                {/* Chart Legend */}
                <div className="flex justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-white/70 text-sm">매출</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-white/70 text-sm">방문자</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline Details */}
            <div className="bg-black/40 rounded-2xl p-6 border border-white/10">
              <h4 className="text-white font-bold text-lg mb-4">월별 상세 데이터</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-white/70 text-left py-2">월</th>
                      <th className="text-white/70 text-right py-2">방문자</th>
                      <th className="text-white/70 text-right py-2">전환율</th>
                      <th className="text-white/70 text-right py-2">매출</th>
                      <th className="text-white/70 text-right py-2">성장률</th>
                    </tr>
                  </thead>
                  <tbody>
                    {simulationData.timeline.map((data, index) => (
                      <motion.tr
                        key={data.month}
                        className={`border-b border-white/5 ${playingMonth === data.month ? 'bg-orange-500/10' : ''}`}
                        initial={{ opacity: 0.5 }}
                        animate={{ opacity: playingMonth === data.month ? 1 : 0.7 }}
                      >
                        <td className="text-white py-3">{data.month}개월</td>
                        <td className="text-blue-400 text-right py-3">{data.visitors.toLocaleString()}</td>
                        <td className="text-purple-400 text-right py-3">{data.conversion}%</td>
                        <td className="text-green-400 text-right py-3">₩{(data.revenue / 1000000).toFixed(1)}M</td>
                        <td className="text-orange-400 text-right py-3">
                          {data.growth > 0 ? '+' : ''}{data.growth}%
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom slider styles */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #4CAF50;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 0 10px rgba(76, 175, 80, 0.5);
        }

        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #4CAF50;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 0 10px rgba(76, 175, 80, 0.5);
        }
      `}</style>
    </div>
  );
};

export default GrowthSimulator;