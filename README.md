# Opiki

Opiki는 이용자 프로필과 정부24 연동 동의 정보를 바탕으로 청년 혜택, 필요 서류, 마감 일정을 추천하는 iOS 제출용 혜택 서비스입니다.

## 주요 기능

- 비로그인/로그인 메인 화면
- 프로필 입력 및 내 상황 요약
- 이용자 동의 기반 정부24 서류 연동 데모
- 혜택 리스트, 카테고리 필터, 즐겨찾기
- 혜택 상세 및 요약 전환
- 캘린더 마감 일정
- 알림 내역
- 프로필과 정부24 서류 상태를 반영한 AI 추천 채팅

## 실행

```bash
npm install
npm run dev
```

## iOS 실행 및 배포 준비

```bash
npm run ios:sync
npm run ios:open
```

`ios:sync`는 웹 화면을 빌드한 뒤 iOS 프로젝트에 복사합니다. `ios:open`은 Xcode 프로젝트를 엽니다.

최종 배포에는 Mac에 Xcode 전체 앱이 설치되어 있어야 하며, 실제 기기/TestFlight/App Store 배포를 하려면 Apple Developer 계정의 Signing 설정이 필요합니다.
