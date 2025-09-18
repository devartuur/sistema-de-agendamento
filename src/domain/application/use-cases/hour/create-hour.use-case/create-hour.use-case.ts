import { Injectable } from "@nestjs/common"
import { HoursRepository } from "src/domain/application/repositories/hours-repository"
import { Hour } from "src/domain/enterprise/entities/hours"
import { Either, right } from "src/core/utils/either"

export interface CreateHourUseCaseRequest {
  hour: number
  day: number[]
}

export type CreateHourUseCaseResponse = Either<
  null,
  {
    hour: Hour
  }
>

@Injectable()
export class CreateHourUseCase {
  constructor(private hoursRepository: HoursRepository) {}

  async execute({ hour, day }: CreateHourUseCaseRequest): Promise<CreateHourUseCaseResponse> {
    const hourEntity = Hour.create({
      hour,
      day,
    })

    await this.hoursRepository.create(hourEntity)

    return right({ hour: hourEntity })
  }
}
