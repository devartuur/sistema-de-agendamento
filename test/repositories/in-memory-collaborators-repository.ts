import { collaboratorsRepository } from "src/domain/application/repositories/collaborators-repository";
import { Collaborator } from "src/domain/enterprise/entities/collaborator";

export class InMemoryCollaboratorsRepository implements collaboratorsRepository {
  public items: Collaborator[] = []

  async create(collaborator: Collaborator): Promise<void> {
    this.items.push(collaborator)
  }

  async findById(id: string): Promise<Collaborator | null> {
    const collaborator = this.items.find((item) => item.id.toString() === id)
    return collaborator ?? null
  }
}