import { BlogPost, Author, BlogCategory } from '@/types'

export const authors: Author[] = [
  {
    id: 'john-kim',
    name: '김준호',
    role: 'Lead UX Designer',
    bio: '8년 경력의 UX 디자이너로, 사용자 중심 디자인과 접근성 전문가입니다. 다양한 스타트업과 대기업 프로젝트를 통해 사용자 경험을 혁신해왔습니다.',
    avatar: '/images/authors/john-kim.jpg',
    links: {
      website: 'https://johnkim.design',
      linkedin: 'https://linkedin.com/in/johnkim-ux',
      twitter: 'https://twitter.com/johnkim_ux'
    }
  },
  {
    id: 'sarah-lee',
    name: '이서연',
    role: 'Frontend Developer',
    bio: '최신 웹 기술과 성능 최적화에 열정을 가진 프론트엔드 개발자입니다. React, Next.js, TypeScript를 활용한 현대적인 웹 애플리케이션 개발을 전문으로 합니다.',
    avatar: '/images/authors/sarah-lee.jpg',
    links: {
      github: 'https://github.com/sarahlee-dev',
      linkedin: 'https://linkedin.com/in/sarahlee-dev'
    }
  },
  {
    id: 'david-park',
    name: '박다윗',
    role: 'AI Strategy Consultant',
    bio: 'AI와 머신러닝을 비즈니스에 적용하는 전략 컨설턴트입니다. 데이터 기반 의사결정과 AI 도구를 활용한 비즈니스 혁신을 도와드립니다.',
    avatar: '/images/authors/david-park.jpg',
    links: {
      website: 'https://davidpark.ai',
      linkedin: 'https://linkedin.com/in/davidpark-ai'
    }
  }
]

export const categories: BlogCategory[] = [
  {
    id: 'design',
    name: 'UX/UI 디자인',
    slug: 'design',
    description: '사용자 경험과 인터페이스 디자인에 관한 인사이트',
    color: 'purple'
  },
  {
    id: 'development',
    name: '웹 개발',
    slug: 'development',
    description: '최신 웹 기술과 개발 트렌드',
    color: 'blue'
  },
  {
    id: 'ai',
    name: 'AI & 자동화',
    slug: 'ai',
    description: '인공지능과 업무 자동화 솔루션',
    color: 'green'
  },
  {
    id: 'business',
    name: '비즈니스 전략',
    slug: 'business',
    description: '디지털 비즈니스 전략과 성장 인사이트',
    color: 'orange'
  }
]

