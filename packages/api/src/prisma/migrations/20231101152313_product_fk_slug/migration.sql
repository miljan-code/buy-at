/*
  Warnings:

  - You are about to drop the column `storeId` on the `products` table. All the data in the column will be lost.
  - Added the required column `storeSlug` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_storeId_fkey";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "storeId",
ADD COLUMN     "storeSlug" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_storeSlug_fkey" FOREIGN KEY ("storeSlug") REFERENCES "stores"("slug") ON DELETE CASCADE ON UPDATE CASCADE;
