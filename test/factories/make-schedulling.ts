import { UniqueEntityID } from "src/core/entities/unique-entity-id";
import { Schedulling, SchedullingProps } from "src/domain/enterprise/entities/schedulling";

export function makeSchedulling(override: Partial<SchedullingProps>, id?: UniqueEntityID) {
  return Schedulling.create({
    collaboratorId: new UniqueEntityID(),
    customerId: new UniqueEntityID(),
    hoursIds: [new UniqueEntityID()],
    schedullingDate: new Date(),
    createdAt: new Date(),
    updatedAt: null,
    ...override
  })
}