export const blogPosts: BlogPost[] = [
  {
    id: 'ai-web-development-2024',
    title: 'AI가 웹 개발을 혁신하는 5가지 방법 (2024년 트렌드)',
    slug: 'ai-web-development-2024',
    excerpt: 'GitHub Copilot부터 Claude Code까지, AI 도구들이 어떻게 웹 개발 프로세스를 혁신하고 있는지 실제 사례와 함께 살펴봅니다.',
    content: `
# AI가 웹 개발을 혁신하는 5가지 방법

2024년은 AI가 웹 개발 분야에 본격적으로 도입된 원년이라고 할 수 있습니다. 단순한 코드 자동완성을 넘어, 설계부터 배포까지 전체 개발 생명주기를 변화시키고 있습니다.

## 1. 코드 생성 및 자동완성의 진화

### GitHub Copilot의 영향
- 개발 속도 **35% 향상**
- 반복 작업 시간 **70% 단축**
- 코드 품질 개선 사례

\`\`\`typescript
// AI가 제안하는 완전한 함수
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
\`\`\`

## 2. 디자인에서 코드로의 자동 변환

최신 AI 도구들은 Figma 디자인을 직접 React 컴포넌트로 변환할 수 있습니다:

- **Figma to Code**: 90% 정확도의 컴포넌트 생성
- **스타일 시스템 자동 적용**
- **반응형 레이아웃 최적화**

## 3. 테스트 자동화의 새로운 차원

### AI 기반 테스트 생성
AI는 이제 코드를 분석해 자동으로 테스트 케이스를 생성합니다:

\`\`\`javascript
// AI가 생성한 테스트 케이스
describe('validateEmail', () => {
  test('should return true for valid email', () => {
    expect(validateEmail('test@example.com')).toBe(true);
  });
  
  test('should return false for invalid email', () => {
    expect(validateEmail('invalid-email')).toBe(false);
  });
});
\`\`\`

## 4. 성능 최적화 자동화

### Core Web Vitals 자동 개선
- **이미지 최적화**: 자동 WebP 변환 및 lazy loading
- **코드 스플리팅**: 사용 패턴 분석 기반 최적화
- **캐싱 전략**: AI 기반 캐시 전략 수립

## 5. 버그 탐지 및 보안 강화

### 실시간 코드 분석
AI는 코드 작성과 동시에 잠재적 보안 취약점을 식별합니다:

- **SQL 인젝션 방지**
- **XSS 공격 차단**
- **의존성 보안 검사**

---

## 실제 프로젝트 적용 사례

CHIRO에서 진행한 최근 프로젝트에서는 AI 도구 활용으로:

- 개발 기간 **40% 단축**
- 코드 품질 점수 **25% 향상**
- 버그 발생률 **60% 감소**

## 앞으로의 전망

2024년 하반기에는 다음과 같은 발전이 예상됩니다:

1. **자연어로 웹사이트 생성**
2. **AI 기반 UX 개선 제안**
3. **실시간 성능 모니터링 및 최적화**

---

*이 글이 도움이 되셨나요? 더 많은 AI 개발 인사이트를 받아보려면 뉴스레터를 구독해보세요.*
    `,
    thumbnail: '/images/blog/ai-web-development-thumbnail.jpg',
    category: 'ai',
    tags: ['AI', 'Web Development', '생산성', 'GitHub Copilot', '자동화'],
    publishedAt: '2024-12-10',
    readTime: 7,
    author: authors[1], // Sarah Lee
    relatedServices: ['ai-web-development', 'performance-optimization'],
    newsletterCTA: true,
    featured: true,
    seo: {
      metaTitle: 'AI가 웹 개발을 혁신하는 5가지 방법 (2024) | CHIRO 인사이트',
      metaDescription: 'GitHub Copilot부터 Claude Code까지, AI 도구들이 웹 개발 프로세스를 어떻게 혁신하고 있는지 실제 사례와 함께 알아보세요.',
      ogImage: '/images/blog/ai-web-development-og.jpg'
    }
  },
  {
    id: 'ux-accessibility-guide',
    title: '접근성 우선 UX 디자인: 모든 사용자를 위한 웹사이트 만들기',
    slug: 'ux-accessibility-guide',
    excerpt: 'WCAG 2.1 가이드라인을 실무에 적용하는 방법과 접근성을 고려한 디자인 시스템 구축 노하우를 상세히 설명합니다.',
    content: `
# 접근성 우선 UX 디자인

접근성(Accessibility)은 더 이상 선택사항이 아닙니다. 전 세계 인구의 15%가 어떤 형태로든 장애를 가지고 있으며, 이들도 동등하게 웹을 사용할 수 있어야 합니다.

## 왜 접근성이 중요한가?

### 비즈니스 관점
- **시장 확대**: 15억 명의 추가 사용자
- **SEO 개선**: 구조화된 콘텐츠는 검색엔진 친화적
- **법적 리스크 감소**: ADA, 장애인차별금지법 준수

### 기술적 이점
- **코드 품질 향상**
- **유지보수성 개선**  
- **성능 최적화 효과**

## WCAG 2.1 핵심 원칙

### 1. 인지 가능(Perceivable)
정보와 UI 컴포넌트는 사용자가 인지할 수 있어야 합니다.

#### 색상 대비 확보
\`\`\`css
/* 잘못된 예: 대비비 3:1 */
.low-contrast {
  color: #757575;
  background: #ffffff;
}

/* 올바른 예: 대비비 7:1 */
.high-contrast {
  color: #333333;
  background: #ffffff;
}
\`\`\`

#### 이미지 대체 텍스트
\`\`\`jsx
// 잘못된 예
<img src="chart.png" alt="차트" />

// 올바른 예
<img src="revenue-chart.png" alt="2024년 3분기 매출 30% 증가를 보여주는 막대 차트" />
\`\`\`

### 2. 운용 가능(Operable)
모든 UI 컴포넌트는 사용자가 조작할 수 있어야 합니다.

#### 키보드 네비게이션
\`\`\`jsx
function AccessibleButton({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      className="focus:ring-2 focus:ring-blue-500 focus:outline-none"
    >
      {children}
    </button>
  );
}
\`\`\`

### 3. 이해 가능(Understandable)
정보와 UI의 작동은 이해할 수 있어야 합니다.

#### 명확한 오류 메시지
\`\`\`jsx
// 잘못된 예
<span>오류가 발생했습니다</span>

// 올바른 예
<div role="alert" aria-live="polite">
  이메일 형식이 올바르지 않습니다. example@domain.com 형태로 입력해주세요.
</div>
\`\`\`

### 4. 견고성(Robust)
콘텐츠는 보조 기술을 포함한 다양한 사용자 에이전트가 해석할 수 있어야 합니다.

## 접근성 테스트 도구

### 자동화 도구
1. **axe-core**: 개발 중 실시간 검사
2. **Lighthouse**: 성능과 접근성 종합 분석
3. **WAVE**: 웹 페이지 접근성 시각화

### 수동 테스트
1. **키보드 네비게이션**: Tab 키만으로 모든 기능 사용
2. **스크린 리더**: NVDA, JAWS로 실제 테스트
3. **색각 이상**: Colorblinding으로 시뮬레이션

## 실제 구현 사례

### 접근성 중심 폼 디자인
\`\`\`jsx
function AccessibleForm() {
  const [errors, setErrors] = useState({});
  
  return (
    <form>
      <div className="form-group">
        <label htmlFor="email" className="required">
          이메일 주소
        </label>
        <input
          id="email"
          type="email"
          required
          aria-describedby={errors.email ? "email-error" : "email-help"}
          aria-invalid={errors.email ? "true" : "false"}
        />
        <div id="email-help" className="help-text">
          로그인에 사용할 이메일을 입력하세요
        </div>
        {errors.email && (
          <div id="email-error" role="alert" className="error-message">
            {errors.email}
          </div>
        )}
      </div>
    </form>
  );
}
\`\`\`

## 성과 측정

접근성 개선 후 실제 성과:
- **사용자 만족도 35% 향상**
- **세션 시간 25% 증가**  
- **전환율 18% 개선**

---

*접근성을 고려한 웹사이트 리뉴얼이 필요하신가요? CHIRO의 전문가와 상담해보세요.*
    `,
    thumbnail: '/images/blog/accessibility-ux-thumbnail.jpg',
    category: 'design',
    tags: ['UX', 'Accessibility', 'WCAG', '사용성', '디자인 시스템'],
    publishedAt: '2024-12-05',
    readTime: 12,
    author: authors[0], // John Kim
    relatedServices: ['ux-design', 'accessibility-audit'],
    newsletterCTA: true,
    featured: true,
    seo: {
      metaTitle: '접근성 우선 UX 디자인 가이드 | WCAG 2.1 실무 적용법',
      metaDescription: 'WCAG 2.1 가이드라인을 실무에 적용하는 방법과 접근성 중심 디자인 시스템 구축 노하우를 실제 코드 예제와 함께 설명합니다.',
      ogImage: '/images/blog/accessibility-ux-og.jpg'
    }
  },
  {
    id: 'business-ai-transformation',
    title: '중소기업을 위한 AI 디지털 혁신 로드맵: 단계별 실행 전략',
    slug: 'business-ai-transformation',
    excerpt: '예산이 제한된 중소기업도 AI를 활용해 비즈니스를 혁신할 수 있습니다. 단계별 AI 도입 전략과 ROI 측정 방법을 제시합니다.',
    content: `
# 중소기업을 위한 AI 디지털 혁신 로드맵

"AI는 대기업만의 전유물"이라는 편견을 버릴 때입니다. 올바른 전략과 단계별 접근으로 중소기업도 AI의 혜택을 충분히 누릴 수 있습니다.

## 중소기업 AI 도입의 현실

### 주요 장벽
- **예산 제약**: 평균 초기 투자비용 우려
- **기술 인력 부족**: AI 전문가 채용 어려움
- **ROI 불확실성**: 투자 대비 효과 측정 어려움

### 성공 사례 분석
최근 1년간 AI를 도입한 국내 중소기업 50곳 분석 결과:
- **매출 증가**: 평균 23%
- **운영비용 절감**: 평균 31%
- **고객 만족도**: 평균 28% 향상

## 단계별 AI 도입 전략

### 1단계: 현황 분석 및 목표 설정 (1개월)

#### 비즈니스 프로세스 진단
- **반복 업무 식별**: 자동화 가능 영역 파악
- **데이터 현황 분석**: 보유 데이터 품질 및 양 평가
- **우선순위 매트릭스**: 임팩트 vs 구현 난이도

#### 목표 KPI 설정
\`\`\`
예시: 제조업체 A사
- 불량품 검출율: 85% → 95%
- 재고 관리 정확도: 70% → 90%
- 고객 문의 응답 시간: 4시간 → 30분
\`\`\`

### 2단계: Quick Wins 프로젝트 (2-3개월)

#### 도입하기 쉬운 AI 솔루션
1. **챗봇 도입**: 고객 서비스 자동화
2. **이메일 자동화**: 마케팅 및 영업 지원
3. **데이터 분석 대시보드**: 의사결정 지원

#### 실제 구현 사례
\`\`\`javascript
// 간단한 챗봇 규칙 예시
const chatbotRules = {
  pricing: "가격 문의는 영업팀(02-1234-5678)으로 연락주세요.",
  shipping: "배송은 주문 후 2-3일 소요됩니다.",
  return: "교환/환불은 구매일로부터 7일 이내 가능합니다."
};
\`\`\`

### 3단계: 핵심 프로세스 AI화 (3-6개월)

#### 업종별 적용 영역

**제조업**
- 품질 검사 자동화
- 예측 정비
- 공급망 최적화

**서비스업** 
- 개인화 추천
- 수요 예측
- 고객 이탈 분석

**유통업**
- 재고 최적화
- 동적 가격 책정
- 고객 세분화

## ROI 측정 및 성과 관리

### 측정 지표 체계

#### 정량적 지표
- **비용 절감**: 인건비, 운영비 절약액
- **매출 증대**: AI 기여 매출 증가분
- **효율성 개선**: 처리 시간, 정확도 개선

#### 정성적 지표
- **직원 만족도**: 단순 반복 업무 감소
- **고객 경험**: 서비스 품질 향상
- **의사결정 속도**: 데이터 기반 빠른 판단

### 성과 측정 대시보드
\`\`\`typescript
interface AIPerformanceMetrics {
  costSavings: number;        // 월간 비용 절감액
  revenueIncrease: number;    // AI 기여 매출 증가
  processEfficiency: number;  // 프로세스 효율성 (%)
  customerSatisfaction: number; // 고객 만족도 점수
  employeeProductivity: number; // 직원 생산성 지수
}
\`\`\`

## 실제 성공 사례

### 사례 1: 중소 제조업체 B사
**도입 전**: 품질 검사에 하루 4시간 소요, 불량률 12%
**도입 후**: 
- AI 비전 검사로 **30분으로 단축**
- 불량률 **3%로 감소**
- 월 500만원 비용 절감

### 사례 2: 온라인 쇼핑몰 C사
**도입 전**: 고객 문의 응답 평균 6시간
**도입 후**:
- 챗봇으로 **즉시 응답** (80% 문의)
- 고객 만족도 **40% 향상**
- CS 인력 **50% 효율화**

## 주의사항 및 리스크 관리

### 일반적인 실패 요인
1. **과도한 목표 설정**: 단계적 접근 무시
2. **데이터 품질 과소평가**: 정확한 데이터 없이 AI 도입
3. **직원 교육 부족**: 변화 관리 소홀

### 리스크 완화 전략
- **파일럿 프로젝트**: 작은 규모로 시작
- **전문가 협업**: 외부 전문기업과 파트너십
- **지속적 모니터링**: 정기적 성과 리뷰

---

## 다음 단계

AI 도입을 고려 중이시라면:

1. **무료 AI 감사**: 현재 비즈니스 프로세스 분석
2. **ROI 시뮬레이션**: 예상 투자 대비 효과 계산
3. **파일럿 프로젝트** 제안서 검토

*CHIRO와 함께 여러분 비즈니스의 AI 혁신 여정을 시작하세요.*
    `,
    thumbnail: '/images/blog/business-ai-transformation-thumbnail.jpg',
    category: 'business',
    tags: ['AI', 'Digital Transformation', '중소기업', 'ROI', '비즈니스 전략'],
    publishedAt: '2024-11-28',
    readTime: 15,
    author: authors[2], // David Park
    relatedServices: ['ai-consulting', 'digital-transformation'],
    newsletterCTA: true,
    featured: false,
    seo: {
      metaTitle: '중소기업 AI 디지털 혁신 로드맵 | 단계별 실행 전략 가이드',
      metaDescription: '예산 제한적인 중소기업을 위한 AI 도입 전략과 ROI 측정 방법. 실제 성공 사례와 함께 제시하는 단계별 실행 가이드입니다.',
      ogImage: '/images/blog/business-ai-transformation-og.jpg'
    }
  }
]