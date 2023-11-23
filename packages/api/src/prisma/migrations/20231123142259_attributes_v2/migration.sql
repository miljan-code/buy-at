/*
  Warnings:

  - You are about to drop the column `category` on the `Attribute` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name,categoryId,storeSlug]` on the table `Attribute` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categoryId` to the `Attribute` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Attribute_category_idx";

-- DropIndex
DROP INDEX "Attribute_name_category_storeSlug_key";

-- AlterTable
ALTER TABLE "Attribute" DROP COLUMN "category",
ADD COLUMN     "categoryId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Attribute_categoryId_idx" ON "Attribute"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "Attribute_name_categoryId_storeSlug_key" ON "Attribute"("name", "categoryId", "storeSlug");

-- AddForeignKey
ALTER TABLE "Attribute" ADD CONSTRAINT "Attribute_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
