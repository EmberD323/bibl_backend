/*
  Warnings:

  - You are about to drop the column `added` on the `List` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BooksOnLists" ADD COLUMN     "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "List" DROP COLUMN "added";
