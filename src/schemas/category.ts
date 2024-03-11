import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
});

export type createCategorySchema = z.TypeOf<typeof createCategorySchema>;

export const searchCategorySchema = z.object({
  name: z.string().optional(),
});

export type searchCategorySchema = z.TypeOf<typeof searchCategorySchema>;