/*
  Warnings:

  - Added the required column `description` to the `PageViews` table without a default value. This is not possible if the table is not empty.

*/
-- AlterSequence
ALTER SEQUENCE "PageViews_views_seq" INCREMENT 2;

-- AlterTable
ALTER TABLE "PageViews" ADD COLUMN     "description" STRING NOT NULL;

-- CreateTable
CREATE TABLE "Subscribers" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" STRING NOT NULL,

    CONSTRAINT "Subscribers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subscribers_email_key" ON "Subscribers"("email");
