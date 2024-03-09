import { z } from "zod";

export const createReviewSchema = z.object({
  positives: z.string().array().nonempty(),
  negatives: z.string().array().nonempty(),
  verdict: z.string().optional(),
  productId: z.number().int(),
});

export type createReviewSchema = z.TypeOf<typeof createReviewSchema>;
