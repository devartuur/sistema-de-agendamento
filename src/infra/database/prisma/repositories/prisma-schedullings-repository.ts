import { Injectable } from "@nestjs/common";
import { SchedullingsRepository } from "src/domain/application/repositories/schedullings-repository";
import { Schedulling } from "src/domain/enterprise/entities/schedulling";

@Injectable()
export class PrismaSchedullingsRepository implements SchedullingsRepository {
  create(schedulling: Schedulling): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findById(id: string): Promise<Schedulling | null> {
    throw new Error("Method not implemented.");
  }
  findByDateAndCollaboratorId(date: Date, collaboratorId: string): Promise<Schedulling[]> {
    throw new Error("Method not implemented.");
  }
}