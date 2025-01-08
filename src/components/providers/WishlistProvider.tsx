import { ReactNode } from "react";
import { WishlistContext } from "../../context/WishlistContext.ts";
import { useLocalStorage } from "../../hooks/useLocalStorage.ts";

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [movies, setMovies] = useLocalStorage<number[]>("wishlist", []);

  const addMovie = (movieId: number) => {
    setMovies((oldMovies) =>
      oldMovies.includes(movieId) ? movies : [...movies, movieId],
    );
  };

  const removeMovie = (movieId: number) => {
    setMovies((oldMovies) => oldMovies.filter((id) => id !== movieId));
  };

  return (
    <WishlistContext.Provider
      value={{
        movies,
        addToWishlist: addMovie,
        removeFromWishlist: removeMovie,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
