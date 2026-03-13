import {
  fetchAdvancedSeries,
  fetchPersonByName,
  fetchSeriesBySearch,
  fetchTrending,
} from "@/lib/tmdb";

const countryToLanguage = {
  USA: "en",
  UK: "en",
  England: "en",
  Australia: "en",
  Canada: "en",
  India: "hi",
  Germany: "de",
  France: "fr",
  Japan: "ja",
  "South Korea": "ko",
  Spain: "es",
  Italy: "it",
  China: "zh",
  Russia: "ru",
  Brazil: "pt",
  Mexico: "es",
  Turkey: "tr",
};

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const query = searchParams.get("query") || "";
    const genres = searchParams.get("genres") || "";
    const year = searchParams.get("year") || "";
    const country = searchParams.get("country") || "";
    const actor = searchParams.get("actor") || "";
    const director = searchParams.get("director") || "";

    if (query) {
      const data = await fetchSeriesBySearch(query, page);
      return new Response(JSON.stringify(data), { status: 200 });
    }

    const genreId = genres ? genres : undefined;
    const castId = actor ? await fetchPersonByName(actor) : undefined;
    const crewId = director ? await fetchPersonByName(director) : undefined;
    const originLanguage = country ? countryToLanguage[country] : undefined;

    if (!genreId && !year && !country && !actor && !director) {
      const data = await fetchTrending("tv", "day");
      return new Response(JSON.stringify(data), { status: 200 });
    }

    const data = await fetchAdvancedSeries({
      genreId,
      year,
      page,
      castId,
      crewId,
      originLanguage,
    });

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
