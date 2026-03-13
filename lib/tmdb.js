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

export async function fetchPersonByName(name) {
  if (!name) return null;
  const res = await fetch(buildUrl(`/search/person`, { query: name, page: 1 }));
  if (!res.ok) throw new Error("failed to fetch person by name");
  const data = await res.json();
  return data?.results?.[0]?.id || null;
}

export async function fetchMoviesBySearch(query = "", page = 1) {
  if (!query) return { results: [] };
  const res = await fetch(buildUrl(`/search/movie`, { query, page }));
  if (!res.ok) throw new Error("failed to search movies");
  return res.json();
}

export async function fetchSeriesBySearch(query = "", page = 1) {
  if (!query) return { results: [] };
  const res = await fetch(buildUrl(`/search/tv`, { query, page }));
  if (!res.ok) throw new Error("failed to search series");
  return res.json();
}

export async function fetchAdvancedMovies({
  genreId,
  year,
  page = 1,
  castId,
  crewId,
  originLanguage,
}) {
  try {
    const params = {
      page,
      sort_by: "popularity.desc",
      primary_release_year: year || undefined,
      with_genres: genreId || undefined,
      with_cast: castId || undefined,
      with_crew: crewId || undefined,
      with_original_language: originLanguage || undefined,
    };

    const res = await fetch(buildUrl("/discover/movie", params));
    if (!res.ok) {
      console.error("TMDB Discover API Error");
      return { results: [] };
    }
    return res.json();
  } catch (error) {
    console.error("Failed to fetch advanced movies:", error);
    return { results: [] };
  }
}

export async function fetchAdvancedSeries({
  genreId,
  year,
  page = 1,
  castId,
  crewId,
  originLanguage,
}) {
  try {
    const params = {
      page,
      sort_by: "popularity.desc",
      first_air_date_year: year || undefined,
      with_genres: genreId || undefined,
      with_cast: castId || undefined,
      with_crew: crewId || undefined,
      with_original_language: originLanguage || undefined,
    };
    const res = await fetch(buildUrl("/discover/tv", params));
    if (!res.ok) {
      console.error("TMDB Discover API Error");
      return { results: [] };
    }
    return res.json();
  } catch (error) {
    console.error("Failed to fetch advanced series:", error);
    return { results: [] };
  }
}

// Get cast (Characters) and crew (Director)
export async function fetchMovieCredits(id) {
  const res = await fetch(buildUrl(`/movie/${id}/credits`));
  if (!res.ok) throw new Error(`failed to fetch credits for ${id}`);
  return res.json();
}

// Get suggested movies based on the current one
export async function fetchSimilarMovies(id) {
  const res = await fetch(buildUrl(`/movie/${id}/similar`));
  if (!res.ok) throw new Error(`failed to fetch similar movies for ${id}`);
  return res.json();
}

// Get screenshots for the hero section
export async function fetchMovieImages(id) {
  const res = await fetch(buildUrl(`/movie/${id}/images`));
  if (!res.ok) throw new Error(`failed to fetch images for ${id}`);
  return res.json();
}

// Get trailers/videos for the movie
export async function fetchMovieVideos(id) {
  const res = await fetch(buildUrl(`/movie/${id}/videos`));
  if (!res.ok) throw new Error(`failed to fetch videos for movie ${id}`);
  return res.json();
}

// Get trailers/videos for the TV show
export async function fetchTVVideos(id) {
  const res = await fetch(buildUrl(`/tv/${id}/videos`));
  if (!res.ok) throw new Error(`failed to fetch videos for tv ${id}`);
  return res.json();
}

export async function fetchTrendingPersons() {
  const res = await fetch(buildUrl(`/trending/person/week`));
  if (!res.ok) throw new Error("failed to fetch trending persons");
  return res.json();
}

// Add these to lib/tmdb.js if you don't have them
export async function fetchTV(id) {
  const res = await fetch(buildUrl(`/tv/${id}`));
  if (!res.ok) throw new Error(`failed to fetch series ${id}`);
  return res.json();
}

export async function fetchTVCredits(id) {
  const res = await fetch(buildUrl(`/tv/${id}/credits`));
  if (!res.ok) throw new Error(`failed to fetch tv credits for ${id}`);
  return res.json();
}

export async function fetchSimilarTV(id) {
  const res = await fetch(buildUrl(`/tv/${id}/similar`));
  if (!res.ok) throw new Error(`failed to fetch similar tv for ${id}`);
  return res.json();
}

export async function fetchTVImages(id) {
  const res = await fetch(buildUrl(`/tv/${id}/images`));
  if (!res.ok) throw new Error(`failed to fetch tv images for ${id}`);
  return res.json();
}

export function getImageUrl(path, size = "w500") {
  if (!path) return null;
  return `${IMAGE_BASE}/${size}${path}`;
}

export { IMAGE_BASE };
