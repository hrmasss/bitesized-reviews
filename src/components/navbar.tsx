import { Button } from "./ui/button";
import Link from "next/link";
import MobileNav from "./mobile-nav";
import { ThemeSwitch } from "./theme-switch";

export const navLinks = [
  {
    text: "Discover",
    href: "/discover",
  },
  {
    text: "About",
    href: "/about",
  },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-background/90 backdrop-blur transition-colors duration-500">
      {/* Desktop Nav */}
      <div className="hidden h-16 items-center justify-between border-y-2 border-foreground md:flex">
        <nav className="flex h-full items-center justify-center text-xl font-medium">
          {navLinks.map((link) => (
            <Link className="group ml-10" key={link.href} href={link.href}>
              {link.text}
              <span className="block h-0.5 max-w-0 bg-primary transition-all duration-150 group-hover:max-w-full" />
            </Link>
          ))}
          <span className="group ml-10">
            <ThemeSwitch variant="text" />
            <span className="block h-0.5 max-w-0 bg-primary transition-all duration-150 group-hover:max-w-full" />
          </span>
        </nav>
        <div>
          <Button
            asChild
            variant="outline"
            className="h-16 rounded-none border-2 border-foreground px-8 hover:bg-primary hover:text-background"
          >
            <Link href="#" className="text-xl">
              Login
            </Link>
          </Button>
          <Button
            asChild
            className="h-16 rounded-none border-2 border-l-0 border-foreground bg-foreground px-8 text-background hover:bg-primary"
          >
            <Link href="#" className="text-xl">
              Post Review
            </Link>
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      <MobileNav />
    </header>
  );
}
