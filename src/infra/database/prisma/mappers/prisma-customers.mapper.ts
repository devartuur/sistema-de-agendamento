import {Prisma, Customer as PrismaDomain} from '@prisma/client'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { Customer, Customer as DomainCustomer} from 'src/domain/enterprise/entities/customer';

export class PrismaCustomersMapper {
  static toDomain(customer: PrismaDomain): DomainCustomer {
    return Customer.create({
      name: customer.name,
      email: customer.email,
      password: customer.email,
      birthDateAt: customer.birth_date_at,
      createdAt: customer.created_at,
      updatedAt: customer.updated_at
    }, new UniqueEntityID(customer.id)) 
  }

  static toPrisma(customer: DomainCustomer): Prisma.CustomerCreateInput {
    return {
      id: customer.id.toString(),
      email: customer.email,
      name: customer.name,
      password: customer.password,
      birth_date_at: customer.birthDateAt,
      created_at: customer.createdAt,
      updated_at: customer.updatedAt
    }
  }
}