import { ReactNode } from "react";
import { Link } from "react-router";
import { useWishlist } from "../../hooks/useWishlist.ts";
import { Heart } from "lucide-react";

export const PageLayout = ({ children }: { children: ReactNode }) => {
  const { movies } = useWishlist();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="h-16 bg-white shadow-sm fixed w-full top-0 z-50">
        <div className="max-w-screen-xl w-full mx-auto flex items-center justify-between h-full px-4">
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="text-lg font-semibold hover:text-blue-600 transition-colors duration-200"
            >
              🎬 MovieApp
            </Link>

            <div className="hidden md:flex items-center gap-6">
              <Link
                to="/"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                Browse
              </Link>
            </div>
          </div>

          <Link
            to="/wishlist"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors duration-200"
          >
            <Heart className="w-5 h-5 text-blue-600" />
            <span className="text-blue-600 font-medium">
              Wishlist ({movies.length})
            </span>
          </Link>
        </div>
      </nav>

      <main className="pt-20 px-4 pb-10">
        <div className="max-w-screen-xl w-full mx-auto">{children}</div>
      </main>
    </div>
  );
};
