import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Movie } from "../../types/movie.ts";
import { Button } from "../shared/Button.tsx";
import { MovieCard } from "./MovieCard.tsx";
import { MovieCardSkeleton } from "./MovieCardSkeleton.tsx";
import { emptyList } from "../../utils/empty-list.ts";

export const MovieList = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [query, setQuery] = useState<string>("");
  const [currPage, setCurrPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMovies = async (query: string = "", page: number = 1) => {
    setCurrPage(page);
    setIsLoading(true);

    const response = await fetch(
      query === ""
        ? `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMD_API_KEY}&page=${page}`
        : `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMD_API_KEY}&query=${query}&page=${page}`,
    );

    if (!response.ok) {
      throw new Error("Could not find movie results.");
    }

    const json: {
      page: number;
      total_pages: number;
      total_results: number;
      results: Movie[];
    } = await response.json();

    setCurrPage(json.page);
    setMaxPage(json.total_pages);
    setMovies(json.results);
    setIsLoading(false);
  };

  useEffect(() => {
    void fetchMovies();

    return () => {
      setMovies([]);
    };
  }, []);

  const searchMovies = useDebouncedCallback((query: string) => {
    void fetchMovies(query);
  }, 300);

  return (
    <div>
      <div className="flex justify-between items-center gap-4">
        <input
          type="text"
          className="px-4 py-2 border rounded-md w-[300px] max-w-full"
          placeholder="Search..."
          onChange={(e) => {
            setQuery(e.target.value);
            searchMovies(e.currentTarget.value);
          }}
        />
        <div className="flex gap-2">
          <Button
            disabled={currPage === 1}
            onClick={() => fetchMovies(query, currPage - 1)}
          >
            Previous
          </Button>
          <Button
            disabled={currPage === maxPage}
            onClick={() => fetchMovies(query, currPage + 1)}
          >
            Next
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-4 mt-4">
        {isLoading &&
          emptyList(20).map((_, i) => <MovieCardSkeleton key={i} />)}

        {movies.map((movie: Movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            vote_average={movie.vote_average}
            poster_path={movie.poster_path}
          />
        ))}
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <Button
          disabled={currPage === 1}
          onClick={() => fetchMovies(query, currPage - 1)}
        >
          Previous
        </Button>
        <Button
          disabled={currPage === maxPage}
          onClick={() => fetchMovies(query, currPage + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
