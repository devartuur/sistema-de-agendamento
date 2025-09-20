import { Injectable } from "@nestjs/common"
import { CollaboratorsRepository } from "src/domain/application/repositories/collaborators-repository"
import { Collaborator } from "src/domain/enterprise/entities/collaborator"
import { UniqueEntityID } from "src/core/entities/unique-entity-id"
import { Either, right } from "src/core/utils/either"

export interface CreateCollaboratorUseCaseRequest {
  name: string
  description: string
  serviceIds: string[]
}

export type CreateCollaboratorUseCaseResponse = Either<
  null,
  {}
>

@Injectable()
export class CreateCollaboratorUseCase {
  constructor(private collaboratorsRepository: CollaboratorsRepository) {}

  async execute({ name, description, serviceIds }: CreateCollaboratorUseCaseRequest): Promise<CreateCollaboratorUseCaseResponse> {
    const collaborator = Collaborator.create({
      name,
      description,
      serviceIds: serviceIds.map((id) => new UniqueEntityID(id)),
    })

    await this.collaboratorsRepository.create(collaborator)

    return right({})
  }
}
