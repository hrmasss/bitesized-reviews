import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import {
  createProductSchema,
  getProductSchema,
  searchProductSchema,
} from "@/schemas/product";

export const productRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createProductSchema)
    .mutation(async ({ ctx, input }) => {
      // Check if the brand exists
      const brand = await ctx.db.brand.findUnique({
        where: { id: input.brandId },
      });

      if (!brand)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Brand does not exist",
        });

      // Check if the categories exist
      const existingCategories = await ctx.db.category.findMany({
        where: { id: { in: input.categories ?? [] } },
      });

      const validCategories = input.categories?.filter((categoryId) =>
        existingCategories.some((c) => c.id === categoryId),
      );

      // Create the product
      const product = await ctx.db.product.create({
        data: {
          name: input.name,
          brand: { connect: { id: input.brandId } },
          price: input.price,
          images: input.images,
          categories: validCategories?.length
            ? { connect: validCategories.map((id) => ({ id })) }
            : undefined,
        },
      });

      return product;
    }),

  get: publicProcedure.input(getProductSchema).query(async ({ ctx, input }) => {
    const product = await ctx.db.product.findUnique({
      where: {
        id: input.id,
      },
      include: {
        brand: true,
        categories: true,
      },
    });

    return product;
  }),

  search: publicProcedure
    .input(searchProductSchema)
    .query(async ({ ctx, input }) => {
      const { name } = input;

      const products = await ctx.db.product.findMany({
        take: 10,
        orderBy: {
          reviews: {
            _count: "desc",
          },
        },
        where: name
          ? {
              name: {
                contains: name,
                mode: "insensitive",
              },
            }
          : undefined,
        include: {
          brand: true,
          categories: true,
        },
      });

      return products;
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.product.findMany({
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
    });
  }),

  getTop: publicProcedure.query(({ ctx }) => {
    return ctx.db.product.findMany({
      take: 10,
      orderBy: {
        reviews: {
          _count: "desc",
        },
      },
    });
  }),
});
