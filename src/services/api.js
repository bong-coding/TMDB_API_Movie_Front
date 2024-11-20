// src/services/api.js
import axios from "axios";

const apiKey = process.env.VUE_APP_TMDB_API_KEY; // .env 파일에 API 키 저장

// 선택한 언어 가져오기
const selectedLanguage = localStorage.getItem("selectedLanguage") || "ko-KR";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: apiKey,
    language: selectedLanguage, 
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터 (필요 시)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
