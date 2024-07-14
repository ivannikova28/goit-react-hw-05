import axios from "axios";


const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2N2JkNmFiZmU5MmZiZDQ5MjViMDJkMDBlZGU3MzlhMCIsIm5iZiI6MTcyMDk3NzY5OC4yOTc3NDQsInN1YiI6IjY2OTQwNzFhYjI1NjZkNTEwYTg4ZDA1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.l1efsGaurI3wQB4jXZDklSAa3BhvU1rAKi3wM1TEWtA'
const authorizationToken = `Bearer ${accessToken}`

const baseURL = 'https://api.themoviedb.org/3/';

const instanceTMDBAxios = axios.create({ baseURL })


instanceTMDBAxios.interceptors.request.use(config => {
  config.headers = config.headers || {};
  config.headers.Authorization = authorizationToken
  return config
})



const endpoints = {
  movie: 'movie',
  trending: 'trending/movie/day',
  search: 'search/movie',
  movieId: (id) => `movie/${id}`
}

export const apiTMDBService = {
  moviesTrends: async () => {
    const response = await instanceTMDBAxios.get(endpoints.trending);

    return response.data;
  },

  searchMovie: async ({ query }) => {
    const response = await instanceTMDBAxios.get(`${endpoints.search}?query=${query}&include_adult=false&language=en-US`);

    return response.data;
  },

  movieDetails: async (id) => {
    const response = await instanceTMDBAxios.get(`${endpoints.movieId(id)}?language=en-US`);

    return response.data;
  },

  movieReviews: async (id) => {
    const response = await instanceTMDBAxios.get(`${endpoints.movieId(id)}/reviews?language=en-US&page=1`);

    return response.data;
  },

  movieCast: async (id) => {
    const response = await instanceTMDBAxios.get(`${endpoints.movieId(id)}/credits?language=en-US`);

    return response.data;
  },
}