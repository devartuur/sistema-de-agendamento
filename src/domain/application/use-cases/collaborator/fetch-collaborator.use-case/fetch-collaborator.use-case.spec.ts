import { InMemoryCollaboratorsRepository } from "test/repositories/in-memory-collaborators-repository"
import { CollaboratorsRepository } from "src/domain/application/repositories/collaborators-repository"
import { FetchCollaboratorUseCase } from "./fetch-collaborator.use-case"
import { makeCollaborator } from "test/factories/make-collaborator"
import { ResourceNotFoundError } from "src/core/errors/errors/resource-not-found.error"

let sut: FetchCollaboratorUseCase
let collaboratorsRepository: CollaboratorsRepository

describe('[FetchCollaboratorUseCase]', () => {
  beforeEach(() => {
    collaboratorsRepository = new InMemoryCollaboratorsRepository()
    sut = new FetchCollaboratorUseCase(collaboratorsRepository)
  })

  it('should fetch an existing collaborator successfully', async () => {
    const collaborator = makeCollaborator()
    await collaboratorsRepository.create(collaborator)

    const result = await sut.execute({ collaboratorId: collaborator.id.toString() })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.collaborator).toEqual(collaborator)
    }
  })

  it('should return ResourceNotFoundError if collaborator does not exist', async () => {
    const result = await sut.execute({ collaboratorId: 'non-existent-id' })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
