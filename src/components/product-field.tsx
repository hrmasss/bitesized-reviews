import { api } from "@/trpc/react";
import type { UseFormReturn } from "react-hook-form";
import type { createReviewSchema } from "@/schemas/review";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useState, useEffect } from "react";

import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  FormControl,
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
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import Spinner from "@/components/ui/spinner";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductFieldProps {
  form: UseFormReturn<createReviewSchema>;
}

export default function ProductField({ form }: ProductFieldProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const {
    data: products,
    status,
  } = api.product.search.useQuery({
    name: searchQuery,
  });

  // Debounce search query
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchQuery(searchInput);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchInput]);

  const renderProductOptions = () => {
    if (status === "loading") {
      return (
        <p className="flex items-center p-4">
          <Spinner />
          Loading...
        </p>
      );
    }

    if (status === "error") {
      return <p className="p-4 text-destructive">Something went wrong!</p>;
    }

    if (products?.length === 0) {
      return <p className="p-4 text-destructive">No products found!</p>;
    }

    return (
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
                product.id === form.getValues("productId")
                  ? "opacity-100"
                  : "opacity-0",
              )}
            />
            {product.name}
          </CommandItem>
        ))}
      </CommandGroup>
    );
  };

  if (isDesktop) {
    return (
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
                      ? products?.find((product) => product.id === field.value)
                          ?.name
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
                  {renderProductOptions()}
                </Command>
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  } else {
    return (
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
                      ? products?.find((product) => product.id === field.value)
                          ?.name
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
                    {renderProductOptions()}
                  </Command>
                </div>
              </DrawerContent>
            </Drawer>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }
}
