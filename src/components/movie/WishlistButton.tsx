import { Heart } from "lucide-react";
import { useWishlist } from "../../hooks/useWishlist.ts";

export const WishlistButton = ({
  movieId,
  onAddToWishlist,
  onRemoveFromWishlist,
}: {
  movieId: number;
  onAddToWishlist?: () => void;
  onRemoveFromWishlist?: () => void;
}) => {
  const {
    movies: wishlistMovies,
    addToWishlist,
    removeFromWishlist,
  } = useWishlist();

  if (wishlistMovies.includes(movieId)) {
    return (
      <button
        title="Remove from whishlist"
        onClick={() => {
          removeFromWishlist(movieId);

          if (onRemoveFromWishlist) {
            onRemoveFromWishlist();
          }
        }}
      >
        <Heart fill="#ff4d4d" stroke="#ff4d4d" className="h-6 w-6" />
      </button>
    );
  }

  if (!wishlistMovies.includes(movieId)) {
    return (
      <button
        title="Add to whishlist"
        onClick={() => {
          addToWishlist(movieId);

          if (onAddToWishlist) {
            onAddToWishlist();
          }
        }}
      >
        <Heart stroke="#ff4d4d" />
      </button>
    );
  }

  return null;
};
