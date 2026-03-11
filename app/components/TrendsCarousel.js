"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import MovieCard from "./MovieCard";

export default function TrendsCarousel({ movies = [] }) {
  return (
    <section className="px-6 mt-12  bg-[#030A1B]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-white">Trends</h2>
        <a href="/movies" className="text-blue-400 hover:text-blue-300">
          See More →
        </a>
      </div>

      <div className="relative">
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
            nextEl: ".swiper-button-next-trends",
            prevEl: ".swiper-button-prev-trends",
          }}
          className="py-4"
        >
          {movies.map((m) => (
            <SwiperSlide key={m.id} style={{ width: "200px" }}>
              <MovieCard movie={m} />
            </SwiperSlide>
          ))}
        </Swiper>
        <button className="swiper-button-prev-trends absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 rounded-full hover:bg-black/70">
          &#8592;
        </button>
        <button className="swiper-button-next-trends absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 rounded-full hover:bg-black/70">
          &#8594;
        </button>
      </div>
    </section>
  );
}
