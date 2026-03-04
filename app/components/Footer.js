import React from 'react';
import { Facebook, Instagram, Linkedin, Youtube, Send } from 'lucide-react'; // 'lucide-react' o'rnatilgan bo'lishi kerak

function Footer() {
  const menuItems = [
    "Get the Omni App",
    "Help",
    "Site Index",
    "Omni Pro",
    "Advertising",
    "Omni Developer",
    "Jobs",
    "Privacy Policy"
  ];

  const socialIcons = [Facebook, Instagram, Linkedin, Youtube, Send];

  return (
    <footer className="absolute bg-[#030A1B] w-full text-gray-400 py-16  border-t border-white/5">
      <div className="container mx-auto px-16 flex flex-col items-center gap-10">

        {/* Footer Menu */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-light">
          {menuItems.map(item => (
            <a key={item} href="#" className="hover:text-white transition flex items-center gap-1">
              {item} <span className="text-gray-600">›</span>
            </a>
          ))}
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-8">
          {socialIcons.map((Icon, index) => (
            <a key={index} href="#" className="text-gray-500 hover:text-white transition">
              <Icon size={22} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;


