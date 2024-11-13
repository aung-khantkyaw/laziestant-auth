/*
  Warnings:

  - You are about to drop the column `link` on the `User` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "UserLink" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "UserLink_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profile" TEXT,
    "bio" TEXT,
    "gender" TEXT,
    "dob" DATETIME,
    "address" TEXT,
    "relationship" TEXT,
    "partner" TEXT,
    "annidate" DATETIME,
    "lastLogin" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "resetPasswordToken" TEXT,
    "resetPasswordExpiresAt" DATETIME,
    "verificationToken" TEXT,
    "verificationTokenExpiresAt" DATETIME,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_User" ("address", "annidate", "bio", "created", "dob", "email", "gender", "id", "isVerified", "lastLogin", "name", "partner", "password", "profile", "relationship", "resetPasswordExpiresAt", "resetPasswordToken", "username", "verificationToken", "verificationTokenExpiresAt") SELECT "address", "annidate", "bio", "created", "dob", "email", "gender", "id", "isVerified", "lastLogin", "name", "partner", "password", "profile", "relationship", "resetPasswordExpiresAt", "resetPasswordToken", "username", "verificationToken", "verificationTokenExpiresAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
