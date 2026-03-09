"use client";
import React from 'react';
import { Star, Bookmark, ThumbsUp, ThumbsDown, Play } from 'lucide-react';
import Image from 'next/image';

const MovieDetail = () => {
  return (
    <div className="w-full bg-[#030A1B] text-white font-sans">

      {/* 1. HERO SECTION (Banner o'lchami optimallashgan) */}
      <div className="relative w-full h-[75vh] md:h-[80vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-no-repeat bg-[center_top]"
          style={{ backgroundImage: "url('/image 303.svg')" }}
        >
          {/* Matnlar uchun gradientlar */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#030A1B] via-[#030A1B]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030A1B] via-transparent to-transparent" />
        </div>

        {/* Banner ustidagi ma'lumotlar */}
        <div className="relative z-10 h-full max-w-[1280px] mx-auto px-8 flex flex-col justify-center pt-16">
          <div className="max-w-xl pt-[150px]">
            {/* Sarlavha o'lchami 7xl dan 5xl ga tushirildi */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 tracking-tight">John Wick 4</h1>
            <p className="text-base md:text-lg text-gray-300 mb-4 font-medium">2h 49m - 2023-USA</p>

            {/* Kichikroq yulduzchalar */}
            <div className="flex gap-1 mb-8">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>

            {/* Tugmalar paneli (Ixchamroq) */}
            <div className="flex flex-wrap items-center gap-3 mb-12">
              <div className="flex gap-2.5">
                <IconButton Icon={Bookmark} />
                <IconButton Icon={ThumbsUp} />
                <IconButton Icon={ThumbsDown} />
              </div>

              <button className="flex items-center gap-2.5 bg-[#3b82f6] px-7 py-3 rounded-xl font-bold text-base hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20 ml-2">
                <Play className="w-5 h-5 fill-white" /> Watch Now
              </button>

              <button className="px-8 py-3 border border-white/30 rounded-xl font-bold text-base bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all">
                Preview
              </button>
            </div>
          </div>

          {/* Kichik kadrlar (Screenshots - o'lchami optimallashgan) */}
          <div className="flex gap-4 mt-auto pb-8 overflow-x-auto no-scrollbar">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="min-w-[180px] md:min-w-[220px] h-[110px] md:h-[130px] rounded-xl border-2 border-white/10 overflow-hidden hover:border-blue-500/50 transition-all group">
                <img
                  src={`/1.svg`}
                  alt="movie shot"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. ABOUT SECTION (Shriftlar o'rtacha qilindi) */}
      <div className="w-full bg-[#030A1B] py-16">
        <div className="max-w-[1280px] mx-auto px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">about John Wick 4</h2>
          <div className="max-w-4xl space-y-6 text-base md:text-lg text-gray-400 leading-relaxed">
            <p>
              With the price on his head ever increasing, legendary hit man John Wick takes his fight against the High Table global as he seeks out the most powerful players in the underworld, from New York to Paris to Japan to Berlin.
            </p>
            <p>
              Development of the fourth John Wick film, formally announced by Lionsgate in May 2019, was confirmed before the release of its predecessor.
            </p>
          </div>
        </div>
      </div>
      {/* --- ASOSIY KONTEYNER (Barcha qismlarni bir xil chiziqda ushlaydi) --- */}
<div className="max-w-[1280px] mx-auto px-6 md:px-12">

  {/* ABOUT BO'LIMI */}
  <section className="mt-16">
    <h2 className="text-3xl md:text-4xl font-bold mb-6 italic">about John Wick 4</h2>
    <div className="max-w-4xl space-y-6 text-base md:text-lg text-gray-400 leading-relaxed">
      <p>
        With the price on his head ever increasing, legendary hit man John Wick takes his fight against the High Table global...
      </p>
    </div>
  </section>

  {/* GENRES (Pushti tugmalar - o'rtacha kattalikda) */}
  <section className="mt-12">
    <h3 className="text-2xl md:text-3xl font-bold mb-6 italic">Genres</h3>
    <div className="flex flex-wrap gap-4">
      {["Action", "Crime"].map((genre) => (
        <button 
          key={genre}
          className="bg-[#E94E9F] px-10 py-2.5 rounded-full text-sm font-bold shadow-[0_5px_15px_rgba(233,78,159,0.3)] hover:scale-105 transition-transform"
        >
          {genre}
        </button>
      ))}
    </div>
  </section>

  {/* CHARACTORS (Aktyorlar - mutanosib o'lchamda) */}
 {/* CHARACTORS QISMI - Maxsus konteyner ichida */}
<section className="mt-16 w-full max-w-[1280px] mx-auto px-8 md:px-12">
  <h3 className="text-2xl md:text-3xl font-bold mb-8 italic tracking-wide">Charactors</h3>
  
  {/* Aktyorlar ro'yxati: o'rtacha o'lcham va silliq scroll */}
  <div className="flex gap-6 md:gap-10 overflow-x-auto no-scrollbar pb-6">
    {[
      { id: 1, name: "Keanu Reeves", img: "/actor1.svg" },
      { id: 2, name: "Bill Skarsgård", img: "/actor2.svg" },
      { id: 3, name: "Donnie Yen", img: "/actor3.svg" },
      { id: 4, name: "Scott Adkins", img: "/actor4.svg" },
      { id: 5, name: "Lance Reddick", img: "/actor5.svg" },
      { id: 6, name: "Ian McShane", img: "/actor6.svg" }
    ].map((actor) => (
      <div key={actor.id} className="flex flex-col items-center shrink-0 group">
        {/* Doira surat: w-24 dan w-28 gacha mutanosib o'lcham */}
        <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-blue-500/50 transition-all duration-300 shadow-xl">
          <img 
            src={actor.img} 
            alt={actor.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
          />
        </div>
        
        {/* Aktyor ismi (faqat hover bo'lganda ko'rinadi) */}
        <span className="mt-3 text-[10px] md:text-xs text-gray-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
          {actor.name}
        </span>
      </div>
    ))}
  </div>
</section>

  {/* DIRECTOR (Rejissyor) */}
  <section className="mt-16 mb-24">
    <h3 className="text-2xl md:text-3xl font-bold mb-6 italic">Director</h3>
    <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-white/10 shadow-xl">
      <img 
        src="/dir4.svg" 
        alt="Director" 
        className="w-full h-full object-cover" 
      />
    </div>
  </section>

</div>
{/* --- KONTEYNER TUGADI --- */}

      {/* FOOTER GRADIENT (Binafsha nur) */}
      <div
        className="w-full h-[250px] pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(151, 71, 255, 0.08) 0%, rgba(3, 10, 27, 0) 100%)' }}
      />
    </div>
  );
};

// Yordamchi tugma (O'lchami biroz kichraytirildi)
const IconButton = ({ Icon }) => (
  <button className="p-3 border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all">
    <Icon className="w-5 h-5 text-white" />
  </button>
);

export default MovieDetail;
