"use client";

import { api } from "@/trpc/react";
import { createReviewSchema } from "@/schemas/review";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { toast } from "@/components/ui/use-toast";
import Spinner from "@/components/ui/spinner";
import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useMediaQuery } from "@/hooks/use-media-query";
import ReviewPreview from "./review-preview";
import MultiInputs from "@/components/MultiInputs";

export default function ReviewForm() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const [searchInput, setSearchInput] = useState<string>("");

  // Debounced search term to reduce api calls
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // Update debounced query after timeout
      setSearchQuery(searchInput);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchInput]);

  const { data: products, isLoading } = api.product.search.useQuery({
    name: searchQuery,
  });

  const form = useForm<createReviewSchema>({
    resolver: zodResolver(createReviewSchema),
  });

  const [positives, setPositives] = useState<string[]>([]);
  const [negatives, setNegatives] = useState<string[]>([]);

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

  const preview = { ...form.watch(), positives, negatives };

  function onSubmit(data: createReviewSchema) {
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
  }

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
            {isDesktop ? (
              <FormField
                control={form.control}
                name="productId"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Product</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value
                              ? products?.find(
                                  (product) => product.id === field.value,
                                )?.name
                              : "Select product"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent align="start" className="p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search products..."
                            onValueChange={(value) => setSearchInput(value)}
                          />
                          <CommandEmpty>No products found.</CommandEmpty>
                          {isLoading ? (
                            <p className="flex items-center p-4">
                              <Spinner />
                              Loading...
                            </p>
                          ) : (
                            <CommandGroup>
                              {products?.map((product) => (
                                <CommandItem
                                  className="mb-1 cursor-pointer"
                                  value={product.name}
                                  key={product.id}
                                  onSelect={() => {
                                    form.setValue("productId", product.id);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      product.id === field.value
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                  {product.name}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          )}
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      This is the product that will be reviewed.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <FormField
                control={form.control}
                name="productId"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Product</FormLabel>
                    <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
                      <DrawerTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value
                              ? products?.find(
                                  (product) => product.id === field.value,
                                )?.name
                              : "Select product"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </DrawerTrigger>
                      <DrawerContent>
                        <div className="mt-4 border-t">
                          <Command className="bg-background">
                            <CommandInput
                              placeholder="Search products..."
                              onValueChange={(value) => setSearchInput(value)}
                            />
                            <CommandEmpty>No products found.</CommandEmpty>
                            {isLoading ? (
                              <p className="flex items-center p-4">
                                <Spinner />
                                Loading...
                              </p>
                            ) : (
                              <CommandGroup>
                                {products?.map((product) => (
                                  <CommandItem
                                    className="mb-1 cursor-pointer"
                                    value={product.name}
                                    key={product.id}
                                    onSelect={() => {
                                      form.setValue("productId", product.id);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        product.id === field.value
                                          ? "opacity-100"
                                          : "opacity-0",
                                      )}
                                    />
                                    {product.name}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            )}
                          </Command>
                        </div>
                      </DrawerContent>
                    </Drawer>
                    <FormDescription>
                      This is the product that will be reviewed.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

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
