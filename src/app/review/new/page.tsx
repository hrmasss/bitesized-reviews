import { getServerAuthSession } from "@/server/auth";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ReviewForm from "./review-form";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <>
      <Navbar session={session} />
      <main className="p-4 md:p-10">
        <ReviewForm />
      </main>
      <Footer />
    </>
  );
}
