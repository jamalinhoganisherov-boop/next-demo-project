"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Search, Bell, User, Sun, Moon, X, Loader2 } from 'lucide-react';

const Header = () => {
  const pathname = usePathname();
  
  // --- STATES ---
  const [isDark, setIsDark] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // TMDB MA'LUMOTLARI
  const API_KEY = "2ac45271237676cc4aa0e447cdb5630a";
  const IMG_PATH = "https://image.tmdb.org/t/p/w200"; // Kichikroq rasm tezroq yuklanadi

  // 1. DARK MODE BOSHQARUVI
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // 2. TMDB API QIDIRUV LOGIKASI
  useEffect(() => {
    const fetchMovies = async () => {
      if (searchQuery.trim().length < 2) {
        setSearchResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}&language=en-US`
        );
        const data = await response.json();
        setSearchResults(data.results?.slice(0, 8) || []);
      } catch (error) {
        console.error("Qidiruvda xato:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce (400ms kutib so'ng so'rov yuborish)
    const timeoutId = setTimeout(fetchMovies, 400);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Movies', href: '/movies' },
    { name: 'Series', href: '/series' },
    { name: 'FAQ', href: '/faq' },
  ];

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-[1440px]">
      
      {/* HEADER KONTEYNERI */}
      <div className={`flex items-center justify-between px-6 md:px-10 py-3 transition-all duration-500 rounded-full border shadow-2xl backdrop-blur-md ${
        isDark 
        ? 'bg-[#050E26]/60 border-white/10 text-white' 
        : 'bg-white/80 border-black/10 text-slate-900'
      }`}>
        
        {/* LOGOTIP */}
        <Link href="/" className="shrink-0 flex items-center">
          <div className="relative w-10 h-8 md:w-12 md:h-10">
            <Image 
              src="/Logo- light.svg" 
              alt="Logo" 
              fill
              className={`object-contain ${!isDark && 'invert'}`}
              priority
            />
          </div>
        </Link>

        {/* O'RTA: NAVIGATSIYA YOKI SEARCH */}
        <div className="flex-1 flex justify-center px-4 md:px-10">
          {showSearch ? (
            <div className="w-full max-w-md relative animate-in slide-in-from-top-1 duration-300">
              <input 
                autoFocus
                type="text"
                placeholder="Search movies..."
                className={`w-full py-2 px-6 rounded-full outline-none border transition-all text-sm ${
                  isDark 
                  ? 'bg-white/10 border-white/20 text-white placeholder:text-gray-500' 
                  : 'bg-black/5 border-black/20 text-black placeholder:text-gray-400'
                }`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                {isLoading && <Loader2 className="w-4 h-4 animate-spin text-blue-500" />}
                <X className="w-4 h-4 cursor-pointer opacity-50 hover:opacity-100" 
                   onClick={() => {setShowSearch(false); setSearchQuery("");}} />
              </div>

              {/* SEARCH RESULTS DROPDOWN */}
              {searchResults.length > 0 && (
                <div className={`absolute top-14 left-0 w-full rounded-3xl p-4 shadow-2xl border backdrop-blur-2xl max-h-[400px] overflow-y-auto no-scrollbar animate-in fade-in zoom-in duration-200 ${
                  isDark ? 'bg-[#050E26]/95 border-white/10' : 'bg-white/95 border-black/10'
                }`}>
                  {searchResults.map(movie => (
                    <Link 
                      key={movie.id} 
                      href={`/movies/${movie.id}`} 
                      onClick={() => {setShowSearch(false); setSearchQuery("");}}
                      className={`flex items-center gap-4 p-2 rounded-2xl transition-all ${isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'}`}
                    >
                      <div className="w-10 h-14 rounded-lg bg-gray-800 overflow-hidden shrink-0">
                        <img 
                          src={movie.poster_path ? `${IMG_PATH}${movie.poster_path}` : 'https://via.placeholder.com/200x300?text=No+Image'} 
                          alt="" 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm truncate">{movie.title}</h4>
                        <div className="flex items-center gap-2 text-[10px] opacity-60">
                          <span>{movie.release_date?.split('-')[0] || 'N/A'}</span>
                          <span className="text-yellow-500 font-bold">★ {movie.vote_average?.toFixed(1)}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <nav className="hidden lg:flex items-center gap-6 xl:gap-10">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link 
                    key={item.name} 
                    href={item.href}
                    className={`relative text-[14px] xl:text-[15px] font-medium transition-all duration-300 ${
                      isActive 
                      ? (isDark ? 'text-white' : 'text-blue-600') 
                      : (isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black')
                    }`}
                  >
                    {item.name}
                    {isActive && (
                      <span className="absolute -bottom-2 left-0 w-full h-[2.5px] bg-blue-500 rounded-full shadow-[0_0_15px_#3b82f6]" />
                    )}
                  </Link>
                );
              })}
            </nav>
          )}
        </div>

        {/* O'NG TOMON TOOLS */}
        <div className="flex items-center gap-4 md:gap-6 shrink-0">
          {!showSearch && (
            <button onClick={() => setShowSearch(true)} className="hover:scale-110 transition-transform">
              <Search className={`w-5 h-5 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black'}`} />
            </button>
          )}
          
          <div className="relative cursor-pointer group">
            <Bell className={`w-5 h-5 ${isDark ? 'text-gray-400 group-hover:text-white' : 'text-gray-500 group-hover:text-black'}`} />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#E94E9F] rounded-full border-2 border-white dark:border-[#050E26] shadow-[0_0_8px_#E94E9F]" />
          </div>

          {/* USER */}
          <div className="hidden sm:flex w-9 h-9 rounded-full bg-blue-600 items-center justify-center cursor-pointer shadow-lg shadow-blue-500/30">
            <User className="w-5 h-5 text-white" />
          </div>

          {/* DARK/LIGHT TOGGLE */}
          <button 
            onClick={() => setIsDark(!isDark)}
            className={`p-2 rounded-full transition-all active:scale-90 ${isDark ? 'hover:bg-white/10 text-yellow-400' : 'hover:bg-black/10 text-blue-600'}`}
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

      </div>
    </header>
  );
};

export default Header;