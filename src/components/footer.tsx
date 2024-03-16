import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/logo.png";

export default function Footer() {
  return (
    <footer className="flex h-12 md:h-16 items-center justify-center border-y-2 border-foreground bg-background px-10 lg:justify-between lg:text-xl">
      <span className="flex items-center justify-center gap-2">
        <Image src={Logo} alt="" className="size-8 md:size-12" />
        <h1 className={`text-xl md:text-3xl font-bold`}>
          BiteSized Reviews
        </h1>
      </span>
      <span className="hidden text-center lg:flex lg:text-start">
        Built with ❤️ by
        <Link
          href="https://twitter.com/hrmasss"
          className="group mx-1 font-medium"
        >
          hrmasss
          <span className="block h-0.5 max-w-0 bg-primary transition-all duration-150 group-hover:max-w-full" />
        </Link>
        , source available at
        <Link
          href="https://github.com/hrmasss/bitesized-reviews"
          className="group mx-1 font-medium"
        >
          GitHub
          <span className="block h-0.5 max-w-0 bg-primary transition-all duration-150 group-hover:max-w-full" />
        </Link>
        .
      </span>
    </footer>
  );
}
