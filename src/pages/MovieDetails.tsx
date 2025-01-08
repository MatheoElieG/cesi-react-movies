import { Link, useNavigate, useParams, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import { Movie } from "../types/movie.ts";
import { MovieCast } from "../components/movie/MovieCast.tsx";
import { SimilarMovies } from "../components/movie/SimilarMovies.tsx";
import { UnknownImage } from "../components/shared/UnknownImage.tsx";
import { WishlistButton } from "../components/movie/WishlistButton.tsx";
import { ArrowLeft, Calendar, Star } from "lucide-react";
import { Button } from "../components/shared/Button.tsx";

export const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [urlSearchParams] = useSearchParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  const from = urlSearchParams.get("from");

  useEffect(() => {
    const fetchMovie = async (id: string) => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`,
        );

        if (response.status === 404) {
          navigate("/404");
          return;
        }

        if (response.status !== 200) {
          throw new Error("Failed to fetch movie details");
        }

        const json: Movie = await response.json();
        setMovie(json);
      } catch (error) {
        console.error("Error fetching movie:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!id) return;
    void fetchMovie(id);
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    );
  }

  if (!movie) return null;

  return (
    <>
      <div className="flex items-center justify-between">
        <BackButton from={from} />
        <WishlistButton movieId={movie.id} />
      </div>
      <div className="space-y-8 mt-4">
        <div className="relative rounded-xl overflow-hidden">
          {movie.backdrop_path ? (
            <div className="aspect-[21/9] relative">
              <img
                alt={movie.title}
                className="w-full h-full object-cover"
                src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            </div>
          ) : (
            <UnknownImage classNames="aspect-[21/9]" />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="flex gap-6 flex-col md:flex-row">
              <div className="w-full md:w-[240px] flex-shrink-0">
                {movie.poster_path ? (
                  <img
                    alt={movie.title}
                    className="w-full rounded-lg shadow-lg aspect-[2/3] object-cover"
                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  />
                ) : (
                  <UnknownImage classNames="w-full rounded-lg shadow-lg aspect-[2/3]" />
                )}
              </div>

              <div className="flex-1 space-y-4">
                <h1 className="text-3xl font-bold text-gray-900">
                  {movie.title}
                </h1>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{movie.release_date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span>{movie.vote_average.toFixed(1)} / 10</span>
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed">
                  {movie.overview}
                </p>
              </div>
            </div>

            <section className="pt-4">
              <SimilarMovies movieId={movie.id} fromMovie={movie.title} />
            </section>
          </div>

          <aside>
            <MovieCast movieId={movie.id} />
          </aside>
        </div>
      </div>
    </>
  );
};

const BackButton = ({ from }: { from: string | null }) => {
  const navigate = useNavigate();

  if (from === "wishlist") {
    return (
      <Link to="/wishlist">
        <Button>
          <ArrowLeft className="w-4 h-4" />
          Back to wishlist
        </Button>
      </Link>
    );
  }

  if (from && from !== "wishlist") {
    return (
      <Button onClick={() => navigate(-1)}>
        <ArrowLeft className="w-4 h-4" />
        Back to {from}
      </Button>
    );
  }

  return (
    <Link to="/">
      <Button>
        <ArrowLeft className="w-4 h-4" />
        Back to popular movies
      </Button>
    </Link>
  );
};
