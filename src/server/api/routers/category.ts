import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { createCategorySchema, searchCategorySchema } from "@/schemas/category";

export const categoryRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createCategorySchema)
    .mutation(async ({ ctx, input }) => {
      // Make sure category does not exist already
      const existingCategory = await ctx.db.category.findFirst({
        where: { name: { equals: input.name, mode: "insensitive" } },
      });

      if (existingCategory)
        throw new TRPCError({
          code: "CONFLICT",
          message: "Cayegory already exist",
        });

      // Create the category
      const category = await ctx.db.category.create({
        data: {
          name: input.name,
        },
      });

      return category;
    }),

  search: publicProcedure
    .input(searchCategorySchema)
    .query(async ({ ctx, input }) => {
      const { name } = input;

      const categories = await ctx.db.category.findMany({
        where: name
          ? {
              name: {
                contains: name,
                mode: "insensitive",
              },
            }
          : undefined,
      });

      return categories;
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.category.findMany();
  }),

  getTop: publicProcedure.query(({ ctx }) => {
    return ctx.db.category.findMany({
      take: 10,
      orderBy: {
        products: {
          _count: "desc",
        },
      },
    });
  }),
});
