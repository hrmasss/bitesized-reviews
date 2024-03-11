import { getServerAuthSession } from "@/server/auth";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <>
      <Navbar session={session} />
      <main className="min-h-screen p-4 py-5 md:px-10">
        
      </main>
      <Footer />
    </>
  );
}
