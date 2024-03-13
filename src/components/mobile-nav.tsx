"use client";

import { navLinks } from "./navbar";
import { Button } from "./ui/button";
import { BarChart2, X, Plus } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { ThemeSwitch } from "./theme-switch";

export default function MobileNav({ auth }: { auth: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="flex h-12 items-center justify-between gap-4 border-y-2 border-foreground md:hidden">
        <Button
          size="icon"
          variant="ghost"
          className="h-16 rounded-none text-foreground hover:bg-transparent"
          onClick={() => setOpen((p) => !p)}
        >
          {open ? (
            <X className="size-8" />
          ) : (
            <BarChart2 className="size-8 rotate-90" />
          )}
        </Button>

        {auth ? (
          <Button
            asChild
            className="size-12 rounded-none border-2 border-foreground bg-foreground p-0 text-background hover:bg-primary"
          >
            <Link href="/review/new">
              <Plus className="size-6" />
            </Link>
          </Button>
        ) : (
          <Button
            asChild
            variant="outline"
            className="h-12 rounded-none border-2 border-foreground hover:bg-primary hover:text-background"
          >
            <Link href="/signin">Sign in</Link>
          </Button>
        )}
      </div>
      <div
        className={`absolute w-full flex-col gap-4 border-b-2 border-foreground bg-background p-4 font-medium md:hidden ${open ? "flex" : "hidden"}`}
      >
        {auth && (
          <Link href="/signout">
            Sign out
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
