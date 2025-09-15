import { UniqueEntityID } from "src/core/entities/unique-entity-id";
import { Customer, CustomerProps } from "src/domain/enterprise/entities/customer";
import {faker} from '@faker-js/faker'

export function makeCustomer(override: Partial<CustomerProps>, id?: UniqueEntityID) {
  return Customer.create({
    email: faker.internet.email(),
    birthDateAt: new Date(),
    name: faker.internet.username(),
    password: faker.internet.password(),
    createdAt: new Date(),
    updatedAt: null,
    ...override
  }, id ?? new UniqueEntityID())
}