'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface VideoPlayerProps {
  videoSrc: string;
  posterSrc: string;
  onTimeUpdate?: (currentTime: number) => void;
  onPlay?: () => void;
  onPause?: () => void;
}

interface PerformanceMetric {
  time: number;
  metric: string;
  value: string;
  change: string;
}

const InteractiveVideoPlayer = ({ 
  videoSrc, 
  posterSrc, 
  onTimeUpdate,
  onPlay,
  onPause 
}: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [volume, setVolume] = useState(1);
  const [showBeforeAfter, setShowBeforeAfter] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [hoveredTime, setHoveredTime] = useState<number | null>(null);

  const performanceMetrics: PerformanceMetric[] = [
    { time: 10, metric: '페이지 속도', value: '3.2s → 0.8s', change: '+75%' },
    { time: 25, metric: '전환율', value: '2.1% → 7.2%', change: '+243%' },
    { time: 40, metric: '사용자 체류', value: '1:20 → 4:35', change: '+210%' },
    { time: 55, metric: '모바일 점수', value: '67 → 98', change: '+46%' }
  ];

  const getCurrentMetric = () => {
    return performanceMetrics.find(metric => 
      Math.abs(currentTime - metric.time) < 2.5
    );
  };

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
      onPause?.();
    } else {
      videoRef.current.play();
      onPlay?.();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    
    const current = videoRef.current.currentTime;
    setCurrentTime(current);
    onTimeUpdate?.(current);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * duration;
    
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleProgressHover = (e: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const hoverX = e.clientX - rect.left;
    const percentage = hoverX / rect.width;
    const hoverTime = percentage * duration;
    setHoveredTime(hoverTime);
  };

  useEffect(() => {
    let controlsTimeout: NodeJS.Timeout;
    
    const handleMouseMove = () => {
      setShowControls(true);
      clearTimeout(controlsTimeout);
      controlsTimeout = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false);
        }
      }, 3000);
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(controlsTimeout);
    };
  }, [isPlaying]);

  return (
    <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border-2 border-transparent hover:border-green-500/30 transition-all duration-300 group">
      {/* 네온 글로우 효과 */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-transparent to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
      
      {/* 비디오 요소 */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        poster={posterSrc}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        preload="metadata"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* Before/After 슬라이더 */}
      <AnimatePresence>
        {showBeforeAfter && !isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80"
          >
            <div className="relative w-full h-full overflow-hidden">
              {/* Before 이미지 */}
              <div 
                className="absolute inset-0 bg-gray-600 flex items-center justify-center text-white"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">BEFORE</h3>
                  <div className="space-y-2 text-sm">
                    <div>로딩 시간: 3.2초</div>
                    <div>전환율: 2.1%</div>
                    <div>모바일 점수: 67/100</div>
                  </div>
                </div>
              </div>

              {/* After 이미지 */}
              <div 
                className="absolute inset-0 bg-green-600 flex items-center justify-center text-white"
                style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
              >
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">AFTER</h3>
                  <div className="space-y-2 text-sm">
                    <div>로딩 시간: 0.8초</div>
                    <div>전환율: 7.2%</div>
                    <div>모바일 점수: 98/100</div>
                  </div>
                </div>
              </div>

              {/* 슬라이더 */}
              <div 
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize flex items-center justify-center"
                style={{ left: `${sliderPosition}%` }}
                onMouseDown={(e) => {
                  const startX = e.clientX;
                  const startPosition = sliderPosition;

                  const handleMouseMove = (e: MouseEvent) => {
                    const deltaX = e.clientX - startX;
                    const containerWidth = 400; // 대략적인 컨테이너 너비
                    const deltaPercent = (deltaX / containerWidth) * 100;
                    const newPosition = Math.max(0, Math.min(100, startPosition + deltaPercent));
                    setSliderPosition(newPosition);
                  };

                  const handleMouseUp = () => {
                    document.removeEventListener('mousemove', handleMouseMove);
                    document.removeEventListener('mouseup', handleMouseUp);
                  };

                  document.addEventListener('mousemove', handleMouseMove);
                  document.addEventListener('mouseup', handleMouseUp);
                }}
              >
                <div className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                  <div className="w-3 h-3 bg-gray-400 rounded-full" />
                </div>
              </div>

              {/* 닫기 버튼 */}
              <button
                onClick={() => setShowBeforeAfter(false)}
                className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                ×
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 실시간 성과 지표 (우상단) */}
      <AnimatePresence>
        {getCurrentMetric() && isPlaying && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            className="absolute top-4 right-4 bg-black/80 backdrop-blur-lg rounded-lg p-3 border border-green-500/30"
          >
            <div className="text-green-400 text-sm font-semibold mb-1">
              {getCurrentMetric()?.metric}
            </div>
            <div className="text-white font-bold">
              {getCurrentMetric()?.value}
            </div>
            <div className="text-green-400 text-sm">
              {getCurrentMetric()?.change} ↑
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 프로젝트 정보 (좌하단) */}
      <div className="absolute bottom-20 left-4 bg-black/60 backdrop-blur-lg rounded-lg p-3 border border-white/20">
        <div className="text-white font-semibold text-sm">제조업 B2B 플랫폼</div>
        <div className="text-white/70 text-xs">3주 완성 | Next.js 14</div>
      </div>

      {/* 컨트롤 영역 */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4"
          >
            {/* 프로그레스 바 */}
            <div 
              className="relative mb-4 h-2 bg-white/20 rounded-full cursor-pointer group"
              onClick={handleSeek}
              onMouseMove={handleProgressHover}
              onMouseLeave={() => setHoveredTime(null)}
            >
              {/* 진행 바 */}
              <div 
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full transition-all duration-200 group-hover:h-3 group-hover:-mt-0.5"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />

              {/* 호버 시간 표시 */}
              {hoveredTime !== null && (
                <div 
                  className="absolute top-[-40px] bg-black/80 text-white text-xs px-2 py-1 rounded transform -translate-x-1/2"
                  style={{ left: `${(hoveredTime / duration) * 100}%` }}
                >
                  {formatTime(hoveredTime)}
                </div>
              )}
            </div>

            {/* 컨트롤 버튼들 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* 재생/일시정지 버튼 */}
                <button
                  onClick={handlePlayPause}
                  className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
                >
                  {isPlaying ? (
                    <div className="w-3 h-3 bg-white rounded-sm flex gap-1">
                      <div className="w-1 h-3 bg-white rounded-sm" />
                      <div className="w-1 h-3 bg-white rounded-sm" />
                    </div>
                  ) : (
                    <div className="w-0 h-0 border-l-4 border-l-white border-y-2 border-y-transparent ml-1" />
                  )}
                </button>

                {/* 시간 표시 */}
                <div className="text-white text-sm font-mono">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>

                {/* 볼륨 컨트롤 */}
                <div className="flex items-center gap-2">
                  <button className="text-white/70 hover:text-white">
                    {volume > 0.5 ? '🔊' : volume > 0 ? '🔉' : '🔇'}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-20 h-1 bg-white/20 rounded-full appearance-none cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Before/After 버튼 */}
                <button
                  onClick={() => {
                    setIsPlaying(false);
                    if (videoRef.current) {
                      videoRef.current.pause();
                    }
                    setShowBeforeAfter(true);
                  }}
                  className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded text-white text-sm transition-colors"
                >
                  Before/After
                </button>

                {/* 전체화면 버튼 */}
                <button className="text-white/70 hover:text-white text-xl">
                  ⛶
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 로딩 상태 */}
      {duration === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="text-white">비디오 로딩 중...</div>
        </div>
      )}
    </div>
  );
};

export default InteractiveVideoPlayer;