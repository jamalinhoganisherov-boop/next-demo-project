"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Thumbs } from 'swiper/modules';
import { getImageUrl } from '@/lib/tmdb';

// Swiper stillarini import qilish shart
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/thumbs';

const TMDB_TRENDING_LIMIT = 5;

const Hero = () => {
  const [activeThumb, setActiveThumb] = useState(null);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingData = async () => {
      try {
        const res = await fetch('/api/trending?type=movie&time_window=day');
        if (!res.ok) return;
        const data = await res.json();
        const trending = (data.results || []).slice(0, TMDB_TRENDING_LIMIT).map((item) => ({
          id: item.id,
          title: item.title || item.name || 'Untitled',
          desc: item.overview || '',
          rating: item.vote_average || 0,
          image:
            item.backdrop_path
              ? getImageUrl(item.backdrop_path, 'original')
              : item.poster_path
                ? getImageUrl(item.poster_path, 'w780')
                : '/Hero.svg',
          platform: item.original_language ? item.original_language.toUpperCase() : 'TMDB',
          idSlug: item.id,
        }));

        if (trending.length > 0) {
          setSlides(trending);
        }
      } catch (error) {
        console.error('Failed to fetch trending hero slides:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingData();
  }, []);

  return (
    <section className="relative h-screen w-full bg-black text-white overflow-hidden">

      {/* 1. ASOSIY SLIDER (Orqa fon va Matnlar) */}
      {slides.length === 0 ? (
        <div className="flex h-full items-center justify-center text-white text-xl">
          {loading ? "Loading trending movies..." : "No trending movies available"}
        </div>
      ) : (
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
          {slides.map((movie) => (
            <SwiperSlide key={movie.id} className="relative w-full h-full bg-black">
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={movie.image}
                  alt={movie.title}
                  fill
                  unoptimized
                  className="object-cover opacity-70"
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-r from-black via-black/50 to-transparent" />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
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
                  <a
                    href={movie.idSlug ? `/movies/${movie.idSlug}` : '#'}
                    className="bg-[#3b82f6] hover:bg-blue-600 text-white px-8 py-3 rounded-full flex items-center gap-2 text-sm font-bold transition-all"
                  >
                    <span>▶</span> Watch Movie
                  </a>
                  <button className="bg-white/10 border border-white/20 hover:bg-white/20 text-white px-8 py-3 rounded-full text-sm font-bold transition-all">
                    More Info →
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
};

export default Hero;