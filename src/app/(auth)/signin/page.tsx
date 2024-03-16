import { getProviders } from "next-auth/react";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import Logo from "@/assets/logo.png";
import Image from "next/image";
import AuthCard from "@/components/auth/auth-card";
import SignInForm from "./form";
import Link from "next/link";

export default async function SigninPage() {
  const session = await getServerAuthSession();
  if (session?.user) redirect("/");

  const providers = await getProviders();

  return (
    <section className="grid min-h-screen p-4 lg:grid-cols-2">
      <div className="hidden w-full flex-col items-center justify-center border-r-2 border-foreground lg:flex">
        <Link href="/" className="aspect-square">
          <Image priority src={Logo} alt="" />
        </Link>
        <h1
          className={`text-center text-7xl font-bold`}
        >
          BiteSized Reviews
        </h1>
      </div>
      <main className="flex items-center justify-center">
        <AuthCard providers={providers} form={<SignInForm />} />
      </main>
    </section>
  );
}
