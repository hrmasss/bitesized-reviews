"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/trpc/react";
import { createProductSchema } from "@/schemas/product";
import { useRouter } from "next/navigation";

// Components
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Spinner from "@/components/ui/spinner";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import BrandField from "@/components/brand-field";

export default function ProductForm() {
  const { mutate, status } = api.product.create.useMutation();

  const router = useRouter();

  const form = useForm<createProductSchema>({
    resolver: zodResolver(createProductSchema),
  });

  const onSubmit = (data: createProductSchema) => {
    mutate(data);
  };

  useEffect(() => {
    if (status === "error") {
      toast({
        title: "Something went wrong!",
        variant: "destructive",
      });
    } else if (status === "success") {
      toast({
        title: "Review submitted successfully!",
        description: "Refresh to see changes...",
        variant: "success",
      });

      router.push("/");
    }
  }, [status, router]);

  return (
    <main className="grid gap-4 lg:grid-cols-2">
      <section className="max-w-xl">
        <h3 className="my-4 text-xl font-bold">Preview</h3>
      </section>

      <section className="max-w-xl">
        <h3 className="my-4 text-xl font-bold">Post a new review</h3>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 rounded-lg border bg-background p-6 shadow-sm"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Product name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Product price"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <BrandField form={form} />

            <Button disabled={status === "loading"} type="submit">
              {status === "loading" ? (
                <span className="flex items-center">
                  <Spinner /> Adding product, please wait...{" "}
                </span>
              ) : (
                "Add product"
              )}
            </Button>
          </form>
        </Form>
      </section>
    </main>
  );
}
