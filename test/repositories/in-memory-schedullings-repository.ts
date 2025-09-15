import { SchedullingsRepository } from "src/domain/application/repositories/schedullings-repository";
import { Schedulling } from "src/domain/enterprise/entities/schedulling";

export class InMemorySchedullingsRepository implements SchedullingsRepository {
  public items: Schedulling[] = []

  async create(schedulling: Schedulling): Promise<void> {
    this.items.push(schedulling)
  }
}