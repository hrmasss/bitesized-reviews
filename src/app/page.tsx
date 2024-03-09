import Navbar from "@/components/navbar";
import Image from "next/image";
import Logo from "@/assets/logo.png";
import { lobster } from "@/styles/fonts";

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
      <main>
        <p>Hello world</p>
      </main>
    </>
  );
}
