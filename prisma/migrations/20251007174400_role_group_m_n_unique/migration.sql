/*
  Warnings:

  - You are about to drop the column `url` on the `Role` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,groupId]` on the table `GroupUser` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[groupId,roleId]` on the table `RoleGroup` will be added. If there are existing duplicate values, this will fail.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Role" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);
INSERT INTO "new_Role" ("description", "id", "name") SELECT "description", "id", "name" FROM "Role";
DROP TABLE "Role";
ALTER TABLE "new_Role" RENAME TO "Role";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "GroupUser_userId_groupId_key" ON "GroupUser"("userId", "groupId");

-- CreateIndex
CREATE UNIQUE INDEX "RoleGroup_groupId_roleId_key" ON "RoleGroup"("groupId", "roleId");
