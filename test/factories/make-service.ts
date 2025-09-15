import { faker } from "@faker-js/faker/.";
import { UniqueEntityID } from "src/core/entities/unique-entity-id";
import { Category, Service, ServiceProps } from "src/domain/enterprise/entities/service";

export function makeService(override: Partial<ServiceProps>, id?: UniqueEntityID) {
  return Service.create({
    category: Category.hair,
    description: faker.lorem.text(),
    name: faker.internet.username(),
    duration: faker.number.int(),
    
    ...override
  })
}