/*
  Warnings:

  - You are about to drop the column `name` on the `FeatureVariant` table. All the data in the column will be lost.
  - You are about to drop the `CategoriesOnFeatures` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductFeatureVariant` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `value` to the `FeatureVariant` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CategoriesOnFeatures" DROP CONSTRAINT "CategoriesOnFeatures_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "CategoriesOnFeatures" DROP CONSTRAINT "CategoriesOnFeatures_featureId_fkey";

-- DropForeignKey
ALTER TABLE "ProductFeatureVariant" DROP CONSTRAINT "ProductFeatureVariant_featureVariantId_fkey";

-- DropForeignKey
ALTER TABLE "ProductFeatureVariant" DROP CONSTRAINT "ProductFeatureVariant_productId_fkey";

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Feature" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "FeatureVariant" DROP COLUMN "name",
ADD COLUMN     "value" TEXT NOT NULL,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "CategoriesOnFeatures";

-- DropTable
DROP TABLE "ProductFeatureVariant";

-- CreateTable
CREATE TABLE "FeatureSet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FeatureSet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeatureInSet" (
    "id" TEXT NOT NULL,
    "featureId" TEXT NOT NULL,
    "featureSetId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FeatureInSet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductFeatureValue" (
    "id" TEXT NOT NULL,
    "productFeatureId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductFeatureValue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductFeature" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "featureId" TEXT NOT NULL,
    "featureValue" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductFeature_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FeatureInSet" ADD CONSTRAINT "FeatureInSet_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "Feature"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeatureInSet" ADD CONSTRAINT "FeatureInSet_featureSetId_fkey" FOREIGN KEY ("featureSetId") REFERENCES "FeatureSet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductFeatureValue" ADD CONSTRAINT "ProductFeatureValue_productFeatureId_fkey" FOREIGN KEY ("productFeatureId") REFERENCES "ProductFeature"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductFeature" ADD CONSTRAINT "ProductFeature_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductFeature" ADD CONSTRAINT "ProductFeature_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "Feature"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
