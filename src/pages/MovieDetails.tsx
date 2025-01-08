import { Link, useNavigate, useParams, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import { Movie } from "../types/movie.ts";
import { MovieCast } from "../components/movie/MovieCast.tsx";
import { SimilarMovies } from "../components/movie/SimilarMovies.tsx";
import { UnknownImage } from "../components/shared/UnknownImage.tsx";
import { WishlistButton } from "../components/movie/WishlistButton.tsx";

export const MovieDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [urlSearchParams] = useSearchParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  const from = urlSearchParams.get("from");

  useEffect(() => {
    const fetchMovie = async (id: string) => {
      setLoading(true);

      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMD_API_KEY}`,
      );

      if (response.status === 404) {
        // TODO
      } else if (response.status !== 200) {
        // TODO
      }

      const json: Movie = await response.json();
      setMovie(json);
      setLoading(false);
    };

    if (!id) {
      return;
    }

    void fetchMovie(id);
  }, [id]);

  if (loading || !movie) {
    return null;
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        {from === "wishlist" && (
          <Link
            to={"/wishlist"}
            className="bg-cyan-500 py-2 px-4 rounded-md text-white text-sm"
          >
            Back to wishlist
          </Link>
        )}

        {from && from !== "wishlist" && (
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
            className="bg-cyan-500 py-2 px-4 rounded-md text-white text-sm"
          >
            Back to {from}
          </button>
        )}

        {!from && (
          <Link
            to={"/"}
            className="bg-cyan-500 py-2 px-4 rounded-md text-white text-sm"
          >
            Back to popular movies
          </Link>
        )}

        <WishlistButton movieId={movie.id} />
      </div>
      <div className="flex gap-6">
        <div className="w-full md:w-2/3">
          <div className="grid gap-4">
            {movie.backdrop_path && (
              <div className="aspect-video rounded-md overflow-hidden">
                <img
                  alt={movie.title}
                  className="w-full h-full object-cover object-center"
                  src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                />
              </div>
            )}
            {!movie.backdrop_path && (
              <UnknownImage classNames="aspect-video rounded-md overflow-hidden" />
            )}
            <div className="flex-col-reverse md:flex-row flex gap-4">
              {movie.poster_path && (
                <div className="aspect-[2/3] rounded-md overflow-hidden min-w-[200px] w-[200px]">
                  <img
                    alt={movie.title}
                    className="w-full h-full object-cover object-center"
                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  />
                </div>
              )}
              {!movie.poster_path && (
                <UnknownImage classNames="aspect-[2/3] min-w-[200px] w-[200px] rounded-md overflow-hidden" />
              )}
              <div>
                <h1 className="text-xl font-semibold mb-2">{movie.title}</h1>
                <p className="text-sm mb-4">
                  {movie.release_date} - {movie.vote_average.toFixed(1)} ⭐ / 10{" "}
                </p>
                <p>{movie.overview}</p>
              </div>
            </div>
          </div>
          <div className="mt-4"></div>
        </div>
        <div className="w-full md:w-1/3">
          <MovieCast movieId={movie.id} />
        </div>
      </div>
      <SimilarMovies movieId={movie.id} fromMovie={movie.title} />
    </div>
  );
};
