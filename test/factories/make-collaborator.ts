import { UniqueEntityID } from "src/core/entities/unique-entity-id";
import {faker} from '@faker-js/faker'
import { Collaborator, CollaboratorProps } from "src/domain/enterprise/entities/collaborator";

export function makeCollaborator(override?: Partial<CollaboratorProps>, id?: UniqueEntityID) {
  return Collaborator.create({
    description: faker.lorem.text(),
    serviceIds: [new UniqueEntityID()],
    name: faker.internet.username(),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...override
  }, id ?? new UniqueEntityID())
}