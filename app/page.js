import React from "react";
import Hero from "./components/Hero";
import TrendsCarousel from "./components/TrendsCarousel";
import MoviesCarousel from "./components/MoviesCarousel";
import SeriesCarousel from "./components/SeriesCarousel";
import Charactors from "./components/Charactors";
import Studios from "./components/Studios";
import Card from "./components/SubscriptionCard";
import Questions from "./components/Questions";
import ContinueWatch from "./components/ContinueWatch";

import { fetchTrending } from "@/lib/tmdb";

export default async function page() {
  const [moviesData, seriesData] = await Promise.all([
    fetchTrending("movie", "day"),
    fetchTrending("tv", "day"),
  ]);
  const movies = moviesData?.results || [];
  const series = seriesData?.results || [];

  return (
    <div>
      <Hero />

      <TrendsCarousel movies={movies} />

      <MoviesCarousel initialMovies={movies} />

      <SeriesCarousel initialSeries={series} />

      <Charactors />
      <Studios />

      <br />

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
          <Questions />
          <ContinueWatch />
        </div>
      </div>
    </div>
  );
}
