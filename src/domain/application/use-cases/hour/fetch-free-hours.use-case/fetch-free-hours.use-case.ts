import { Either, right } from "src/core/utils/either"
import { HoursRepository } from "src/domain/application/repositories/hours-repository"
import { Hour } from "src/domain/enterprise/entities/hours"

export interface FetchFreeHoursUseCaseRequest {
  date: Date
  collaboratorId: string
}

export type FetchFreeHoursUseCaseResponse = Either<
  null,
  {
    hours: Hour[]
  }
>

export class FetchFreeHoursUseCase {
  constructor(private hoursRepository: HoursRepository) {}

  async execute({ date, collaboratorId }: FetchFreeHoursUseCaseRequest): Promise<FetchFreeHoursUseCaseResponse> {
    const hours = await this.hoursRepository.findFreeByDateAndCollaboratorId(date, collaboratorId)

    return right({ hours })
  }
}
