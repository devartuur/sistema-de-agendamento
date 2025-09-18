import { Injectable } from "@nestjs/common"
import { ServicesRepository } from "src/domain/application/repositories/service-repository"
import { Service } from "src/domain/enterprise/entities/service"
import { Either, right } from "src/core/utils/either"

export interface CreateServiceUseCaseRequest {
  name: string
  description: string
  duration: number
  price: number
}

export type CreateServiceUseCaseResponse = Either<
  null,
  {
    service: Service
  }
>

@Injectable()
export class CreateServiceUseCase {
  constructor(private servicesRepository: ServicesRepository) {}

  async execute({ name, description, duration, price }: CreateServiceUseCaseRequest): Promise<CreateServiceUseCaseResponse> {
    const service = Service.create({
      name,
      description,
      duration,
      price,
    })

    await this.servicesRepository.create(service)

    return right({ service })
  }
}
