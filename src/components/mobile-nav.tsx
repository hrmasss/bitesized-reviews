"use client";

import { navLinks } from "./navbar";
import { lobster } from "@/styles/fonts";
import Logo from "@/assets/logo.png";
import Image from "next/image";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { ThemeSwitch } from "./theme-switch";

export default function MobileNav({ auth }: { auth: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="flex h-16 items-center justify-between gap-4 border-y-2 border-foreground px-4 md:hidden">
        <span className="flex items-center justify-center gap-2">
          <Image src={Logo} alt="" className="size-12" />
          <h1
            className={`font-display text-3xl font-bold ${lobster.className}`}
          >
            BS Reviews
          </h1>
        </span>
        <Button
          size="icon"
          variant="ghost"
          className="h-16 rounded-none text-foreground hover:bg-transparent"
          onClick={() => setOpen((p) => !p)}
        >
          {open ? <X size="3rem" /> : <Menu size="3rem" />}
        </Button>
      </div>
      <div
        className={`absolute w-full flex-col gap-4 border-b-2 border-foreground bg-background p-4 text-xl font-medium md:hidden ${open ? "flex" : "hidden"}`}
      >
        {auth ? (
          <Link href="/signout" className="text-xl">
            Sign out
          </Link>
        ) : (
          <Link href="/signin" className="text-xl">
            Sign in
          </Link>
        )}
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.text}
          </Link>
        ))}
        <ThemeSwitch variant="text" />
      </div>
    </>
  );
}
