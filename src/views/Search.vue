<!-- src/views/Search.vue -->
<template>
  <div class="search">
    <h1>Search Movies</h1>
    <div class="search-bar">
      <input
        type="text"
        v-model="query"
        placeholder="Search for movies..."
        @keyup.enter="searchMovies"
      />
      <button @click="searchMovies">Search</button>
      <button @click="resetFilters">Reset Filters</button>
    </div>
    <div class="filters">
      <label for="genre">Genre:</label>
      <select v-model="selectedGenre" id="genre">
        <option value="">All</option>
        <option v-for="genre in genres" :key="genre.id" :value="genre.id">
          {{ genre.name }}
        </option>
      </select>

      <label for="sort">Sort By:</label>
      <select v-model="selectedSort" id="sort">
        <option value="">Default</option>
        <option value="popularity.desc">Popularity Descending</option>
        <option value="release_date.desc">Release Date Descending</option>
      </select>
    </div>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="error" class="error">Error loading movies.</div>
    <div v-else class="movies-grid">
      <MovieCard
        v-for="movie in filteredMovies"
        :key="movie.id"
        :movie="movie"
      />
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed, watch } from "vue";
import { useFetch } from "../hooks/useFetch";
import MovieCard from "../components/common/MovieCard.vue";
import api from "../services/api";

export default {
  name: "Search",
  components: {
    MovieCard,
  },
  setup() {
    const query = ref("");
    const genres = ref([]);
    const selectedGenre = ref("");
    const selectedSort = ref("");
    const params = ref({});
    const { data, error, loading } = useFetch("/search/movie", params);
    const movies = ref([]);

    const fetchGenres = async () => {
      try {
        const response = await api.get("/genre/movie/list");
        genres.value = response.data.genres;
      } catch (err) {
        error.value = err;
      }
    };

    const searchMovies = () => {
      if (!query.value) return;
      params.value = {
        query: query.value,
      };
    };

    const resetFilters = () => {
      query.value = "";
      selectedGenre.value = "";
      selectedSort.value = "";
      movies.value = [];
      params.value = {};
    };

    watch(data, (newData) => {
      if (newData) {
        movies.value = newData.results;
      }
    });

    const filteredMovies = computed(() => {
      let filtered = movies.value;
      if (selectedGenre.value) {
        filtered = filtered.filter((movie) =>
          movie.genre_ids.includes(parseInt(selectedGenre.value))
        );
      }
      if (selectedSort.value) {
        const [key, order] = selectedSort.value.split(".");
        filtered = filtered.slice().sort((a, b) => {
          if (a[key] < b[key]) return order === "asc" ? -1 : 1;
          if (a[key] > b[key]) return order === "asc" ? 1 : -1;
          return 0;
        });
      }
      return filtered;
    });

    onMounted(() => {
      fetchGenres();
    });

    return {
      query,
      genres,
      selectedGenre,
      selectedSort,
      searchMovies,
      resetFilters,
      filteredMovies,
      loading,
      error,
    };
  },
};
</script>

<style scoped>
.search {
  padding: 20px;
}
.search-bar {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
.search-bar input {
  width: 300px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.search-bar button {
  padding: 10px 20px;
  margin-left: 10px;
  cursor: pointer;
  border: none;
  background-color: #42b983;
  color: white;
  border-radius: 4px;
  transition: background-color 0.3s;
}
.search-bar button:hover {
  background-color: #369870;
}
.filters {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}
.filters label {
  margin: 0 10px;
}
.filters select {
  padding: 5px 10px;
  margin-right: 20px;
  border-radius: 4px;
}
.loading,
.error {
  text-align: center;
  font-size: 1.2em;
  margin-top: 50px;
}
.movies-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
