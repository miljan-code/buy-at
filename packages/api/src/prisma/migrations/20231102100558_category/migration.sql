-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "bilboard" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "storeSlug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categories_id_key" ON "categories"("id");

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_storeSlug_fkey" FOREIGN KEY ("storeSlug") REFERENCES "stores"("slug") ON DELETE CASCADE ON UPDATE CASCADE;
