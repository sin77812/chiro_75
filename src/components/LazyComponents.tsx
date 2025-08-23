'use client';

import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';

// 로딩 스켈레톤 컴포넌트들
const SectionSkeleton = ({ height = '500px' }: { height?: string }) => (
  <div className="relative w-full overflow-hidden" style={{ height }}>
    <div className="absolute inset-0 bg-gradient-to-r from-gray-900/50 via-gray-800/50 to-gray-900/50">
      <div className="animate-pulse space-y-4 p-8">
        <div className="h-8 bg-gray-700/50 rounded-lg w-3/4 mx-auto"></div>
        <div className="h-4 bg-gray-700/30 rounded w-1/2 mx-auto"></div>
        <div className="h-64 bg-gray-700/20 rounded-xl mx-auto mt-8"></div>
      </div>
    </div>
  </div>
);

const CubeSkeleton = () => (
  <div className="relative w-full h-[600px] bg-gradient-to-br from-gray-900/30 to-black/50 rounded-2xl">
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="grid grid-cols-2 gap-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={i}
            className="w-24 h-24 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-lg"
            animate={{ 
              rotateY: [0, 180, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2 
            }}
          />
        ))}
      </div>
    </div>
    <div className="absolute bottom-4 left-4 text-white/40 text-sm">
      3D 큐브 로딩중...
    </div>
  </div>
);

const ChartSkeleton = () => (
  <div className="bg-black/40 backdrop-blur-lg rounded-3xl border border-white/10 p-8">
    <div className="animate-pulse space-y-6">
      <div className="h-6 bg-gray-700/50 rounded w-1/3 mx-auto"></div>
      <div className="h-4 bg-gray-700/30 rounded w-2/3 mx-auto"></div>
      <div className="grid grid-cols-3 gap-4 mt-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-16 bg-gradient-to-t from-green-500/20 to-transparent rounded"></div>
            <div className="h-3 bg-gray-700/30 rounded w-full"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Lazy 컴포넌트 정의
export const LazyLiveDashboard = lazy(() => 
  import('./sections/LiveDashboard').then(module => ({
    default: module.default
  }))
);

export const LazyProcessDifferentiation = lazy(() => 
  import('./sections/ProcessDifferentiation').then(module => ({
    default: module.default
  }))
);

export const LazyVideoShowcase = lazy(() => 
  import('./sections/VideoShowcase').then(module => ({
    default: module.default
  }))
);

export const LazyPerformanceDashboard = lazy(() => 
  import('./sections/PerformanceDashboard').then(module => ({
    default: module.default
  }))
);

export const LazyDataCube = lazy(() => 
  import('./dashboard/DataCube').then(module => ({
    default: module.default
  }))
);

export const LazyWebsiteAnalyzer = lazy(() => 
  import('./dashboard/WebsiteAnalyzer').then(module => ({
    default: module.default
  }))
);

export const LazyProcessCube = lazy(() => 
  import('./process/ProcessCube').then(module => ({
    default: module.default
  }))
);

// Suspense Wrapper 컴포넌트들
export const SuspenseLiveDashboard = () => (
  <Suspense fallback={<SectionSkeleton height="100vh" />}>
    <LazyLiveDashboard />
  </Suspense>
);

export const SuspenseProcessDifferentiation = () => (
  <Suspense fallback={<SectionSkeleton height="100vh" />}>
    <LazyProcessDifferentiation />
  </Suspense>
);

export const SuspenseVideoShowcase = () => (
  <Suspense fallback={<SectionSkeleton height="100vh" />}>
    <LazyVideoShowcase />
  </Suspense>
);

export const SuspensePerformanceDashboard = () => (
  <Suspense fallback={<SectionSkeleton height="100vh" />}>
    <LazyPerformanceDashboard />
  </Suspense>
);

export const SuspenseDataCube = (props: any) => (
  <Suspense fallback={<CubeSkeleton />}>
    <LazyDataCube {...props} />
  </Suspense>
);

export const SuspenseWebsiteAnalyzer = (props: any) => (
  <Suspense fallback={<ChartSkeleton />}>
    <LazyWebsiteAnalyzer {...props} />
  </Suspense>
);

export const SuspenseProcessCube = (props: any) => (
  <Suspense fallback={<CubeSkeleton />}>
    <LazyProcessCube {...props} />
  </Suspense>
);