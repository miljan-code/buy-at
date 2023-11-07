/*
  Warnings:

  - Added the required column `slug` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "products_storeSlug_idx";

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "products_storeSlug_slug_idx" ON "products"("storeSlug", "slug");
