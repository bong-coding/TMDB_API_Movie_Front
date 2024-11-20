프로젝트 이름
짭플렉스(Vue.js 기반 영화 정보 제공 웹 애플리케이션)


프로젝트 기본 정보
짭플렉스는 Vue.js로 개발된 영화 정보 제공 웹 애플리케이션입니다. 사용자들은 인기 영화, 장르별 영화, 검색 기능 등을 통해 다양한 영화를 찾아볼 수 있으며, 회원가입 및 로그인 기능을 통해 개인화된 위시리스트를 관리할 수 있습니다.

기술 스택 명시
프론트엔드 프레임워크: Vue.js
상태 관리: Vuex
라우팅: Vue Router
HTTP 통신: Axios
스타일링: CSS, SCSS
아이콘: Font Awesome
API: The Movie Database (TMDB) API
패키지 매니저: npm
빌드 도구: Vue CLI
추가 라이브러리:
Vue Toastification: 사용자에게 알림 메시지 제공
Vuex Persisted State: 상태를 로컬 스토리지에 저장하여 새로고침 후에도 데이터 유지
설치 및 실행 가이드
사전 요구 사항
Node.js (v14 이상 권장)
npm 또는 Yarn 패키지 매니저
설치 방법
저장소 클론

bash
코드 복사
git clone https://github.com/yourusername/yourproject.git
프로젝트 디렉토리로 이동

bash
코드 복사
cd yourproject
의존성 설치

bash
코드 복사
npm install
또는

bash
코드 복사
yarn install
환경 변수 설정

프로젝트 루트에 .env 파일을 생성하고 다음 내용을 추가합니다:

env
코드 복사
VUE_APP_TMDB_API_KEY=your_tmdb_api_key
your_tmdb_api_key를 TMDB API 키로 대체하세요.
실행 방법
개발 서버 실행
bash
코드 복사
npm run serve
또는

bash
코드 복사
yarn serve
브라우저에서 http://localhost:8080으로 접속하여 애플리케이션을 확인합니다.
프로덕션 빌드
bash
코드 복사
npm run build
또는

bash
코드 복사
yarn build
dist 디렉토리에 빌드된 파일이 생성됩니다.
프로젝트 구조 설명
css
코드 복사
yourproject/
├── public/
│   └── index.html
├── src/
│   ├── assets/
│   │   └── images/
│   │       └── file.png
│   ├── components/
│   │   └── common/
│   │       ├── Footer.vue
│   │       ├── Header.vue
│   │       └── MovieCard.vue
│   ├── hooks/
│   │   ├── useFetch.js
│   │   └── useWishlist.js
│   ├── router/
│   │   └── index.js
│   ├── services/
│   │   └── api.js
│   ├── store/
│   │   ├── index.js
│   │   └── modules/
│   │       ├── auth.js
│   │       ├── movies.js
│   │       └── wishlist.js
│   ├── utils/
│   │   ├── auth.js
│   │   └── constants.js
│   ├── views/
│   │   ├── Home.vue
│   │   ├── Popular.vue
│   │   ├── Search.vue
│   │   ├── SignIn.vue
│   │   └── Wishlist.vue
│   ├── App.vue
│   ├── main.js
│   └── ...
├── .env
├── package.json
└── README.md
주요 폴더 및 파일 설명
public/: 정적 파일을 보관하는 디렉토리입니다.
index.html: 애플리케이션의 기본 HTML 파일입니다.
src/: 소스 코드가 위치한 디렉토리입니다.
assets/: 이미지, 폰트 등 정적 자산이 위치합니다.
images/: 이미지 파일 보관 디렉토리입니다.
components/: 재사용 가능한 Vue 컴포넌트들이 위치합니다.
common/: Header, Footer, MovieCard 등 공통 컴포넌트들이 위치합니다.
hooks/: 재사용 가능한 로직을 위한 커스텀 훅이 위치합니다.
useFetch.js: API 호출을 위한 커스텀 훅입니다.
useWishlist.js: 위시리스트 관리를 위한 커스텀 훅입니다.
router/: Vue Router 설정이 위치합니다.
index.js: 라우터 설정 파일입니다.
services/: 외부 API와의 통신을 위한 파일이 위치합니다.
api.js: Axios 인스턴스를 생성하고 인터셉터를 설정합니다.
store/: Vuex 상태 관리와 관련된 파일이 위치합니다.
index.js: Vuex 스토어 설정 파일입니다.
modules/: Vuex 모듈들이 위치합니다.
auth.js: 인증 관련 상태 관리 모듈입니다.
movies.js: 영화 데이터 상태 관리 모듈입니다.
wishlist.js: 위시리스트 상태 관리 모듈입니다.
utils/: 유틸리티 함수들이 위치합니다.
auth.js: 로그인 및 회원가입 로직을 담은 유틸리티 파일입니다.
constants.js: 상수값들이 정의되어 있습니다.
views/: 페이지 단위의 컴포넌트들이 위치합니다.
Home.vue: 홈 페이지 컴포넌트입니다.
Popular.vue: 인기 영화 페이지 컴포넌트입니다.
Search.vue: 검색 페이지 컴포넌트입니다.
SignIn.vue: 로그인 및 회원가입 페이지 컴포넌트입니다.
Wishlist.vue: 위시리스트 페이지 컴포넌트입니다.
App.vue: 최상위 앱 컴포넌트입니다.
main.js: 애플리케이션의 진입점 파일입니다.
.env: 환경 변수 파일로, API 키 등이 저장됩니다.
package.json: 프로젝트의 의존성 목록과 스크립트가 정의되어 있습니다.
README.md: 프로젝트에 대한 설명서입니다.
기능 소개
영화 검색 및 필터링: 장르, 평점, 언어를 기반으로 영화를 검색하고 필터링할 수 있습니다.
인기 영화 조회: 현재 인기 있는 영화를 조회하고, 테이블 및 무한 스크롤 방식으로 볼 수 있습니다.
위시리스트 관리: 로그인한 사용자는 원하는 영화를 위시리스트에 추가하고 관리할 수 있습니다.
회원가입 및 로그인: 사용자 인증 기능을 제공하며, 로컬 스토리지에 사용자 정보를 저장합니다.
다국어 지원: 언어 선택 기능을 통해 다양한 언어로 콘텐츠를 볼 수 있습니다.
반응형 디자인: 다양한 디바이스에서 최적화된 화면을 제공합니다.
기여 방법
Fork 저장소를 합니다.

Clone 한 저장소를 로컬로 가져옵니다.

bash
코드 복사
git clone https://github.com/yourusername/yourproject.git
새로운 브랜치를 생성합니다.

bash
코드 복사
git checkout -b feature/your-feature
변경 사항을 커밋합니다.

bash
코드 복사
git commit -m "feat: 설명"
원격 저장소에 푸시합니다.

bash
코드 복사
git push origin feature/your-feature
Pull Request를 생성하여 변경 사항을 제출합니다.