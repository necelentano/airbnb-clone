import EmptyState from "@/app/components/empty-state/EmptyState";
import Container from "../components/container/Container";
import TripsClient from "./properties-client/PropertiesClient";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getListings from "../actions/getListings";
import PropertiesClient from "./properties-client/PropertiesClient";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <Container>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </Container>
    );
  }

  const listings = await getListings({ userId: currentUser.id });

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
        <EmptyState
          title="No properties found"
          subtitle="Looks like you have no properties."
        />
      </Container>
    );
  }

  return <PropertiesClient listings={listings} currentUser={currentUser} />;
};

export default PropertiesPage;
