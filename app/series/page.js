"use client";

import React, { useEffect, useState } from "react";
import { AdvanceSearch } from "../components/AdvanceSearch";
import SeriesCarousel from "../components/SeriesCarousel";

export default function SeriesPage() {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInitial() {
      setLoading(true);
      try {
        const res = await fetch("/api/series");
        const data = await res.json();
        setSeries(data.results || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchInitial();
  }, []);

  return (
    <div className="min-h-screen bg-[#030A1B]">
      <AdvanceSearch mode="tv" initialResults={series} onResults={setSeries} />

      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <h2 className="text-4xl font-bold text-white italic">Series</h2>
                <p className="text-gray-500 text-sm mt-1">{series.length} results found</p>
              </div>
            </div>

            <SeriesCarousel
              series={series}
              isGrid={true}
            />
            {!loading && series.length === 0 && (
              <p className="text-center text-gray-300">No series found for current filters.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
