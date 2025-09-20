import { Injectable } from "@nestjs/common";
import { ServicesRepository } from "src/domain/application/repositories/service-repository";
import { Service } from "src/domain/enterprise/entities/service";

@Injectable() 
export class PrismaServiceRepository implements ServicesRepository {
  create(service: Service): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findById(id: string): Promise<Service | null> {
    throw new Error("Method not implemented.");
  }
}