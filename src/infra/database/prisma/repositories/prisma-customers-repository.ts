import { Injectable } from "@nestjs/common";
import { CustomersRepository } from "src/domain/application/repositories/customers-repository";
import { Customer } from "src/domain/enterprise/entities/customer";
import { PrismaCustomersMapper } from "../mappers/prisma-customers.mapper";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaCustomersRepository implements CustomersRepository {
  constructor(private prisma: PrismaService) {}
  
  async create(customer: Customer): Promise<void> {
    const data = PrismaCustomersMapper.toPrisma(customer)
    await this.prisma.customer.create({
      data
    })
  }

  async findById(id: string): Promise<Customer | null> {
    const customer = await this.prisma.customer.findUnique({
      where: {
        id
      }
    })

    if(!customer) {
      return null
    }

    return PrismaCustomersMapper.toDomain(customer)

  }

}