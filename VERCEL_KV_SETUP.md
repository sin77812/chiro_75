# Vercel KV 설정 가이드 (어드민 페이지용)

## 문제
프로덕션 환경(Vercel)에서는 파일 시스템이 읽기 전용이므로 포트폴리오 데이터를 수정할 수 없습니다.

## 해결책: Vercel KV 데이터베이스 사용

### 1. Vercel 대시보드에서 KV 데이터베이스 생성

1. [Vercel 대시보드](https://vercel.com/dashboard)에 로그인
2. 프로젝트 선택
3. **Storage** 탭 클릭
4. **Create Database** 클릭
5. **KV** 선택
6. 데이터베이스 이름 입력 (예: `portfolio-db`)
7. **Create** 클릭

### 2. 환경 변수 자동 추가

Vercel KV를 생성하면 다음 환경 변수가 자동으로 추가됩니다:
- `KV_URL`
- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`
- `KV_REST_API_READ_ONLY_TOKEN`

### 3. 배포

```bash
git add .
git commit -m "Add Vercel KV support for admin page"
git push origin main
```

### 4. 확인

1. 배포 완료 후 `/admin` 페이지 접속
2. 비밀번호 `0812` 입력
3. 포트폴리오 수정 테스트

## 작동 원리

- **개발 환경**: `src/data/portfolio.json` 파일 사용
- **프로덕션 환경**: Vercel KV 데이터베이스 사용
- 첫 실행 시 JSON 파일의 데이터를 KV로 자동 마이그레이션

## 비용

- Vercel KV는 무료 플랜에서 월 3,000개 요청 제공
- 어드민 페이지 사용량으로는 충분함

## 트러블슈팅

### "Failed to save portfolio data" 에러
1. Vercel 대시보드에서 KV 데이터베이스 생성 확인
2. 환경 변수가 프로젝트에 연결되었는지 확인
3. 재배포 시도

### 데이터가 보이지 않는 경우
1. 첫 GET 요청 시 자동으로 초기 데이터 로드됨
2. 브라우저 캐시 클리어 후 재시도