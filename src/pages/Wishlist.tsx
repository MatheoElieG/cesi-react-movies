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
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=1cc385c99bf79dda95203d04ef39941f`,
        );

        if (response.status === 404) {
          // TODO
        } else if (response.status !== 200) {
          // TODO
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
