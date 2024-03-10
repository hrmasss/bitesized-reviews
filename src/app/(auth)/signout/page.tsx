"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function signout() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Button onClick={() => signOut({ callbackUrl: "/" })} size="lg" className="rounded-none border-2 border-foreground text-foreground">
        Sign out
      </Button>
    </div>
  );
}
