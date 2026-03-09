import React from "react";
import MoviesCarousel from "../components/MoviesCarousel";
import { fetchTrending } from "../../lib/tmdb";

export default async function page() {
  const data = await fetchTrending("movie");
  const movies = data?.results || [];

  return <MoviesCarousel initialMovies={movies} />;
}
