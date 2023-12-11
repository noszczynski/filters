/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Feature` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Feature" DROP CONSTRAINT "Feature_categoryId_fkey";

-- AlterTable
ALTER TABLE "Feature" DROP COLUMN "categoryId";

-- CreateTable
CREATE TABLE "CategoriesOnFeatures" (
    "id" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "featureId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CategoriesOnFeatures_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CategoriesOnFeatures_categoryId_featureId_key" ON "CategoriesOnFeatures"("categoryId", "featureId");

-- AddForeignKey
ALTER TABLE "CategoriesOnFeatures" ADD CONSTRAINT "CategoriesOnFeatures_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnFeatures" ADD CONSTRAINT "CategoriesOnFeatures_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "Feature"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
