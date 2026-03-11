"use client";
import React from "react";
import Link from "next/link"; // 1. Import Link for navigation
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
        <Link href="/movies" className="text-blue-400 hover:text-blue-300">
          See More →
        </Link>
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
              {/* 2. Wrap the card in a Link to the dynamic ID page */}
              <Link href={`/movies/${m.id}`}>
                <div className="cursor-pointer transition-transform hover:scale-105">
                  <MovieCard movie={m} />
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        
        {/* Navigation Buttons */}
        <button className="swiper-button-prev-trends absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 rounded-full hover:bg-black/70 text-white">
          &#8592;
        </button>
        <button className="swiper-button-next-trends absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 rounded-full hover:bg-black/70 text-white">
          &#8594;
        </button>
      </div>
    </section>
  );
}