import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

import { prisma } from "@/api/prisma";

export default async function ProductPage({
  params,
}: {
  params: { productId: string };
}) {
  const product = await prisma.product.findFirst({
    where: {
      id: params.productId,
    },
    select: {
      id: true,
      name: true,
      price: true,
      category: true,
    },
  });

  const productFeatures = await prisma.productFeature.findMany({
    where: {
      productId: params.productId,
    },
    select: {
      feature: {
        select: {
          name: true,
        },
      },
      ProductFeatureValue: {
        select: {
          value: true,
        },
      },
    },
  });

  console.log({ productFeatures });

  if (!product) {
    return null;
  }

  return (
    <main className="flex gap-12 min-h-screen flex-col items-start justify-start p-4">
      <div>
        <Link
          className="text-secondary-foreground flex items-center"
          href="/products"
        >
          <ArrowLeftIcon size={20} />
          Go back
        </Link>
        <h1 className="text-4xl font-bold">{product.name}</h1>
      </div>
      <div>
        <h2 className="text-2xl font-bold">Category</h2>
        <p>{product.category.name}</p>
      </div>
      <div>
        <h2 className="text-2xl font-bold">Price</h2>
        <p>{product.price / 100}</p>
      </div>
      <div>
        <h2 className="text-2xl font-bold">Product features</h2>
        <pre>{JSON.stringify(productFeatures, null, 4)}</pre>
      </div>
    </main>
  );
}
