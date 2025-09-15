import { Schedulling } from "src/domain/enterprise/entities/schedulling";

export abstract class SchedullingsRepository {
  abstract create(schedulling: Schedulling): Promise<void>
}