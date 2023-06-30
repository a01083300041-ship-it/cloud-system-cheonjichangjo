# 제주 올레길 안내 사이트

클라우드시스템 팀 프로젝트 — 제주 올레길 21개 코스 정보, 날씨, 항공편 조회, 리뷰 기능을 제공하는 관광 정보 웹사이트입니다. "클라우드 환경 위에서 서비스를 구성"하는 것이 과목의 핵심 주제였습니다.

## 1. 프로젝트 배경 및 개요

**기간**: 2023.03 – 2023.06 (약 4개월)
**팀 구성**: 3명
**담당 역할**: 기획, 요건 정리, 기술 조사, 클라우드 환경 구성

## 2. 내가 담당한 부분

### 인프라 의사결정 — NCP+MySQL에서 Firebase Firestore로 전환

처음에는 Naver Cloud Platform(NCP) 서버에 MySQL을 올려서 구성했지만, 개발 중 접속 단절이 반복적으로 발생해 서비스 안정성이 떨어졌습니다. 일정이 빠듯한 팀 프로젝트에서 인프라 문제로 개발 속도가 떨어지는 것을 막기 위해, 관리형 NoSQL인 **Firebase Firestore로 이전을 직접 제안하고 실행**했습니다.

- Figma로 사이트 전체 레이아웃을 설계하고 팀에 디자인 시안 제공
- 날씨(OpenWeatherMap), 항공편(Skyscanner) 외부 API를 조사해 연동 요건으로 정리
- 프로젝트 계획서 작성 및 자료 정리 담당
- ※ 화면 구현(HTML/CSS/JS)의 대부분은 팀의 다른 멤버가 담당

## 3. 주요 기능

- 제주 올레길 21개 코스별 상세 정보 페이지
- 실시간 날씨 조회 (OpenWeatherMap API)
- 항공편 조회 (Skyscanner API)
- 사용자 리뷰 등록/조회
- 회원가입/로그인 (`join.html`, `login.html`)

## 4. 겪었던 문제와 배운 점

- 인프라 선택이 개발 속도 자체를 좌우한다는 것을 직접 경험했습니다. 안정성을 우선해 SQL에서 NoSQL로 전환한 결정이 결과적으로 옳았습니다.
- 다만 MySQL 운영을 끝까지 완수하지 못했다는 점은 이후 별도로 자율 학습으로 보완하고 있습니다.

## 5. 성과

- 목표 기능 달성도 평균 93%
- 21개 코스 정보 + 날씨 + 항공편 + 리뷰 기능까지 완성

## 6. 기술 스택

| 영역 | 기술 |
|---|---|
| Front | HTML5, CSS3, JavaScript, Bootstrap, animate.style |
| DB | Firebase Firestore |
| 외부 API | OpenWeatherMap (날씨), Skyscanner (항공편) |
| 도구 | goorm IDE, Figma, Git |

## 7. 폴더 구조 (일부)

```
index.html          # 메인 페이지
join.html / login.html
course1.html ~ course21.html   # 올레길 코스별 페이지
asset/               # css/js 리소스
```

## 8. 실행 방법

정적 웹 프로젝트입니다. `index.html`을 브라우저로 열거나 로컬 서버로 서빙하세요.

```bash
npx serve .
```

> Firebase 연동 기능(리뷰 등)을 사용하려면 `asset/*.js` 내부의 Firebase `apiKey`를 자신의 Firebase 프로젝트 설정으로 교체해야 합니다. (Firebase 클라이언트 API 키는 보안 규칙으로 보호되는 공개용 키입니다.)
