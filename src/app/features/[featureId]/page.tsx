import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

import { prisma } from "@/api/prisma";

export default async function FeaturePage({
  params,
}: {
  params: { featureId: string };
}) {
  const feature = await prisma.feature.findFirst({
    where: {
      id: params.featureId,
    },
    select: {
      id: true,
      name: true,
    },
  });

  const sets = await prisma.featureSet.findMany({
    where: {
      FeatureInSet: {
        some: {
          featureId: params.featureId,
        },
      },
    },
    select: {
      id: true,
      name: true,
    },
  });

  const productFeatures = await prisma.productFeature.findMany({
    where: {
      featureId: params.featureId,
    },
    select: {
      id: true,
      productId: true,
      featureId: true,
      ProductFeatureValue: {
        select: {
          value: true,
        },
      },
    },
  });

  console.log({ feature, sets, productFeatures });

  return (
    <main className="flex gap-12 min-h-screen flex-col items-start justify-start p-4">
      <div className="flex w-full justify-between items-start">
        <div>
          <Link
            className="text-secondary-foreground flex items-center"
            href="/features"
          >
            <ArrowLeftIcon size={20} />
            Go back
          </Link>
          <h1 className="text-4xl font-bold">{feature?.name}</h1>
        </div>
        <div>{/*<CreateFeatureSheetButton categories={[]}/>*/}</div>
      </div>
      <pre>Feature: {JSON.stringify(feature, null, 2)}</pre>
      <pre>Sets: {JSON.stringify(sets, null, 2)}</pre>
      <pre>ProductFeatures: {JSON.stringify(productFeatures, null, 2)}</pre>
      {/*<Table>*/}
      {/*    <TableCaption>A list of features.</TableCaption>*/}
      {/*    <TableHeader>*/}
      {/*        <TableRow>*/}
      {/*            <TableHead className="w-[100px]">Id</TableHead>*/}
      {/*            <TableHead>Name</TableHead>*/}
      {/*        </TableRow>*/}
      {/*    </TableHeader>*/}
      {/*    <TableBody>*/}
      {/*        {features.map((features, _, arr) => (*/}
      {/*            <TableRow key={features.id}>*/}
      {/*                <TableCell>{features.id}</TableCell>*/}
      {/*                <TableCell className="font-medium">{features.name}</TableCell>*/}
      {/*            </TableRow>*/}
      {/*        ))}*/}
      {/*    </TableBody>*/}
      {/*</Table>*/}
    </main>
  );
}
