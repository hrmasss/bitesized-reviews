import { db } from "@/server/db";
import { getServerAuthSession } from "@/server/auth";

import Logo from "@/assets/logo.png";
import Navbar from "@/components/navbar";
import Image from "next/image";
import Footer from "@/components/footer";
import Link from "next/link";
import ReviewCard from "@/components/review-card";

export default async function Home() {
  const session = await getServerAuthSession();

  const latestReviews = await db.review.findMany({
    orderBy: {
      createdAt: "desc",
    },
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
          <h1 className={`text-3xl font-bold md:text-7xl`}>
            BiteSized Reviews
          </h1>
        </Link>
      </div>
      <Navbar session={session} />
      <main className="min-h-screen py-5">
        <div className="relative mx-4 my-5 overflow-hidden rounded-lg md:mx-10 md:rounded-3xl">
          <div className="blob-animate absolute inset-0 m-auto size-72 rounded-full bg-primary/30" />

          <div className="z-10 flex items-center justify-center gap-4 rounded-lg border bg-card/20 p-4 shadow backdrop-blur-3xl md:rounded-3xl md:p-10">
            <div className="flex max-w-3xl flex-col justify-center">
              <h1 className="text-pretty text-center text-xl md:text-5xl">
                Discover honest and short reviews for everyday products, all in
                one place.
              </h1>
            </div>
          </div>
        </div>

        {latestReviews && (
          <div id="latest-reviews" className="p-4 md:px-10">
            <h1 className="text-2xl font-semibold">Latest Reviews</h1>
            <div className="md: grid gap-8 py-4 md:grid-cols-2 lg:grid-cols-3">
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
