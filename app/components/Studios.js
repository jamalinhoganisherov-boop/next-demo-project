import React from 'react';
import Image from 'next/image';

const studios = [
  { name: 'HBO', img: '/image 187.svg' },
  { name: 'WB', img: '/image 188.svg' },
  { name: 'Disney', img: '/image 189.svg' },
  { name: 'Marvel', img: '/image 191.svg' },
  { name: 'DC', img: '/image 192.svg' },
  { name: 'AMC', img: '/image 198.svg' },
  { name: 'Netflix', img: '/image 199.svg' },
  { name: 'Paramount', img: '/image 195.svg' },
  { name: 'Sony', img: '/image 194.svg' },
  { name: 'AppleTV', img: '/image 193.svg' },
];

const Studios = () => {
  return (
    <section className="bg-[#050505] text-white py-16 px-16">
      <h2 className="text-4xl font-bold mb-12 text-center">Studios</h2>
      
      {/* Studios Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
        {studios.map((studio) => (
          <div key={studio.name} className="flex justify-center items-center">
            {/* Oq kvadrat konteyner */}
            <div className="w-40 h-40 bg-white rounded-3xl flex items-center justify-center p-6 transition-transform hover:scale-105 cursor-pointer">
              <Image 
                src={studio.img} 
                alt={studio.name}
                width={120}
                height={120}
                className="object-contain w-full h-full"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Studios;