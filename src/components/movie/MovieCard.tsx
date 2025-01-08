import { Link } from "react-router";
import { Movie } from "../../types/movie.ts";
import { UnknownImage } from "../shared/UnknownImage.tsx";
import { WishlistButton } from "./WishlistButton.tsx";
import { Star } from "lucide-react";
import { Button } from "../shared/Button.tsx";

export const MovieCard = ({
  id,
  title,
  poster_path,
  vote_average,
  from,
}: Pick<Movie, "id" | "title" | "poster_path" | "vote_average"> & {
  from?: string;
}) => {
  const details = !from ? `/movie/${id}` : `/movie/${id}?from=${from}`;

  return (
    <div
      key={id}
      className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 transform-gpu"
    >
      <div className="relative">
        {poster_path ? (
          <Link
            to={details}
            className="block overflow-hidden aspect-[2/3] relative"
          >
            <img
              alt={title}
              src={`https://image.tmdb.org/t/p/original/${poster_path}`}
              className="object-cover object-center w-full h-full transform group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300" />
          </Link>
        ) : (
          <Link to={details} className="block aspect-[2/3] overflow-hidden">
            <UnknownImage classNames="aspect-[2/3] w-full h-full" />
          </Link>
        )}

        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          <div className="bg-white/90 backdrop-blur-sm text-gray-900 px-2.5 py-1 rounded-md flex items-center gap-1 text-sm font-medium shadow-sm">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>{vote_average.toFixed(1)}</span>
          </div>
          <WishlistButton movieId={id} />
        </div>
      </div>

      <div className="p-4">
        <Link to={details}>
          <h2 className="text-lg font-medium text-gray-900 line-clamp-2 mb-4 hover:text-gray-700 transition-colors duration-200">
            {title}
          </h2>
        </Link>

        <Link to={details}>
          <Button>View details</Button>
        </Link>
      </div>
    </div>
  );
};
