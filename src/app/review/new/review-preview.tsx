"use client";

import { api } from "@/trpc/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CirclePlus, CircleMinus, Trash2 } from "lucide-react";

export interface ReviewPreviewProps {
  productId?: number;
  positives?: string[];
  negatives?: string[];
  verdict?: string;
  removePositive: (index: number) => void;
  removeNegative: (index: number) => void;
}

export default function ReviewPreview({
  productId = 0,
  positives = [],
  negatives = [],
  verdict = "",
  removePositive,
  removeNegative,
}: ReviewPreviewProps) {
  const { data: product } = api.product.get.useQuery(
    { id: productId },
    { enabled: !!productId },
  );

  const renderProductHeader = () => (
    <CardHeader>
      <CardTitle>
        {product?.name ?? (
          <span className="text-muted-foreground">Select a product</span>
        )}
      </CardTitle>
      {product && (
        <div>
          <p>{product.brand.name}</p>
        </div>
      )}
    </CardHeader>
  );

  const renderPositives = () => (
    <div>
      <ul>
        {positives.map((positive, index) => (
          <li key={index} className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <CirclePlus strokeWidth={3} className="text-success size-4" />
              {positive}
            </span>
            <Button
              className="aspect-square h-full p-1 hover:bg-destructive/40 hover:text-destructive-foreground"
              variant="ghost"
              onClick={() => removePositive(index)}
            >
              <Trash2 className="size-3" />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );

  const renderNegatives = () => (
    <div>
      <ul>
        {negatives.map((negative, index) => (
          <li key={index} className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <CircleMinus
                strokeWidth={3}
                className="size-4 text-destructive"
              />
              {negative}
            </span>
            <Button
              className="aspect-square h-full p-1 hover:bg-destructive/40 hover:text-destructive-foreground"
              variant="ghost"
              onClick={() => removeNegative(index)}
            >
              <Trash2 className="size-3" />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <Card className="overflow-hidden">
      {renderProductHeader()}
      {(positives.length > 0 || negatives.length > 0) && (
        <CardContent>
          <div className="grid md:grid-cols-2 md:gap-4">
            {positives.length > 0 && renderPositives()}
            {negatives.length > 0 && renderNegatives()}
          </div>
        </CardContent>
      )}
      {verdict && (
        <CardFooter>
          <CardDescription className="text-balance text-base leading-tight text-foreground">
            {verdict}
          </CardDescription>
        </CardFooter>
      )}
    </Card>
  );
}
