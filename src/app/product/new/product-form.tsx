"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/trpc/react";
import { createProductSchema } from "@/schemas/product";

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
import { useUploadThing } from "@/components/uploadthing";
import { ProductImageUpload } from "@/components/product-image-input";

export default function ProductForm() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [imageError, setImageError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const { mutate, status } = api.product.create.useMutation();

  const form = useForm<createProductSchema>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      price: 0,
      brandId: 0,
      images: [],
      categories: [],
    },
  });

  // Handle image upload
  const {
    startUpload,
    permittedFileInfo,
    isUploading: isImageUploading,
  } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res) => {
      if (res && res.length > 0) {
        const imageUrls = res.map((item) => item.url);
        form.setValue("images", imageUrls);
        setUploadSuccess(true);
      }
    },
    onUploadError: (error) => {
      setImageError("Error uploading image");
      console.error(`${error.code}: ${error.message}`);
      setUploadSuccess(false);
    },
  });

  const acceptedFileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : [];

  // Submit handler
  const onSubmit = async () => {
    setImageError("");
    if (selectedFiles.length > 0) await startUpload(selectedFiles);
    else setUploadSuccess(true);
  };

  // Mutate values when upload is complete
  useEffect(() => {
    if (uploadSuccess) {
      const formData = form.getValues();

      mutate(formData);
      form.reset();
      setUploadSuccess(false);
    }
  }, [uploadSuccess, form, mutate]);

  // Handle mutation status
  useEffect(() => {
    if (status === "error") {
      toast({
        title: "Something went wrong!",
        variant: "destructive",
      });
    } else if (status === "success") {
      toast({
        title: "Successfully added product!",
        variant: "success",
      });
    }
  }, [status]);

  return (
    <main>
      <section className="mx-auto max-w-xl">
        <h3 className="my-4 text-xl font-bold">Add a new product</h3>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 rounded-lg bg-background shadow-sm md:border md:p-6"
          >
            <ProductImageUpload
              acceptedFileTypes={acceptedFileTypes}
              onFilesSelected={(files) => setSelectedFiles(files)}
              error={imageError}
            />

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
                      {...field}
                      type="number"
                      placeholder="Product price"
                      onChange={(event) => field.onChange(+event.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <BrandField form={form} />

            <Button
              disabled={status === "loading" || isImageUploading}
              type="submit"
            >
              {status === "loading" || isImageUploading ? (
                <span className="flex items-center">
                  <Spinner />{" "}
                  {isImageUploading ? "Uploading image" : "Saving product"}...
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
