# Google Search Console 설정 가이드

## 1. DNS TXT 레코드 설정

도메인 이름 제공업체(예: Gabia, Hosting.kr, Cafe24)에 로그인 후 아래 TXT 레코드를 추가하세요:

### TXT 레코드 정보
- **레코드 타입**: TXT
- **호스트/이름**: @ 또는 chiroweb.co.kr
- **값/내용**: `google-site-verification=ANdrpoeRy-ZYfdNF8-eIP7CWL7ZmgI1EQIOwAAZrbXM`
- **TTL**: 3600 (또는 기본값)

## 2. HTML 파일 확인 (대체 방법)

HTML 파일을 이용한 확인도 설정되어 있습니다:
- 파일 위치: `/public/google2c9e8f4a3b5c6d7e.html`
- 접근 URL: `https://chiroweb.co.kr/google2c9e8f4a3b5c6d7e.html`

## 3. 배포 및 확인

1. 코드를 Git에 커밋하고 푸시:
```bash
git add .
git commit -m "Add Google Search Console verification"
git push origin main
```

2. Vercel에 자동 배포 완료 후 확인:
   - https://chiroweb.co.kr/google2c9e8f4a3b5c6d7e.html 접속하여 파일 확인
   - Google Search Console에서 "확인" 버튼 클릭

## 4. DNS 전파 시간

- DNS TXT 레코드는 적용되는데 1-48시간이 걸릴 수 있습니다
- HTML 파일 방식은 배포 즉시 확인 가능합니다

## 5. 확인 상태 체크

DNS TXT 레코드가 제대로 설정되었는지 확인:
```bash
nslookup -type=TXT chiroweb.co.kr
```

또는 온라인 도구 사용:
- https://mxtoolbox.com/TXTLookup.aspx
- https://dnschecker.org/

## 설정 완료 사항

✅ HTML 확인 파일 생성 (`/public/google2c9e8f4a3b5c6d7e.html`)
✅ Next.js 설정 업데이트 (캐싱 헤더 추가)
✅ DNS TXT 레코드 정보 문서화

## 다음 단계

1. 위의 TXT 레코드를 도메인 제공업체에 추가
2. 코드를 배포 (git push)
3. Google Search Console에서 확인 진행
4. 확인 완료 후 사이트맵 제출 (`https://chiroweb.co.kr/sitemap.xml`)