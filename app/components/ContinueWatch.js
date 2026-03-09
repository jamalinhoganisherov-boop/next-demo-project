"use client";

import React from 'react';
import Image from 'next/image';

const ContinueWatch = () => {
  // Filmlar ro'yxati (Rasmlaringiz nomiga moslang)
  const movies = [
    {
      id: 1,
      title: "Godzilla Minus One",
      image: "/image 149.png", // Siz saqlagan birinchi rasm nomi
      progress: "75%"
    },
    {
      id: 2,
      title: "Kung Fu Panda",
      image: "/image 148.png",
      progress: "45%"
    },
    {
      id: 3,
      title: "Killers of the Flower Moon",
      image: "/image 147.png", 
      progress: "15%"
    }
  ];

  return (
    <section className="w-full py-10 px-4 md:px-10 bg-transparent font-sans">
 
      <div className="flex justify-between items-center mb-6 max-w-[1400px] mx-auto">
        <h2 className="text-white text-2xl md:text-4xl font-bold">Continue watching</h2>
        <div className="text-blue-400 flex items-center gap-2 text-sm md:text-lg cursor-default">
          See More <span>→</span>
        </div>
      </div>

     
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-[1400px] mx-auto">
        {movies.map((movie) => (
          <div key={movie.id} className="group flex flex-col">
            
          
            <div className="relative aspect-video rounded-xl overflow-hidden border border-white/5 bg-[#1a1c29]">
              
         
              <Image 
                src={movie.image} 
                alt={movie.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

          
              <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/30 transition-all">
              
                <div className="w-12 h-12 md:w-14 md:h-14 bg-[#d62092] rounded-full flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" className="w-6 h-6 md:w-8 md:h-8 ml-1">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>

              {/* Film nomi (Rasmning pastki qismida) */}
              <div className="absolute bottom-5 left-0 w-full text-center px-2">
                <h3 className="text-white text-sm md:text-lg font-medium drop-shadow-md">
                  {movie.title}
                </h3>
              </div>

              {/* Progress Bar (Rasmda ko'rsatilgan pushti chiziq) */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-600/50">
                <div 
                  className="h-full bg-[#d62092] relative flex items-center justify-end" 
                  style={{ width: movie.progress }}
                >
                  {/* Progress nuqtasi */}
                  <div className="w-2 h-2 bg-[#d62092] rounded-full border border-white translate-x-1 shadow-sm"></div>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ContinueWatch;