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
          <button @click="togglePlayModal(true)">재생</button>
          <button @click="toggleModal(true)">상세 정보</button>
        </div>
      </div>
    </section>

    <!-- 상세 정보 모달 창 -->
    <div v-if="isModalOpen" class="modal-overlay" @click="toggleModal(false)">
      <div class="modal-content" @click.stop>
        <h2>{{ bannerTitle }} - 줄거리</h2>
        <p>{{ bannerOverview }}</p>
        <button @click="toggleModal(false)">닫기</button>
      </div>
    </div>

    <!-- 재생 모달 창 -->
    <div
      v-if="isPlayModalOpen"
      class="modal-overlay"
      @click="togglePlayModal(false)"
    >
      <div class="modal-content" @click.stop>
        <h2>알림</h2>
        <p>짭플렉스는 재생을 지원하지 않습니다</p>
        <button @click="togglePlayModal(false)">닫기</button>
      </div>
    </div>

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
    const isModalOpen = ref(false); // 상세 정보 모달 상태
    const isPlayModalOpen = ref(false); // 재생 모달 상태

    // 각 컨테이너에 대한 ref 정의
    const popularContainer = ref(null);
    const nowPlayingContainer = ref(null);
    const actionContainer = ref(null);

    const toggleModal = (state) => {
      isModalOpen.value = state;
    };

    const togglePlayModal = (state) => {
      isPlayModalOpen.value = state;
    };

    const fetchMovies = async () => {
      loading.value = true;
      try {
        // 인기 영화 가져오기
        const popularResponse = await api.get("/movie/popular");
        popularMovies.value = popularResponse.data.results;

        // 최신 영화 가져오기
        const nowPlayingResponse = await api.get("/movie/now_playing");
        nowPlayingMovies.value = nowPlayingResponse.data.results;

        // 액션 영화 가져오기
        const actionResponse = await api.get("/discover/movie", {
          params: { with_genres: 28 },
        });
        actionMovies.value = actionResponse.data.results;

        // 배너 영화 설정 (인기 영화 중 첫 번째 영화 사용)
        const bannerMovie = popularMovies.value[5];
        bannerImageUrl.value = `https://image.tmdb.org/t/p/original${bannerMovie.backdrop_path}`;
        bannerTitle.value = bannerMovie.title;
        bannerOverview.value = bannerMovie.overview;
      } catch (err) {
        error.value = err;
      } finally {
        loading.value = false;
      }
    };

    const handleWheel = (event, containerName) => {
      const containerMap = {
        popularContainer,
        nowPlayingContainer,
        actionContainer,
      };
      const container = containerMap[containerName];
      if (container.value) {
        container.value.scrollLeft += event.deltaY * 3;
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
      isModalOpen,
      isPlayModalOpen,
      toggleModal,
      togglePlayModal,
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
  background-color: #4b4b4b;
  border: none;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  transition: background-color 0.3s;
}

.banner-buttons button:hover {
  background-color: #e6e6e6;
}

/* 모달 스타일 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 80%;
  color: black;
}

.modal-content h2 {
  margin-bottom: 10px;
}

.modal-content button {
  margin-top: 15px;
  padding: 8px 20px;
  cursor: pointer;
  border: none;
  background-color: #4b4b4b;
  color: white;
  border-radius: 4px;
}

.modal-content button:hover {
  background-color: #333;
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
