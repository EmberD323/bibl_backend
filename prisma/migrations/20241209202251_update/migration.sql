/*
  Warnings:

  - The primary key for the `Rating` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Rating_pkey" PRIMARY KEY ("id");
