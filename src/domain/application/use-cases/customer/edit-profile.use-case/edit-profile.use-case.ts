import { Injectable } from "@nestjs/common"
import { CustomersRepository } from "src/domain/application/repositories/customers-repository"
import { Either, left, right } from "src/core/utils/either"
import { ResourceNotFoundError } from "src/core/errors/errors/resource-not-found.error"
import { Customer } from "src/domain/enterprise/entities/customer"
import { UniqueEntityID } from "src/core/entities/unique-entity-id"

export interface EditProfileUseCaseRequest {
  customerId: string
  name?: string
  email?: string
  password?: string
  birthDateAt?: Date
}

export type EditProfileUseCaseResponse = Either<
  ResourceNotFoundError,
  {}
>

@Injectable()
export class EditProfileUseCase {
  constructor(private customersRepository: CustomersRepository) {}

  async execute({ customerId, name, email, password, birthDateAt }: EditProfileUseCaseRequest): Promise<EditProfileUseCaseResponse> {
    const user = await this.customersRepository.findById(customerId)

    if (!user) return left(new ResourceNotFoundError('Customer'))

    const updated = Customer.create({
      name: name ?? user.name,
      email: email ?? user.email,
      password: password ?? user.password,
      birthDateAt: birthDateAt ?? user.birthDateAt,
      createdAt: user.createdAt,
      updatedAt: new Date(),
    }, new UniqueEntityID(customerId))

    await this.customersRepository.update(updated)

    return right({})
  }
}
