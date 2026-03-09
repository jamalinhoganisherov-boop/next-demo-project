"use client";

import React from "react";
import Image from "next/image";

const FALLBACK_IMAGE = "/image%20149.png";

const MovieCard = ({ movie }) => {
  const safeMovie = movie ?? {};
  // TMDB response uses poster_path / backdrop_path and title or name
  const title = safeMovie.title || safeMovie.name || "Untitled";
  const imageSrc =
    safeMovie.poster_path || safeMovie.backdrop_path
      ? `https://image.tmdb.org/t/p/w300${
          safeMovie.poster_path || safeMovie.backdrop_path
        }`
      : FALLBACK_IMAGE;

  return (
    <div className="flex gap-7">
      <div className="relative group cursor-pointer">
        <button className="absolute top-0 left-0 z-10 bg-[#1e1e2e]/80 hover:bg-[#d62092] p-2 rounded-br-xl transition-colors duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="white"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>

        <div className="relative aspect-[2/3] w-[200px] rounded-2xl overflow-hidden">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
