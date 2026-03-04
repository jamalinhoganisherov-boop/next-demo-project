"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Search, Bell, User, Sun } from 'lucide-react';

const Header = () => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Movies', href: '/movies' },
    { name: 'Series', href: '/series' },
    { name: 'Collection', href: '/collection' },
    { name: 'FAQ', href: '/faq' },
  ];

  return (
    // Header umumiy joylashuvi va uzunligi
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-[1440px]">
      
      {/* ASOSIY EFFEKT (O'sha siz so'ragan seriy shaffof fon):
        - bg-[#050E26]/60: To'q ko'k rangning 60% shaffofligi
        - backdrop-blur-md: Orqa fondagi rasmni xira (blur) qilish effekti
        - border-white/10: Header atrofidagi juda nozik oqish chegara
      */}
      <div className="flex items-center justify-between px-10 py-3 bg-[#050E26]/60 backdrop-blur-md border border-white/10 rounded-full shadow-2xl transition-all duration-500 hover:bg-[#050E26]/80">
        
        {/* LOGOTIP QISMI */}
        <Link href="/" className="flex items-center shrink-0 group">
          <div className="relative w-12 h-10 transition-transform duration-300 group-hover:scale-110">
            {/* Eslatma: public/logo.png faylingiz borligini tekshiring. 
              Unga biroz porlash (glow) effekti qo'shilgan.
            */}
            <div className="absolute inset-0 bg-blue-500/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            <Image 
              src="/Logo- light.svg" 
              alt="Logo" 
              fill
              className="object-contain relative z-10"
              priority
            />
          </div>
        </Link>

        {/* NAVIGATSIYA MENYUSI */}
        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={`relative text-[15px] font-medium transition-all duration-300 hover:text-white ${
                  isActive ? 'text-white translate-y-[-1px]' : 'text-gray-400'
                }`}
              >
                {item.name}
                
                {/* KO'K PALASA (Hozirgi sahifa indikatori) */}
                {isActive && (
                  <span className="absolute -bottom-2 left-0 w-full h-[2.5px] bg-blue-500 rounded-full shadow-[0_0_15px_#3b82f6] animate-pulse" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* O'NG TOMONDAGI USKUNALAR */}
        <div className="flex items-center gap-6 text-gray-400 shrink-0">
          <button className="hover:text-white transition-colors duration-300">
            <Search className="w-5 h-5" />
          </button>
          
          {/* Bildirishnoma (Pushti nuqtasi bilan) */}
          <div className="relative cursor-pointer group p-1">
            <Bell className="w-5 h-5 group-hover:text-white transition-colors duration-300" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#E94E9F] rounded-full border-2 border-[#050E26] shadow-[0_0_8px_#E94E9F]" />
          </div>

          <button className="hover:text-white transition-colors duration-300">
            <User className="w-5 h-5" />
          </button>

          <button className="hover:text-white transition-colors duration-300">
            <Sun className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;