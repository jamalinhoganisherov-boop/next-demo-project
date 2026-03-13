"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link"; // [Step 1] Added Link
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import MovieCard from "./MovieCard";
import GenreBtn from "./GenreBtn";

export default function SeriesCarousel({ series: externalSeries, initialSeries = [], isGrid = false }) {
  const [series, setSeries] = useState(initialSeries);
  const [genres, setGenres] = useState([]);
  const [selectedGenreId, setSelectedGenreId] = useState(null);

  const displaySeries = externalSeries && externalSeries.length ? externalSeries : series;

  useEffect(() => {
    if (externalSeries && externalSeries.length) return;

    fetch("/api/genres?type=tv")
      .then((res) => res.json())
      .then((data) => setGenres(data.genres || []))
      .catch(console.error);
  }, [externalSeries]);

  useEffect(() => {
    if (externalSeries && externalSeries.length) return;

    const url = selectedGenreId
      ? `/api/series?genre=${selectedGenreId}`
      : "/api/trending?type=tv";
    fetch(url)
      .then((res) => res.json())
      .then((data) => setSeries(data.results || []))
      .catch(console.error);
  }, [selectedGenreId, externalSeries]);

  const handleGenreSelect = (id) => {
    setSelectedGenreId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="w-full px-6 mt-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-white italic">Series</h2>
        {isGrid && <span className="text-gray-500 text-sm">{displaySeries.length} results</span>}
      </div>

      {!isGrid && <GenreBtn
        genres={genres}
        selectedGenreId={selectedGenreId}
        onSelect={handleGenreSelect}
      />}

      {isGrid ? (
        /* GRID MODE for Series Page */
        <div className="flex flex-wrap gap-8 justify-center sm:justify-start mt-10">
          {displaySeries.map((s) => (
            <Link href={`/series/${s.id}`} key={s.id} className="w-[200px] transition-transform hover:scale-105">
              <MovieCard movie={s} />
            </Link>
          ))}
        </div>
      ) : (
        /* CAROUSEL MODE for Home Page */
        <div className="relative mt-6">
          <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={24}
            slidesPerView="auto"
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            navigation={{
              nextEl: ".swiper-button-next-series",
              prevEl: ".swiper-button-prev-series",
            }}
            className="py-4"
          >
            {displaySeries.map((s) => (
              <SwiperSlide key={s.id} style={{ width: "200px" }}>
                <Link href={`/series/${s.id}`}>
                  <div className="cursor-pointer">
                    <MovieCard movie={s} />
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          <button className="swiper-button-prev-series absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-black/70">
            &#8592;
          </button>
          <button className="swiper-button-next-series absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-black/70">
            &#8594;
          </button>
        </div>
      )}
    </section>
  );
}