// here it is not an api call, it's direct communication with DB through our server component
import prisma from "@/app/libs/prismadb";

export default async function getListings() {
  // actually, we can write this logic directly in our server component app/page.tsx Home
  try {
    const listings = await prisma.listing.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return listings;
  } catch (error: any) {
    return new Error(error);
  }
}
