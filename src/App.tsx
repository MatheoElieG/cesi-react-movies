import { Route, Routes } from "react-router";
import { PageLayout } from "./components/shared/PageLayout.tsx";
import { MovieDetails } from "./pages/MovieDetails.tsx";
import { WishlistProvider } from "./components/providers/WishlistProvider.tsx";
import { Home } from "./pages/Home.tsx";
import { Wishlist } from "./pages/Wishlist.tsx";
import { NotFound } from "./pages/NotFound.tsx";

function App() {
  return (
    <WishlistProvider>
      <PageLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageLayout>
    </WishlistProvider>
  );
}

export default App;
