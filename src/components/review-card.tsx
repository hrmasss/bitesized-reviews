import type { Review, Product, Brand } from "@prisma/client";
import { CirclePlus, CircleMinus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Props {
  product: Product;
  brand: Brand;
  review: Review;
}

export default function ReviewCard({ product, brand, review }: Props) {
  const renderProductHeader = () => (
    <CardHeader>
      <CardTitle>{product.name}</CardTitle>
      <div>
        <p>{brand.name}</p>
      </div>
    </CardHeader>
  );

  const renderPositives = () => (
    <div>
      <ul>
        {review.positives.map((positive, index) => (
          <li key={index} className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <CirclePlus strokeWidth={3} className="text-success size-4" />
              {positive}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );

  const renderNegatives = () => (
    <div>
      <ul>
        {review.negatives.map((negative, index) => (
          <li key={index} className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <CircleMinus
                strokeWidth={3}
                className="size-4 text-destructive"
              />
              {negative}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <Card className="overflow-hidden border shadow">
      {renderProductHeader()}
      {(review.positives.length > 0 || review.negatives.length > 0) && (
        <CardContent>
          <div className="grid md:grid-cols-2 gap-2 md:gap-4">
            {review.positives.length > 0 && renderPositives()}
            {review.negatives.length > 0 && renderNegatives()}
          </div>
        </CardContent>
      )}
      {review.verdict && (
        <CardFooter>
          <CardDescription className="text-base leading-tight text-foreground">
            {review.verdict}
          </CardDescription>
        </CardFooter>
      )}
    </Card>
  );
}
