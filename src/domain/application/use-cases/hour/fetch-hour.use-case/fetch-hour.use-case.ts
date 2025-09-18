import { ResourceNotFoundError } from "src/core/errors/errors/resource-not-found.error"
import { Either, left, right } from "src/core/utils/either"
import { HoursRepository } from "src/domain/application/repositories/hours-repository"
import { Hour } from "src/domain/enterprise/entities/hours"

export interface FetchHourUseCaseRequest {
  hourId: string
}

export type FetchHourUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    hour: Hour
  }
>

export class FetchHourUseCase {
  constructor(private hoursRepository: HoursRepository) {}

  async execute({ hourId }: FetchHourUseCaseRequest): Promise<FetchHourUseCaseResponse> {
    const hour = await this.hoursRepository.findById(hourId)

    if(!hour) return left(new ResourceNotFoundError('Hour'))

    return right({ hour })
  }
}
