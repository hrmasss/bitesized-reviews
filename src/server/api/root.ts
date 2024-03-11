import { reviewRouter } from "@/server/api/routers/review";
import { productRouter } from "@/server/api/routers/product";
import { brandRouter } from "@/server/api/routers/brand";
import { categoryRouter } from "@/server/api/routers/category";
import { createTRPCRouter } from "@/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  review: reviewRouter,
  product: productRouter,
  brand: brandRouter,
  category: categoryRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
