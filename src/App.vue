<!-- src/App.vue -->
<template>
  <div id="app">
    <Header />
    <!-- Header 컴포넌트 포함 -->
    <router-view />
    <Footer />
    <!-- Footer 컴포넌트 포함 -->

    <!-- MovieCard를 App.vue에서 직접 사용 (테스트용) -->
    <div class="test-movie-card">
      <MovieCard :movie="testMovie" />
    </div>
  </div>
</template>

<script>
import Header from "./components/common/Header.vue";
import Footer from "./components/common/Footer.vue";
import MovieCard from "./components/common/MovieCard.vue";

export default {
  name: "App",
  components: {
    Header,
    Footer,
    MovieCard,
  },
  data() {
    return {
      testMovie: {
        id: 1,
        title: "Test Movie",
        overview:
          "This is a test movie overview to demonstrate the MovieCard component.",
        poster_path: "/testposter.jpg",
      },
    };
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.test-movie-card {
  margin: 20px;
}
</style>
