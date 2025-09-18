import { Collaborator } from "src/domain/enterprise/entities/collaborator";

export abstract class CollaboratorsRepository {
  abstract create(collaborator: Collaborator): Promise<void>
  abstract findById(id: string): Promise<Collaborator | null> 
}