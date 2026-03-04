import React, { useState } from 'react';
import Image from 'next/image';

const actors = [
  { name: 'Jason Momoa', img: '/actor1.svg' },
  { name: 'Dwayne Johnson', img: '/actor2.svg' },
  { name: 'Emma Watson', img: '/actor3.svg' },
  { name: 'Tom Holland', img: '/actor4.svg' },
  { name: 'Ana de Armas', img: '/actor5.svg' },
  { name: 'Keanu Reeves', img: '/actor6.svg' },
];

const directors = [
  { name: 'Richard Attenborough', img: '/dir1.svg' },
  { name: 'Ridley Scott', img: '/dir2.svg' },
  { name: 'Anthony D. L.', img: '/dir3.svg' },
  { name: 'Gary Leonard', img: '/dir4.svg' },
  { name: 'Til Schweiger', img: '/dir5.svg' },
  { name: 'Tom Tykwer', img: '/dir7.svg' },
];

const Characters = () => {
  const [activeTab, setActiveTab] = useState('Actors');
  const dataToDisplay = activeTab === 'Actors' ? actors : directors;

  return (
    <section className="bg-[#050505] text-white py-16 px-16">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-4xl font-bold">Characters</h2>
        
        <div className="bg-black p-1 rounded-full flex gap-1 border border-white/10">
          {['Directors', 'Actors'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full text-sm transition ${
                activeTab === tab
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {dataToDisplay.map((person) => (
          <div key={person.name} className="flex flex-col items-center gap-4">
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-white/10 p-1">
              <Image 
                src={person.img} 
                alt={person.name}
                width={128}
                height={128}
                className="rounded-full object-cover w-full h-full"
              />
            </div>
            <p className="text-sm text-gray-300 text-center">{person.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Characters;