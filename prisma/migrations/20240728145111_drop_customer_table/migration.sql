/*
  Warnings:

  - You are about to drop the `customers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `orders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `shippings` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_customerId_fkey";

-- DropForeignKey
ALTER TABLE "shippings" DROP CONSTRAINT "shippings_customerId_fkey";

-- DropTable
DROP TABLE "customers";

-- DropTable
DROP TABLE "orders";

-- DropTable
DROP TABLE "shippings";
