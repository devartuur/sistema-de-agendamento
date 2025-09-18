import { ResourceNotFoundError } from "src/core/errors/errors/resource-not-found.error"
import { Either, left, right } from "src/core/utils/either"
import { CollaboratorsRepository } from "src/domain/application/repositories/collaborators-repository"
import { Collaborator } from "src/domain/enterprise/entities/collaborator"

export interface FetchCollaboratorUseCaseRequest {
  collaboratorId: string
}

export type FetchCollaboratorUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    collaborator: Collaborator
  }
>

export class FetchCollaboratorUseCase {
  constructor(private collaboratorsRepository: CollaboratorsRepository) {}

  async execute({ collaboratorId }: FetchCollaboratorUseCaseRequest): Promise<FetchCollaboratorUseCaseResponse> {
    const collaborator = await this.collaboratorsRepository.findById(collaboratorId)

    if(!collaborator) return left(new ResourceNotFoundError('Collaborator'))

    return right({ collaborator })
  }
}
