import { z } from "zod";

export const createReviewSchema = z.object({
  productId: z.number().int(),
  positives: z.string().array().optional(),
  negatives: z.string().array().optional(),
  verdict: z
    .string()
    .max(255, { message: "Too long! Keep it under 255 characters." })
    .optional(),
});

export type createReviewSchema = z.TypeOf<typeof createReviewSchema>;
