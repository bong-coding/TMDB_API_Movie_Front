<!-- src/views/Home.vue -->
<template>
  <div class="home">
    <!-- 배너 섹션 -->
    <section
      class="banner"
      :style="{ backgroundImage: `url(${bannerImageUrl})` }"
    >
      <div class="banner-overlay"></div>
      <div class="banner-content">
        <h1>{{ bannerTitle }}</h1>
        <p>{{ bannerOverview }}</p>
        <div class="banner-buttons">
          <button @click="playMovie">재생</button>
          <button @click="viewDetails">상세 정보</button>
        </div>
      </div>
    </section>

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

    // 배너용 데이터
    const bannerImageUrl = ref("");
    const bannerTitle = ref("");
    const bannerOverview = ref("");

    // 각 컨테이너에 대한 ref 정의
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

        // 배너 영화 설정 (인기 영화 중 첫 번째 영화 사용)
        const bannerMovie = popularMovies.value[0];
        bannerImageUrl.value = `https://image.tmdb.org/t/p/original${bannerMovie.backdrop_path}`;
        bannerTitle.value = bannerMovie.title;
        bannerOverview.value = bannerMovie.overview;
      } catch (err) {
        error.value = err;
      } finally {
        loading.value = false;
      }
    };

    // 배너 버튼 기능 (구현 필요 시 추가)
    const playMovie = () => {
      console.log("재생 버튼 클릭");
    };

    const viewDetails = () => {
      console.log("상세 정보 버튼 클릭");
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
      bannerImageUrl,
      bannerTitle,
      bannerOverview,
      playMovie,
      viewDetails,
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
  background-color: black;
  color: white;
  padding: 20px;
}

/* 배너 스타일 */
.banner {
  position: relative;
  display: flex;
  align-items: center;
  height: 500px;
  margin-bottom: 40px;
  background-size: cover;
  background-position: center;
  padding-left: 40px; /* 왼쪽 여백 추가 */
}

.banner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 어두운 오버레이 추가 */
  z-index: 1;
}

.banner-content {
  position: relative;
  color: white;
  text-align: left;
  max-width: 600px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.banner-content h1 {
  font-size: 3em;
  margin-bottom: 10px;
}

.banner-content p {
  font-size: 1.2em;
  margin-bottom: 20px;
}

.banner-buttons {
  display: flex;
  gap: 10px;
}

.banner-buttons button {
  padding: 10px 30px; /* 버튼 크기 조정 */
  cursor: pointer;
  background-color: #ffffff;
  border: none;
  border-radius: 4px;
  color: black;
  font-weight: bold;
  transition: background-color 0.3s;
}

.banner-buttons button:hover {
  background-color: #e6e6e6;
}

/* 영화 섹션 스타일 */
.movie-section {
  margin-bottom: 40px;
}

.movies-container {
  display: flex;
  overflow-x: auto;
  padding-bottom: 10px;
  scroll-behavior: smooth;
}

.movies-container::-webkit-scrollbar {
  height: 8px;
}

.movies-container::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
}

.movie-card {
  flex: 0 0 auto;
  margin-right: 10px;
}
</style>
