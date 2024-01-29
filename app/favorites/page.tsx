import EmptyState from "@/app/components/empty-state/EmptyState";
import Container from "../components/container/Container";
import FavoritesClient from "./favorites-client/FavoritesClient";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getFavoriteListings from "../actions/getFavoriteListings";

const FavoritesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <Container>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </Container>
    );
  }

  const favorites = await getFavoriteListings();

  // basic error-handling
  if (favorites instanceof Error) {
    return (
      <Container>
        <div className="h-[60vh] flex flex-col gap-2 justify-center items-center text-red-600">
          ERROR: {favorites.message}
        </div>
      </Container>
    );
  }

  if (favorites.length === 0) {
    return (
      <Container>
        <EmptyState
          title="No favorites found"
          subtitle="Looks like you have no favorite listings."
        />
      </Container>
    );
  }

  return <FavoritesClient listings={favorites} currentUser={currentUser} />;
};

export default FavoritesPage;
