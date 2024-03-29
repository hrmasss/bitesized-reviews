"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/trpc/react";
import { createReviewSchema } from "@/schemas/review";
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
import { Textarea } from "@/components/ui/textarea";
import ReviewPreview from "./review-preview";
import MultiInputs from "@/components/multi-inputs";
import ProductField from "@/components/product-field";
import Spinner from "@/components/ui/spinner";
import { toast } from "@/components/ui/use-toast";

export default function ReviewForm() {
  const [positives, setPositives] = useState<string[]>([]);
  const [negatives, setNegatives] = useState<string[]>([]);

  const { mutate, status } = api.review.create.useMutation();

  const router = useRouter();

  const form = useForm<createReviewSchema>({
    resolver: zodResolver(createReviewSchema),
  });

  const preview = { ...form.watch(), positives, negatives };

  const handleAddPositive = (value: string) => {
    setPositives([...positives, value]);
  };

  const handleAddNegative = (value: string) => {
    setNegatives([...negatives, value]);
  };

  const handleRemovePositive = (index: number) => {
    setPositives((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveNegative = (index: number) => {
    setNegatives((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = (data: createReviewSchema) => {
    const formData = {
      ...data,
      positives,
      negatives,
    };

    mutate(formData);
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
        <ReviewPreview
          {...preview}
          removePositive={handleRemovePositive}
          removeNegative={handleRemoveNegative}
        />
      </section>

      <section className="max-w-xl">
        <h3 className="my-4 text-xl font-bold">Post a new review</h3>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 rounded-lg border bg-background p-6 shadow-sm"
          >
            <ProductField form={form} />

            <MultiInputs label="Positives" addValue={handleAddPositive} />

            <MultiInputs label="Negatives" addValue={handleAddNegative} />

            <FormField
              control={form.control}
              name="verdict"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verdict</FormLabel>
                  <FormControl>
                    <Textarea
                      maxLength={265}
                      placeholder="What's your final take on the product?"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={status === "loading"} type="submit">
              {status === "loading" ? (
                <span className="flex items-center">
                  <Spinner /> Publishing...{" "}
                </span>
              ) : (
                "Publish"
              )}
            </Button>
          </form>
        </Form>
      </section>
    </main>
  );
}
