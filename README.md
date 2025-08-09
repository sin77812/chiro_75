# CHIRO - 웹에이전시 공식 사이트

> B2B 기업의 디지털 전환을 완성하는 프리미엄 웹에이전시

## 🚀 프로젝트 개요

CHIRO는 제조업과 중견기업을 위한 전문 웹에이전시입니다. Next.js 14, TypeScript, TailwindCSS를 기반으로 구축된 고성능 웹사이트로, 현대적인 디자인과 최적화된 사용자 경험을 제공합니다.

### 주요 기능
- ✨ 반응형 디자인 (모바일 퍼스트)
- ⚡ 최적화된 성능 (Lighthouse 90+ 점수)
- 🎨 다크모드 기반 프리미엄 UI
- 📱 인터랙티브 애니메이션
- 🔍 SEO 최적화
- 📊 포트폴리오 필터링 시스템
- 💬 고객 후기 캐러셀
- 📝 문의 폼 시스템

## 🛠 기술 스택

- **Framework**: Next.js 15.0 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS + Custom CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Fonts**: Pretendard, Inter, Noto Sans KR
- **Deployment**: Vercel (권장)

## 📁 프로젝트 구조

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root Layout
│   ├── page.tsx           # Home Page
│   ├── globals.css        # Global Styles
│   ├── services/          # Services Page
│   ├── portfolio/         # Portfolio Page
│   ├── case/[slug]/       # Case Study Pages
│   ├── about/             # About Page
│   ├── contact/           # Contact Page
│   └── legal/             # Legal Pages
├── components/
│   ├── sections/          # Page Sections
│   │   ├── Hero.tsx
│   │   ├── LogoStrip.tsx
│   │   ├── ServiceCards.tsx
│   │   ├── ResultsCounter.tsx
│   │   ├── PortfolioGrid.tsx
│   │   ├── TestimonialCarousel.tsx
│   │   └── PageCTA.tsx
│   └── ui/                # UI Components
│       ├── StickyCTA.tsx
│       └── BeforeAfter.tsx
├── data/                  # Static Data
│   ├── clients.json
│   ├── services.json
│   ├── portfolio.json
│   ├── testimonials.json
│   └── awards.json
├── lib/                   # Utility Functions
└── types/                 # TypeScript Types
    └── index.ts
```

## 🎨 디자인 시스템

### 컬러 팔레트
```css
/* Primary Colors */
--primary: #1DB954        /* Spotify Green */
--primary-dark: #0E1111   /* Main Background */
--primary-hover: #0FAA44  /* Hover State */

/* Secondary Colors */
--shadow-gray: #22272B    /* Card Background */
--neutral-light: #F5F7FA  /* Text Light */
--accent-green: #0FAA44   /* Accent */
```

### 타이포그래피
- **Pretendard**: 한글 헤드라인 (H1-H6)
- **Inter**: 영문 헤드라인 및 UI
- **Noto Sans KR**: 한글 본문

### 애니메이션
- **Fade In**: 0.5s ease-in-out
- **Slide Up**: 0.5s ease-out
- **Scale In**: 0.3s ease-out
- **Counter**: 2s ease-out

## 🚀 시작하기

### 설치
```bash
npm install
```

### 개발 서버 실행
```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인할 수 있습니다.

### 빌드
```bash
npm run build
npm start
```

### 린트 검사
```bash
npm run lint
```

## 📊 데이터 교체 가이드

### 클라이언트 로고 교체
`src/data/clients.json` 파일에서 로고 이미지와 회사 정보를 수정하세요:

```json
{
  "id": "company-name",
  "name": "회사명",
  "logo": "이미지 URL",
  "alt": "Alt 텍스트",
  "url": "회사 웹사이트 (선택사항)"
}
```

### 서비스 정보 수정
`src/data/services.json`에서 제공 서비스를 수정할 수 있습니다.

### 포트폴리오 추가/수정
`src/data/portfolio.json`에서 프로젝트 사례를 관리합니다.

### 고객 후기 관리
`src/data/testimonials.json`에서 고객 리뷰를 추가/수정합니다.

## 🖼 이미지 교체 포인트

### Unsplash 이미지 URL 패턴
현재 더미 이미지들은 Unsplash를 사용합니다:
```
https://images.unsplash.com/photo-ID?w=WIDTH&h=HEIGHT&fit=crop
```

### 교체 권장 이미지
- **Hero 배경**: 웹 개발/디자인 관련 고품질 이미지
- **포트폴리오**: 실제 프로젝트 스크린샷
- **팀 사진**: 실제 임직원 프로필
- **오피스**: 실제 사무실 환경

## 🔧 커스터마이징

### 브랜드 컬러 변경
`tailwind.config.ts`에서 컬러 팔레트를 수정:

```typescript
colors: {
  primary: {
    DEFAULT: '#YOUR_COLOR',
    dark: '#YOUR_DARK_COLOR',
    hover: '#YOUR_HOVER_COLOR',
  }
}
```

### 폰트 변경
`src/app/layout.tsx`에서 Google Fonts 설정을 수정할 수 있습니다.

### 애니메이션 조정
`tailwind.config.ts`의 `animation` 및 `keyframes` 섹션에서 수정 가능합니다.

## 📈 성능 최적화

### 이미지 최적화
- WebP/AVIF 포맷 사용
- `next/image` 컴포넌트 활용
- Lazy loading 자동 적용

### 번들 최적화
- Tree shaking 적용
- Code splitting 자동화
- CSS 최적화

### SEO 최적화
- 메타데이터 설정 완료
- 구조화된 데이터 준비됨
- 사이트맵 자동 생성

## 🔄 업데이트 가이드

### 콘텐츠 업데이트
1. JSON 데이터 파일 수정
2. 이미지 교체
3. 메타데이터 업데이트

### 기능 추가
1. 새 컴포넌트 생성
2. 페이지 라우트 추가
3. 타입 정의 업데이트

### 디자인 수정
1. TailwindCSS 클래스 수정
2. 컬러 토큰 조정
3. 애니메이션 타이밍 수정

## 📞 지원 및 문의

프로젝트 관련 문의사항이 있으시면:
- 📧 Email: hello@chiro.co.kr
- 📱 Phone: 02-1234-5678
- 🏢 Office: 서울시 강남구 테헤란로

---

**CHIRO** - *B2B 기업의 디지털 전환을 완성하는 파트너*# chiro_75
