-- CreateTable
CREATE TABLE "public"."Collaborator" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Collaborator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CollaboratorsService" (
    "id" TEXT NOT NULL,
    "collaboratorId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "CollaboratorsService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Customer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Hour" (
    "id" TEXT NOT NULL,
    "hour" INTEGER NOT NULL,
    "days" INTEGER[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Hour_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Schedulling" (
    "id" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "hourId" TEXT NOT NULL,
    "collaboratorId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Schedulling_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Service" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "price" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."user_photos" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "customerId" TEXT,
    "collaboratorId" TEXT,
    "serviceId" TEXT,

    CONSTRAINT "user_photos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CollaboratorsService_collaboratorId_serviceId_key" ON "public"."CollaboratorsService"("collaboratorId", "serviceId");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "public"."Customer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Schedulling_serviceId_customerId_hourId_collaboratorId_key" ON "public"."Schedulling"("serviceId", "customerId", "hourId", "collaboratorId");

-- CreateIndex
CREATE INDEX "user_photos_customerId_idx" ON "public"."user_photos"("customerId");

-- CreateIndex
CREATE INDEX "user_photos_collaboratorId_idx" ON "public"."user_photos"("collaboratorId");

-- CreateIndex
CREATE INDEX "user_photos_serviceId_idx" ON "public"."user_photos"("serviceId");

-- AddForeignKey
ALTER TABLE "public"."CollaboratorsService" ADD CONSTRAINT "CollaboratorsService_collaboratorId_fkey" FOREIGN KEY ("collaboratorId") REFERENCES "public"."Collaborator"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CollaboratorsService" ADD CONSTRAINT "CollaboratorsService_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "public"."Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Schedulling" ADD CONSTRAINT "Schedulling_collaboratorId_fkey" FOREIGN KEY ("collaboratorId") REFERENCES "public"."Collaborator"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Schedulling" ADD CONSTRAINT "Schedulling_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "public"."Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Schedulling" ADD CONSTRAINT "Schedulling_hourId_fkey" FOREIGN KEY ("hourId") REFERENCES "public"."Hour"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Schedulling" ADD CONSTRAINT "Schedulling_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "public"."Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_photos" ADD CONSTRAINT "user_photos_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "public"."Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_photos" ADD CONSTRAINT "user_photos_collaboratorId_fkey" FOREIGN KEY ("collaboratorId") REFERENCES "public"."Collaborator"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_photos" ADD CONSTRAINT "user_photos_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "public"."Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;
