import { MovieCredits } from "../../types/movie.ts";
import { useEffect, useState } from "react";
import { UnknownImage } from "../shared/UnknownImage.tsx";

export const MovieCast = ({ movieId }: { movieId: number }) => {
  const [credits, setCredits] = useState<MovieCredits | null>(null);

  const fetchCredits = async (id: number) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${import.meta.env.VITE_TMDB_API_KEY}`,
    );

    if (response.status === 404) {
      throw new Error("Movie not found.");
    } else if (response.status !== 200) {
      throw new Error("Could not find movie results.");
    }

    const json: MovieCredits = await response.json();
    setCredits(json);
  };

  useEffect(() => {
    if (!movieId) {
      return;
    }

    void fetchCredits(movieId);
  }, [movieId]);

  return (
    <>
      <h2 className="text-lg font-semibold">Cast</h2>
      <div className="grid grid-cols-3 gap-2 mt-4">
        {credits &&
          credits.cast.slice(0, 12).map((actor) => (
            <div key={actor.id}>
              {actor.profile_path && (
                <div className="aspect-square border rounded-md overflow-hidden">
                  <img
                    alt={actor.name}
                    className="w-full h-full object-cover object-center"
                    src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`}
                  />
                </div>
              )}
              {!actor.profile_path && (
                <UnknownImage classNames="aspect-square rounded-md overflow-hidden" />
              )}
              <p className="mt-1 text-sm">{actor.name}</p>
            </div>
          ))}
      </div>
    </>
  );
};
