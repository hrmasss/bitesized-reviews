"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/trpc/react";
import { createReviewSchema } from "@/schemas/review";
import { useMediaQuery } from "@/hooks/use-media-query";
import { toast } from "@/components/ui/use-toast";
import { renderProductField } from "./product-field";

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
import MultiInputs from "@/components/MultiInputs";

export default function ReviewForm() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [positives, setPositives] = useState<string[]>([]);
  const [negatives, setNegatives] = useState<string[]>([]);

  const { data: products, isLoading } = api.product.search.useQuery({
    name: searchQuery,
  });

  const form = useForm<createReviewSchema>({
    resolver: zodResolver(createReviewSchema),
  });

  const preview = { ...form.watch(), positives, negatives };

  // Debounce search query
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchQuery(searchInput);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchInput]);

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

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify(formData, null, 2)}
          </code>
        </pre>
      ),
    });
  };

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
            {renderProductField({
              isDesktop,
              drawerOpen,
              setDrawerOpen,
              form,
              products,
              isLoading,
              setSearchInput,
            })}

            <MultiInputs label="Positives" addValue={handleAddPositive} />

            <MultiInputs label="Negatives" addValue={handleAddNegative} />

            <FormField
              control={form.control}
              name="verdict"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
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
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </section>
    </main>
  );
}
