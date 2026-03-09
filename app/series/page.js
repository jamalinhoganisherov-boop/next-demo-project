import React from "react";
import AdvanceSearch from "../components/AdvanceSearch";
import SeriesCarousel from "../components/SeriesCarousel"; // Swap to SeriesCarousel
import { fetchTrending } from "../../lib/tmdb";
import { ChevronDown, ChevronRight } from "lucide-react";

export default async function SeriesPage() {
  // 1. Fetch TV data (Server-side)
  const data = await fetchTrending("tv"); 
  const series = data?.results || [];

  return (
    <div className="min-h-screen bg-[#030A1B]">
      {/* 2. Top Section / Search */}
      <AdvanceSearch type="tv" />

      {/* 3. Main Content Section */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <h2 className="text-4xl font-bold text-white italic">Series</h2>
                <p className="text-gray-500 text-sm mt-1">{series.length} results found</p>
              </div>
              <button className="p-2.5 hover:bg-white/5 rounded-full border border-white/5 transition-colors">
                <ChevronRight className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Use SeriesCarousel with the Grid prop we set up earlier */}
            <SeriesCarousel initialSeries={series} isGrid={true} />
          </div>
        </div>
      </section>
    </div>
  );
}

// Keep your DropdownSelect sub-component here if it's not exported elsewhere
const DropdownSelect = ({ label, value, options, isOpen, toggle, onSelect }) => {
  return (
    <div className="flex items-center gap-4 relative">
      <span className="text-[12px] font-bold text-gray-500 w-14 uppercase tracking-widest">
        {label}
      </span>
      <div className="relative flex-grow">
        <div
          onClick={toggle}
          className="flex items-center justify-between bg-[#030A1B]/40 border border-blue-500/20 rounded-[20px] px-6 py-3.5 cursor-pointer hover:border-blue-500/40 transition-all"
        >
          <span className="text-[14px] text-gray-400 font-medium">{value}</span>
          <ChevronDown
            className={`w-4 h-4 text-blue-500/50 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </div>

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