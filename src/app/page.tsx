import Navbar from "@/components/navbar";
import Image from "next/image";
import Logo from "@/assets/logo.png";
import { lobster } from "@/styles/fonts";
import Footer from "@/components/Footer";
import { db } from "@/server/db";
import ReviewCard from "@/components/review-card";

export default async function Home() {
  const latestReviews = await db.review.findMany({
    include: {
      product: true,
    },
  });

  return (
    <>
      <div className="hidden items-center justify-center md:flex">
        <Image src={Logo} alt="" className="size-32" />
        <h1 className={`font-display text-7xl font-bold ${lobster.className}`}>
          BiteSized Reviews
        </h1>
      </div>
      <Navbar />
      <main className="min-h-screen py-5">
        {latestReviews && (
          <div className="m-5 p-5">
            <h1 className="text-3xl">Latest Reviews</h1>
            <div className="md: grid gap-4 py-4 md:grid-cols-2">
              {latestReviews.map((review) => (
                <div key={review.id} className="border-2 border-foreground p-4 rounded-lg">
                  <h3 className="text-xl font-semibold">
                    {review.product.name}
                  </h3>
                  <div className="mt-2 grid gap-2 border-t border-foreground pt-2 md:grid-cols-2">
                    <div className="text-green-600">
                      <p className="text-lg font-semibold">Positives</p>
                      {review.positives.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </div>
                    <div className="text-red-600">
                      <p className="text-lg font-semibold">Negatives</p>
                      {review.negatives.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </div>
                  </div>
                  <div className="flex pt-2">
                    <p className="text-lg">
                      <span className="mr-2 font-semibold">Verdict:</span>
                      {review.verdict}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
