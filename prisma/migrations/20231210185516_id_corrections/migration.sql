/*
  Warnings:

  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Made the column `categoryId` on table `Feature` required. This step will fail if there are existing NULL values in that column.
  - Made the column `featureId` on table `FeatureVariant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `image` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `categoryId` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `productId` on table `ProductFeatureVariant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `featureVariantId` on table `ProductFeatureVariant` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Feature" DROP CONSTRAINT "Feature_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "FeatureVariant" DROP CONSTRAINT "FeatureVariant_featureId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "ProductFeatureVariant" DROP CONSTRAINT "ProductFeatureVariant_featureVariantId_fkey";

-- DropForeignKey
ALTER TABLE "ProductFeatureVariant" DROP CONSTRAINT "ProductFeatureVariant_productId_fkey";

-- AlterTable
ALTER TABLE "Feature" ALTER COLUMN "categoryId" SET NOT NULL;

-- AlterTable
ALTER TABLE "FeatureVariant" ALTER COLUMN "featureId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP CONSTRAINT "Product_pkey",
ADD COLUMN     "sku" SERIAL NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "image" SET NOT NULL,
ALTER COLUMN "categoryId" SET NOT NULL,
ADD CONSTRAINT "Product_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Product_id_seq";

-- AlterTable
ALTER TABLE "ProductFeatureVariant" ALTER COLUMN "productId" SET NOT NULL,
ALTER COLUMN "productId" SET DATA TYPE TEXT,
ALTER COLUMN "featureVariantId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feature" ADD CONSTRAINT "Feature_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeatureVariant" ADD CONSTRAINT "FeatureVariant_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "Feature"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductFeatureVariant" ADD CONSTRAINT "ProductFeatureVariant_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductFeatureVariant" ADD CONSTRAINT "ProductFeatureVariant_featureVariantId_fkey" FOREIGN KEY ("featureVariantId") REFERENCES "FeatureVariant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
