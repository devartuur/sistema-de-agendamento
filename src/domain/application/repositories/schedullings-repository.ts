import { Schedulling } from "src/domain/enterprise/entities/schedulling";

export abstract class SchedullingsRepository {
  abstract create(schedulling: Schedulling): Promise<void>
  abstract findById(id: string): Promise<Schedulling | null>
  abstract findByDateAndCollaboratorId(date: Date, collaboratorId: string): Promise<Schedulling[]>
}