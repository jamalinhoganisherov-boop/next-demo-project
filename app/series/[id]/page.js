import React from "react";
import { Star, Bookmark, ThumbsUp, ThumbsDown, Play } from "lucide-react";
import {
  fetchTV,
  fetchTVCredits,
  fetchSimilarTV,
  fetchTVImages,
  fetchTVVideos,
  getImageUrl,
} from "@/lib/tmdb";
import Characters from "@/app/components/Charactors";
import Link from "next/link";
import TrailerPreview from "@/app/components/TrailerPreview";

export default async function SeriesDetail({ params }) {
  const { id } = await params;

  // Fetch all TV data in parallel
  const [series, credits, similar, images, videos] = await Promise.all([
    fetchTV(id),
    fetchTVCredits(id),
    fetchSimilarTV(id),
    fetchTVImages(id),
    fetchTVVideos(id),
  ]);

  const trailer =
    videos?.results?.find(
      (video) =>
        video.site === "YouTube" &&
        (video.type === "Trailer" || video.type === "Teaser")
    ) ||
    videos?.results?.find((video) => video.site === "YouTube");
  const trailerKey = trailer?.key || null;

  // For TV, Directors are often listed as "Executive Producers" or in "created_by"
  // Here we check both the specific 'created_by' field and the crew list
  const creators = series.created_by || [];
  const actors = credits.cast.slice(0, 12);
  const watchUrl = `https://www.themoviedb.org/tv/${id}/watch?language=en-US`;
  const screenshots = images.backdrops.slice(0, 5);
  const suggestions = similar.results.slice(0, 5);

  return (
    <div className="w-full bg-[#030A1B] text-white font-sans overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <div className="relative w-full h-[75vh] md:h-[85vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-no-repeat bg-[center_top]"
          style={{
            backgroundImage: `url(${getImageUrl(series.backdrop_path, "original")})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#030A1B] via-[#030A1B]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030A1B] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 h-full max-w-[1280px] mx-auto px-8 flex flex-col justify-center pt-16">
          <div className="max-w-xl pt-[120px]">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-3 tracking-tight italic">
              {series.name} {/* TV uses .name */}
            </h1>
            <p className="text-base md:text-lg text-gray-300 mb-4 font-medium">
              {series.number_of_seasons} Seasons -{" "}
              {series.first_air_date?.split("-")[0]} -{" "}
              {series.origin_country?.[0] || "USA"}
            </p>

            <div className="flex gap-1 mb-8">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${i <= Math.round(series.vote_average / 2) ? "fill-yellow-400 text-yellow-400" : "text-gray-600"}`}
                />
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-12">
              <div className="flex gap-2.5">
                <IconButton Icon={Bookmark} />
                <IconButton Icon={ThumbsUp} />
                <IconButton Icon={ThumbsDown} />
              </div>
              <a
                href={watchUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 bg-[#10b981] px-8 py-3.5 rounded-xl font-bold text-base hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/30"
              >
                <Play className="w-5 h-5 fill-white" /> Full Series
              </a>
              <TrailerPreview trailerKey={trailerKey} title={series.name} />
            </div>
          </div>

          {/* SCREENSHOTS */}
          <div className="flex gap-4 mt-auto pb-8 overflow-x-auto no-scrollbar">
            {screenshots.map((shot, idx) => (
              <div
                key={idx}
                className="min-w-[180px] md:min-w-[240px] h-[110px] md:h-[140px] rounded-2xl border-2 border-white/10 overflow-hidden hover:border-blue-500/50 transition-all group shrink-0"
              >
                <img
                  src={getImageUrl(shot.file_path)}
                  alt="screenshot"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        {/* 2. ABOUT SECTION */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 italic">
            about {series.name}
          </h2>
          <div className="max-w-4xl space-y-6 text-base md:text-xl text-gray-400 leading-relaxed font-light">
            <p>{series.overview}</p>
          </div>
        </section>

        {/* 3. GENRES */}
        <section className="mt-16">
          <h3 className="text-2xl md:text-3xl font-bold mb-6 italic">Genres</h3>
          <div className="flex flex-wrap gap-4">
            {series.genres?.map((genre) => (
              <button
                key={genre.id}
                className="bg-[#E94E9F] px-10 py-3 rounded-full text-sm font-bold shadow-[0_8px_20px_rgba(233,78,159,0.3)] hover:scale-105 transition-transform"
              >
                {genre.name}
              </button>
            ))}
          </div>
        </section>

        {/* 4. DYNAMIC CHARACTERS COMPONENT */}
        {/* We map creators to the 'directors' prop to reuse your component UI */}
        <Characters
          actors={actors}
          directors={creators.map(c => ({ ...c, job: "Creator" }))}
        />

        {/* 5. SUGGESTIONS */}
        <section className="mt-20 mb-32">
          <h3 className="text-2xl md:text-4xl font-bold mb-10 italic">
            Suggestion like "{series.name}"
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 md:gap-8">
            {suggestions.map((item) => (
              <Link href={`/series/${item.id}`} key={item.id} className="group">
                <div className="relative aspect-[2/3] rounded-2xl overflow-hidden border border-white/10 group-hover:border-blue-500/50 transition-all duration-500">
                  <img
                    src={getImageUrl(item.poster_path)}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    alt={item.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <p className="text-sm font-bold line-clamp-1">
                      {item.name}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

const IconButton = ({ Icon }) => (
  <button className="p-3.5 border border-white/10 rounded-xl bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/30 transition-all">
    <Icon className="w-5 h-5 text-white" />
  </button>
);