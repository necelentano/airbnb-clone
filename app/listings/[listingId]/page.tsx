import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import Container from "@/app/components/container/Container";
import EmptyState from "@/app/components/empty-state/EmptyState";
import React from "react";
import ListingClient from "./listing-client/ListingClient";

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
  const currentUser = await getCurrentUser();

  // basic error-handling
  if (listing instanceof Error) {
    return (
      <Container>
        <div className="h-[60vh] flex flex-col gap-2 justify-center items-center text-red-600">
          ERROR: {listing.message}
        </div>
      </Container>
    );
  }

  if (!listing) {
    return (
      <Container>
        <EmptyState showReset />
      </Container>
    );
  }
  return <ListingClient listing={listing} currentUser={currentUser} />;
};

export default ListingPage;
