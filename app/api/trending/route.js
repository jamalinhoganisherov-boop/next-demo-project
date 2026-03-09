import { fetchTrending } from "@/lib/tmdb";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type") || "movie";
    const timeWindow = searchParams.get("time_window") || "day";
    const data = await fetchTrending(type, timeWindow);
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
