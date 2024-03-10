import { getProviders } from "next-auth/react";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import Logo from "@/assets/logo.png";
import Image from "next/image";
import AuthCard from "@/components/auth/auth-card";
import { lobster } from "@/styles/fonts";
import SignInForm from "./form";

export default async function SigninPage() {
  const session = await getServerAuthSession();
  if (session?.user) redirect("/");

  const providers = await getProviders();

  return (
    <section className="grid min-h-screen p-4 lg:grid-cols-2">
      <div className="hidden w-full flex-col items-center justify-center border-r-2 border-foreground lg:flex">
        <div className="aspect-square">
          <Image priority src={Logo} alt="" />
        </div>
        <h1
          className={`text-center font-display text-7xl font-bold ${lobster.className}`}
        >
          BiteSized Reviews
        </h1>
      </div>
      <main className="flex items-center justify-center">
        <AuthCard
          title="Sign in to your account"
          providers={providers}
          form={<SignInForm />}
        />
      </main>
    </section>
  );
}
