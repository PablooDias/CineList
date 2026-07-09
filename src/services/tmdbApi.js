const API_KEY = '1caf27335cc24c504ab61bf1fb5e5c75';
const BASE_URL = 'https://api.themoviedb.org/3';

export const getPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR`);
  const data = await response.json();
  return data.results;
};

export const searchMovies = async (query) => {
  const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&language=pt-BR`);
  const data = await response.json();
  return data.results;
};

export const getMovieDetails = async (movieId) => {
  const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=pt-BR`);
  return response.json();
};