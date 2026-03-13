"use client";

import React, { useEffect, useState } from "react";
import { AdvanceSearch } from "../components/AdvanceSearch";
import MoviesCarousel from "../components/MoviesCarousel";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInitial() {
      setLoading(true);
      try {
        const res = await fetch("/api/movies");
        const data = await res.json();
        setMovies(data.results || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchInitial();
  }, []);

  return (
    <div className="min-h-screen bg-[#030A1B]">
      <AdvanceSearch mode="movie" initialResults={movies} onResults={setMovies} />

      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-8">
            <MoviesCarousel
              movies={movies}
              isGrid={true}
            />
            {!loading && movies.length === 0 && (
              <p className="text-center text-gray-300">No movies found for current filters.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

