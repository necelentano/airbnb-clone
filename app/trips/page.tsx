import EmptyState from "@/app/components/empty-state/EmptyState";
import Container from "../components/container/Container";
import TripsClient from "./trips-client/TripsClient";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <Container>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </Container>
    );
  }

  const reservations = await getReservations({ userId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <Container>
        <EmptyState
          title="No trips found"
          subtitle="Looks like you havent reserved any trips"
        />
      </Container>
    );
  }

  return <TripsClient reservations={reservations} currentUser={currentUser} />;
};

export default TripsPage;
