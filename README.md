# Opiki

Opiki는 이용자 프로필과 정부24 연동 동의 정보를 바탕으로 청년 혜택, 필요 서류, 마감 일정을 추천하는 iOS 제출용 혜택 서비스입니다.

## 주요 기능

- 비로그인/로그인 메인 화면
- 프로필 입력 및 내 상황 요약
- 이용자 동의 기반 정부24 서류 연동 데모
- 혜택 리스트, 카테고리 필터, 즐겨찾기
- 혜택 상세 및 요약 전환
- 캘린더 마감 일정 (신청한 혜택 자동 표시)
- 알림 내역 (신청한 혜택 자동 등록)
- 프로필과 정부24 서류 상태를 반영한 AI 추천 채팅 (대화 자동 저장)

## 실행

```bash
npm install
npm run dev
```

서버(OpenAI 프록시):

```bash
echo "OPENAI_API_KEY=sk-..." > .env
npm run server
```

## iOS 빌드 & 배포

### 1) 사전 준비 (Mac에서 1회)
- Xcode 15 이상 + Command Line Tools
- CocoaPods: `sudo gem install cocoapods`
- Apple Developer 계정 (Signing 용)

### 2) 웹 빌드 → iOS 동기화 → Xcode 열기

```bash
# 외부 서버를 가리키게 빌드하려면 (선택)
# VITE_API_BASE_URL=https://api.opiki.kr npm run build

npm run ios:sync   # vite build + cap sync ios
npm run ios:open   # Xcode 워크스페이스 열기
```

### 3) Xcode 안에서
1. `App` 타깃 → Signing & Capabilities → Team 선택
2. Bundle Identifier `kr.opiki.app` 확인
3. 디바이스/시뮬레이터 선택 → ▶ Run
4. 실기기 테스트는 케이블 연결 후 "Trust this computer"
5. TestFlight 업로드: Product → Archive → Distribute App → App Store Connect

### 4) 알아두면 좋은 것
- `capacitor.config.json`의 `server.allowNavigation`에 실제 API 도메인을 추가하세요.
- 개발 중 HTTP 서버를 호출하려면 `Info.plist`의 `NSAppTransportSecurity.NSAllowsArbitraryLoads`가 true 상태입니다(이미 적용). 배포 시 HTTPS로 전환 후 false 권장.
- 카메라/사진/알림 권한 문구는 `Info.plist`에 정의되어 있습니다.
- 외부 OpenAI 서버 URL은 `VITE_API_BASE_URL` 환경변수로 빌드 시 지정합니다.

## 디렉터리 구조

```
src/
├── assets/
├── components/
├── data/
├── pages/
├── styles/
├── utils/
│   ├── api.js          # API base URL + OpenAI 호출
│   ├── recommendation.js
│   └── storage.js      # 프로필/즐겨찾기/신청내역/채팅/알림
├── App.jsx
└── main.jsx
ios/                    # Capacitor iOS 네이티브 프로젝트
server.js               # OpenAI 프록시 (Express)
```
