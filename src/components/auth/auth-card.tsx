"use client";

import type { BuiltInProviderType } from "next-auth/providers/index";
import {
  signIn,
  type ClientSafeProvider,
  type LiteralUnion,
} from "next-auth/react";
import { Button } from "@/components/ui/button";
import GoogleLogo from "@/components/auth/logos/google";
import Image from "next/image";
import Logo from "@/assets/logo.png";
import Link from "next/link";

const renderProviderLogo = (providerName: string) => {
  switch (providerName.toLowerCase()) {
    case "google":
      return <GoogleLogo className="h-5 w-5" />;
    default:
      return null;
  }
};

interface AuthCardProps {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
  form: React.ReactNode;
}

export default function AuthCard({ providers, form }: AuthCardProps) {
  return (
    <div className="w-full md:w-2/3">
      <div className="mb-6  md:hidden">
        <Link href="/" className="flex flex-col items-center justify-center py-2">
          <Image src={Logo} alt="" className="size-20" />
          <h1
            className={`text-3xl font-bold md:text-7xl`}
          >
            BiteSized Reviews
          </h1>
        </Link>
      </div>
      <div className="px-2 md:px-0">
        <h3 className="text-xl font-bold md:text-2xl">Sign in to your account</h3>
        <div className="pt-6">
          {providers && (
            <div className="grid gap-4">
              {Object.values(providers)
                .filter((provider) => provider.type === "oauth")
                .map((oAuthProvider) => (
                  <Button
                    onClick={() => signIn(oAuthProvider.id, { callbackUrl: "/" })}
                    key={oAuthProvider.id}
                    variant="outline"
                    className="w-full rounded-none border-2 border-foreground md:text-lg hover:bg-primary hover:text-background font-semibold"
                  >
                    {renderProviderLogo(oAuthProvider.name)}
                    {oAuthProvider.name}
                  </Button>
                ))}
            </div>
          )}
          {providers && (
            <div className="mb-6 mt-8 flex items-center justify-center gap-2">
              <div className="h-[1px] grow bg-border" />
              or
              <div className="h-[1px] grow bg-border" />
            </div>
          )}
          {form}
        </div>
      </div>
    </div>
  );
}
