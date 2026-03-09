"use client";
import React, { useState } from "react";
import Image from "next/image";
import { getImageUrl } from "@/lib/tmdb"; //

const Charactors = ({ actors = [], directors = [] }) => {
  const [activeTab, setActiveTab] = useState("Actors");

  // Choose data based on the selected tab
  const dataToDisplay = activeTab === "Actors" ? actors : directors;

  return (
    <section className="bg-transparent text-white py-16 px-4 md:px-16">
      <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
        <h2 className="text-4xl font-bold italic">Characters</h2>

        {/* Tab Switcher */}
        <div className="bg-black/40 p-1 rounded-full flex gap-1 border border-white/10 backdrop-blur-md">
          {["Actors", "Directors"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                activeTab === tab
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Characters Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
        {dataToDisplay.map((person, index) => {
          // Fallback logic: If profile_path is null, use the local placeholder
          const profileImg = person.profile_path
            ? getImageUrl(person.profile_path)
            : "/placeholder-actor.png";

          return (
            <div
              key={`${person.id}-${index}`}
              className="flex flex-col items-center gap-4 group"
            >
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-white/10 p-1 group-hover:border-blue-500 transition-all duration-500">
                <Image
                  src={profileImg}
                  alt={person.name}
                  width={128}
                  height={128}
                  className="rounded-full object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <p className="text-sm font-medium text-gray-300 text-center group-hover:text-white transition-colors">
                {person.name}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Charactors;
