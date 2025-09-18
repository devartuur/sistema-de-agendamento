import { Schedulling } from "src/domain/enterprise/entities/schedulling"
import { SchedullingsRepository } from "src/domain/application/repositories/schedullings-repository"

export class InMemorySchedullingsRepository implements SchedullingsRepository {
  public items: Schedulling[] = []

  async create(schedulling: Schedulling): Promise<void> {
    this.items.push(schedulling)
  }

  async findById(id: string): Promise<Schedulling | null> {
    return this.items.find((item) => item.id.toString() === id) ?? null
  }

  async findByDateAndCollaboratorId(date: Date, collaboratorId: string): Promise<Schedulling[]> {
    return this.items.filter(
      (item) =>
        item.date.getTime() === date.getTime() &&
        item.collaboratorId.toString() === collaboratorId,
    )
  }
}
