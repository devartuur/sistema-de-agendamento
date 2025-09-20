import { Injectable } from "@nestjs/common";
import { CollaboratorsRepository } from "src/domain/application/repositories/collaborators-repository";
import { Collaborator } from "src/domain/enterprise/entities/collaborator";

@Injectable()
export class PrismaCollaboratorsRepository implements CollaboratorsRepository {
  create(collaborator: Collaborator): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findById(id: string): Promise<Collaborator | null> {
    throw new Error("Method not implemented.");
  }

}