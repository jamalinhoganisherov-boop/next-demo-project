"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Search, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

export const AdvanceSearch = ({
  mode = "movie",
  initialResults = [],
  onResults,
}) => {
  const [genres, setGenres] = useState([]);
  const [years, setYears] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedGenreIds, setSelectedGenreIds] = useState([]);
  const [filters, setFilters] = useState({
    year: "",
    country: "",
    actor: "",
    director: "",
    search: "",
  });
  const [openDropdown, setOpenDropdown] = useState(null);
  const [results, setResults] = useState(initialResults);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const textMode = mode === "tv" ? "series" : "movie";

  const apiPath = useMemo(() => {
    return mode === "tv" ? "/api/series" : "/api/movies";
  }, [mode]);

  useEffect(() => {
    async function init() {
      try {
        const [genreRes, yearRes, countryRes] = await Promise.all([
          fetch(`/api/genres?type=${mode}`),
          fetch("/api/years"),
          fetch("/api/countries"),
        ]);

        const genresData = await genreRes.json();
        const yearsData = await yearRes.json();
        const countriesData = await countryRes.json();

        setGenres(genresData.genres || []);
        setYears(yearsData.years || []);
        setCountries(countriesData.countries || []);
      } catch (err) {
        console.error(err);
      }
    }

    init();
  }, [mode]);

  useEffect(() => {
    setResults(initialResults);
    onResults?.(initialResults);
  }, [initialResults, onResults]);

  const selectedGenreNames = useMemo(() => {
    return genres
      .filter((g) => selectedGenreIds.includes(g.id))
      .map((g) => g.name);
  }, [genres, selectedGenreIds]);

  const toggleGenre = (id) => {
    setSelectedGenreIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const selectOption = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
    setOpenDropdown(null);
  };

  const fetchResults = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();

      if (selectedGenreIds.length > 0) {
        params.set("genres", selectedGenreIds.join(","));
      }
      if (filters.year) params.set("year", filters.year);
      if (filters.country) params.set("country", filters.country);
      if (filters.actor) params.set("actor", filters.actor);
      if (filters.director) params.set("director", filters.director);
      if (filters.search) params.set("query", filters.search);

      const res = await fetch(`${apiPath}?${params.toString()}`);
      const data = await res.json();

      const items = data.results || [];
      setResults(items);
      onResults?.(items);
    } catch (err) {
      setError(err.message || "Failed to fetch");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // initial load
    fetchResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  return (
    <section className="w-full max-w-[1440px] mx-auto px-6 py-10 mt-24">
      <div className="relative w-full border border-blue-500/20 mt-[100px] rounded-[45px] bg-[#050E26]/40 backdrop-blur-2xl p-8 md:p-12 shadow-2xl">
        <div className="absolute -top-[1px] left-12 -translate-y-full bg-gradient-to-r from-blue-600 to-cyan-400 px-12 py-3.5 rounded-t-[25px] border-t border-x border-white/10 shadow-lg shadow-blue-500/20">
          <span className="text-[13px] font-black text-white uppercase tracking-[0.2em]">
            Advance Search ({textMode})
          </span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="w-full lg:w-1/4 flex justify-center">
            <div className="relative w-56 h-56 flex items-center justify-center">
              <Image
                src="/logo searchlogo 1.svg"
                alt="Search Illustration"
                width={220}
                height={220}
                className="object-contain"
              />
            </div>
          </div>

          <div className="w-full lg:w-3/4 space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <DropdownSelect
                label="Year"
                value={filters.year || "Any"}
                options={years}
                isOpen={openDropdown === "year"}
                toggle={() =>
                  setOpenDropdown(openDropdown === "year" ? null : "year")
                }
                onSelect={(val) => selectOption("year", val)}
              />
              <DropdownSelect
                label="Country"
                value={filters.country || "Any"}
                options={countries}
                isOpen={openDropdown === "country"}
                toggle={() =>
                  setOpenDropdown(openDropdown === "country" ? null : "country")
                }
                onSelect={(val) => selectOption("country", val)}
              />
              <div className="flex items-center gap-4">
                <span className="text-[12px] font-bold text-gray-500 w-14 uppercase tracking-widest">
                  Actor
                </span>
                <input
                  className="flex-grow bg-[#030A1B]/40 border border-blue-500/20 rounded-[20px] px-6 py-3 text-sm text-gray-300 outline-none focus:border-blue-500/50"
                  value={filters.actor}
                  placeholder="Actor"
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, actor: e.target.value }))
                  }
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
              <div className="relative flex-grow">
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, search: e.target.value }))
                  }
                  placeholder={`Search ${textMode}...`}
                  className="w-full bg-[#030A1B]/60 border border-blue-500/20 rounded-[22px] py-4 px-8 text-sm text-white focus:border-blue-500/50 outline-none transition-all"
                />
                <Search className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-500/50" />
              </div>
              <div className="md:w-[35%]">
                <DropdownSelect
                  label="Director"
                  value={filters.director || "Any"}
                  options={["Christopher Nolan", "James Cameron", "Tarantino", "Steven Spielberg"]}
                  isOpen={openDropdown === "director"}
                  toggle={() =>
                    setOpenDropdown(
                      openDropdown === "director" ? null : "director",
                    )
                  }
                  onSelect={(val) => selectOption("director", val)}
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                className="p-2.5 hover:bg-white/5 rounded-full border border-white/5"
                onClick={() => {
                  /* placeholder for horizontally scroll controls */
                }}
              >
                <ChevronLeft className="w-5 h-5 text-gray-500" />
              </button>
              <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-2 flex-grow">
                {genres.map((genre) => (
                  <button
                    key={genre.id}
                    onClick={() => toggleGenre(genre.id)}
                    className={`px-8 py-2.5 rounded-full text-[13px] font-bold transition-all duration-300 border ${selectedGenreIds.includes(genre.id)
                      ? "bg-[#E94E9F] border-transparent text-white shadow-[0_8px_20px_rgba(233,78,159,0.4)]"
                      : "bg-transparent border-white/10 text-gray-400 hover:border-white/30"
                      }`}
                  >
                    {genre.name}
                  </button>
                ))}
              </div>
              <button
                className="p-2.5 hover:bg-white/5 rounded-full border border-white/5"
                onClick={() => {
                  /* placeholder for horizontally scroll controls */
                }}
              >
                <ChevronRight className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                className="px-6 py-3 bg-blue-600 rounded-xl text-white font-bold hover:bg-blue-500 transition"
                onClick={fetchResults}
                disabled={loading}
              >
                {loading ? "Filtering..." : "Apply Filters"}
              </button>
              <span className="text-sm text-gray-300">
                {results?.length ?? 0} {textMode} found
              </span>
              {error && <span className="text-sm text-red-400">{error}</span>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const DropdownSelect = ({
  label,
  value,
  options,
  isOpen,
  toggle,
  onSelect,
}) => {
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
            className={`w-4 h-4 text-blue-500/50 transition-transform ${isOpen ? "rotate-180" : ""
              }`}
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


