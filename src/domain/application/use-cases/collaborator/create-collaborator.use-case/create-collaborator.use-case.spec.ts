import { InMemoryCollaboratorsRepository } from "test/repositories/in-memory-collaborators-repository"
import { CollaboratorsRepository } from "src/domain/application/repositories/collaborators-repository"
import { CreateCollaboratorUseCase } from "./create-collaborator.use-case"

let sut: CreateCollaboratorUseCase
let collaboratorsRepository: CollaboratorsRepository

describe('[CreateCollaboratorUseCase]', () => {
  beforeEach(() => {
    collaboratorsRepository = new InMemoryCollaboratorsRepository()
    sut = new CreateCollaboratorUseCase(collaboratorsRepository)
  })

  it('should create a collaborator successfully', async () => {
    const result = await sut.execute({
      name: 'João Silva',
      description: 'Barbeiro experiente',
      serviceIds: [],
    })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.collaborator.name).toBe('João Silva')
      expect(result.value.collaborator.description).toBe('Barbeiro experiente')
    }
  })
})
