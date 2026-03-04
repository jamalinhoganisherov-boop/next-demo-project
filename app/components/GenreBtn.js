import React, { useState } from 'react';

const genres = [
  "Drama", "Action", "Adventure", "Romance", 
  "Fantasy", "Comedy", "Animation", "Thriller", 
  "Mystery", "History"
];

const GenreBtn = () => {
  // Tanlangan janrlar massivi
  const [selectedGenres, setSelectedGenres] = useState(["Drama"]);

  const toggleGenre = (genre) => {
    setSelectedGenres(prev => 
      prev.includes(genre)
        ? prev.filter(c => c !== genre) // Agar bo'lsa, o'chirib tashlaymiz
        : [...prev, genre]              // Agar bo'lmasa, qo'shamiz
    );
  };

  return (
    <section className="bg-[#050505] text-white py-8 px-16">
      <div className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {genres.map((genre) => {
          const isSelected = selectedGenres.includes(genre);
          return (
            <button
              key={genre}
              onClick={() => toggleGenre(genre)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap
                ${
                  isSelected
                    ? "bg-pink-600 text-white border border-pink-600" // Tanlangan: Pushti fon
                    : "bg-transparent text-gray-300 border border-pink-600/50 hover:border-pink-500" // Tanlanmagan: Cheti pushti
                }
              `}
            >
              {genre}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default GenreBtn;