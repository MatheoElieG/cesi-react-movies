import { createContext } from "react";

type WishlistContextType = {
  movies: number[];
  addToWishlist: (id: number) => void;
  removeFromWishlist: (id: number) => void;
};

export const WishlistContext = createContext<WishlistContextType>(
  {} as WishlistContextType,
);
