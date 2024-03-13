import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(3, { message: "Name must be atleast 3 characters" }),
  brandId: z.number().int(),
  price: z.number().int(),
  images: z.string().array().nonempty(),
  categories: z.number().int().array().optional(),
});

export type createProductSchema = z.TypeOf<typeof createProductSchema>;

export const searchProductSchema = z.object({
  name: z.string().optional(),
});

export type searchProductSchema = z.TypeOf<typeof searchProductSchema>;

export const getProductSchema = z.object({
  id: z.number().int(),
});

export type getProductSchema = z.TypeOf<typeof getProductSchema>;
