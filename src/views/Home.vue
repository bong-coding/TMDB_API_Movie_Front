<!-- src/views/Home.vue -->
<template>
  <div class="home">
    <!-- 인기 영화 섹션 -->
    <section class="movie-section">
      <h2>인기 영화</h2>
      <div
        class="movies-container"
        ref="popularContainer"
        @wheel.prevent="handleWheel($event, 'popularContainer')"
      >
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
      <div
        class="movies-container"
        ref="nowPlayingContainer"
        @wheel.prevent="handleWheel($event, 'nowPlayingContainer')"
      >
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
      <div
        class="movies-container"
        ref="actionContainer"
        @wheel.prevent="handleWheel($event, 'actionContainer')"
      >
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

    // 각 컨테이너에 대한 ref 추가
    const popularContainer = ref(null);
    const nowPlayingContainer = ref(null);
    const actionContainer = ref(null);

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

    // 마우스 휠 이벤트 핸들러 추가
    const handleWheel = (event, containerName) => {
      const containerMap = {
        popularContainer,
        nowPlayingContainer,
        actionContainer,
      };
      const container = containerMap[containerName];

      if (container.value) {
        container.value.scrollLeft += event.deltaY;
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
      popularContainer,
      nowPlayingContainer,
      actionContainer,
      handleWheel,
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
  scroll-behavior: smooth; /* 부드러운 스크롤 효과 */
}
.movies-container::-webkit-scrollbar {
  height: 8px; /* 스크롤바 높이 설정 */
}
.movies-container::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.3); /* 스크롤바 색상 */
  border-radius: 4px;
}
.movie-card {
  flex: 0 0 auto;
  margin-right: 10px;
}
</style>
