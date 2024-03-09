import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { createReviewSchema } from "@/schemas/review";

export const reviewRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createReviewSchema)
    .mutation(async ({ ctx, input }) => {
      // Check if the product exist

      const product = await ctx.db.product.findUnique({
        where: { id: input.productId },
      });

      if (!product)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Product does not exist",
        });

      return ctx.db.review.create({
        data: {
          product: { connect: { id: input.productId } },
          author: { connect: { id: ctx.session.user.id } },
          positives: input.positives,
          negatives: input.negatives,
          verdict: input.verdict,
        },
      });
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.review.findMany();
  }),
});
