"use client";

import { useState } from "react";
import { Play, X } from "lucide-react";

export default function TrailerPreview({ trailerKey, title }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!trailerKey) {
    return (
      <button
        className="px-8 py-3.5 border border-white/20 rounded-xl font-bold text-base bg-white/5 backdrop-blur-md text-gray-400 cursor-not-allowed"
        disabled
      >
        Trailer not available
      </button>
    );
  }

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button
        onClick={openModal}
        className="flex items-center gap-2.5 px-8 py-3.5 border border-white/20 rounded-xl font-bold text-base bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all"
      >
        <Play className="w-5 h-5" /> Preview
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
          <div
            className="absolute inset-0"
            onClick={closeModal}
            aria-label="close trailer overlay"
          />
          <div className="relative w-full max-w-4xl mx-auto bg-[#070d1b] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <div className="flex items-center justify-between border-b border-white/10 p-3">
              <h2 className="text-white font-bold text-lg">
                {title} Trailer
              </h2>
              <button
                onClick={closeModal}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20"
                aria-label="Close trailer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative pt-[56.25%]">
              <iframe
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&controls=1`}
                title={`${title} Trailer`}
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
