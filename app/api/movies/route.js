import { fetchMoviesByGenre, fetchPopularMovies } from "@/lib/tmdb";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const genreId = searchParams.get("genre");
    const page = parseInt(searchParams.get("page") || "1", 10);

    const data = genreId
      ? await fetchMoviesByGenre(genreId, page)
      : await fetchPopularMovies(page);

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
