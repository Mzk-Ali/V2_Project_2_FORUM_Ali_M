/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Topic` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Topic` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `topic` ADD COLUMN `slug` VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Topic_slug_key` ON `Topic`(`slug`);
