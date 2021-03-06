-- CreateTable
CREATE TABLE "Network" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "shortName" TEXT,
    "longName" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Network.code_unique" ON "Network"("code");
