import { Injectable } from "@nestjs/common"
import { CustomersRepository } from "src/domain/application/repositories/customers-repository"
import { Customer } from "src/domain/enterprise/entities/customer"
import { Either, right } from "src/core/utils/either"

export interface CreateCustomerUseCaseRequest {
  name: string
  email: string
  password: string
  birthDateAt: Date
}

export type CreateCustomerUseCaseResponse = Either<
  null,
  {}
>

@Injectable()
export class CreateCustomerUseCase {
  constructor(private customersRepository: CustomersRepository) {}

  async execute({ name, email, password, birthDateAt }: CreateCustomerUseCaseRequest): Promise<CreateCustomerUseCaseResponse> {
    const customer = Customer.create({
      name,
      email,
      password,
      birthDateAt,
    })

    await this.customersRepository.create(customer)

    return right({})
  }
}
