# 프로젝트 이름
짭플렉스(vue.js 기반 영화 정보 제공하는 웹 애플리케이션)
--------------------------
## 소개
짭플렉스는 Vue.js로 개발된 영화 정보 제공 웹 애플리케이션입니다. 사용자들은 인기 영화, 장르별 영화, 검색 기능 등을 통해 다양한 영화를 찾아볼 수 있으며, 회원가입 및 로그인 기능을 통해 개인화된 위시리스트를 관리할 수 있습니다.
--------------------------
## 기술스택
 - 프론트 프레임워크 : Vue.js
 - 상태관리 : Vuex
 - 라우팅 : Vue Router
 - HTTP 통신 : Axios
 - 스타일  :CSS
 - 아이콘 : Font Awesome
 - API : The Movie Database (TMDB) API
 - 패지키 매니저 : npm
 - 빌드도구 : Vue CLI
 - 추가 라이브러리 :
    - Vue Toastification: 사용자에게 알림 메시지 제공
    - Vuex Persisted State: 상태를 로컬 스토리지에 저장하여 새로고침 후에도 데이터 유지

--------------------------

## 목차
- [소개](#소개)
- [설치 및 실행](#설치-및-실행)
- [프로젝트 구조](#프로젝트-구조)
- [주요 기능](#주요-기능)
- [기여 방법](#기여-방법)
- [라이선스](#라이선스)
- [문의 사항](#문의-사항)

## 설치 및 실행
### 1. 요구 사항
- Node.js >= 14.x
- npm >= 6.x
- npm 또는 yarn패키지 매니저

### 2. 설치 방법
```bash
1. git clone https://github.com/your-repo.git
2 .cd your-repo => 프로젝트 디렉토리로 이동
3. npm install  => 의존성 설치
4. VUE_APP_TMDB_API_KEY=your_tmdb_api_key
    - .env 파일 생성하고 아래 내용을 추가해주세요.
    - your_tmdb_api_key를 TMDB API 키로 대체하세요.
5. npm run serve  => 개발 서버 실행


