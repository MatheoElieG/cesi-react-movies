import { useEffect, useState } from "react";
import { Movie } from "../../types/movie.ts";
import { MovieCard } from "./MovieCard.tsx";

export const SimilarMovies = ({
  movieId,
  fromMovie,
}: {
  movieId: number;
  fromMovie: string;
}) => {
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchSimilar = async (id: number) => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${import.meta.env.VITE_TMD_API_KEY}`,
      );

      if (response.status === 404) {
        // TODO
      } else if (response.status !== 200) {
        // TODO
      }

      const json = await response.json();
      setSimilarMovies(json.results);
    };

    void fetchSimilar(movieId);

    return () => {
      setSimilarMovies([]);
    };
  }, [movieId]);

  return (
    <>
      <h2 className="text-xl font-semibold mt-4">Similar movies</h2>
      <div className="grid grid-cols-5 gap-4 mt-2">
        {similarMovies.map((movie: Movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            vote_average={movie.vote_average}
            poster_path={movie.poster_path}
            from={fromMovie}
          />
        ))}
      </div>
    </>
  );
};
