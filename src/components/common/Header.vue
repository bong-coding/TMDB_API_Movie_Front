<!-- src/components/common/Header.vue -->
<template>
  <header :class="['header', { scrolled }]">
    <div class="logo" @click="navigateHome">
      <img src="@/assets/images/file.png" alt="Logo" />
    </div>
    <nav :class="{ open: isMenuOpen }">
      <!-- 왼쪽 그룹 -->
      <div class="nav-left">
        <!-- 언어 선택 드롭다운 -->
        <select v-model="selectedLanguage" @change="changeLanguage">
          <option value="ko-KR">한국어</option>
          <option value="en-US">English</option>
          <option value="ja-JP">日本語</option>
        </select>
        <!-- 네비게이션 링크들 -->
        <router-link to="/" @click="closeMenu">홈</router-link>
        <router-link to="/popular" @click="closeMenu">대세 콘텐츠</router-link>
        <router-link to="/search" @click="closeMenu">찾아보기</router-link>
        <router-link to="/wishlist" @click="closeMenu">찜 목록</router-link>
      </div>
      <!-- 오른쪽 그룹 -->
      <div class="nav-right">
        <!-- 로그인/로그아웃 버튼 -->
        <router-link v-if="!isLoggedIn" to="/signin" @click="closeMenu">
          로그인
        </router-link>
        <button v-else @click="logout">로그아웃</button>
      </div>
    </nav>
    <button class="hamburger" @click="toggleMenu">
      <span></span>
      <span></span>
      <span></span>
    </button>
    <!-- 오버레이 추가 -->
    <div v-if="isMenuOpen" class="menu-overlay" @click="closeMenu"></div>
  </header>
</template>

<script>
import { onMounted, onUnmounted, ref, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "Header",
  setup() {
    const scrolled = ref(false);
    const store = useStore();
    const router = useRouter();
    const isMenuOpen = ref(false);
    const isLoggedIn = ref(localStorage.getItem("isLoggedIn") === "true");

    // 언어 선택 상태 관리
    const defaultLanguage = localStorage.getItem("selectedLanguage") || "ko-KR";
    const selectedLanguage = ref(defaultLanguage);

    watch(
      () => selectedLanguage.value,
      (newLang) => {
        localStorage.setItem("selectedLanguage", newLang);
        window.location.reload(); // 페이지를 새로고침하여 언어 변경 적용
      }
    );

    watch(
      () => store.getters["auth/isLoggedIn"],
      (newVal) => {
        isLoggedIn.value = newVal;
        localStorage.setItem("isLoggedIn", newVal);
      },
      { immediate: true }
    );

    const handleScroll = () => {
      scrolled.value = window.scrollY > 50;
    };

    const navigateHome = () => {
      router.push("/");
    };

    const logout = () => {
      store.dispatch("auth/logout");
      localStorage.removeItem("isLoggedIn");
      router.push("/signin");
    };

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };

    const closeMenu = () => {
      isMenuOpen.value = false;
    };

    const changeLanguage = () => {};

    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    return {
      scrolled,
      isLoggedIn,
      isMenuOpen,
      navigateHome,
      logout,
      toggleMenu,
      closeMenu,
      selectedLanguage,
      changeLanguage,
    };
  },
};
</script>

<style scoped>
.header {
  /*position: fixed; /* 화면 상단에 고정 */
  top: 0;
  left: 0;
  width: 100%; /* 전체 너비로 설정 */
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.5s, opacity 0.5s;
  background-color: black;
  z-index: 1000; /* 다른 요소보다 앞에 표시 */
}
.header:hover {
  background-color: #4b4b4b;
  border-radius: 8px;
}
.logo img {
  height: 40px;
  cursor: pointer;
}
nav {
  display: flex;
  gap: 10px;
  padding: 10px 20px;
  transition: background-color 0.3s;
  align-items: center; /* 수직 정렬 추가 */
}
nav a,
nav button {
  margin: 0 10px;
  text-decoration: none;
  color: #fff;
  transition: color 0.3s;
}
nav a:hover {
  color: #45f3ff;
}
nav button {
  padding: 5px 10px;
  cursor: pointer;
  background-color: #4b4b4b;
  border: none;
  border-radius: 4px;
  color: black;
  transition: background-color 0.3s;
}
nav button:hover {
  background-color: #e2e2e2;
}
nav select {
  margin-left: 10px;
  padding: 5px;
  background-color: #4b4b4b;
  color: #fff;
  border: none;
  border-radius: 4px;
}
nav select option {
  background-color: #4b4b4b;
  color: #fff;
}
.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
  z-index: 1001; /* 메뉴 오버레이 위에 표시되도록 z-index 추가 */
}
.hamburger span {
  display: block;
  width: 20px;
  height: 2px;
  background-color: #4b4b4b;
}

@media (max-width: 768px) {
  nav {
    display: none;
  }
  .hamburger {
    display: flex;
  }
  nav.open {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    right: 0;
    width: 250px;
    height: 100%;
    background-color: #23242a;
    padding: 20px;
    gap: 15px;
    z-index: 1002;
  }
  nav.open a,
  nav.open button,
  nav.open select {
    margin-bottom: 10px;
    font-size: 1.2em;
  }
}
nav.open .nav-left,
nav.open .nav-right {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}
.menu-overlay {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1001;
}
</style>
