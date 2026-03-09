import React from "react";
import { fetchMovie } from "../../../lib/tmdb";

// server component that fetches individual movie details by id (route param)
export default async function page({ params }) {
  const { id } = params;
  const movie = await fetchMovie(id);

  return (
    <div className="p-8 text-white">
      <h1 className="text-4xl font-bold mb-4">{movie.title || movie.name}</h1>
      <p className="max-w-prose leading-relaxed">{movie.overview}</p>
      {/* add more fields as needed */}
    </div>
  );
}
