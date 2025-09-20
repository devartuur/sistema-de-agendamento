import { Hour } from "src/domain/enterprise/entities/hours";

export class HourPresenter {
  static toHttp(hour: Hour) {
    return {
      id: hour.id,
      hour: hour.hour,
      createdAt: hour.createdAt,
      updatedAt: hour.updatedAt,
    }
  }
}
