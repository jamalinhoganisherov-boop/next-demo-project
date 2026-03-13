"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import MovieCard from "./MovieCard";
import GenreBtn from "./GenreBtn";

export default function MoviesCarousel({ movies: externalMovies, initialMovies = [], isGrid = false }) {
  const [movies, setMovies] = useState(initialMovies);
  const [genres, setGenres] = useState([]);
  const [selectedGenreId, setSelectedGenreId] = useState(null);

  const displayMovies = externalMovies && externalMovies.length ? externalMovies : movies;

  useEffect(() => {
    if (externalMovies && externalMovies.length) return;

    fetch("/api/genres")
      .then((res) => res.json())
      .then((data) => setGenres(data.genres || []))
      .catch(console.error);
  }, [externalMovies]);

  useEffect(() => {
    if (externalMovies && externalMovies.length) return;

    const url = selectedGenreId
      ? `/api/movies?genre=${selectedGenreId}`
      : "/api/movies";
    fetch(url)
      .then((res) => res.json())
      .then((data) => setMovies(data.results || []))
      .catch(console.error);
  }, [selectedGenreId, externalMovies]);

  const handleGenreSelect = (id) => {
    setSelectedGenreId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="w-full px-6 mt-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-white italic">Movies</h2>
        {isGrid && <span className="text-gray-500 text-sm">{displayMovies.length} results</span>}
      </div>

      {/* Genre Container with Figma-style styling */}
      {!isGrid && <div className={`${isGrid ? "mb-10" : "mb-4"}`}>
        <GenreBtn
          genres={genres}
          selectedGenreId={selectedGenreId}
          onSelect={handleGenreSelect}
        />
      </div>}

      {isGrid ? (
        /* GRID MODE: Matches Figma layout */
        <div className="flex flex-wrap gap-8 justify-center lg:justify-start">
          {displayMovies.map((m) => (
            <Link href={`/movies/${m.id}`} key={m.id} className="w-[200px] transition-transform hover:scale-105">
              <MovieCard movie={m} />
            </Link>
          ))}
        </div>
      ) : (
        /* SLIDER MODE: Keep your existing Swiper */
        <div className="relative mt-6">
          <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={24}
            slidesPerView="auto"
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            navigation={{
              nextEl: ".swiper-button-next-movies",
              prevEl: ".swiper-button-prev-movies",
            }}
            className="py-4"
          >
            {displayMovies.map((m) => (
              <SwiperSlide key={m.id} style={{ width: "200px" }}>
                <Link href={`/movies/${m.id}`}>
                  <div className="cursor-pointer">
                    <MovieCard movie={m} />
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          <button className="swiper-button-prev-movies absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 rounded-full text-white">
            &#8592;
          </button>
          <button className="swiper-button-next-movies absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 rounded-full text-white">
            &#8594;
          </button>
        </div>
      )}
    </section>
  );
}