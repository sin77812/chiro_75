'use client';

import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
  color?: string;
}

// CHIRO 브랜드 색상
const BRAND_COLORS = {
  green: '#2E7D32',        // 메인 그린
  darkGreen: '#1B5E20',    // 다크 그린  
  lightGreen: '#4CAF50',   // 라이트 그린
  accent: '#388E3C',       // 액센트 그린
  black: '#000000',
  white: '#FFFFFF',
  gray: '#424242'
};

export const TrendingUpIcon = ({ size = 24, className = '', color = BRAND_COLORS.green }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M7 14l3-3 3 3 5-5" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 8l3 0 0 3" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const TrendingDownIcon = ({ size = 24, className = '', color = BRAND_COLORS.green }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M7 10l3 3 3-3 5 5" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 16l3 0 0-3" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ZapIcon = ({ size = 24, className = '', color = BRAND_COLORS.green }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill={color}/>
  </svg>
);

export const DiamondIcon = ({ size = 24, className = '', color = BRAND_COLORS.green }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M6 3h12l4 6-10 12L2 9l4-6z" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 3l6 6 6-6" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 9h20" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const RocketIcon = ({ size = 24, className = '', color = BRAND_COLORS.green }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" fill={color}/>
    <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" fill={color}/>
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" fill={color}/>
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" fill={color}/>
  </svg>
);

export const BarChartIcon = ({ size = 24, className = '', color = BRAND_COLORS.green }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke={color} strokeWidth="2" fill="none"/>
    <rect x="7" y="16" width="2" height="4" fill={color}/>
    <rect x="11" y="12" width="2" height="8" fill={color}/>
    <rect x="15" y="8" width="2" height="12" fill={color}/>
  </svg>
);

export const TrophyIcon = ({ size = 24, className = '', color = BRAND_COLORS.green }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18 20H6" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 20h4" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 9a4 4 0 0 0 8 0V6a4 4 0 0 0-8 0v3z" fill={color}/>
  </svg>
);

export const RobotIcon = ({ size = 24, className = '', color = BRAND_COLORS.green }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="11" width="18" height="10" rx="2" ry="2" stroke={color} strokeWidth="2" fill="none"/>
    <circle cx="12" cy="5" r="2" stroke={color} strokeWidth="2" fill="none"/>
    <path d="M12 7v4" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="8" cy="16" r="1" fill={color}/>
    <circle cx="16" cy="16" r="1" fill={color}/>
  </svg>
);

export const MessageCircleIcon = ({ size = 24, className = '', color = BRAND_COLORS.green }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke={color} strokeWidth="2" fill="none"/>
  </svg>
);

export const RefreshIcon = ({ size = 24, className = '', color = BRAND_COLORS.green }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M23 4v6h-6" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const GlobeIcon = ({ size = 24, className = '', color = BRAND_COLORS.green }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" fill="none"/>
    <path d="M2 12h20" stroke={color} strokeWidth="2" fill="none"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke={color} strokeWidth="2" fill="none"/>
  </svg>
);

export const ShieldIcon = ({ size = 24, className = '', color = BRAND_COLORS.green }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke={color} strokeWidth="2" fill="none"/>
    <path d="M9 12l2 2 4-4" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ShoppingCartIcon = ({ size = 24, className = '', color = BRAND_COLORS.green }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="9" cy="21" r="1" fill={color}/>
    <circle cx="20" cy="21" r="1" fill={color}/>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const LaptopIcon = ({ size = 24, className = '', color = BRAND_COLORS.green }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="4" y="3" width="16" height="12" rx="2" ry="2" stroke={color} strokeWidth="2" fill="none"/>
    <path d="M2 18h20" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const FactoryIcon = ({ size = 24, className = '', color = BRAND_COLORS.green }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V9l-5 4V6l-6 4v10z" fill={color}/>
    <path d="M17 18h1M6 18h1M12 18h1" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
  </svg>
);

export const HeartIcon = ({ size = 24, className = '', color = BRAND_COLORS.green }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill={color}/>
  </svg>
);

export const GraduationCapIcon = ({ size = 24, className = '', color = BRAND_COLORS.green }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M22 10v6M6 12v7c0 1 4 2 6 2s6-1 6-2v-7" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 9l10-4 10 4-10 4z" fill={color}/>
  </svg>
);

export const DollarSignIcon = ({ size = 24, className = '', color = BRAND_COLORS.green }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 1v22" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const TargetIcon = ({ size = 24, className = '', color = BRAND_COLORS.green }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" fill="none"/>
    <circle cx="12" cy="12" r="6" stroke={color} strokeWidth="2" fill="none"/>
    <circle cx="12" cy="12" r="2" fill={color}/>
  </svg>
);

export const SmartphoneIcon = ({ size = 24, className = '', color = BRAND_COLORS.green }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" stroke={color} strokeWidth="2" fill="none"/>
    <path d="M12 18h0" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const BulbIcon = ({ size = 24, className = '', color = BRAND_COLORS.green }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M9 21h6" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 17H8a4 4 0 0 1-1-7.89 5.7 5.7 0 0 1 10 0A4 4 0 0 1 16 17h-4z" stroke={color} strokeWidth="2" fill="none"/>
  </svg>
);

export const SearchIcon = ({ size = 24, className = '', color = BRAND_COLORS.green }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="11" cy="11" r="8" stroke={color} strokeWidth="2" fill="none"/>
    <path d="M21 21l-4.35-4.35" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const UsersIcon = ({ size = 24, className = '', color = BRAND_COLORS.green }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="9" cy="7" r="4" stroke={color} strokeWidth="2" fill="none"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const StarIcon = ({ size = 24, className = '', color = BRAND_COLORS.green }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill={color}/>
  </svg>
);

export const FileTextIcon = ({ size = 24, className = '', color = BRAND_COLORS.green }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M14,2 L6,2 C4.9,2 4,2.9 4,4 L4,20 C4,21.1 4.9,22 6,22 L18,22 C19.1,22 20,21.1 20,20 L20,8 L14,2 Z" stroke={color} strokeWidth="2" fill="none"/>
    <path d="M14,2 L14,8 L20,8" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16,13 L8,13" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16,17 L8,17" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10,9 L9,9 L8,9" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const PaletteIcon = ({ size = 24, className = '', color = BRAND_COLORS.green }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="13.5" cy="6.5" r=".5" fill={color}/>
    <circle cx="17.5" cy="10.5" r=".5" fill={color}/>
    <circle cx="8.5" cy="7.5" r=".5" fill={color}/>
    <circle cx="6.5" cy="12.5" r=".5" fill={color}/>
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" stroke={color} strokeWidth="2" fill="none"/>
  </svg>
);

export const ClockIcon = ({ size = 24, className = '', color = BRAND_COLORS.green }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" fill="none"/>
    <path d="M12 6v6l4 2" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const CalendarIcon = ({ size = 24, className = '', color = BRAND_COLORS.green }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke={color} strokeWidth="2" fill="none"/>
    <path d="M16 2v4M8 2v4M3 10h18" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const AlertTriangleIcon = ({ size = 24, className = '', color = BRAND_COLORS.green }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke={color} strokeWidth="2" fill="none"/>
    <path d="M12 9v4M12 17h.01" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const SettingsIcon = ({ size = 24, className = '', color = BRAND_COLORS.green }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="2" fill="none"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" stroke={color} strokeWidth="2" fill="none"/>
  </svg>
);

// 아이콘 매핑 객체
export const iconMap = {
  // 기존 이모지 -> 커스텀 아이콘 매핑
  '📈': TrendingUpIcon,
  '📉': TrendingDownIcon,
  '⚡': ZapIcon,
  '💎': DiamondIcon,
  '🚀': RocketIcon,
  '📊': BarChartIcon,
  '🏆': TrophyIcon,
  '🤖': RobotIcon,
  '💬': MessageCircleIcon,
  '🔄': RefreshIcon,
  '🌍': GlobeIcon,
  '🛡️': ShieldIcon,
  '🛒': ShoppingCartIcon,
  '💻': LaptopIcon,
  '🏭': FactoryIcon,
  '🏥': HeartIcon,
  '🎓': GraduationCapIcon,
  '💰': DollarSignIcon,
  '🎯': TargetIcon,
  '📱': SmartphoneIcon,
  '💡': BulbIcon,
  '🔍': SearchIcon,
  '👥': UsersIcon,
  '⭐': StarIcon,
  '🎫': FileTextIcon,
  '🌟': StarIcon,
  '🎨': PaletteIcon,
  '⏰': ClockIcon,
  '📅': CalendarIcon,
  '📋': FileTextIcon,
  '🚨': AlertTriangleIcon,
  '🔧': SettingsIcon
};

// 범용 아이콘 컴포넌트
interface CustomIconProps {
  name: string;
  size?: number;
  className?: string;
  color?: string;
}

export const CustomIcon = ({ name, size = 24, className = '', color = BRAND_COLORS.green }: CustomIconProps) => {
  const IconComponent = iconMap[name as keyof typeof iconMap];
  
  if (!IconComponent) {
    // 매핑되지 않은 아이콘의 경우 기본 아이콘 반환
    return <div className={`w-${size/4} h-${size/4} ${className}`}>{name}</div>;
  }
  
  return <IconComponent size={size} className={className} color={color} />;
};