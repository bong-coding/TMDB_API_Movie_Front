<!-- src/views/Home.vue -->
<template>
  <div class="home">
    <!-- 인기 영화 섹션 -->
    <section class="movie-section">
      <h2>인기 영화</h2>
      <div class="movies-container">
        <MovieCard
          v-for="movie in popularMovies"
          :key="movie.id"
          :movie="movie"
        />
      </div>
    </section>

    <!-- 최신 영화 섹션 -->
    <section class="movie-section">
      <h2>최신 영화</h2>
      <div class="movies-container">
        <MovieCard
          v-for="movie in nowPlayingMovies"
          :key="movie.id"
          :movie="movie"
        />
      </div>
    </section>

    <!-- 액션 영화 섹션 -->
    <section class="movie-section">
      <h2>액션 영화</h2>
      <div class="movies-container">
        <MovieCard
          v-for="movie in actionMovies"
          :key="movie.id"
          :movie="movie"
        />
      </div>
    </section>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import MovieCard from "../components/common/MovieCard.vue";
import api from "../services/api";

export default {
  name: "Home",
  components: {
    MovieCard,
  },
  setup() {
    const popularMovies = ref([]);
    const nowPlayingMovies = ref([]);
    const actionMovies = ref([]);
    const loading = ref(false);
    const error = ref(null);

    const fetchMovies = async () => {
      loading.value = true;
      try {
        // 인기 영화 가져오기
        const popularResponse = await api.get("/movie/popular");
        popularMovies.value = popularResponse.data.results;

        // 최신 영화 가져오기
        const nowPlayingResponse = await api.get("/movie/now_playing");
        nowPlayingMovies.value = nowPlayingResponse.data.results;

        // 액션 영화 가져오기 (장르 ID: 28)
        const actionResponse = await api.get("/discover/movie", {
          params: {
            with_genres: 28,
          },
        });
        actionMovies.value = actionResponse.data.results;
      } catch (err) {
        error.value = err;
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      fetchMovies();
    });

    return {
      popularMovies,
      nowPlayingMovies,
      actionMovies,
      loading,
      error,
    };
  },
};
</script>

<style scoped>
.home {
  background-color: black; /* 메인 페이지 배경색을 검정색으로 설정 */
  color: white;
  padding: 20px;
}
.movie-section {
  margin-bottom: 40px;
}
.movies-container {
  display: flex;
  overflow-x: auto; /* 가로 스크롤 활성화 */
  padding-bottom: 10px;
}
.movies-container::-webkit-scrollbar {
  display: none; /* 스크롤바 숨기기 (선택 사항) */
}
.movie-card {
  flex: 0 0 auto;
  margin-right: 10px;
}
</style>
