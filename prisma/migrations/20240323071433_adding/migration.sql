/*
  Warnings:

  - Added the required column `studentId` to the `Average` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Average" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "average" INTEGER NOT NULL,
    "studentId" TEXT NOT NULL,
    CONSTRAINT "Average_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Average" ("average", "id") SELECT "average", "id" FROM "Average";
DROP TABLE "Average";
ALTER TABLE "new_Average" RENAME TO "Average";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
