"use client";

import type { BuiltInProviderType } from "next-auth/providers/index";
import {
  signIn,
  type ClientSafeProvider,
  type LiteralUnion,
} from "next-auth/react";
import { Button } from "@/components/ui/button";

import GoogleLogo from "@/components/auth/logos/google";

const renderProviderLogo = (providerName: string) => {
  switch (providerName.toLowerCase()) {
    case "google":
      return <GoogleLogo className="h-5 w-5" />;
    default:
      return null;
  }
};

interface AuthCardProps {
  title: string;
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
  form: React.ReactNode;
}

export default function AuthCard({ title, providers, form }: AuthCardProps) {
  return (
    <div className="w-full md:w-2/3">
      <h3 className="text-2xl font-bold">{title}</h3>
      <div className="pt-6">
        {providers && (
          <div className="grid gap-4">
            {Object.values(providers)
              .filter((provider) => provider.type === "oauth")
              .map((oAuthProvider) => (
                <Button
                  onClick={() =>
                    signIn(oAuthProvider.id, { callbackUrl: "/app" })
                  }
                  key={oAuthProvider.id}
                  variant="outline"
                  className="w-full rounded-none border-2 border-foreground text-lg hover:bg-primary hover:text-background"
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
  );
}
