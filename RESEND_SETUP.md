# Resend 이메일 설정 가이드

## 📋 설정 순서

### 1. Resend 계정 생성
1. [resend.com](https://resend.com) 접속
2. "Sign up" 클릭하여 무료 계정 생성
3. 이메일 인증 완료

### 2. API 키 발급
1. Resend 대시보드 로그인
2. 왼쪽 메뉴에서 "API Keys" 클릭
3. "Create API Key" 버튼 클릭
4. API 키 이름 입력 (예: "CHIRO Production")
5. 생성된 API 키 복사 (re_로 시작하는 키)

### 3. 프로젝트에 API 키 설정
`.env.local` 파일 생성 또는 수정:
```bash
RESEND_API_KEY=re_여기에_복사한_API_키_붙여넣기
```

### 4. 테스트
1. 개발 서버 재시작:
```bash
npm run dev
```

2. 상담 신청 폼에서 테스트 전송
3. sin77812@gmail.com과 chiroweb75@gmail.com으로 이메일 도착 확인

## 🎯 무료 플랜 제한사항
- 월 100개 이메일 무료
- onboarding@resend.dev 발신자만 사용 가능
- 실제 도메인 사용하려면 도메인 인증 필요

## 🚀 프로덕션 설정 (선택사항)

### 도메인 인증하기
1. Resend 대시보드에서 "Domains" 클릭
2. "Add Domain" 클릭
3. 도메인 입력 (예: chiro75.com)
4. DNS 설정:
   - SPF 레코드 추가
   - DKIM 레코드 추가
   - 인증 완료 대기 (최대 72시간)

5. 인증 완료 후 API 코드 수정:
```javascript
// src/app/api/contact/route.ts
const EMAIL_FROM = 'contact@chiro75.com' // 인증된 도메인 이메일로 변경
```

## ⚡ 빠른 시작
지금 바로 테스트하려면:
1. Resend 가입 → API 키 발급 → .env.local에 추가
2. 서버 재시작 후 상담 폼 테스트

## 🔧 문제 해결
- 이메일이 안 오는 경우: 스팸함 확인
- API 키 오류: .env.local 파일 확인 및 서버 재시작
- 발신자 오류: 무료 플랜은 onboarding@resend.dev만 사용 가능