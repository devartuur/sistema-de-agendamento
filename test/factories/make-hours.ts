import { UniqueEntityID } from "src/core/entities/unique-entity-id";
import { Hour, HoursProps } from "src/domain/enterprise/entities/hours";

export function makeHour(override: Partial<HoursProps>, id?: UniqueEntityID) {
  return Hour.create({
    day: [1, 2, 3, 4, 5, 6],
    hour: '08:00',
    createdAt: new Date(),
    updatedAt: null,
    ...override
  }, id ?? new UniqueEntityID())
}