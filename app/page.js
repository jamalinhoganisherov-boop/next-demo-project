import React from "react";
import Hero from "./components/Hero";
import TrendsCarousel from "./components/TrendsCarousel";
import MoviesCarousel from "./components/MoviesCarousel";
import SeriesCarousel from "./components/SeriesCarousel"; // Imported
import Charactors from "./components/Charactors";
import Studios from "./components/Studios";
import Card from "./components/SubscriptionCard";
import Questions from "./components/Questions";
import ContinueWatch from "./components/ContinueWatch";

import { fetchTrending, fetchTrendingPersons } from "@/lib/tmdb";

export default async function page() {
  // 1. Fetch Movies, Series, and Actors in parallel for better performance
  const [movieData, seriesData, personData] = await Promise.all([
    fetchTrending("movie", "day"),
    fetchTrending("tv", "day"),      // Added TV fetch
    fetchTrendingPersons(),
  ]);

  const movies = movieData?.results || [];
  const series = seriesData?.results || []; // TV series results
  const trendingActors = personData?.results?.slice(0, 12) || [];

  return (
    <div className="bg-white text-slate-900 dark:bg-[#030A1B] dark:text-white transition-colors duration-300">
      {/* Hero Section */}
      <Hero />

      {/* Trending Carousels */}
      <TrendsCarousel movies={movies} />

      {/* Movies Section */}
      <MoviesCarousel initialMovies={movies} />

      {/* Series Section - Now dynamic with real data */}
      <SeriesCarousel initialSeries={series} />

      {/* Dynamic Characters Section */}
      <Charactors actors={trendingActors} directors={[]} />

      <Studios />

      <br />

      {/* Pricing & Support Section */}
      <div
        id="pricing"
        className="min-h-screen bg-[#050a14] flex flex-col items-center justify-center p-10 font-sans"
      >
        <div className="flex flex-wrap justify-center items-center gap-8">
          <Card title="Basic" duration="3month" price="$15.140" />

          <Card
            title="Suggested"
            duration="6month"
            price="$22.990"
            oldPrice="$24.990"
            isSuggested={true}
          />

          <Card title="Premium" duration="12month" price="$35.199" />

          <div id="faq" className="w-full mt-20">
            <Questions />
          </div>

          <div className="w-full mt-12">
            <ContinueWatch />
          </div>
        </div>
      </div>

      {/* Decorative Bottom Gradient */}
      <div
        className="w-full h-[200px]"
        style={{
          background:
            "linear-gradient(to top, rgba(151, 71, 255, 0.05) 0%, rgba(3, 10, 27, 0) 100%)",
        }}
      />
    </div>
  );
}