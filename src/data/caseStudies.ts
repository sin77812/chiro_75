import { CaseStudy } from '@/types'

export const caseStudies: CaseStudy[] = [
  {
    id: 'ecommerce-optimization',
    title: '패션 쇼핑몰 전환율 250% 향상',
    slug: 'ecommerce-optimization',
    client: 'StyleHub',
    sector: 'Fashion E-commerce',
    thumbnail: '/images/case-studies/stylehub-thumbnail.jpg',
    heroImage: '/images/case-studies/stylehub-hero.jpg',
    overview: {
      problem: '낮은 전환율과 높은 이탈률로 인한 매출 정체. 모바일 UX 최적화 부족.',
      goals: [
        '전환율 150% 향상',
        '모바일 사용자 경험 개선',
        '장바구니 이탈률 30% 감소',
        '평균 주문가액 20% 증대'
      ],
      role: 'UX/UI 디자인, 프론트엔드 개발, 성능 최적화',
      duration: '4개월',
      team: ['UX 디자이너 2명', 'UI 디자이너 1명', '프론트엔드 개발자 2명', '백엔드 개발자 1명']
    },
    challenges: [
      '복잡한 상품 탐색 구조',
      '느린 페이지 로딩 속도 (평균 4.2초)',
      '모바일 최적화 부족 (모바일 트래픽 70%)',
      '결제 프로세스 복잡성'
    ],
    strategy: [
      '사용자 여정 맵핑 및 페인 포인트 식별',
      '모바일 퍼스트 디자인 접근법',
      '성능 최적화 및 Core Web Vitals 개선',
      'A/B 테스트를 통한 데이터 기반 의사결정'
    ],
    designHighlights: [
      '직관적인 카테고리 네비게이션 시스템',
      '원클릭 장바구니 및 위시리스트',
      '개인화된 상품 추천 알고리즘',
      '간소화된 3단계 결제 프로세스'
    ],
    techStack: [
      'Next.js 14',
      'TypeScript',
      'Tailwind CSS',
      'Zustand',
      'React Query',
      'Stripe API'
    ],
    metrics: [
      {
        label: '전환율',
        before: 1.8,
        after: 4.5,
        delta: '+250%',
        unit: '%'
      },
      {
        label: '페이지 로딩 속도',
        before: 4.2,
        after: 1.3,
        delta: '-69%',
        unit: 's'
      },
      {
        label: '장바구니 이탈률',
        before: 68,
        after: 42,
        delta: '-38%',
        unit: '%'
      },
      {
        label: '평균 주문가액',
        before: '₩85,000',
        after: '₩128,000',
        delta: '+51%'
      }
    ],
    quotes: [
      {
        quote: 'CHIRO팀의 데이터 기반 접근 방식이 인상적이었습니다. 4개월만에 매출이 두 배 이상 증가했어요.',
        author: '김민준',
        position: 'CEO',
        company: 'StyleHub',
        avatar: '/images/testimonials/kim-minjun.jpg'
      }
    ],
    gallery: [
      {
        image: '/images/case-studies/stylehub-before-after.jpg',
        caption: '개선 전후 메인 페이지 비교',
        alt: 'StyleHub 메인 페이지 개선 전후 비교'
      },
      {
        image: '/images/case-studies/stylehub-mobile.jpg',
        caption: '모바일 최적화된 상품 상세 페이지',
        alt: 'StyleHub 모바일 상품 상세 페이지'
      },
      {
        image: '/images/case-studies/stylehub-checkout.jpg',
        caption: '간소화된 결제 프로세스',
        alt: 'StyleHub 결제 프로세스'
      }
    ],
    resources: [
      {
        title: 'UX 리서치 보고서',
        type: 'pdf',
        url: '/resources/stylehub-ux-research.pdf',
        description: '사용자 인터뷰 및 행동 분석 결과'
      },
      {
        title: '라이브 사이트 보기',
        type: 'link',
        url: 'https://stylehub-demo.vercel.app',
        description: '개선된 StyleHub 웹사이트'
      }
    ],
    publishedAt: '2024-12-15',
    readTime: 8,
    tags: ['E-commerce', 'UX/UI', 'Performance', 'Conversion Rate'],
    nextProject: 'fintech-dashboard'
  },
  {
    id: 'fintech-dashboard',
    title: '핀테크 관리자 대시보드 UI/UX 혁신',
    slug: 'fintech-dashboard',
    client: 'FinanceFlow',
    sector: 'Financial Technology',
    thumbnail: '/images/case-studies/financeflow-thumbnail.jpg',
    heroImage: '/images/case-studies/financeflow-hero.jpg',
    overview: {
      problem: '복잡한 금융 데이터를 직관적으로 표현하지 못해 사용자 만족도 저하. 실시간 데이터 처리 성능 이슈.',
      goals: [
        '데이터 가독성 200% 향상',
        '실시간 대시보드 성능 최적화',
        '사용자 업무 효율성 40% 개선',
        'WCAG 2.1 AA 접근성 준수'
      ],
      role: '대시보드 UX 설계, 데이터 시각화, 접근성 구현',
      duration: '6개월',
      team: ['UX 디자이너 1명', 'UI 디자이너 2명', '프론트엔드 개발자 3명', '데이터 엔지니어 1명']
    },
    challenges: [
      '대용량 실시간 데이터 처리 및 시각화',
      '다양한 금융 지표의 직관적 표현',
      '다중 권한 레벨 사용자 인터페이스',
      '금융 규제 준수 및 보안 강화'
    ],
    strategy: [
      '정보 아키텍처 재설계를 통한 인지 부하 감소',
      '마이크로 인터랙션을 활용한 피드백 시스템',
      '적응형 레이아웃으로 개인화 대시보드 구현',
      '점진적 공개 원칙을 적용한 복잡성 관리'
    ],
    designHighlights: [
      '실시간 데이터 스트리밍 차트 시스템',
      '드래그 앤 드롭 대시보드 커스터마이징',
      '색상 대비와 스크린 리더 최적화',
      '키보드 네비게이션 완벽 지원'
    ],
    techStack: [
      'React 18',
      'TypeScript',
      'D3.js',
      'Material-UI',
      'Socket.io',
      'Redis'
    ],
    metrics: [
      {
        label: '데이터 처리 속도',
        before: 3.8,
        after: 0.9,
        delta: '-76%',
        unit: 's'
      },
      {
        label: '사용자 만족도',
        before: 6.2,
        after: 8.9,
        delta: '+44%',
        unit: '/10'
      },
      {
        label: '업무 완료 시간',
        before: 12,
        after: 7,
        delta: '-42%',
        unit: 'min'
      },
      {
        label: '접근성 점수',
        before: 65,
        after: 98,
        delta: '+51%',
        unit: '/100'
      }
    ],
    quotes: [
      {
        quote: '복잡한 금융 데이터를 이렇게 직관적으로 볼 수 있게 만들어주신 것에 정말 감사드립니다. 팀 전체의 생산성이 눈에 띄게 향상됐어요.',
        author: '이서연',
        position: 'Head of Operations',
        company: 'FinanceFlow',
        avatar: '/images/testimonials/lee-seoyeon.jpg'
      }
    ],
    gallery: [
      {
        image: '/images/case-studies/financeflow-dashboard.jpg',
        caption: '실시간 금융 데이터 대시보드',
        alt: 'FinanceFlow 실시간 대시보드 메인 화면'
      },
      {
        image: '/images/case-studies/financeflow-charts.jpg',
        caption: '인터랙티브 차트 및 데이터 시각화',
        alt: 'FinanceFlow 데이터 시각화 차트'
      },
      {
        image: '/images/case-studies/financeflow-accessibility.jpg',
        caption: '접근성 최적화 인터페이스',
        alt: 'FinanceFlow 접근성 기능'
      }
    ],
    resources: [
      {
        title: '디자인 시스템 가이드',
        type: 'pdf',
        url: '/resources/financeflow-design-system.pdf',
        description: '컴포넌트 라이브러리 및 사용 가이드'
      },
      {
        title: '접근성 감사 보고서',
        type: 'pdf',
        url: '/resources/financeflow-accessibility-audit.pdf',
        description: 'WCAG 2.1 AA 준수 검증 결과'
      },
      {
        title: 'Live Demo',
        type: 'link',
        url: 'https://financeflow-demo.vercel.app',
        description: 'FinanceFlow 대시보드 데모 버전'
      }
    ],
    publishedAt: '2024-11-28',
    readTime: 12,
    tags: ['FinTech', 'Dashboard', 'Data Visualization', 'Accessibility'],
    nextProject: 'ecommerce-optimization'
  }
]