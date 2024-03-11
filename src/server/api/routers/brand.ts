import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { createBrandSchema, searchBrandSchema } from "@/schemas/brand";

export const brandRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createBrandSchema)
    .mutation(async ({ ctx, input }) => {
      // Make sure brand does not exist already
      const existingBrand = await ctx.db.brand.findFirst({
        where: { name: { equals: input.name, mode: "insensitive" } },
      });

      if (existingBrand)
        throw new TRPCError({
          code: "CONFLICT",
          message: "Brand already exist",
        });

      // Create the brand
      const brand = await ctx.db.brand.create({
        data: {
          name: input.name,
        },
      });

      return brand;
    }),

  search: publicProcedure
    .input(searchBrandSchema)
    .query(async ({ ctx, input }) => {
      const { name } = input;

      const brands = await ctx.db.brand.findMany({
        where: name
          ? {
              name: {
                contains: name,
                mode: "insensitive",
              },
            }
          : undefined,
      });

      return brands;
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.product.findMany();
  }),

  getTop: publicProcedure.query(({ ctx }) => {
    return ctx.db.brand.findMany({
      take: 10,
      orderBy: {
        products: {
          _count: "desc",
        },
      },
    });
  }),
});
