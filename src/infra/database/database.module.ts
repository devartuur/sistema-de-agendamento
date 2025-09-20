import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { CustomersRepository } from "src/domain/application/repositories/customers-repository";
import { PrismaCustomersRepository } from "./prisma/repositories/prisma-customers-repository";
import { CollaboratorsRepository } from "src/domain/application/repositories/collaborators-repository";
import { PrismaCollaboratorsRepository } from "./prisma/repositories/prisma-collaborators-repository";
import { HoursRepository } from "src/domain/application/repositories/hours-repository";
import { SchedullingsRepository } from "src/domain/application/repositories/schedullings-repository";
import { PrismaSchedullingsRepository } from "./prisma/repositories/prisma-schedullings-repository";
import { PrismaHoursRepository } from "./prisma/repositories/prisma-hours-repository";
import { ServicesRepository } from "src/domain/application/repositories/service-repository";
import { PrismaServiceRepository } from "./prisma/repositories/prisma-services-repository";

@Module({
  providers: [PrismaService, 
    {provide: CustomersRepository, useClass: PrismaCustomersRepository},
    {provide: CollaboratorsRepository, useClass: PrismaCollaboratorsRepository},
    {provide: SchedullingsRepository, useClass: PrismaSchedullingsRepository},
    {provide: HoursRepository, useClass: PrismaHoursRepository},
    {provide: ServicesRepository, useClass: PrismaServiceRepository}
  ],
  exports: [PrismaService, 
    CustomersRepository,
    CollaboratorsRepository,
    HoursRepository,
    SchedullingsRepository,
    ServicesRepository
  ]
})
export class DatabaseModule {}