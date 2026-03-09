// helpers for interacting with TMDB API

const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p";

function buildUrl(path, params = {}) {
  const url = new URL(`${BASE_URL}${path}`);
  url.searchParams.set("api_key", process.env.TMDB_API_KEY);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) url.searchParams.set(k, v);
  });
  return url.toString();
}

export async function fetchTrending(type = "movie", timeWindow = "day") {
  const res = await fetch(buildUrl(`/trending/${type}/${timeWindow}`));
  if (!res.ok) throw new Error("failed to fetch trending");
  return res.json();
}

export async function fetchGenres(type = "movie") {
  const res = await fetch(buildUrl(`/genre/${type}/list`));
  if (!res.ok) throw new Error("failed to fetch genres");
  return res.json();
}

export async function fetchMovie(id) {
  const res = await fetch(buildUrl(`/movie/${id}`));
  if (!res.ok) throw new Error(`failed to fetch movie ${id}`);
  return res.json();
}

export async function fetchPopularMovies(page = 1) {
  const res = await fetch(buildUrl(`/movie/popular`, { page }));
  if (!res.ok) throw new Error("failed to fetch popular movies");
  return res.json();
}

export async function fetchMoviesByGenre(genreId, page = 1) {
  const res = await fetch(
    buildUrl(`/discover/movie`, { with_genres: genreId, page }),
  );
  if (!res.ok) throw new Error("failed to fetch movies by genre");
  return res.json();
}

export async function fetchSeriesByGenre(genreId, page = 1) {
  const res = await fetch(
    buildUrl(`/discover/tv`, { with_genres: genreId, page }),
  );
  if (!res.ok) throw new Error("failed to fetch series by genre");
  return res.json();
}

export function getImageUrl(path, size = "w500") {
  if (!path) return null;
  return `${IMAGE_BASE}/${size}${path}`;
}

export { IMAGE_BASE };
