import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext.ts";

export const useWishlist = () => useContext(WishlistContext);
