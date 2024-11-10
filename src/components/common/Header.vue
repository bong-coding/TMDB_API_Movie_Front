// src/components/common/Header.vue
<template>
  <header :class="['header', { scrolled }]">
    <div class="logo" @click="navigateHome">
      <img src="@/assets/images/logo.png" alt="Logo" />
    </div>
    <nav>
      <router-link to="/">홈</router-link>
      <router-link to="/popular">대세 콘텐츠</router-link>
      <router-link to="/search">찾아보기</router-link>
      <router-link to="/wishlist">찜 목록</router-link>
      <router-link v-if="!isLoggedIn" to="/signin">로그인</router-link>
      <button v-else @click="logout">로그아웃</button>
    </nav>
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

    // 로그인 상태를 localStorage에서 바로 확인
    const isLoggedIn = ref(localStorage.getItem("isLoggedIn") === "true");

    // 로그인 상태를 watch로 반응형으로 설정
    watch(
      () => store.getters["auth/isLoggedIn"],
      (newVal) => {
        isLoggedIn.value = newVal;
        localStorage.setItem("isLoggedIn", newVal); // localStorage에 상태 저장
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
      localStorage.removeItem("isLoggedIn"); // 로그아웃 시 localStorage에서 상태 삭제
      router.push("/signin");
    };

    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    return {
      scrolled,
      isLoggedIn,
      navigateHome,
      logout,
    };
  },
};
</script>

<style scoped>
/* 기존 스타일 유지 */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  transition: background-color 0.5s, opacity 0.5s;
  background-color: #23242a;
}
.header.scrolled {
  background-color: rgba(0, 0, 0, 0.8);
  opacity: 0.95;
}
.logo img {
  height: 40px;
  cursor: pointer;
}
nav a {
  margin: 0 10px;
  text-decoration: none;
  color: #fff;
  transition: color 0.3s;
}
nav a:hover {
  color: #42b983;
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
</style>
