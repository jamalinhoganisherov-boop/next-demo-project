"use client";
import React, { useRef, useEffect } from "react";

// props: genres = [{id,name}], selectedGenreId, onSelect(id), optional containerRef for scroll
const GenreBtn = ({ genres = [], selectedGenreId, onSelect, containerRef }) => {
  const innerRef = useRef(null);

  const scroll = (amount) => {
    const ref = containerRef?.current || innerRef.current;
    if (ref) {
      ref.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  return (
    <section className="bg-[#050505] text-white py-4 px-8 relative">
      <button
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/30 rounded-full"
        onClick={() => scroll(-200)}
      >
        &#8592;
      </button>
      <div
        ref={containerRef || innerRef}
        className="flex items-center gap-4 overflow-x-auto no-scrollbar py-2 pl-10"
      >
        {genres.map((g) => {
          const isSelected = selectedGenreId === g.id;
          return (
            <button
              key={g.id}
              onClick={() => onSelect && onSelect(g.id)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap
                ${
                  isSelected
                    ? "bg-pink-600 text-white border border-pink-600"
                    : "bg-transparent text-gray-300 border border-pink-600/50 hover:border-pink-500"
                }
              `}
            >
              {g.name}
            </button>
          );
        })}
      </div>
      <button
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/30 rounded-full"
        onClick={() => scroll(200)}
      >
        &#8594;
      </button>
    </section>
  );
};

export default GenreBtn;
