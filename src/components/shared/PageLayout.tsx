import { ReactNode } from "react";
import { Link } from "react-router";
import { useWishlist } from "../../hooks/useWishlist.ts";

export const PageLayout = ({ children }: { children: ReactNode }) => {
  const { movies } = useWishlist();

  return (
    <div>
      <nav className="h-16">
        <div className="max-w-screen-xl w-full mx-auto flex items-center h-full gap-6">
          <Link to={"/"} className="text-lg">
            Home
          </Link>
          <Link to={"/wishlist"} className="text-lg">
            Wishlist ({movies.length})
          </Link>
        </div>
      </nav>
      <div className="max-w-screen-xl w-full mx-auto my-10">{children}</div>
    </div>
  );
};
