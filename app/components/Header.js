"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Search, Bell, User, Sun, Moon, X } from 'lucide-react';

const Header = () => {
  const pathname = usePathname();
  
  // --- HOLATLAR (STATES) ---
  const [isDark, setIsDark] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Mock ma'lumotlar
  const moviesMock = [
    { id: 1, title: "John Wick 4", year: "2023", img: "/shot-1.jpg" },
    { id: 2, title: "The Witcher", year: "2019", img: "/shot-2.jpg" },
    { id: 3, title: "Inception", year: "2010", img: "/shot-3.jpg" },
  ];

  // Butun sayt uchun Dark mode-ni boshqarish
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
    }
  }, [isDark]);

  // Qidiruv algoritmi
  useEffect(() => {
    if (searchQuery.length > 1) {
      const filtered = moviesMock.filter(m => 
        m.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Movies', href: '/movies' },
    { name: 'Series', href: '/series' },
    { name: 'Collection', href: '/collection' },
    { name: 'FAQ', href: '/faq' },
  ];

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-[1440px]">
      
      {/* ASOSIY KONTEYNER */}
      <div className={`flex items-center justify-between px-10 py-3 transition-all duration-500 rounded-full border shadow-2xl backdrop-blur-md ${
        isDark 
        ? 'bg-[#050E26]/60 border-white/10 text-white' 
        : 'bg-white/80 border-black/10 text-slate-900'
      }`}>
        
        {/* 1. LOGOTIP (Search ochiqligida ham qimirlamaydi) */}
        <Link href="/" className="flex items-center shrink-0 group">
          <div className="relative w-12 h-10 transition-transform duration-300 group-hover:scale-110">
            <div className="absolute inset-0 bg-blue-500/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            <Image 
              src="/Logo- light.svg" 
              alt="Logo" 
              fill
              className={`object-contain relative z-10 ${!isDark && 'invert'}`}
              priority
            />
          </div>
        </Link>

        {/* 2. O'RTA QISM: SEARCH YOKI NAVIGATSIYA */}
        <div className="flex-1 flex justify-center px-6 md:px-10">
          {showSearch ? (
            <div className="w-full max-w-md relative animate-in fade-in slide-in-from-top-1 duration-300">
              <input 
                autoFocus
                type="text"
                placeholder="Search movies..."
                className={`w-full py-2 px-6 rounded-full outline-none border transition-all text-sm ${
                  isDark 
                  ? 'bg-white/10 border-white/20 text-white focus:border-blue-500 placeholder:text-gray-500' 
                  : 'bg-black/5 border-black/20 text-black focus:border-blue-600 placeholder:text-gray-400'
                }`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <X 
                className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 cursor-pointer hover:text-red-500 opacity-50" 
                onClick={() => {setShowSearch(false); setSearchQuery("");}}
              />

              {/* Qidiruv natijalari dropdowni */}
              {searchResults.length > 0 && (
                <div className={`absolute top-14 left-0 w-full rounded-3xl p-4 shadow-2xl border backdrop-blur-2xl animate-in fade-in zoom-in duration-200 ${
                  isDark ? 'bg-[#050E26]/95 border-white/10 text-white' : 'bg-white/95 border-black/10 text-black'
                }`}>
                  {searchResults.map(movie => (
                    <Link 
                      key={movie.id} 
                      href={`/movies/${movie.id}`} 
                      className={`flex items-center gap-4 p-3 rounded-2xl transition-colors ${isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'}`}
                    >
                      <div className="w-10 h-12 rounded-lg bg-gray-500 overflow-hidden shrink-0">
                        <img src={movie.img} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">{movie.title}</h4>
                        <p className="text-xs opacity-50">{movie.year}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link 
                    key={item.name} 
                    href={item.href}
                    className={`relative text-[15px] font-medium transition-all duration-300 ${
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

        {/* 3. O'NG TOMON: ASBOBLAR */}
        <div className="flex items-center gap-5 md:gap-6 shrink-0">
          {/* Search Ikonkasi (Faqat search yopiqligida ko'rinadi) */}
          {!showSearch && (
            <button onClick={() => setShowSearch(true)} className="hover:scale-110 transition-transform">
              <Search className={`w-5 h-5 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black'}`} />
            </button>
          )}
          
          <div className="relative cursor-pointer group">
            <Bell className={`w-5 h-5 ${isDark ? 'text-gray-400 group-hover:text-white' : 'text-gray-500 group-hover:text-black'}`} />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#E94E9F] rounded-full border-2 border-[#050E26] shadow-[0_0_8px_#E94E9F]" />
          </div>

          <User className={`w-5 h-5 cursor-pointer ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black'}`} />

          {/* DARK/LIGHT TUGMASI */}
          <button 
            onClick={() => setIsDark(!isDark)}
            className={`p-1.5 rounded-full transition-all active:scale-90 ${isDark ? 'hover:bg-white/10' : 'hover:bg-black/10'}`}
          >
            {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-blue-600" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;