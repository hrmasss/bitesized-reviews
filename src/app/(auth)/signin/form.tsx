"use client";

import { z } from "zod";
import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Spinner from "@/components/ui/spinner";

const emailSchema = z.object({
  email: z.string().email("Please provide a valid email"),
});

type emailSchema = z.TypeOf<typeof emailSchema>;

export default function SignInForm() {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const form = useForm<emailSchema>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: emailSchema) {
    setError("");
    setLoading(true);

    const response = await signIn("email", {
      ...data,
      callbackUrl: "/",
      redirect: false,
    });
    setLoading(false);

    if (response?.ok) setMessage("Email sent. Check your account.")
    else if (response?.error) setError(response.error);
    else setError("Something went wrong! check your network and try again.");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
        {error && (
          <p className="text-center text-[0.8rem] font-medium text-destructive">
            {error}
          </p>
        )}
        
        {message && (
          <p className="text-center text-[0.8rem] font-medium text-green-600">
            {message}
          </p>
        )}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="someone@example.com"
                  {...field}
                  className="rounded-none border-2 border-foreground"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={loading}
          type="submit"
          className="w-full rounded-none border-2 border-foreground bg-black hover:bg-primary"
        >
          {loading ? (
            <span className="flex">
              <Spinner className="text-primary-foreground" />
              Sending sign in link, please wait...
            </span>
          ) : (
            "Get sign in link"
          )}
        </Button>
      </form>
    </Form>
  );
}
