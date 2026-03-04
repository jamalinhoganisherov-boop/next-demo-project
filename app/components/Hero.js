"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Thumbs } from 'swiper/modules';

// Swiper stillarini import qilish shart
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/thumbs';

const HERO_DATA = [
  {
    id: 1,
    title: "The Witcher",
    desc: "Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny in a turbulent world.",
    rating: 8.1,
    image: "/Hero.svg",
    platform: "Netflix",
    slideImg: "/hero-1.svg"
  },
  {
    id: 2,
    title: "Oppenheimer",
    desc: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
    rating: 8.4,
    image: "/herobg-2.svg", // O'zingizdagi rasm yo'li
    platform: "HBO",
    slideImg: "/hero-2.svg"
  },
  {
    id: 3,
    title: "Mission: Impossible",
    desc: "Ethan Hunt and his IMF team must track down a dangerous new weapon that threatens all of humanity.",
    rating: 7.7,
    image: "/herobg-3.svg", // O'zingizdagi rasm yo'li
    platform: "Paramount",
    slideImg: "/hero-3.svg"
  }
];

const Hero = () => {
  const [activeThumb, setActiveThumb] = useState(null);

  return (
    <section className="relative h-screen w-full bg-black text-white overflow-hidden">

      {/* 1. ASOSIY SLIDER (Orqa fon va Matnlar) */}
      <Swiper
        modules={[EffectFade, Autoplay, Thumbs]}
        effect="fade"
        fadeEffect={{ crossFade: true }} // Matnlar ustma-ust tushmasligi uchun juda muhim
        loop={true}
        speed={1000}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        thumbs={{ swiper: activeThumb && !activeThumb.destroyed ? activeThumb : null }}
        className="h-full w-full"
      >
        {HERO_DATA.map((movie) => (
          <SwiperSlide key={movie.id} className="relative w-full h-full bg-black">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <Image
                src={movie.image}
                alt={movie.title}
                fill
                className="object-cover opacity-70"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>

            {/* Content Area */}
            <div className="container mx-auto px-6 md:px-16 relative z-10 h-full flex flex-col justify-center">
              <h1 className="text-5xl md:text-7xl font-bold mb-4 max-w-3xl leading-tight">
                {movie.title}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex text-yellow-400 text-sm">★★★★<span className="text-gray-600">★</span></div>
                <div className="bg-[#f5c518] text-black text-[10px] font-bold px-1.5 py-0.5 rounded-sm">IMDb</div>
                <span className="text-lg font-semibold">{movie.rating}</span>
                <span className="text-red-600 text-[11px] font-black tracking-widest ml-2 uppercase">{movie.platform}</span>
              </div>

              <p className="text-gray-300 max-w-xl mb-8 text-sm md:text-base leading-relaxed">
                {movie.desc}
              </p>

              <div className="flex items-center gap-4">
                <button className="bg-[#3b82f6] hover:bg-blue-600 text-white px-8 py-3 rounded-full flex items-center gap-2 text-sm font-bold transition-all">
                  <span>▶</span> Watch Movie
                </button>
                <button className="bg-white/10 border border-white/20 hover:bg-white/20 text-white px-8 py-3 rounded-full text-sm font-bold transition-all">
                  More Info →
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

   
    </section>
  );
};

export default Hero;