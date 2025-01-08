import { useEffect, useState } from "react";
import { Movie } from "../types/movie.ts";
import { useWishlist } from "../hooks/useWishlist.ts";
import { MovieCard } from "../components/movie/MovieCard.tsx";
import { emptyList } from "../utils/empty-list.ts";
import { MovieCardSkeleton } from "../components/movie/MovieCardSkeleton.tsx";

export const Wishlist = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { movies: wishlistMovies } = useWishlist();

  useEffect(() => {
    const fetchWishlistMovies = async () => {
      setIsLoading(true);

      const promises = wishlistMovies.map(async (movieId) => {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`,
        );

        if (response.status === 404) {
          throw new Error("Movie not found.");
        } else if (response.status !== 200) {
          throw new Error("Could not find movie results.");
        }

        return (await response.json()) as Movie;
      });

      setMovies(await Promise.all(promises));
      setIsLoading(false);
    };

    void fetchWishlistMovies();
  }, [wishlistMovies]);

  return (
    <div className="grid grid-cols-5 gap-4 mt-4">
      {isLoading && emptyList(5).map((_, i) => <MovieCardSkeleton key={i} />)}

      {movies.map((movie: Movie) => (
        <MovieCard
          key={movie.id}
          id={movie.id}
          from={"wishlist"}
          title={movie.title}
          vote_average={movie.vote_average}
          poster_path={movie.poster_path}
        />
      ))}
    </div>
  );
};
