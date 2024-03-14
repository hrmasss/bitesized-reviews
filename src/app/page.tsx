import { db } from "@/server/db";
import { getServerAuthSession } from "@/server/auth";

import { lobster } from "@/styles/fonts";
import Logo from "@/assets/logo.png";
import Navbar from "@/components/navbar";
import Image from "next/image";
import Footer from "@/components/footer";
import Link from "next/link";
import ReviewCard from "@/components/review-card";

export default async function Home() {
  const session = await getServerAuthSession();

  const latestReviews = await db.review.findMany({
    include: {
      product: {
        include: {
          brand: true,
        },
      },
    },
  });

  return (
    <>
      <div>
        <Link href="/" className="flex items-center justify-center py-2">
          <Image src={Logo} alt="" className="size-12 md:size-32" />
          <h1
            className={`font-display text-3xl font-bold md:text-7xl ${lobster.className}`}
          >
            BiteSized Reviews
          </h1>
        </Link>
      </div>
      <Navbar session={session} />
      <main className="min-h-screen py-5">
        {latestReviews && (
          <div className="md:p-10 p-2">
            <h1 className="text-2xl font-semibold">Latest Reviews</h1>
            <div className="md: grid gap-4 py-4 md:grid-cols-2 lg:grid-cols-3">
              {latestReviews.map((review) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  product={review.product}
                  brand={review.product.brand}
                />
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
