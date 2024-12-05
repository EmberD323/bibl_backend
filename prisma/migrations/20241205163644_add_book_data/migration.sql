/*
  Warnings:

  - You are about to drop the column `Category` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `Description` on the `Book` table. All the data in the column will be lost.
  - Added the required column `category` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "Category",
DROP COLUMN "Description",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL;
