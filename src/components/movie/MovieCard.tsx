import { Link } from "react-router";
import { Button } from "../shared/Button.tsx";
import { Movie } from "../../types/movie.ts";
import { UnknownImage } from "../shared/UnknownImage.tsx";
import { WishlistButton } from "./WishlistButton.tsx";

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
      className="bg-white rounded-md shadow overflow-hidden scale-[0.97] hover:scale-100 transition-transform transform-gpu"
    >
      {poster_path && (
        <Link
          to={details}
          className="overflow-hidden aspect-[2/3] flex items-stretch justify-stretch"
        >
          <img
            alt={title}
            src={`https://image.tmdb.org/t/p/original/${poster_path}`}
            className="object-cover object-center"
          />
        </Link>
      )}
      {!poster_path && (
        <Link to={details} className="aspect-[2/3] rounded-md overflow-hidden">
          <UnknownImage classNames="aspect-[2/3] rounded-md overflow-hidden" />
        </Link>
      )}
      <div className="p-4">
        <h2 className="text-md font-semibold">{title}</h2>
        <p>{vote_average.toFixed(1)} ⭐ / 10</p>
        <div className="flex items-center gap-2 mt-2">
          <Link to={details}>
            <Button>See details</Button>
          </Link>

          <WishlistButton movieId={id} />
        </div>
      </div>
    </div>
  );
};
