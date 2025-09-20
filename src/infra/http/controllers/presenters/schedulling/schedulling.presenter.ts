import { Schedulling } from "src/domain/enterprise/entities/schedulling";

export class SchedullingPresenter {
  static toHttp(schedulling: Schedulling) {
    return {
      id: schedulling.id,
      customerId: schedulling.customerId.toString(),
      collaboratorId: schedulling.collaboratorId.toString(),
      hoursIds: schedulling.hoursIds.map((id) => id.toString()),
      date: schedulling.date,
      createdAt: schedulling.createdAt,
      updatedAt: schedulling.updatedAt,
    }
  }
}
