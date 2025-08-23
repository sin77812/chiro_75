'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IndustryData {
  name: string;
  icon: string;
  averageConversion: number;
  averageTraffic: number;
  averageRevenue: number;
  chiroConversion: number;
  chiroTraffic: number;
  chiroRevenue: number;
  color: string;
}

interface BenchmarkComparisonProps {
  isActive: boolean;
}

const BenchmarkComparison = ({ isActive }: BenchmarkComparisonProps) => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('ecommerce');
  const [animatingMetrics, setAnimatingMetrics] = useState(false);

  const industriesData: IndustryData[] = [
    {
      name: '이커머스',
      icon: '🛒',
      averageConversion: 2.86,
      averageTraffic: 15420,
      averageRevenue: 890000,
      chiroConversion: 7.2,
      chiroTraffic: 42300,
      chiroRevenue: 2430000,
      color: '#FF6B6B'
    },
    {
      name: 'SaaS',
      icon: '💻',
      averageConversion: 3.1,
      averageTraffic: 8900,
      averageRevenue: 1240000,
      chiroConversion: 8.5,
      chiroTraffic: 19800,
      chiroRevenue: 3180000,
      color: '#4ECDC4'
    },
    {
      name: '제조업',
      icon: '🏭',
      averageConversion: 1.8,
      averageTraffic: 5200,
      averageRevenue: 2100000,
      chiroConversion: 5.4,
      chiroTraffic: 14600,
      chiroRevenue: 4890000,
      color: '#45B7D1'
    },
    {
      name: '헬스케어',
      icon: '🏥',
      averageConversion: 2.4,
      averageTraffic: 6800,
      averageRevenue: 780000,
      chiroConversion: 6.8,
      chiroTraffic: 18200,
      chiroRevenue: 1980000,
      color: '#96CEB4'
    },
    {
      name: '교육',
      icon: '🎓',
      averageConversion: 1.9,
      averageTraffic: 12300,
      averageRevenue: 450000,
      chiroConversion: 5.2,
      chiroTraffic: 28900,
      chiroRevenue: 1150000,
      color: '#FFEAA7'
    },
    {
      name: '금융',
      icon: '💰',
      averageConversion: 0.8,
      averageTraffic: 9100,
      averageRevenue: 1890000,
      chiroConversion: 2.4,
      chiroTraffic: 19700,
      chiroRevenue: 4200000,
      color: '#DDA0DD'
    }
  ];

  const currentIndustry = industriesData.find(industry => 
    industry.name.toLowerCase().includes(selectedIndustry.toLowerCase())
  ) || industriesData[0];

  const calculateImprovement = (chiroValue: number, industryAvg: number) => {
    return Math.round(((chiroValue - industryAvg) / industryAvg) * 100);
  };

  const handleIndustryChange = (industryKey: string) => {
    setSelectedIndustry(industryKey);
    setAnimatingMetrics(true);
    setTimeout(() => setAnimatingMetrics(false), 1000);
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-lg rounded-3xl border border-white/10 p-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">실시간 벤치마크 비교</h3>
        <p className="text-white/70">당신의 산업을 선택하고 CHIRO의 차이를 확인하세요</p>
      </div>

      {/* 산업 선택 슬라이더 */}
      <div className="mb-12">
        <div className="text-white/60 text-sm mb-4 text-center">산업군 선택</div>
        <div className="flex flex-wrap justify-center gap-3">
          {industriesData.map((industry, index) => (
            <motion.button
              key={industry.name}
              onClick={() => handleIndustryChange(industry.name)}
              className={`flex items-center gap-2 px-4 py-3 rounded-2xl border transition-all duration-300 ${
                currentIndustry.name === industry.name
                  ? 'bg-white/20 border-white/30 text-white shadow-lg'
                  : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-xl">{industry.icon}</span>
              <span className="font-medium text-sm">{industry.name}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* 비교 차트 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndustry.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* 메트릭 비교 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 전환율 */}
            <div className="bg-black/30 rounded-2xl p-6 border border-white/10">
              <div className="text-center mb-4">
                <h4 className="text-white font-semibold mb-2">전환율</h4>
                <div className="text-sm text-white/60">업계 평균 vs CHIRO</div>
              </div>

              <div className="space-y-4">
                {/* 업계 평균 */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/70 text-sm">업계 평균</span>
                    <span className="text-white font-semibold">{currentIndustry.averageConversion}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-3">
                    <motion.div
                      className="h-3 bg-gray-500 rounded-full"
                      animate={{ width: `${(currentIndustry.averageConversion / 10) * 100}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                    />
                  </div>
                </div>

                {/* CHIRO 성과 */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-green-400 text-sm">CHIRO 고객</span>
                    <span className="text-green-400 font-bold">{currentIndustry.chiroConversion}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-3">
                    <motion.div
                      className="h-3 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"
                      animate={{ width: `${(currentIndustry.chiroConversion / 10) * 100}%` }}
                      transition={{ duration: 1, delay: 0.4 }}
                    />
                  </div>
                </div>

                {/* 개선 지표 */}
                <div className="text-center pt-2">
                  <span className="text-green-400 font-bold text-lg">
                    +{calculateImprovement(currentIndustry.chiroConversion, currentIndustry.averageConversion)}%
                  </span>
                  <div className="text-xs text-white/60">개선</div>
                </div>
              </div>
            </div>

            {/* 트래픽 */}
            <div className="bg-black/30 rounded-2xl p-6 border border-white/10">
              <div className="text-center mb-4">
                <h4 className="text-white font-semibold mb-2">월 트래픽</h4>
                <div className="text-sm text-white/60">방문자 수 비교</div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/70 text-sm">업계 평균</span>
                    <span className="text-white font-semibold">{currentIndustry.averageTraffic.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-3">
                    <motion.div
                      className="h-3 bg-gray-500 rounded-full"
                      animate={{ width: `${(currentIndustry.averageTraffic / 50000) * 100}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-blue-400 text-sm">CHIRO 고객</span>
                    <span className="text-blue-400 font-bold">{currentIndustry.chiroTraffic.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-3">
                    <motion.div
                      className="h-3 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                      animate={{ width: `${Math.min((currentIndustry.chiroTraffic / 50000) * 100, 100)}%` }}
                      transition={{ duration: 1, delay: 0.4 }}
                    />
                  </div>
                </div>

                <div className="text-center pt-2">
                  <span className="text-blue-400 font-bold text-lg">
                    +{calculateImprovement(currentIndustry.chiroTraffic, currentIndustry.averageTraffic)}%
                  </span>
                  <div className="text-xs text-white/60">증가</div>
                </div>
              </div>
            </div>

            {/* 매출 */}
            <div className="bg-black/30 rounded-2xl p-6 border border-white/10">
              <div className="text-center mb-4">
                <h4 className="text-white font-semibold mb-2">연간 매출</h4>
                <div className="text-sm text-white/60">매출 성장 비교</div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/70 text-sm">업계 평균</span>
                    <span className="text-white font-semibold">
                      ₩{(currentIndustry.averageRevenue / 1000000).toFixed(1)}M
                    </span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-3">
                    <motion.div
                      className="h-3 bg-gray-500 rounded-full"
                      animate={{ width: `${(currentIndustry.averageRevenue / 5000000) * 100}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-purple-400 text-sm">CHIRO 고객</span>
                    <span className="text-purple-400 font-bold">
                      ₩{(currentIndustry.chiroRevenue / 1000000).toFixed(1)}M
                    </span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-3">
                    <motion.div
                      className="h-3 bg-gradient-to-r from-purple-500 to-pink-400 rounded-full"
                      animate={{ width: `${Math.min((currentIndustry.chiroRevenue / 5000000) * 100, 100)}%` }}
                      transition={{ duration: 1, delay: 0.4 }}
                    />
                  </div>
                </div>

                <div className="text-center pt-2">
                  <span className="text-purple-400 font-bold text-lg">
                    +{calculateImprovement(currentIndustry.chiroRevenue, currentIndustry.averageRevenue)}%
                  </span>
                  <div className="text-xs text-white/60">성장</div>
                </div>
              </div>
            </div>
          </div>

          {/* 예상 성과 메시지 */}
          <motion.div
            className="bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-2xl p-6 border border-green-500/20 text-center"
            animate={{ scale: animatingMetrics ? [1, 1.02, 1] : 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-2xl mb-2">🚀</div>
            <div className="text-xl font-bold text-white mb-2">
              당신도 평균 +{Math.round((
                calculateImprovement(currentIndustry.chiroConversion, currentIndustry.averageConversion) +
                calculateImprovement(currentIndustry.chiroTraffic, currentIndustry.averageTraffic) +
                calculateImprovement(currentIndustry.chiroRevenue, currentIndustry.averageRevenue)
              ) / 3)}% 성장 가능!
            </div>
            <div className="text-white/70 text-sm">
              {currentIndustry.name} 업계에서 CHIRO와 함께한 기업들의 평균 성과입니다
            </div>
          </motion.div>

          {/* 상세 분석 차트 */}
          <div className="bg-black/20 rounded-2xl p-6 border border-white/5">
            <h4 className="text-white font-semibold mb-4 text-center">월별 성장 트렌드</h4>
            <div className="h-32 flex items-end justify-center gap-2">
              {Array.from({length: 12}, (_, i) => {
                const height = 20 + (Math.sin(i * 0.5) + 1) * 40;
                return (
                  <motion.div
                    key={i}
                    className="bg-gradient-to-t from-green-500 to-blue-500 rounded-t"
                    style={{ width: '6%' }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                  />
                );
              })}
            </div>
            <div className="flex justify-between mt-2 text-xs text-white/40">
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(month => (
                <span key={month}>{month}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default BenchmarkComparison;