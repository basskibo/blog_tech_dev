/*
  Warnings:

  - Added the required column `slug` to the `PageViews` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PageViews" ADD COLUMN     "slug" STRING NOT NULL;
