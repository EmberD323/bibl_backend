/*
  Warnings:

  - You are about to drop the column `author_first_name` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `author_last_name` on the `Book` table. All the data in the column will be lost.
  - Added the required column `Category` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Description` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `author_name` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `averageRating` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageURL` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pageCount` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publishDate` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "author_first_name",
DROP COLUMN "author_last_name",
ADD COLUMN     "Category" TEXT NOT NULL,
ADD COLUMN     "Description" TEXT NOT NULL,
ADD COLUMN     "author_name" TEXT NOT NULL,
ADD COLUMN     "averageRating" INTEGER NOT NULL,
ADD COLUMN     "imageURL" TEXT NOT NULL,
ADD COLUMN     "pageCount" INTEGER NOT NULL,
ADD COLUMN     "publishDate" INTEGER NOT NULL;
