"use client";
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Search, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

const GENRES_LIST = ["Drama", "Action", "Adventure", "Romance", "Fantasy", "Comedy", "Animation", "Thriller", "Horror", "Sci-Fi"];
const YEARS = ["2024", "2023", "2022", "2021", "2020, 2019", "2018", "2017", "2016", "2015", "2014", "2013", "2012", "2011", "2010","2000-2009", "1990s", "1980s", "1970s", "1960s", "1950s", "1940s", "1930s", "1920s","1910s", "1900s"];
const COUNTRIES = ["USA", "Germany", "UK", "France", "Uzbekistan", "Japan", "South Korea", "India", "Italy", "Spain", "Russia", "Australia", "Canada", "Brazil", "Mexico", "China", "Turkey", "Netherlands", "Sweden", "Norway", "Denmark", "Finland", "Poland", "Czech Republic", "Hungary", "Greece", "Portugal", "Switzerland", "Austria", "Belgium", "Argentina", "Chile", "Colombia", "Peru", "Venezuela", "Egypt", "South Africa", "Nigeria", "Kenya", "Morocco","England", "Ireland", "Scotland", "Wales", "New Zealand", ];

const AdvanceSearch = () => {
  // --- STATE-LAR ---
  const [selectedGenres, setSelectedGenres] = useState(["Drama", "Action", "Fantasy"]);
  const [filters, setFilters] = useState({
    year: "2023",
    country: "Germany",
    actor: "Tom Hardy",
    director: "Christopher Nolan"
  });

  // Qaysi dropdown ochiqligini boshqarish
  const [openDropdown, setOpenDropdown] = useState(null); 

  // --- FUNKSIYALAR ---
  const toggleGenre = (genre) => {
    setSelectedGenres(prev => 
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
    );
  };

  const selectOption = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
    setOpenDropdown(null); // Tanlagandan keyin yopish
  };

  return (
    <section className="w-full max-w-[1440px] mx-auto px-6 py-10 mt-24">
      <h1 className="text-5xl font-bold mb-14 text-white">Movies</h1>

      <div className="relative w-full border border-blue-500/20 rounded-[45px] bg-[#050E26]/40 backdrop-blur-2xl p-8 md:p-12 shadow-2xl">

        {/* Blue Tab */}
        <div className="absolute -top-[1px] left-12 -translate-y-full bg-gradient-to-r from-blue-600 to-cyan-400 px-12 py-3.5 rounded-t-[25px] border-t border-x border-white/10 shadow-lg shadow-blue-500/20">
          <span className="text-[13px] font-black text-white uppercase tracking-[0.2em]">Advance Search</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">

          {/* Chap tomondagi Rasm joyi */}
          <div className="w-full lg:w-1/4 flex justify-center">
             <div className="relative w-56 h-56 flex items-center justify-center">
                <Image 
                  src="/logo searchlogo 1.svg" 
                  alt="Search Illustration"
                  width={220}
                  height={220}
                  className="object-contain"
                />
             </div>
          </div>

          {/* O'ng tomondagi Filtrlar */}
          <div className="w-full lg:w-3/4 space-y-10">

            {/* 1-qator: Dropdownlar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <DropdownSelect 
                label="Year" 
                value={filters.year} 
                options={YEARS}
                isOpen={openDropdown === 'year'}
                toggle={() => setOpenDropdown(openDropdown === 'year' ? null : 'year')}
                onSelect={(val) => selectOption('year', val)}
              />
              <DropdownSelect 
                label="Country" 
                value={filters.country} 
                options={COUNTRIES}
                isOpen={openDropdown === 'country'}
                toggle={() => setOpenDropdown(openDropdown === 'country' ? null : 'country')}
                onSelect={(val) => selectOption('country', val)}
              />
              <div className="flex items-center gap-4">
                 <span className="text-[12px] font-bold text-gray-500 w-14 uppercase tracking-widest">Actor</span>
                 <input 
                    className="flex-grow bg-[#030A1B]/40 border border-blue-500/20 rounded-[20px] px-6 py-3 text-sm text-gray-300 outline-none focus:border-blue-500/50"
                    value={filters.actor}
                    onChange={(e) => setFilters({...filters, actor: e.target.value})}
                 />
              </div>
            </div>

            {/* 2-qator: Search Bar */}
            <div className="flex flex-col md:flex-row gap-8">
              <div className="relative flex-grow">
                <input 
                  type="text" 
                  placeholder="Search movies..." 
                  className="w-full bg-[#030A1B]/60 border border-blue-500/20 rounded-[22px] py-4 px-8 text-sm text-white focus:border-blue-500/50 outline-none transition-all"
                />
                <Search className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-500/50" />
              </div>
              <div className="md:w-[35%]">
                <DropdownSelect 
                  label="Director" 
                  value={filters.director} 
                  options={["Christopher Nolan", "James Cameron", "Tarantino"]}
                  isOpen={openDropdown === 'director'}
                  toggle={() => setOpenDropdown(openDropdown === 'director' ? null : 'director')}
                  onSelect={(val) => selectOption('director', val)}
                />
              </div>
            </div>

            {/* 3-qator: Janrlar (To'liq ishlaydi) */}
            <div className="flex items-center gap-4">
              <button className="p-2.5 hover:bg-white/5 rounded-full border border-white/5"><ChevronLeft className="w-5 h-5 text-gray-500" /></button>

              <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-2 flex-grow">
                {GENRES_LIST.map((genre) => (
                  <button 
                    key={genre}
                    onClick={() => toggleGenre(genre)}
                    className={`px-8 py-2.5 rounded-full text-[13px] font-bold transition-all duration-300 border ${
                      selectedGenres.includes(genre) 
                      ? 'bg-[#E94E9F] border-transparent text-white shadow-[0_8px_20px_rgba(233,78,159,0.4)]' 
                      : 'bg-transparent border-white/10 text-gray-400 hover:border-white/30'
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>

              <button className="p-2.5 hover:bg-white/5 rounded-full border border-white/5"><ChevronRight className="w-5 h-5 text-gray-500" /></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- ISHLAYDIGAN DROPDOWN KOMPONENTI ---
const DropdownSelect = ({ label, value, options, isOpen, toggle, onSelect }) => {
  return (
    <div className="flex items-center gap-4 relative">
      <span className="text-[12px] font-bold text-gray-500 w-14 uppercase tracking-widest">{label}</span>
      <div className="relative flex-grow">
        <div 
          onClick={toggle}
          className="flex items-center justify-between bg-[#030A1B]/40 border border-blue-500/20 rounded-[20px] px-6 py-3.5 cursor-pointer hover:border-blue-500/40 transition-all"
        >
          <span className="text-[14px] text-gray-400 font-medium">{value}</span>
          <ChevronDown className={`w-4 h-4 text-blue-500/50 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>

        {/* Ochiladigan ro'yxat */}
        {isOpen && (
          <div className="absolute top-full mt-2 w-full bg-[#050E26] border border-blue-500/30 rounded-[20px] py-3 z-50 shadow-2xl max-h-60 overflow-y-auto">
            {options.map((opt) => (
              <div 
                key={opt}
                onClick={() => onSelect(opt)}
                className="px-6 py-2 hover:bg-blue-500/20 text-sm text-gray-300 cursor-pointer transition-colors"
              >
                {opt}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvanceSearch;



// -----------------

