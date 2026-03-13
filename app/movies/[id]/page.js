import React from "react";
import { Star, Bookmark, ThumbsUp, ThumbsDown, Play } from "lucide-react";
import {
  fetchMovie,
  fetchMovieCredits,
  fetchSimilarMovies,
  fetchMovieImages,
  fetchMovieVideos,
  getImageUrl,
} from "@/lib/tmdb";
import Characters from "@/app/components/Charactors";
import Link from "next/link";
import TrailerPreview from "@/app/components/TrailerPreview";

export default async function MovieDetail({ params }) {
  const { id } = await params;

  // Fetch all data in parallel including videos for preview
  const [movie, credits, similar, images, videos] = await Promise.all([
    fetchMovie(id),
    fetchMovieCredits(id),
    fetchSimilarMovies(id),
    fetchMovieImages(id),
    fetchMovieVideos(id),
  ]);

  const directors = credits.crew.filter((person) => person.job === "Director");
  const actors = credits.cast.slice(0, 12);
  const screenshots = images.backdrops.slice(0, 5);
  const suggestions = similar.results.slice(0, 5);
  const watchUrl = `https://www.themoviedb.org/movie/${id}/watch?language=en-US`;

  const trailer =
    videos?.results?.find(
      (video) =>
        video.site === "YouTube" &&
        (video.type === "Trailer" || video.type === "Teaser")
    ) ||
    videos?.results?.find((video) => video.site === "YouTube");
  const trailerKey = trailer?.key || null;

  return (
    <div className="w-full bg-[#030A1B] text-white font-sans overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <div className="relative w-full h-[75vh] md:h-[85vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-no-repeat bg-[center_top]"
          style={{
            backgroundImage: `url(${getImageUrl(movie.backdrop_path, "original")})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#030A1B] via-[#030A1B]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030A1B] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 h-full max-w-[1280px] mx-auto px-8 flex flex-col justify-center pt-16">
          <div className="max-w-xl pt-[120px]">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-3 tracking-tight italic">
              {movie.title}
            </h1>
            <p className="text-base md:text-lg text-gray-300 mb-4 font-medium">
              {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m -{" "}
              {movie.release_date?.split("-")[0]} -{" "}
              {movie.origin_country?.[0] || "USA"}
            </p>

            <div className="flex gap-1 mb-8">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${i <= Math.round(movie.vote_average / 2) ? "fill-yellow-400 text-yellow-400" : "text-gray-600"}`}
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
                <Play className="w-5 h-5 fill-white" /> Full Movie
              </a>
              <TrailerPreview trailerKey={trailerKey} title={movie.title} />
            </div>
          </div>

          {/* SCREENSHOTS (Figma Layout) */}
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
            about {movie.title}
          </h2>
          <div className="max-w-4xl space-y-6 text-base md:text-xl text-gray-400 leading-relaxed font-light">
            <p>{movie.overview}</p>
          </div>
        </section>

        {/* 3. GENRES */}
        <section className="mt-16">
          <h3 className="text-2xl md:text-3xl font-bold mb-6 italic">Genres</h3>
          <div className="flex flex-wrap gap-4">
            {movie.genres?.map((genre) => (
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
        <Characters actors={actors} directors={directors} />

        {/* 5. SUGGESTIONS */}
        <section className="mt-20 mb-32">
          <h3 className="text-2xl md:text-4xl font-bold mb-10 italic">
            Suggestion like "{movie.title}"
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 md:gap-8">
            {suggestions.map((item) => (
              <Link href={`/movies/${item.id}`} key={item.id} className="group">
                <div className="relative aspect-[2/3] rounded-2xl overflow-hidden border border-white/10 group-hover:border-blue-500/50 transition-all duration-500">
                  <img
                    src={getImageUrl(item.poster_path)}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    alt={item.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <p className="text-sm font-bold line-clamp-1">
                      {item.title}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <div
        className="w-full h-[300px] pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(151, 71, 255, 0.1) 0%, rgba(3, 10, 27, 0) 100%)",
        }}
      />
    </div>
  );
}

const IconButton = ({ Icon }) => (
  <button className="p-3.5 border border-white/10 rounded-xl bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/30 transition-all">
    <Icon className="w-5 h-5 text-white" />
  </button>
);
