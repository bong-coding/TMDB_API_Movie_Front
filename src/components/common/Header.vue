<!-- src/components/common/Header.vue -->
<template>
  <header :class="['header', { scrolled }]">
    <div class="logo" @click="navigateHome">
      <img src="@/assets/images/logo.png" alt="Logo" />
    </div>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/popular">Popular</router-link>
      <router-link to="/search">Search</router-link>
      <router-link to="/wishlist">Wishlist</router-link>
      <router-link to="/signin" v-if="!isLoggedIn">Sign In</router-link>
      <button @click="logout" v-else>Logout</button>
    </nav>
  </header>
</template>

<script>
import { onMounted, onUnmounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "Header",
  setup() {
    const scrolled = ref(false);
    const store = useStore();
    const router = useRouter();

    const isLoggedIn = store.getters["auth/isLoggedIn"];
    const user = store.getters["auth/user"];

    const handleScroll = () => {
      scrolled.value = window.scrollY > 50;
    };

    const navigateHome = () => {
      router.push("/");
    };

    const logout = () => {
      store.dispatch("auth/logout");
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
      user,
      navigateHome,
      logout,
    };
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  transition: background-color 0.5s, opacity 0.5s;
  background-color: black;
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
  background-color: #ff4d4f;
  border: none;
  border-radius: 4px;
  color: white;
  transition: background-color 0.3s;
}
nav button:hover {
  background-color: #ff7875;
}
</style>
