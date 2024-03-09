import Navbar from "@/components/navbar";
import Image from "next/image";
import Logo from "@/assets/logo.png";
import { lobster } from "@/styles/fonts";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <div className="hidden items-center justify-center md:flex">
        <Image src={Logo} alt="" className="size-32" />
        <h1 className={`font-display text-7xl font-bold ${lobster.className}`}>
          BiteSized Reviews
        </h1>
      </div>
      <Navbar />
      <main className="py-4 min-h-screen">
        <div>
          <h1 className="text-3xl">Latest Reviews</h1>
        </div>
      </main>
      <Footer />
    </>
  );
}
