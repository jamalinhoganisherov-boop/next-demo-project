"use client";

import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import MovieCard from "./MovieCard";
import GenreBtn from "./GenreBtn";

export default function MoviesCarousel({ initialMovies = [] }) {
  const [movies, setMovies] = useState(initialMovies);
  const [genres, setGenres] = useState([]);
  const [selectedGenreId, setSelectedGenreId] = useState(null);

  useEffect(() => {
    // load list of genres once
    fetch("/api/genres")
      .then((res) => res.json())
      .then((data) => {
        setGenres(data.genres || []);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const url = selectedGenreId
      ? `/api/movies?genre=${selectedGenreId}`
      : "/api/movies";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results || []);
      })
      .catch(console.error);
  }, [selectedGenreId]);

  const handleGenreSelect = (id) => {
    setSelectedGenreId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="w-full px-6 mt-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-white">Movies</h2>
      </div>

      <GenreBtn
        genres={genres}
        selectedGenreId={selectedGenreId}
        onSelect={handleGenreSelect}
      />

      <div className="relative mt-6">
        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={24}
          slidesPerView="auto"
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          navigation={{
            nextEl: ".swiper-button-next-movies",
            prevEl: ".swiper-button-prev-movies",
          }}
          className="py-4"
        >
          {movies.map((m) => (
            <SwiperSlide key={m.id} style={{ width: "200px" }}>
              <MovieCard movie={m} />
            </SwiperSlide>
          ))}
        </Swiper>
        <button className="swiper-button-prev-movies absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 rounded-full hover:bg-black/70">
          &#8592;
        </button>
        <button className="swiper-button-next-movies absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 rounded-full hover:bg-black/70">
          &#8594;
        </button>
      </div>
    </section>
  );
}
