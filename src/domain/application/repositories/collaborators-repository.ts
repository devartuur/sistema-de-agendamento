import { Collaborator } from "src/domain/enterprise/entities/collaborator";

export abstract class collaboratorsRepository {
  abstract create(collaborator: Collaborator): Promise<void>
  abstract findById(id: string): Promise<Collaborator | null> 
}