import { ResourceNotFoundError } from "src/core/errors/errors/resource-not-found.error"
import { Either, left, right } from "src/core/utils/either"
import { ServicesRepository } from "src/domain/application/repositories/service-repository"
import { Service } from "src/domain/enterprise/entities/service"

export interface FetchServiceUseCaseRequest {
  serviceId: string
}

export type FetchServiceUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    service: Service
  }
>

export class FetchServiceUseCase {
  constructor(private servicesRepository: ServicesRepository) {}

  async execute({ serviceId }: FetchServiceUseCaseRequest): Promise<FetchServiceUseCaseResponse> {
    const service = await this.servicesRepository.findById(serviceId)

    if(!service) return left(new ResourceNotFoundError('Service'))

    return right({ service })
  }
}
