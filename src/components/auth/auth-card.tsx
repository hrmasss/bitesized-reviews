"use client";

import type { BuiltInProviderType } from "next-auth/providers/index";
import {
  signIn,
  type ClientSafeProvider,
  type LiteralUnion,
} from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import GoogleLogo from "@/components/auth/logos/google";

const renderProviderLogo = (providerName: string) => {
  switch (providerName.toLowerCase()) {
    case "google":
      return <GoogleLogo className="h-5 w-5"/>;
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

export default function AuthCard({
  title,
  providers,
  form,
}: AuthCardProps) {
  return (
    <Card className="border-none w-full md:w-2/3 bg-background">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
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
                  className="w-full border-2 border-foreground hover:bg-primary hover:text-background text-lg rounded-none"
                >
                  {renderProviderLogo(oAuthProvider.name)}
                  {oAuthProvider.name}
                </Button>
              ))}
          </div>
        )}

        {providers && (
          <div className="mt-8 mb-6 flex items-center justify-center gap-2">
            <div className="h-[1px] grow bg-border" />
            or
            <div className="h-[1px] grow bg-border" />
          </div>
        )}

        {form}
      </CardContent>
    </Card>
  );
}
