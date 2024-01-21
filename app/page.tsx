import getCurrentUser from "./actions/getCurrentUser";
import getListings from "./actions/getListings";
import Container from "./components/container/Container";
import EmptyState from "./components/empty-state/EmptyState";
import ListingCard from "./components/listings/listing-card/ListingCard";

export default async function Home() {
  const listings = await getListings();
  const currentUser = await getCurrentUser();

  // basic error-handling
  if (listings instanceof Error) {
    return (
      <Container>
        <div className="h-[60vh] flex flex-col gap-2 justify-center items-center text-red-600">
          ERROR: {listings.message}
        </div>
      </Container>
    );
  }

  if (listings.length === 0) {
    return (
      <Container>
        <EmptyState showReset />
      </Container>
    );
  }
  return (
    <Container>
      <div
        className="
          pt-24
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
      >
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
}
