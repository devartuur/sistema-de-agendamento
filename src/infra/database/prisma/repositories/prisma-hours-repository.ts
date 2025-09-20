import { Injectable } from "@nestjs/common";
import { HoursRepository } from "src/domain/application/repositories/hours-repository";
import { Hour } from "src/domain/enterprise/entities/hours";

@Injectable() 
export class PrismaHoursRepository implements HoursRepository {
  create(hour: Hour): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findFreeByDateAndCollaboratorId(date: Date, collaboratorId: string): Promise<Hour[]> {
    throw new Error("Method not implemented.");
  }
  findById(id: string): Promise<Hour | null> {
    throw new Error("Method not implemented.");
  }

}