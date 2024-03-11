import { z } from "zod";

export const createBrandSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
});

export type createBrandSchema = z.TypeOf<typeof createBrandSchema>;

export const searchBrandSchema = z.object({
  name: z.string().optional(),
});

export type searchBrandSchema = z.TypeOf<typeof searchBrandSchema>;