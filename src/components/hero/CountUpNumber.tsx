'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface CountUpNumberProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

const CountUpNumber = ({ 
  end, 
  duration = 2, 
  prefix = '', 
  suffix = '',
  decimals = 0 
}: CountUpNumberProps) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  const countRef = useRef(0);
  const rafRef = useRef<number>();

  useEffect(() => {
    if (!inView) return;

    const startTime = performance.now();
    const startValue = 0;
    const endValue = end;

    const updateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      
      // Easing function for smoother animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = startValue + (endValue - startValue) * easeOutQuart;
      
      countRef.current = currentValue;
      setCount(currentValue);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(updateCount);
      } else {
        setCount(endValue);
      }
    };

    rafRef.current = requestAnimationFrame(updateCount);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [inView, end, duration]);

  const formatNumber = (num: number) => {
    if (decimals > 0) {
      return num.toFixed(decimals);
    }
    return Math.floor(num).toString();
  };

  return (
    <span ref={ref}>
      {prefix}{formatNumber(count)}{suffix}
    </span>
  );
};

export default CountUpNumber;