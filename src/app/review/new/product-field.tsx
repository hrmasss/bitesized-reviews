import React from "react";
import type { UseFormReturn } from "react-hook-form";
import type { createReviewSchema } from "@/schemas/review";
import type { Product } from "@prisma/client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
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
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import Spinner from "@/components/ui/spinner";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface RenderProductFieldProps {
  isDesktop: boolean;
  drawerOpen: boolean;
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  form: UseFormReturn<createReviewSchema>;
  products?: Product[];
  isLoading: boolean;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
}

const renderProductField = ({
  isDesktop,
  drawerOpen,
  setDrawerOpen,
  form,
  products,
  isLoading,
  setSearchInput,
}: RenderProductFieldProps) => {
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
    );
  }
};

export { renderProductField };
