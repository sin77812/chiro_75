# Vercel KV (Upstash Redis) 설정 가이드 - 어드민 페이지용

## 🎯 문제 해결
프로덕션 환경(Vercel)에서는 파일 시스템이 읽기 전용이므로 포트폴리오 데이터를 수정할 수 없었습니다.  
**해결책**: Upstash Redis 클라우드 데이터베이스 사용

---

## 🚀 설정 방법

### 1. Vercel 대시보드에서 KV 데이터베이스 생성

1. [Vercel 대시보드](https://vercel.com/dashboard) 로그인
2. **chiro-75 프로젝트** 선택
3. **Storage** 탭 클릭
4. **Create Database** 클릭
5. **KV (Key-Value)** 선택
6. 이름: `portfolio-db` 입력
7. **Create** 클릭

### 2. 환경변수 자동 연결 ✅

생성 시 자동으로 추가되는 환경변수들:
```
KV_URL
KV_REST_API_URL
KV_REST_API_TOKEN
KV_REST_API_READ_ONLY_TOKEN
```

### 3. 로컬 개발 환경 설정

**Option A: Vercel CLI 사용 (권장)**
```bash
npm i -g vercel
vercel link
vercel env pull .env.development.local
```

**Option B: 수동 설정**
```bash
# .env.development.local 파일에 Vercel에서 복사한 환경변수 붙여넣기
KV_REST_API_URL=https://your-endpoint.upstash.io
KV_REST_API_TOKEN=your-token
```

### 4. 배포 및 테스트

```bash
git add .
git commit -m "Add Upstash Redis support for admin"
git push origin main
```

---

## ⚡ 작동 방식

### **스마트 데이터 관리**
- **로컬 개발**: JSON 파일 + Redis (둘 다 동기화)
- **프로덕션**: Redis 전용
- **자동 마이그레이션**: 첫 실행 시 JSON → Redis 자동 이전
- **폴백 시스템**: Redis 실패 시 파일 시스템으로 자동 전환

### **성능 최적화**
- **Redis**: 밀리초 단위 응답 속도
- **JSON Parsing**: 최적화된 직렬화/역직렬화
- **에러 복구**: 다중 레이어 백업 시스템

---

## 🔧 추가 기능

### **자동 백업 시스템**
```bash
# 백업 생성
GET /api/portfolio/backup

# 백업 복원
POST /api/portfolio/backup
{
  "backupKey": "portfolio_backup_2024-08-29T12-30-45-123Z"
}
```

### **개발 환경 백업**
- Redis 저장 시 로컬 JSON 파일에도 자동 백업
- 최대 10개 백업 자동 관리

---

## 💰 비용

- **Upstash Redis 무료 플랜**: 월 10,000 요청
- **예상 사용량**: 월 100-500 요청 (어드민 사용)
- **결론**: 완전 무료로 사용 가능 ✅

---

## 🛠️ 트러블슈팅

### ❌ "Failed to save portfolio data"
1. **Vercel Storage** 탭에서 KV 데이터베이스 확인
2. **Environment Variables**에서 KV 관련 변수 확인
3. 프로젝트 **Redeploy** 실행

### ❌ "Redis not available"
1. 환경변수 `.env.development.local` 확인
2. `npm run dev` 재시작
3. 서버 로그에서 "Redis client initialized" 메시지 확인

### ❌ 데이터가 보이지 않음
1. **자동 마이그레이션**: 첫 API 호출 시 JSON → Redis 이전
2. **브라우저 캐시** 클리어
3. 개발자 도구 Network 탭에서 API 응답 확인

### ❌ 로컬에서 Redis 연결 실패
```bash
# 환경변수 확인
echo $KV_REST_API_URL

# .env.development.local 파일 확인
cat .env.development.local

# Vercel에서 환경변수 다시 가져오기
vercel env pull .env.development.local
```

---

## 🧪 테스트 방법

### **1. API 직접 테스트**
```bash
# GET 테스트
curl http://localhost:3000/api/portfolio

# PUT 테스트 (데이터 수정)
curl -X PUT http://localhost:3000/api/portfolio \
  -H "Content-Type: application/json" \
  -d '{"id":"test","title":"Test","client":"Test Client","description":"Test Description"}'
```

### **2. 관리자 페이지 테스트**
1. `/admin` 접속
2. 비밀번호: `0812`
3. 포트폴리오 수정 시도
4. 서버 로그에서 "Redis client initialized" 확인

### **3. 서버 로그 확인**
```
✓ Redis client initialized successfully
✓ Reading from Redis...
✓ Data found in Redis, items count: 4
✓ Writing to Redis...
✓ Data written to Redis successfully
```

---

## 📊 시스템 아키텍처

```
[어드민 UI] → [Next.js API] → [Upstash Redis] → [실시간 반영]
     ↓              ↓              ↓
[로컬 백업]   [에러 처리]    [자동 마이그레이션]
```

**완벽한 솔루션으로 더 이상 파일 권한 문제는 없습니다!** 🎉