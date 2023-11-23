/*
  Warnings:

  - You are about to drop the `Attribute` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Option` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Attribute" DROP CONSTRAINT "Attribute_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Option" DROP CONSTRAINT "Option_attributeId_fkey";

-- DropTable
DROP TABLE "Attribute";

-- DropTable
DROP TABLE "Option";

-- CreateTable
CREATE TABLE "attributes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "storeSlug" TEXT NOT NULL,

    CONSTRAINT "attributes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "options" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "attributeId" TEXT NOT NULL,

    CONSTRAINT "options_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "attributes_id_key" ON "attributes"("id");

-- CreateIndex
CREATE INDEX "attributes_categoryId_idx" ON "attributes"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "attributes_name_categoryId_storeSlug_key" ON "attributes"("name", "categoryId", "storeSlug");

-- CreateIndex
CREATE UNIQUE INDEX "options_id_key" ON "options"("id");

-- CreateIndex
CREATE INDEX "options_attributeId_idx" ON "options"("attributeId");

-- AddForeignKey
ALTER TABLE "attributes" ADD CONSTRAINT "attributes_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "options" ADD CONSTRAINT "options_attributeId_fkey" FOREIGN KEY ("attributeId") REFERENCES "attributes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
