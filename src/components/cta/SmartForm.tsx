'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FormData {
  // Step 1: Basic Info
  name: string;
  email: string;
  phone: string;
  company: string;
  
  // Step 2: Project Details
  projectType: string;
  budget: string;
  timeline: string;
  currentWebsite: string;
  
  // Step 3: Goals & Expectations
  primaryGoal: string;
  targetMetrics: string[];
  specialRequirements: string;
}

interface SmartFormProps {
  onComplete: (data: FormData) => void;
}

const SmartForm = ({ onComplete }: SmartFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    currentWebsite: '',
    primaryGoal: '',
    targetMetrics: [],
    specialRequirements: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{[key: string]: string}>({});

  const projectTypes = [
    { id: 'new-website', name: '새로운 웹사이트 제작', icon: '🌟' },
    { id: 'redesign', name: '기존 사이트 리디자인', icon: '🎨' },
    { id: 'ecommerce', name: '이커머스 구축', icon: '🛒' },
    { id: 'optimization', name: '성능 최적화', icon: '⚡' },
    { id: 'mobile-app', name: '모바일 앱 개발', icon: '📱' },
    { id: 'consulting', name: '전략 컨설팅', icon: '💡' }
  ];

  const budgetRanges = [
    { id: 'under-10m', name: '1천만원 미만', range: '5M - 10M' },
    { id: '10m-30m', name: '1천만원 - 3천만원', range: '10M - 30M' },
    { id: '30m-50m', name: '3천만원 - 5천만원', range: '30M - 50M' },
    { id: '50m-100m', name: '5천만원 - 1억원', range: '50M - 100M' },
    { id: 'over-100m', name: '1억원 이상', range: '100M+' },
    { id: 'flexible', name: '유연하게 상의', range: 'Flexible' }
  ];

  const timelines = [
    { id: 'urgent', name: '2주 이내 (긴급)', icon: '🚨' },
    { id: 'standard', name: '1개월 이내 (표준)', icon: '⏰' },
    { id: 'flexible', name: '2-3개월 (여유)', icon: '📅' },
    { id: 'planning', name: '계획 단계', icon: '📋' }
  ];

  const primaryGoals = [
    { id: 'sales', name: '매출 증대', icon: '💰' },
    { id: 'brand', name: '브랜드 강화', icon: '🏆' },
    { id: 'leads', name: '리드 생성', icon: '📈' },
    { id: 'efficiency', name: '운영 효율성', icon: '⚙️' },
    { id: 'expansion', name: '시장 확장', icon: '🌍' },
    { id: 'modernization', name: '디지털 혁신', icon: '🚀' }
  ];

  const targetMetricsOptions = [
    { id: 'traffic', name: '트래픽 증가', icon: '👥' },
    { id: 'conversion', name: '전환율 향상', icon: '🎯' },
    { id: 'engagement', name: '사용자 참여', icon: '❤️' },
    { id: 'speed', name: '페이지 속도', icon: '⚡' },
    { id: 'mobile', name: '모바일 최적화', icon: '📱' },
    { id: 'seo', name: 'SEO 개선', icon: '🔍' }
  ];

  const validateStep = (step: number): boolean => {
    const errors: {[key: string]: string} = {};

    if (step === 1) {
      if (!formData.name.trim()) errors.name = '이름을 입력해주세요';
      if (!formData.email.trim()) errors.email = '이메일을 입력해주세요';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = '올바른 이메일 형식이 아닙니다';
      if (!formData.phone.trim()) errors.phone = '연락처를 입력해주세요';
      if (!formData.company.trim()) errors.company = '회사명을 입력해주세요';
    } else if (step === 2) {
      if (!formData.projectType) errors.projectType = '프로젝트 유형을 선택해주세요';
      if (!formData.budget) errors.budget = '예산을 선택해주세요';
      if (!formData.timeline) errors.timeline = '일정을 선택해주세요';
    } else if (step === 3) {
      if (!formData.primaryGoal) errors.primaryGoal = '주요 목표를 선택해주세요';
      if (formData.targetMetrics.length === 0) errors.targetMetrics = '최소 1개의 지표를 선택해주세요';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setShowSuccess(true);
    onComplete(formData);
  };

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear field error when user starts typing/selecting
    if (fieldErrors[field]) {
      setFieldErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const toggleMetric = (metricId: string) => {
    setFormData(prev => ({
      ...prev,
      targetMetrics: prev.targetMetrics.includes(metricId)
        ? prev.targetMetrics.filter(id => id !== metricId)
        : [...prev.targetMetrics, metricId]
    }));
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-lg rounded-3xl border border-white/10 p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">스마트 프로젝트 신청</h3>
        <p className="text-white/70">3단계로 완료하는 맞춤형 제안서 신청</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-center mb-4">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${
                step <= currentStep ? 'bg-green-500 text-white' : 'bg-white/20 text-white/50'
              }`}>
                {step}
              </div>
              {step < 3 && (
                <div className={`w-20 h-1 mx-2 transition-colors ${
                  step < currentStep ? 'bg-green-500' : 'bg-white/20'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-8 text-sm">
          <span className={currentStep >= 1 ? 'text-green-400' : 'text-white/50'}>기본 정보</span>
          <span className={currentStep >= 2 ? 'text-green-400' : 'text-white/50'}>프로젝트 상세</span>
          <span className={currentStep >= 3 ? 'text-green-400' : 'text-white/50'}>목표 설정</span>
        </div>
      </div>

      {/* Form Content */}
      <AnimatePresence mode="wait">
        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white/70 text-sm mb-2">이름 *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                  className={`w-full bg-black/40 border rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none transition-colors ${
                    fieldErrors.name ? 'border-red-500 focus:border-red-500' : 'border-white/20 focus:border-green-500'
                  }`}
                  placeholder="홍길동"
                />
                {fieldErrors.name && <p className="text-red-400 text-sm mt-1">{fieldErrors.name}</p>}
              </div>

              <div>
                <label className="block text-white/70 text-sm mb-2">이메일 *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  className={`w-full bg-black/40 border rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none transition-colors ${
                    fieldErrors.email ? 'border-red-500 focus:border-red-500' : 'border-white/20 focus:border-green-500'
                  }`}
                  placeholder="example@company.com"
                />
                {fieldErrors.email && <p className="text-red-400 text-sm mt-1">{fieldErrors.email}</p>}
              </div>

              <div>
                <label className="block text-white/70 text-sm mb-2">연락처 *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                  className={`w-full bg-black/40 border rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none transition-colors ${
                    fieldErrors.phone ? 'border-red-500 focus:border-red-500' : 'border-white/20 focus:border-green-500'
                  }`}
                  placeholder="010-1234-5678"
                />
                {fieldErrors.phone && <p className="text-red-400 text-sm mt-1">{fieldErrors.phone}</p>}
              </div>

              <div>
                <label className="block text-white/70 text-sm mb-2">회사명 *</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => updateFormData('company', e.target.value)}
                  className={`w-full bg-black/40 border rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none transition-colors ${
                    fieldErrors.company ? 'border-red-500 focus:border-red-500' : 'border-white/20 focus:border-green-500'
                  }`}
                  placeholder="회사명을 입력하세요"
                />
                {fieldErrors.company && <p className="text-red-400 text-sm mt-1">{fieldErrors.company}</p>}
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 2: Project Details */}
        {currentStep === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-8"
          >
            {/* Project Type */}
            <div>
              <label className="block text-white/70 text-sm mb-4">프로젝트 유형 *</label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projectTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => updateFormData('projectType', type.id)}
                    className={`p-4 rounded-2xl border transition-all duration-300 text-left ${
                      formData.projectType === type.id
                        ? 'bg-green-500/20 border-green-500/50 text-white'
                        : 'bg-black/40 border-white/10 text-white/70 hover:bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="text-2xl mb-2">{type.icon}</div>
                    <div className="font-semibold">{type.name}</div>
                  </button>
                ))}
              </div>
              {fieldErrors.projectType && <p className="text-red-400 text-sm mt-2">{fieldErrors.projectType}</p>}
            </div>

            {/* Budget */}
            <div>
              <label className="block text-white/70 text-sm mb-4">예산 범위 *</label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {budgetRanges.map((budget) => (
                  <button
                    key={budget.id}
                    onClick={() => updateFormData('budget', budget.id)}
                    className={`p-4 rounded-2xl border transition-all duration-300 text-left ${
                      formData.budget === budget.id
                        ? 'bg-green-500/20 border-green-500/50 text-white'
                        : 'bg-black/40 border-white/10 text-white/70 hover:bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="font-semibold">{budget.name}</div>
                    <div className="text-sm text-white/50 mt-1">₩{budget.range}</div>
                  </button>
                ))}
              </div>
              {fieldErrors.budget && <p className="text-red-400 text-sm mt-2">{fieldErrors.budget}</p>}
            </div>

            {/* Timeline */}
            <div>
              <label className="block text-white/70 text-sm mb-4">희망 일정 *</label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {timelines.map((timeline) => (
                  <button
                    key={timeline.id}
                    onClick={() => updateFormData('timeline', timeline.id)}
                    className={`p-4 rounded-2xl border transition-all duration-300 text-center ${
                      formData.timeline === timeline.id
                        ? 'bg-green-500/20 border-green-500/50 text-white'
                        : 'bg-black/40 border-white/10 text-white/70 hover:bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="text-2xl mb-2">{timeline.icon}</div>
                    <div className="font-semibold text-sm">{timeline.name}</div>
                  </button>
                ))}
              </div>
              {fieldErrors.timeline && <p className="text-red-400 text-sm mt-2">{fieldErrors.timeline}</p>}
            </div>

            {/* Current Website */}
            <div>
              <label className="block text-white/70 text-sm mb-2">현재 웹사이트 URL (선택)</label>
              <input
                type="url"
                value={formData.currentWebsite}
                onChange={(e) => updateFormData('currentWebsite', e.target.value)}
                className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-green-500 focus:outline-none transition-colors"
                placeholder="https://example.com"
              />
              <p className="text-white/50 text-xs mt-1">기존 사이트가 있다면 분석에 도움됩니다</p>
            </div>
          </motion.div>
        )}

        {/* Step 3: Goals & Expectations */}
        {currentStep === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-8"
          >
            {/* Primary Goal */}
            <div>
              <label className="block text-white/70 text-sm mb-4">주요 목표 *</label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {primaryGoals.map((goal) => (
                  <button
                    key={goal.id}
                    onClick={() => updateFormData('primaryGoal', goal.id)}
                    className={`p-4 rounded-2xl border transition-all duration-300 text-center ${
                      formData.primaryGoal === goal.id
                        ? 'bg-green-500/20 border-green-500/50 text-white'
                        : 'bg-black/40 border-white/10 text-white/70 hover:bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="text-2xl mb-2">{goal.icon}</div>
                    <div className="font-semibold">{goal.name}</div>
                  </button>
                ))}
              </div>
              {fieldErrors.primaryGoal && <p className="text-red-400 text-sm mt-2">{fieldErrors.primaryGoal}</p>}
            </div>

            {/* Target Metrics */}
            <div>
              <label className="block text-white/70 text-sm mb-4">개선하고 싶은 지표 * (복수선택 가능)</label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {targetMetricsOptions.map((metric) => (
                  <button
                    key={metric.id}
                    onClick={() => toggleMetric(metric.id)}
                    className={`p-4 rounded-2xl border transition-all duration-300 text-center ${
                      formData.targetMetrics.includes(metric.id)
                        ? 'bg-green-500/20 border-green-500/50 text-white'
                        : 'bg-black/40 border-white/10 text-white/70 hover:bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="text-2xl mb-2">{metric.icon}</div>
                    <div className="font-semibold">{metric.name}</div>
                  </button>
                ))}
              </div>
              {fieldErrors.targetMetrics && <p className="text-red-400 text-sm mt-2">{fieldErrors.targetMetrics}</p>}
            </div>

            {/* Special Requirements */}
            <div>
              <label className="block text-white/70 text-sm mb-2">특별 요구사항 (선택)</label>
              <textarea
                value={formData.specialRequirements}
                onChange={(e) => updateFormData('specialRequirements', e.target.value)}
                rows={4}
                className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-green-500 focus:outline-none transition-colors resize-none"
                placeholder="추가로 고려해야 할 특별한 요구사항이나 질문이 있다면 자유롭게 작성해주세요..."
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        {currentStep > 1 && (
          <motion.button
            onClick={prevStep}
            className="px-6 py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            이전 단계
          </motion.button>
        )}

        <div className="ml-auto">
          {currentStep < 3 ? (
            <motion.button
              onClick={nextStep}
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold rounded-xl hover:from-green-500 hover:to-green-400 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              다음 단계
            </motion.button>
          ) : (
            <motion.button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold rounded-xl hover:from-green-500 hover:to-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  제출 중...
                </div>
              ) : (
                '제안서 신청하기'
              )}
            </motion.button>
          )}
        </div>
      </div>

      {/* Success Message */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-lg rounded-3xl flex items-center justify-center"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="text-white font-bold text-xl mb-2">신청이 완료되었습니다!</h4>
              <p className="text-white/70">24시간 내에 맞춤형 제안서를 보내드립니다.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SmartForm;