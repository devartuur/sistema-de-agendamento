import { ResourceNotFoundError } from "src/core/errors/errors/resource-not-found.error";
import { Either, left, right } from "src/core/utils/either";
import { SchedullingsRepository } from "src/domain/application/repositories/schedullings-repository";
import { Schedulling } from "src/domain/enterprise/entities/schedulling";

export interface FetchSchedullingUseCaseRequest {
  schedullingId: string
}

export type FetchSchedullingUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    schedulling: Schedulling
  }
>

export class FetchSchedullingUseCase {
  constructor(private schedullingsRepository: SchedullingsRepository) {}

  async execute({ schedullingId }: FetchSchedullingUseCaseRequest): Promise<FetchSchedullingUseCaseResponse> {
    const schedulling = await this.schedullingsRepository.findById(schedullingId)

    if(!schedulling) return left(new ResourceNotFoundError('Schedulling'))

    return right({
      schedulling
    })

  } 

}