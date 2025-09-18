import { faker } from "@faker-js/faker";
import { UniqueEntityID } from "src/core/entities/unique-entity-id";
import { Service, ServiceProps } from "src/domain/enterprise/entities/service";

export function makeService(override: Partial<ServiceProps>, id?: UniqueEntityID) {
  return Service.create({
    description: faker.lorem.text(),
    name: faker.internet.username(),
    duration: faker.number.int(),
    price: faker.number.int(),
    ...override
  }, id)
}